'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCompanyContext } from '@/lib/company-context'
import { Tags, Plus, Pencil, Trash2, X, Check, Search, Package, RefreshCw } from 'lucide-react'

type Category = { id: number, name: string, description: string, productCount: number }
type CategoryRecord = Omit<Category, 'productCount'>
type ProductCategory = { category_id: number }

export default function CategoriesPage() {
  const { activeCompanyId, activeCompanyRole } = useCompanyContext()
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchCategories = async () => {
    setFetching(true)
    const [categoryResult, productResult] = await Promise.all([
      supabase.from('categories').select('id, name, description').eq('company_id', activeCompanyId).order('name', { ascending: true }),
      supabase.from('products').select('category_id').eq('company_id', activeCompanyId),
    ])
    if (categoryResult.error || productResult.error) {
      const error = categoryResult.error ?? productResult.error
      console.error('Gagal memuat kategori:', error?.message)
      setErrorMessage('Data kategori belum dapat dimuat. Periksa koneksi lalu coba lagi.')
    } else {
      const counts = new Map<number, number>()
      ;((productResult.data ?? []) as ProductCategory[]).forEach(({ category_id }) => {
        counts.set(category_id, (counts.get(category_id) ?? 0) + 1)
      })
      setCategories(((categoryResult.data ?? []) as CategoryRecord[]).map((category) => ({
        ...category,
        productCount: counts.get(category.id) ?? 0,
      })))
      setErrorMessage('')
    }
    setFetching(false)
  }

  useEffect(() => {
    const request = window.setTimeout(() => void fetchCategories(), 0)
    return () => window.clearTimeout(request)
  }, [activeCompanyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      const { error } = await supabase.from('categories').insert([{
        company_id: activeCompanyId,
        name: name.trim().toUpperCase(),
        description: description.trim(),
      }])
      if (error) {
        console.error('Gagal menambahkan kategori:', error.message)
        setErrorMessage('Kategori gagal disimpan. Pastikan nama belum digunakan.')
      } else {
        setName('')
        setDescription('')
        await fetchCategories()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const category = categories.find((item) => item.id === id)
    if (!category || category.productCount > 0) return
    if (!confirm(`Hapus kategori "${category.name}"?`)) return
    const { error } = await supabase.from('categories').delete().eq('id', id).eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal menghapus kategori:', error.message)
      setErrorMessage('Kategori tidak dapat dihapus. Periksa apakah masih digunakan.')
    } else await fetchCategories()
  }

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setEditDescription(cat.description || '')
  }

  const cancelEdit = () => { setEditingId(null); setEditName(''); setEditDescription('') }

  const saveEdit = async () => {
    if (!editingId || !editName.trim() || saving) return
    setSaving(true)
    const { error } = await supabase
      .from('categories')
      .update({ name: editName.trim().toUpperCase(), description: editDescription.trim() })
      .eq('id', editingId)
      .eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal memperbarui kategori:', error.message)
      setErrorMessage('Kategori gagal diperbarui. Pastikan nama belum digunakan.')
    } else { cancelEdit(); await fetchCategories() }
    setSaving(false)
  }

  const filteredCategories = categories.filter((category) =>
    `${category.name} ${category.description ?? ''}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <Tags className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Kategori Barang</h1>
          <p className="text-slate-500">Kelola tipe atau kategori barang.</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchCategories()} className="inline-flex items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Coba lagi
          </button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Kategori terdaftar</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{fetching ? '—' : categories.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Produk berkategori</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {fetching ? '—' : categories.reduce((total, category) => total + category.productCount, 0)}
          </p>
        </div>
      </div>

      {activeCompanyRole === 'admin' && <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Tambah Kategori Baru</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Kategori</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: SLNDX"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi (Opsional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Celana Pendek"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
            >
              <Plus size={18} />
              {loading ? 'Menyimpan...' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>}

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari nama atau deskripsi kategori..."
          aria-label="Cari kategori"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Kategori</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Produk</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : filteredCategories.length === 0 ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                {searchQuery ? 'Tidak ada kategori yang cocok.' : 'Belum ada kategori.'}
              </td></tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  {editingId === cat.id ? (
                    <>
                      <td className="px-8 py-4">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </td>
                      <td className="px-8 py-4">
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </td>
                      <td className="px-8 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          <Package size={13} /> {cat.productCount}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={saveEdit} disabled={saving || !editName.trim()} aria-label="Simpan kategori" className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition disabled:opacity-50">
                            <Check size={16} />
                          </button>
                          <button onClick={cancelEdit} aria-label="Batalkan edit" className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition">
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-8 py-5 font-semibold text-slate-800">{cat.name}</td>
                      <td className="px-8 py-5 text-slate-600">{cat.description || '-'}</td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          <Package size={13} /> {cat.productCount} produk
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {activeCompanyRole === 'admin' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => startEdit(cat)} aria-label={`Edit ${cat.name}`} className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => void handleDelete(cat.id)} disabled={cat.productCount > 0} title={cat.productCount > 0 ? 'Kategori masih digunakan produk' : 'Hapus kategori'} aria-label={`Hapus ${cat.name}`} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-40">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}