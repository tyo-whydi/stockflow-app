'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRightLeft, Plus, Pencil, X, Check, Search, Download, RefreshCw } from 'lucide-react'

type Product = { id: number, sku: string }
type Location = { id: number, code: string }
type Transaction = {
  id: number
  type: 'IN' | 'OUT'
  quantity: number
  transaction_date: string
  notes: string
  product_id: number
  location_id: number
  user_id: string | null
  products: { sku: string }
  locations: { code: string }
  profiles: { full_name: string, email: string } | null
}

type TransactionRecord = Omit<Transaction, 'products' | 'locations' | 'profiles'> & {
  products: { sku: string } | { sku: string }[] | null
  locations: { code: string } | { code: string }[] | null
}
type TransactionProfile = { id: string; full_name: string; email: string }
type TransactionFilter = 'ALL' | 'IN' | 'OUT'

function firstRelated<T>(relationship: T | T[] | null | undefined): T | undefined {
  return Array.isArray(relationship) ? relationship[0] : relationship ?? undefined
}

const TABLE_HEADERS = ['Tanggal', 'Tipe', 'SKU', 'Rak', 'Qty', 'Petugas', 'Catatan', 'Aksi']

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [locations, setLocations] = useState<Location[]>([])

  // Form input
  const [productId, setProductId] = useState('')
  const [locationId, setLocationId] = useState('')
  const [type, setType] = useState<'IN' | 'OUT'>('IN')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<TransactionFilter>('ALL')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editType, setEditType] = useState<'IN' | 'OUT'>('IN')
  const [editQty, setEditQty] = useState('')
  const [editNotes, setEditNotes] = useState('')
  const [editProductId, setEditProductId] = useState('')
  const [editLocationId, setEditLocationId] = useState('')

  const fetchData = async () => {
    setFetching(true)

    // Ambil produk & lokasi untuk dropdown
    const { data: prodData } = await supabase.from('products').select('id, sku').order('sku')
    const { data: locData } = await supabase.from('locations').select('id, code').order('code')
    if (prodData) setProducts(prodData)
    if (locData) setLocations(locData)

    // Ambil transaksi + join produk & lokasi
    const { data: trxData, error } = await supabase
      .from('transactions')
      .select('id, type, quantity, transaction_date, notes, product_id, location_id, user_id, products ( sku ), locations ( code )')
      .order('transaction_date', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching transactions:', error.message)
      setErrorMessage('Transaksi gagal dimuat. Periksa koneksi lalu coba lagi.')
      setFetching(false)
      return
    }

    const transactionRows = (trxData ?? []) as TransactionRecord[]
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
    if (profilesError) console.error('Error fetching profiles:', profilesError.message)
    const profileRows = (profilesData ?? []) as TransactionProfile[]

    // Gabungkan data
    const merged: Transaction[] = transactionRows.map((trx) => {
      const profile = profileRows.find((item) => item.id === trx.user_id)
      return {
        ...trx,
        products: firstRelated(trx.products) ?? { sku: '' },
        locations: firstRelated(trx.locations) ?? { code: '' },
        notes: trx.notes ?? '',
        profiles: profile ? { full_name: profile.full_name, email: profile.email } : null,
      }
    })

    setTransactions(merged)
    setErrorMessage('')
    setFetching(false)
  }

  useEffect(() => {
    const request = window.setTimeout(() => void fetchData(), 0)
    return () => window.clearTimeout(request)
  }, [])

  // Simpan transaksi baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedQuantity = Number(quantity)
    if (!productId || !locationId || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setErrorMessage('Pilih produk, lokasi, dan jumlah minimal 1 unit.')
      return
    }
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setErrorMessage('Sesi login habis. Silakan login ulang.')
        return
      }

      if (type === 'OUT') {
        const { data: stock, error: stockError } = await supabase
          .from('stocks')
          .select('current_stock')
          .eq('product_id', Number(productId))
          .eq('location_id', Number(locationId))
          .maybeSingle()
        if (stockError) {
          console.error('Gagal memeriksa stok sebelum transaksi:', stockError.message)
          setErrorMessage('Stok belum dapat diverifikasi. Coba lagi sebelum menyimpan.')
          return
        }
        if (!stock || stock.current_stock < parsedQuantity) {
          setErrorMessage(`Stok di lokasi ini tidak cukup. Stok tersedia: ${stock?.current_stock ?? 0} unit.`)
          return
        }
      }

      const { error } = await supabase.from('transactions').insert([{
        product_id: Number(productId),
        location_id: Number(locationId),
        user_id: user.id,
        type,
        quantity: parsedQuantity,
        notes: notes.trim(),
      }])

      if (error) {
        console.error('Gagal menyimpan transaksi:', error.message)
        setErrorMessage('Transaksi gagal disimpan. Periksa kembali stok dan data yang dipilih.')
      } else {
        setQuantity('')
        setNotes('')
        setErrorMessage('')
        await fetchData()
      }
    } finally {
      setLoading(false)
    }
  }

  // Mulai edit
  const startEdit = (trx: Transaction) => {
    setEditingId(trx.id)
    setEditType(trx.type)
    setEditQty(String(trx.quantity))
    setEditNotes(trx.notes || '')
    setEditProductId(String(trx.product_id))
    setEditLocationId(String(trx.location_id))
  }

  // Batal edit
  const cancelEdit = () => {
    setEditingId(null)
    setEditQty('')
    setEditNotes('')
    setEditProductId('')
    setEditLocationId('')
  }

  // Recreate edited rows so existing database inventory triggers still run.
  const saveEdit = async () => {
    if (!editingId) return
    const original = transactions.find((transaction) => transaction.id === editingId)
    if (!original) {
      setErrorMessage('Transaksi yang akan diedit tidak ditemukan. Muat ulang data.')
      return
    }

    const parsedQuantity = Number(editQty)
    if (!editProductId || !editLocationId || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setErrorMessage('Pilih produk, lokasi, dan jumlah minimal 1 unit.')
      return
    }
    if (!confirm('Simpan perubahan? Stok akan otomatis disesuaikan.')) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setErrorMessage('Sesi login habis. Silakan login ulang.')
      return
    }

    // 1. Hapus transaksi lama (trigger akan reverse stok)
    const { error: delErr } = await supabase
      .from('transactions')
      .delete()
      .eq('id', editingId)

    if (delErr) {
      console.error('Gagal membatalkan transaksi lama:', delErr.message)
      setErrorMessage('Perubahan gagal disimpan. Transaksi lama tetap dipertahankan.')
      return
    }

    // 2. Insert transaksi baru dengan data yang diedit
    const { error: insErr } = await supabase.from('transactions').insert([{
      product_id: parseInt(editProductId),
      location_id: parseInt(editLocationId),
      user_id: user.id,
      type: editType,
      quantity: parsedQuantity,
      notes: editNotes,
      transaction_date: new Date().toISOString()
    }])

    if (insErr) {
      console.error('Gagal menyimpan transaksi hasil edit:', insErr.message)
      const { error: restoreError } = await supabase.from('transactions').insert([{
        product_id: original.product_id,
        location_id: original.location_id,
        user_id: original.user_id,
        type: original.type,
        quantity: original.quantity,
        notes: original.notes,
        transaction_date: original.transaction_date,
      }])
      if (restoreError) {
        console.error('Gagal memulihkan transaksi awal:', restoreError.message)
        setErrorMessage('Transaksi gagal diedit dan pemulihan otomatis gagal. Segera periksa stok dan catat ulang transaksi.')
      } else {
        setErrorMessage('Perubahan gagal disimpan. Transaksi awal sudah dipulihkan.')
        await fetchData()
      }
    } else {
      cancelEdit()
      setErrorMessage('')
      await fetchData()
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filterType === 'ALL' || transaction.type === filterType
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query ||
      transaction.products?.sku?.toLowerCase().includes(query) ||
      transaction.locations?.code?.toLowerCase().includes(query) ||
      transaction.notes?.toLowerCase().includes(query) ||
      transaction.profiles?.full_name?.toLowerCase().includes(query) ||
      transaction.profiles?.email?.toLowerCase().includes(query)
    const transactionDate = new Date(transaction.transaction_date).toLocaleDateString('en-CA')
    const matchesFrom = !dateFrom || transactionDate >= dateFrom
    const matchesTo = !dateTo || transactionDate <= dateTo
    return matchesType && matchesSearch && matchesFrom && matchesTo
  })

  const exportTransactions = () => {
    if (filteredTransactions.length === 0) return
    const escapeCsv = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`
    const rows = filteredTransactions.map((transaction) => [
      transaction.transaction_date,
      transaction.type,
      transaction.products?.sku ?? '',
      transaction.locations?.code ?? '',
      transaction.quantity,
      transaction.profiles?.full_name ?? transaction.profiles?.email ?? 'System',
      transaction.notes ?? '',
    ])
    const csv = [
      ['Tanggal', 'Tipe', 'SKU', 'Lokasi', 'Jumlah', 'Petugas', 'Catatan'],
      ...rows,
    ].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `Transaksi_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <ArrowRightLeft className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transaksi Barang</h1>
          <p className="text-slate-500">Input barang masuk (IN) dan barang keluar (OUT).</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchData()} className="inline-flex shrink-0 items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Muat ulang
          </button>
        </div>
      )}

      {/* Form Input Transaksi */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Input Transaksi Baru</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'IN' | 'OUT')}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
            >
              <option value="IN">IN (Masuk)</option>
              <option value="OUT">OUT (Keluar)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Produk (SKU)</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option value="">Pilih Produk...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.sku}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Rak</label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option value="">Pilih Rak...</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.code}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              min="1"
              step="1"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 text-white ${
                type === 'IN'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25'
              }`}
            >
              <Plus size={18} />
              {loading ? 'Menyimpan...' : `Simpan ${type}`}
            </button>
          </div>

          <div className="md:col-span-12">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan (Opsional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Kiriman dari supplier A"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </form>
      </div>

      {/* Tabel Riwayat Transaksi */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-4 sm:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_170px_160px_160px_auto]">
          <label className="relative">
            <span className="sr-only">Cari transaksi</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari SKU, rak, catatan, petugas..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none focus:border-emerald-500"
            />
          </label>
          <select
            value={filterType}
            onChange={(event) => {
              const value = event.target.value
              if (value === 'ALL' || value === 'IN' || value === 'OUT') setFilterType(value)
            }}
            aria-label="Filter tipe transaksi"
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="ALL">Semua transaksi</option>
            <option value="IN">Barang masuk</option>
            <option value="OUT">Barang keluar</option>
          </select>
          <label className="text-xs text-slate-500">
            <span className="mb-1 block">Dari tanggal</span>
            <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm text-slate-700" />
          </label>
          <label className="text-xs text-slate-500">
            <span className="mb-1 block">Sampai tanggal</span>
            <input type="date" value={dateTo} min={dateFrom || undefined} onChange={(event) => setDateTo(event.target.value)} className="w-full rounded-lg border border-slate-200 px-2 py-2 text-sm text-slate-700" />
          </label>
          <button
            type="button"
            onClick={exportTransactions}
            disabled={filteredTransactions.length === 0}
            className="inline-flex items-center justify-center gap-2 self-end rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download size={16} /> Export CSV
          </button>
          <p className="text-xs text-slate-500 sm:col-span-2 xl:col-span-5">
            Menampilkan <span className="font-semibold text-slate-700">{filteredTransactions.length}</span> dari {transactions.length} transaksi terakhir
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {TABLE_HEADERS.map((header, idx) => (
                  <th key={idx} className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={8} className="px-8 py-10 text-center text-slate-400">Memuat data...</td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-8 py-10 text-center text-slate-400">
                    {transactions.length === 0 ? 'Belum ada transaksi.' : 'Tidak ada transaksi yang cocok dengan filter.'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((trx) => (
                  <tr
                    key={trx.id}
                    className={`border-b border-slate-50 hover:bg-slate-50 transition ${editingId === trx.id ? 'bg-emerald-50/50' : ''}`}
                  >
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(trx.transaction_date).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>

                    <td className="px-6 py-4">
                      {editingId === trx.id ? (
                        <select
                          value={editType}
                          onChange={(e) => setEditType(e.target.value as 'IN' | 'OUT')}
                          className="px-2 py-1 border border-emerald-300 rounded-lg text-sm"
                        >
                          <option value="IN">IN</option>
                          <option value="OUT">OUT</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          trx.type === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {trx.type}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">
                      {editingId === trx.id ? (
                        <select
                          value={editProductId}
                          onChange={(e) => setEditProductId(e.target.value)}
                          className="px-2 py-1 border border-emerald-300 rounded-lg text-sm max-w-[180px]"
                        >
                          {products.map(p => <option key={p.id} value={p.id}>{p.sku}</option>)}
                        </select>
                      ) : (
                        trx.products?.sku
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                      {editingId === trx.id ? (
                        <select
                          value={editLocationId}
                          onChange={(e) => setEditLocationId(e.target.value)}
                          className="px-2 py-1 border border-emerald-300 rounded-lg text-sm"
                        >
                          {locations.map(l => <option key={l.id} value={l.id}>{l.code}</option>)}
                        </select>
                      ) : (
                        trx.locations?.code
                      )}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-800">
                      {editingId === trx.id ? (
                        <input
                          type="number"
                          value={editQty}
                          onChange={(e) => setEditQty(e.target.value)}
                          className="w-20 px-2 py-1 border border-emerald-300 rounded-lg text-sm"
                        />
                      ) : (
                        trx.quantity
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span className="font-medium text-slate-700">
                        {trx.profiles?.full_name || trx.profiles?.email || 'System'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">
                      {editingId === trx.id ? (
                        <input
                          type="text"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="w-full px-2 py-1 border border-emerald-300 rounded-lg text-sm"
                          placeholder="Catatan..."
                        />
                      ) : (
                        trx.notes || '-'
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {editingId === trx.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={saveEdit}
                            className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition"
                            title="Simpan"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"
                            title="Batal"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(trx)}
                          className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}