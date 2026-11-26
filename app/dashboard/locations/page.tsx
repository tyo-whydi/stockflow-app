'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCompanyContext } from '@/lib/company-context'
import { MapPin, Plus, Pencil, Trash2, X, Check, Search, Boxes, Package, RefreshCw } from 'lucide-react'

type Location = { id: number, code: string, description: string, skuCount: number, totalUnits: number, transactionCount: number }
type LocationRecord = Omit<Location, 'skuCount' | 'totalUnits' | 'transactionCount'>
type StockRecord = { location_id: number; current_stock: number }
type TransactionRecord = { location_id: number }

export default function LocationsPage() {
  const { activeCompanyId, activeCompanyRole } = useCompanyContext()
  const [locations, setLocations] = useState<Location[]>([])
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editCode, setEditCode] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchLocations = async () => {
    setFetching(true)
    const [locationResult, stockResult, transactionResult] = await Promise.all([
      supabase.from('locations').select('id, code, description').eq('company_id', activeCompanyId).order('code', { ascending: true }),
      supabase.from('stocks').select('location_id, current_stock').eq('company_id', activeCompanyId),
      supabase.from('transactions').select('location_id').eq('company_id', activeCompanyId),
    ])
    const failedResult = [locationResult, stockResult, transactionResult].find((result) => result.error)
    if (failedResult?.error) {
      console.error('Gagal memuat lokasi:', failedResult.error.message)
      setErrorMessage('Data lokasi belum dapat dimuat. Periksa koneksi lalu coba lagi.')
    } else {
      const stockCounts = new Map<number, { skuCount: number; totalUnits: number }>()
      ;((stockResult.data ?? []) as StockRecord[]).forEach(({ location_id, current_stock }) => {
        const stats = stockCounts.get(location_id) ?? { skuCount: 0, totalUnits: 0 }
        stats.skuCount += 1
        stats.totalUnits += current_stock
        stockCounts.set(location_id, stats)
      })
      const transactionCounts = new Map<number, number>()
      ;((transactionResult.data ?? []) as TransactionRecord[]).forEach(({ location_id }) => {
        transactionCounts.set(location_id, (transactionCounts.get(location_id) ?? 0) + 1)
      })
      setLocations(((locationResult.data ?? []) as LocationRecord[]).map((location) => ({
        ...location,
        skuCount: stockCounts.get(location.id)?.skuCount ?? 0,
        totalUnits: stockCounts.get(location.id)?.totalUnits ?? 0,
        transactionCount: transactionCounts.get(location.id) ?? 0,
      })))
      setErrorMessage('')
    }
    setFetching(false)
  }

  useEffect(() => {
    const request = window.setTimeout(() => void fetchLocations(), 0)
    return () => window.clearTimeout(request)
  }, [activeCompanyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    try {
      const { error } = await supabase.from('locations').insert([{
        company_id: activeCompanyId,
        code: code.trim().toUpperCase(),
        description: description.trim(),
      }])
      if (error) {
        console.error('Gagal menambahkan lokasi:', error.message)
        setErrorMessage('Rak gagal disimpan. Pastikan kode rak belum digunakan.')
      } else {
        setCode('')
        setDescription('')
        await fetchLocations()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const location = locations.find((item) => item.id === id)
    if (!location || location.skuCount > 0 || location.transactionCount > 0) return
    if (!confirm(`Hapus rak "${location.code}"?`)) return
    const { error } = await supabase.from('locations').delete().eq('id', id).eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal menghapus lokasi:', error.message)
      setErrorMessage('Rak tidak dapat dihapus. Periksa apakah rak masih digunakan.')
    } else await fetchLocations()
  }

  const startEdit = (loc: Location) => {
    setEditingId(loc.id)
    setEditCode(loc.code)
    setEditDescription(loc.description || '')
  }
  const cancelEdit = () => { setEditingId(null); setEditCode(''); setEditDescription('') }
  const saveEdit = async () => {
    if (!editingId || !editCode.trim() || saving) return
    setSaving(true)
    const { error } = await supabase
      .from('locations')
      .update({ code: editCode.trim().toUpperCase(), description: editDescription.trim() })
      .eq('id', editingId)
      .eq('company_id', activeCompanyId)
    if (error) {
      console.error('Gagal memperbarui lokasi:', error.message)
      setErrorMessage('Rak gagal diperbarui. Pastikan kode rak belum digunakan.')
    } else { cancelEdit(); await fetchLocations() }
    setSaving(false)
  }

  const filteredLocations = locations.filter((location) =>
    `${location.code} ${location.description ?? ''}`.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <MapPin className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lokasi Rak</h1>
          <p className="text-slate-500">Kelola data rak penyimpanan barang.</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchLocations()} className="inline-flex items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Coba lagi
          </button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Lokasi terdaftar</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{fetching ? '—' : locations.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">SKU yang tersimpan</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {fetching ? '—' : locations.reduce((total, location) => total + location.skuCount, 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total unit di rak</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {fetching ? '—' : locations.reduce((total, location) => total + location.totalUnits, 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {activeCompanyRole === 'admin' && <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Tambah Rak Baru</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Kode Rak</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Contoh: A1"
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
              placeholder="Contoh: Rak Barang Atas"
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
          placeholder="Cari kode atau deskripsi rak..."
          aria-label="Cari lokasi rak"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kode Rak</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Isi Rak</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : filteredLocations.length === 0 ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                {searchQuery ? 'Tidak ada rak yang cocok.' : 'Belum ada rak.'}
              </td></tr>
            ) : (
              filteredLocations.map((loc) => (
                <tr key={loc.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  {editingId === loc.id ? (
                    <>
                      <td className="px-8 py-4">
                        <input type="text" value={editCode} onChange={(e) => setEditCode(e.target.value)} className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </td>
                      <td className="px-8 py-4">
                        <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-xs font-medium text-slate-600">
                          {loc.skuCount} SKU · {loc.totalUnits.toLocaleString('id-ID')} unit
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={saveEdit} disabled={saving || !editCode.trim()} aria-label="Simpan lokasi" className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition disabled:opacity-50"><Check size={16} /></button>
                          <button onClick={cancelEdit} aria-label="Batalkan edit" className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"><X size={16} /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-8 py-5 font-semibold text-slate-800">{loc.code}</td>
                      <td className="px-8 py-5 text-slate-600">{loc.description || '-'}</td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            <Package size={13} className="text-blue-600" /> {loc.skuCount} SKU
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <Boxes size={13} className="text-emerald-600" /> {loc.totalUnits.toLocaleString('id-ID')} unit
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {activeCompanyRole === 'admin' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => startEdit(loc)} aria-label={`Edit ${loc.code}`} className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition"><Pencil size={16} /></button>
                            <button onClick={() => void handleDelete(loc.id)} disabled={loc.skuCount > 0 || loc.transactionCount > 0} title={loc.skuCount > 0 || loc.transactionCount > 0 ? 'Rak masih memiliki stok atau riwayat transaksi' : 'Hapus rak'} aria-label={`Hapus ${loc.code}`} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={16} /></button>
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