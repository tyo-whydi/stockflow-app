'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCompanyContext } from '@/lib/company-context'
import { Package, Plus, Pencil, Trash2, X, Check, Search, AlertTriangle, TrendingUp, RefreshCw, Filter } from 'lucide-react'

type Category = { id: number, name: string }
type Product = {
  id: number
  sku: string
  size: string
  color: string
  min_stock: number
  category_id: number
  categories: { name: string } | null
  total_stock: number
  locations_count: number
  transaction_count: number
}

type ProductRecord = Omit<Product, 'total_stock' | 'locations_count' | 'transaction_count'> & {
  categories: { name: string } | { name: string }[] | null
}
type StockRecord = { product_id: number; current_stock: number }
type TransactionRecord = { product_id: number }
type StockFilter = 'ALL' | 'SAFE' | 'LOW' | 'EMPTY'

export default function ProductsPage() {
  const { activeCompanyId, activeCompanyRole } = useCompanyContext()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [minStock, setMinStock] = useState('10')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editMinStock, setEditMinStock] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [filterStock, setFilterStock] = useState<StockFilter>('ALL')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchData = async () => {
    setFetching(true)

    try {
      const [categoryResult, productResult, stockResult, transactionResult] = await Promise.all([
        supabase.from('categories').select('id, name').eq('company_id', activeCompanyId).order('name'),
        supabase
          .from('products')
          .select('id, sku, size, color, min_stock, category_id, categories ( name )')
          .eq('company_id', activeCompanyId)
          .order('sku', { ascending: true }),
        supabase.from('stocks').select('product_id, location_id, current_stock').eq('company_id', activeCompanyId),
        supabase.from('transactions').select('product_id').eq('company_id', activeCompanyId),
      ])
      const failedResult = [categoryResult, productResult, stockResult, transactionResult]
        .find((result) => result.error)
      if (failedResult?.error) {
        console.error('Gagal memuat master produk:', failedResult.error.message)
        setErrorMessage('Data produk belum dapat dimuat. Periksa koneksi lalu coba lagi.')
        return
      }

      const stockTotals = new Map<number, { total: number; locations: number }>()
      ;((stockResult.data ?? []) as StockRecord[]).forEach(({ product_id, current_stock }) => {
        const stats = stockTotals.get(product_id) ?? { total: 0, locations: 0 }
        stats.total += current_stock
        if (current_stock > 0) stats.locations += 1
        stockTotals.set(product_id, stats)
      })
      const transactionCounts = new Map<number, number>()
      ;((transactionResult.data ?? []) as TransactionRecord[]).forEach(({ product_id }) => {
        transactionCounts.set(product_id, (transactionCounts.get(product_id) ?? 0) + 1)
      })

      const merged: Product[] = ((productResult.data ?? []) as ProductRecord[]).map((product) => {
        const category = Array.isArray(product.categories) ? product.categories[0] ?? null : product.categories
        const stats = stockTotals.get(product.id)
        return {
          ...product,
          categories: category,
          total_stock: stats?.total ?? 0,
          locations_count: stats?.locations ?? 0,
          transaction_count: transactionCounts.get(product.id) ?? 0,
        }
      })
      setCategories(categoryResult.data ?? [])
      setProducts(merged)
      setErrorMessage('')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    const request = window.setTimeout(() => void fetchData(), 0)
    return () => window.clearTimeout(request)
  }, [activeCompanyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const parsedMinStock = Number(minStock)
    const selectedCategory = categories.find(c => c.id === Number(categoryId))
    if (!selectedCategory) {
      setErrorMessage('Pilih kategori sebelum menyimpan produk.')
      setLoading(false)
      return
    }
    if (!size.trim() || !color.trim() || !Number.isInteger(parsedMinStock) || parsedMinStock < 0) {
      setErrorMessage('Lengkapi ukuran, warna, dan batas minimum stok yang valid.')
      setLoading(false)
      return
    }

    const generatedSku = `${selectedCategory.name}-${size.trim()}-${color.trim()}`.toUpperCase()

    try {
      const { error } = await supabase.from('products').insert([{
        company_id: activeCompanyId,
        sku: generatedSku,
        category_id: Number(categoryId),
        size: size.trim().toUpperCase(),
        color: color.trim().toUpperCase(),
        min_stock: parsedMinStock,
      }])
      if (error) {
        console.error('Gagal menambahkan produk:', error.message)
        setErrorMessage('Produk gagal disimpan. SKU mungkin sudah terdaftar.')
      } else {
        setSize('')
        setColor('')
        setErrorMessage('')
        await fetchData()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, sku: string) => {
    const product = products.find((item) => item.id === id)
    if (!product || product.total_stock > 0 || product.transaction_count > 0) return
    if (!confirm(`Hapus produk "${sku}"?`)) return
    const { error } = await supabase.from('products').delete().eq('id', id).eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal menghapus produk:', error.message)
      setErrorMessage('Produk tidak dapat dihapus. Periksa apakah masih memiliki riwayat.')
    } else await fetchData()
  }

  const startEdit = (prod: Product) => {
    setEditingId(prod.id)
    setEditMinStock(String(prod.min_stock))
  }
  const cancelEdit = () => { setEditingId(null); setEditMinStock('') }
  const saveEdit = async () => {
    const parsedMinStock = Number(editMinStock)
    if (!editingId || !Number.isInteger(parsedMinStock) || parsedMinStock < 0) {
      setErrorMessage('Batas minimum stok harus berupa angka nol atau lebih.')
      return
    }
    const { error } = await supabase
      .from('products')
      .update({ min_stock: parsedMinStock })
      .eq('id', editingId)
      .eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal memperbarui produk:', error.message)
      setErrorMessage('Batas stok gagal diperbarui.')
    } else { cancelEdit(); await fetchData() }
  }

  const filteredProducts = products.filter(p =>
    searchQuery === '' ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categories?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.color.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((product) => {
    const categoryMatches = filterCategory === 'ALL' || product.category_id === Number(filterCategory)
    const stockMatches =
      filterStock === 'ALL' ||
      (filterStock === 'EMPTY' && product.total_stock === 0) ||
      (filterStock === 'LOW' && product.total_stock > 0 && product.total_stock <= product.min_stock) ||
      (filterStock === 'SAFE' && product.total_stock > product.min_stock)
    return categoryMatches && stockMatches
  })

  // Hitung statistik
  const stats = {
    totalSku: products.length,
    totalUnit: products.reduce((sum, p) => sum + p.total_stock, 0),
    lowStock: products.filter(p => p.total_stock <= p.min_stock).length,
    kosong: products.filter(p => p.total_stock === 0).length
  }

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <Package className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Master Produk</h1>
          <p className="text-slate-500">Kelola varian barang beserta total stok real-time.</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchData()} className="inline-flex items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Coba lagi
          </button>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Package size={14} className="text-slate-400" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Varian</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.totalSku}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-emerald-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Unit Stok</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.totalUnit.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-orange-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Stok Menipis</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-red-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Stok Kosong</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.kosong}</p>
        </div>
      </div>

      {/* Form Tambah */}
      {activeCompanyRole === 'admin' && <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Tambah Varian Baru</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition" required>
              <option value="">Pilih...</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Ukuran</label>
            <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="S, M, L"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition uppercase" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Warna</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="WH, BK"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition uppercase" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Min. Stok</label>
            <input type="number" value={minStock} onChange={(e) => setMinStock(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50">
              <Plus size={18} />
              {loading ? 'Menyimpan...' : 'Tambah Produk'}
            </button>
          </div>
        </form>
      </div>}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari SKU, kategori, ukuran, atau warna..."
            aria-label="Cari produk"
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="relative">
            <span className="sr-only">Filter kategori</span>
            <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={filterCategory}
              onChange={(event) => setFilterCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="ALL">Semua kategori</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter status stok</span>
            <select
              value={filterStock}
              onChange={(event) => {
                const value = event.target.value
                if (value === 'ALL' || value === 'SAFE' || value === 'LOW' || value === 'EMPTY') setFilterStock(value)
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="ALL">Semua status stok</option>
              <option value="SAFE">Stok aman</option>
              <option value="LOW">Stok menipis</option>
              <option value="EMPTY">Stok kosong</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Menampilkan <span className="font-semibold text-slate-700">{filteredProducts.length}</span> dari {products.length} produk
        </p>
      </div>

      {/* Tabel Produk */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ukuran</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Warna</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Min. Stok</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Stok</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rak</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr><td colSpan={9} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={9} className="px-8 py-10 text-center text-slate-400">
                  {searchQuery || filterCategory !== 'ALL' || filterStock !== 'ALL' ? 'Tidak ada produk yang cocok.' : 'Belum ada produk.'}
                </td></tr>
              ) : (
                filteredProducts.map((prod) => {
                  const isLow = prod.total_stock <= prod.min_stock && prod.total_stock > 0
                  const isZero = prod.total_stock === 0
                  return (
                    <tr key={prod.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-bold text-emerald-700 whitespace-nowrap">{prod.sku}</td>
                      <td className="px-6 py-4 text-slate-800 whitespace-nowrap">{prod.categories?.name}</td>
                      <td className="px-6 py-4 text-slate-600">{prod.size}</td>
                      <td className="px-6 py-4 text-slate-600">{prod.color}</td>
                      <td className="px-6 py-4">
                        {editingId === prod.id ? (
                          <input type="number" min="0" value={editMinStock} onChange={(e) => setEditMinStock(e.target.value)}
                            className="w-20 px-2 py-1 border border-emerald-300 rounded-lg text-sm" />
                        ) : (
                          <span className="text-slate-600">{prod.min_stock}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold text-lg ${isZero ? 'text-red-600' : isLow ? 'text-orange-600' : 'text-emerald-600'}`}>
                          {prod.total_stock.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {prod.locations_count > 0 ? `${prod.locations_count} rak` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {isZero ? (
                          <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">⚠ Kosong</span>
                        ) : isLow ? (
                          <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">⚠ Menipis</span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">✓ Aman</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {activeCompanyRole !== 'admin' ? <span className="text-slate-300">—</span> : editingId === prod.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={saveEdit} aria-label="Simpan batas stok" className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition"><Check size={16} /></button>
                            <button onClick={cancelEdit} aria-label="Batalkan edit" className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"><X size={16} /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => startEdit(prod)} aria-label={`Edit ${prod.sku}`} className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition"><Pencil size={16} /></button>
                            <button onClick={() => void handleDelete(prod.id, prod.sku)} disabled={prod.total_stock > 0 || prod.transaction_count > 0} title={prod.total_stock > 0 || prod.transaction_count > 0 ? 'Produk masih memiliki stok atau riwayat transaksi' : 'Hapus produk'} aria-label={`Hapus ${prod.sku}`} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={16} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}