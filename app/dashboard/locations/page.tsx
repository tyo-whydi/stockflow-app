'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { MapPin, Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type Location = { id: number, code: string, description: string }

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editCode, setEditCode] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const fetchLocations = async () => {
    setFetching(true)
    const { data } = await supabase.from('locations').select('*').order('code', { ascending: true })
    if (data) setLocations(data)
    setFetching(false)
  }

  useEffect(() => { fetchLocations() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('locations').insert([{ code: code.toUpperCase(), description }])
    if (error) alert('Gagal: ' + error.message)
    else { setCode(''); setDescription(''); fetchLocations() }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin hapus rak ini? Semua data stok di rak ini akan hilang.')) return
    const { error } = await supabase.from('locations').delete().eq('id', id)
    if (error) alert('Gagal hapus: ' + error.message)
    else fetchLocations()
  }

  const startEdit = (loc: Location) => {
    setEditingId(loc.id)
    setEditCode(loc.code)
    setEditDescription(loc.description || '')
  }
  const cancelEdit = () => { setEditingId(null); setEditCode(''); setEditDescription('') }
  const saveEdit = async () => {
    if (!editingId) return
    const { error } = await supabase
      .from('locations')
      .update({ code: editCode.toUpperCase(), description: editDescription })
      .eq('id', editingId)
    if (error) alert('Gagal update: ' + error.message)
    else { cancelEdit(); fetchLocations() }
  }

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

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
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
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kode Rak</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={3} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : locations.length === 0 ? (
              <tr><td colSpan={3} className="px-8 py-10 text-center text-slate-400">Belum ada rak.</td></tr>
            ) : (
              locations.map((loc) => (
                <tr key={loc.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  {editingId === loc.id ? (
                    <>
                      <td className="px-8 py-4">
                        <input type="text" value={editCode} onChange={(e) => setEditCode(e.target.value)} className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </td>
                      <td className="px-8 py-4">
                        <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={saveEdit} className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition"><Check size={16} /></button>
                          <button onClick={cancelEdit} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition"><X size={16} /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-8 py-5 font-semibold text-slate-800">{loc.code}</td>
                      <td className="px-8 py-5 text-slate-600">{loc.description || '-'}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(loc)} className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition"><Pencil size={16} /></button>
                          <button onClick={() => handleDelete(loc.id)} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition"><Trash2 size={16} /></button>
                        </div>
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