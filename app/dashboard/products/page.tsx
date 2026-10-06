'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Package, Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react'

type Category = { id: number, name: string }
type Product = {
  id: number
  sku: string
  size: string
  color: string
  min_stock: number
  category_id: number
  categories: { name: string }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [minStock, setMinStock] = useState('10')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editMinStock, setEditMinStock] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const fetchData = async () => {
    setFetching(true)
    const { data: catData } = await supabase.from('categories').select('id, name').order('name')
    if (catData) setCategories(catData)

    const { data: prodData } = await supabase
      .from('products')
      .select('id, sku, size, color, min_stock, category_id, categories ( name )')
      .order('sku', { ascending: true })

    if (prodData) setProducts(prodData as any)
    setFetching(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const selectedCategory = categories.find(c => c.id === parseInt(categoryId))
    if (!selectedCategory) { alert('Pilih kategori dulu!'); setLoading(false); return }

    const generatedSku = `${selectedCategory.name}-${size}-${color}`.toUpperCase()

    const { error } = await supabase.from('products').insert([{
      sku: generatedSku,
      category_id: parseInt(categoryId),
      size: size.toUpperCase(),
      color: color.toUpperCase(),
      min_stock: parseInt(minStock)
    }])

    if (error) alert('Gagal: ' + error.message)
    else { setSize(''); setColor(''); fetchData() }
    setLoading(false)
  }

  const handleDelete = async (id: number, sku: string) => {
    if (!confirm(`Yakin hapus produk "${sku}"? Semua data stok & transaksi terkait akan hilang.`)) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) alert('Gagal hapus: ' + error.message)
    else fetchData()
  }

  const startEdit = (prod: Product) => {
    setEditingId(prod.id)
    setEditMinStock(String(prod.min_stock))
  }
  const cancelEdit = () => { setEditingId(null); setEditMinStock('') }
  const saveEdit = async () => {
    if (!editingId) return
    const { error } = await supabase
      .from('products')
      .update({ min_stock: parseInt(editMinStock) })
      .eq('id', editingId)
    if (error) alert('Gagal update: ' + error.message)
    else { cancelEdit(); fetchData() }
  }

  const filteredProducts = products.filter(p =>
    searchQuery === '' ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categories?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <Package className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Master Produk</h1>
          <p className="text-slate-500">Kelola varian barang beserta kode SKU otomatis.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
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
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari SKU atau kategori..."
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ukuran</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Warna</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Min. Stok</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={6} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan={6} className="px-8 py-10 text-center text-slate-400">
                {searchQuery ? 'Tidak ada produk yang cocok.' : 'Belum ada produk.'}
              </td></tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="px-8 py-5 font-bold text-emerald-700">{prod.sku}</td>
                  <td className="px-8 py-5 text-slate-800">{prod.categories?.name}</td>
                  <td className="px-8 py-5 text-slate-600">{prod.size}</td>
                  <td className="px-8 py-5 text-slate-600">{prod.color}</td>
                  <td className="px-8 py-5">
                    {editingId === prod.id ? (
                      <input type="number" value={editMinStock} onChange={(e) => setEditMinStock(e.target.value)}
                        className="w-24 px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    ) : (
                      <span className="text-slate-600">{prod.min_stock}</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    {editingId === prod.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={saveEdit} className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition"><Check size={16} /></button>
                        <button onClick={cancelEdit} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"><X size={16} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => startEdit(prod)} className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition"><Pencil size={16} /></button>
                        <button onClick={() => handleDelete(prod.id, prod.sku)} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}