// ==========================================
// MIGRATE EXCEL → SUPABASE
// ==========================================

const XLSX = require('xlsx')
const fs = require('fs')
const path = require('path')

// ---------- KONFIGURASI ----------
const EXCEL_FILE = process.argv[2] || 'LOKASI RUMUS 2026.xlsx'
const OUTPUT_SQL = 'migration.sql'

// ---------- HELPERS ----------
function parseBarang(barang) {
  // "23#SLNDX-S-WH" atau "23-SLNDX-S-APR" atau "B32#KSDK-S-WH"
  const parts = barang.split('-')
  if (parts.length < 3) return null
  
  const color = parts[parts.length - 1].toUpperCase()
  const size = parts[parts.length - 2].toUpperCase()
  const tipeParts = parts.slice(0, parts.length - 2)
  
  let tipe = tipeParts.join('-')
  
  // Bersihkan kode gudang
  if (tipe.includes('#')) {
    tipe = tipe.split('#')[1]
  } else if (/^\d+$/.test(tipeParts[0])) {
    // "23", "SLNDX" → skip 23
    tipe = tipeParts.slice(1).join('-')
  }
  
  return { tipe: tipe.toUpperCase(), size, color }
}

function esc(s) {
  return String(s).replace(/'/g, "''")
}

// ---------- BACA EXCEL ----------
console.log(`📖 Membaca: ${EXCEL_FILE}`)
const wb = XLSX.readFile(EXCEL_FILE)

// ---------- 1. EXTRACT CATEGORIES & PRODUCTS & LOCATIONS ----------
console.log('🔍 Ekstrak kategori, produk, dan rak...')

const categories = new Set()
const products = new Map() // key: sku, value: {category, size, color}
const locations = new Set()

// Baca dari semua sheet MASTER_* dan LOKASI RUMUS 2026
const sheetsToScan = ['LOKASI RUMUS 2026', 'MASTER_MEI', 'MASTER_AGUSTUS', 'MASTER_SEPTEMBER', 'MASTER_OKTOBER']

for (const sheetName of sheetsToScan) {
  const sheet = wb.Sheets[sheetName]
  if (!sheet) continue

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' })
  
  for (const row of rows) {
    const kode = String(row[0] || '').trim()
    // Cari kode dengan format "X1-..." atau "X1-23#..."
    if (!/^[A-Za-z]\d+-/.test(kode)) continue
    
    // Split lokasi di "-" pertama
    const dashIdx = kode.indexOf('-')
    if (dashIdx < 1) continue
    
    const location = kode.substring(0, dashIdx).toUpperCase()
    const barang = kode.substring(dashIdx + 1)
    
    const parsed = parseBarang(barang)
    if (!parsed) continue
    
    locations.add(location)
    categories.add(parsed.tipe)
    
    const sku = `${parsed.tipe}-${parsed.size}-${parsed.color}`
    if (!products.has(sku)) {
      products.set(sku, { category: parsed.tipe, size: parsed.size, color: parsed.color })
    }
  }
}

console.log(`  ✅ Kategori: ${categories.size}`)
console.log(`  ✅ Rak: ${locations.size}`)
console.log(`  ✅ Produk unik (SKU): ${products.size}`)

// ---------- 2. EXTRACT TRANSACTIONS ----------
console.log('💳 Ekstrak transaksi dari sheet IN OUT...')

const inOutSheet = wb.Sheets['IN OUT']
if (!inOutSheet) {
  console.error('❌ Sheet "IN OUT" tidak ditemukan!')
  process.exit(1)
}

const inOutRows = XLSX.utils.sheet_to_json(inOutSheet, { header: 1, defval: '' })
const transactions = []

for (let i = 0; i < inOutRows.length; i++) {
  const row = inOutRows[i]
  const tanggal = row[0]
  const kode = String(row[2] || '').trim()
  const masuk = parseFloat(row[3]) || 0
  const keluar = parseFloat(row[4]) || 0
  
  // Skip baris header atau kosong
  if (!kode || !/^[A-Za-z]\d+-/.test(kode)) continue
  
  const dashIdx = kode.indexOf('-')
  if (dashIdx < 1) continue
  const location = kode.substring(0, dashIdx).toUpperCase()
  const barang = kode.substring(dashIdx + 1)
  
  const parsed = parseBarang(barang)
  if (!parsed) continue
  const sku = `${parsed.tipe}-${parsed.size}-${parsed.color}`
  
  // Convert tanggal ke ISO
  let dateISO
  if (tanggal instanceof Date) {
    dateISO = tanggal.toISOString()
  } else if (typeof tanggal === 'number') {
    const d = XLSX.SSF.parse_date_code(tanggal)
    dateISO = new Date(Date.UTC(d.y, d.m - 1, d.d, d.H || 0, d.M || 0, d.S || 0)).toISOString()
  } else {
    dateISO = new Date(tanggal).toISOString()
  }
  
  if (masuk > 0) {
    transactions.push({ sku, location, type: 'IN', qty: masuk, date: dateISO })
  }
  if (keluar > 0) {
    transactions.push({ sku, location, type: 'OUT', qty: keluar, date: dateISO })
  }
}

console.log(`  ✅ Total transaksi: ${transactions.length}`)

// ---------- 3. GENERATE SQL ----------
console.log('📝 Generate migration.sql...')

let sql = `-- ==========================================\n`
sql += `-- MIGRATION FROM EXCEL: ${path.basename(EXCEL_FILE)}\n`
sql += `-- Generated: ${new Date().toISOString()}\n`
sql += `-- Kategori: ${categories.size} | Rak: ${locations.size} | Produk: ${products.size} | Transaksi: ${transactions.length}\n`
sql += `-- ==========================================\n\n`

// --- Categories ---
sql += `-- ===== 1. KATEGORI =====\n`
for (const cat of [...categories].sort()) {
  sql += `INSERT INTO categories (name, description) VALUES ('${esc(cat)}', 'Auto-import')\n`
  sql += `  ON CONFLICT (name) DO NOTHING;\n`
}
sql += `\n`

// --- Locations ---
sql += `-- ===== 2. LOKASI RAK =====\n`
for (const loc of [...locations].sort()) {
  sql += `INSERT INTO locations (code, description) VALUES ('${esc(loc)}', 'Rak ${esc(loc)}')\n`
  sql += `  ON CONFLICT (code) DO NOTHING;\n`
}
sql += `\n`

// --- Products (batch by category) ---
sql += `-- ===== 3. PRODUK (Auto-SKU) =====\n`
for (const [sku, info] of products) {
  sql += `INSERT INTO products (sku, category_id, size, color, min_stock)\n`
  sql += `  SELECT '${esc(sku)}', id, '${esc(info.size)}', '${esc(info.color)}', 10\n`
  sql += `  FROM categories WHERE name = '${esc(info.category)}'\n`
  sql += `  ON CONFLICT (sku) DO NOTHING;\n`
}
sql += `\n`

// --- Transactions (in batches of 100) ---
sql += `-- ===== 4. TRANSAKSI =====\n`
sql += `-- Menggunakan subquery untuk lookup product_id & location_id\n\n`

const BATCH_SIZE = 100
for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
  const batch = transactions.slice(i, i + BATCH_SIZE)
  
  sql += `INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)\n`
  sql += `SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'\n`
  sql += `FROM (VALUES\n`
  
  const values = batch.map(t => 
    `  ('${esc(t.sku)}', '${esc(t.location)}', '${t.type}', ${t.qty}, '${t.date}')`
  )
  sql += values.join(',\n')
  sql += `\n) AS t(sku, loc, type, quantity, transaction_date)\n`
  sql += `JOIN products p ON p.sku = t.sku\n`
  sql += `JOIN locations l ON l.code = t.loc;\n\n`
  
  // Print progress
  if (i % 1000 === 0) {
    console.log(`  ... ${i}/${transactions.length} transaksi`)
  }
}

sql += `\n-- ==========================================\n`
sql += `-- SELESAI! Cek dengan query:\n`
sql += `-- SELECT COUNT(*) FROM transactions;\n`
sql += `-- SELECT COUNT(*) FROM products;\n`
sql += `-- SELECT * FROM stocks LIMIT 10;\n`
sql += `-- ==========================================\n`

fs.writeFileSync(OUTPUT_SQL, sql, 'utf8')

console.log(`\n✅ SUKSES! File "${OUTPUT_SQL}" sudah dibuat.`)
console.log(`📊 Ringkasan:`)
console.log(`   • Kategori: ${categories.size}`)
console.log(`   • Rak: ${locations.size}`)
console.log(`   • Produk: ${products.size}`)
console.log(`   • Transaksi: ${transactions.length}`)
console.log(`\n📌 Langkah selanjutnya:`)
console.log(`   1. Buka file "migration.sql"`)
console.log(`   2. Copy seluruh isinya`)
console.log(`   3. Paste ke Supabase SQL Editor`)
console.log(`   4. Klik Run`)