'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRightLeft, Plus, Pencil, X, Check } from 'lucide-react'

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
  products: { sku: string }
  locations: { code: string }
  profiles: { full_name: string, email: string } | null
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
      .select('id, type, quantity, transaction_date, notes, product_id, location_id, products ( sku ), locations ( code )')
      .order('transaction_date', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching transactions:', error.message)
      setFetching(false)
      return
    }

    // Ambil user_id via query terpisah
    const trxIds = (trxData || []).map((t: any) => t.id)
    const { data: userIds } = trxIds.length > 0
      ? await supabase.from('transactions').select('id, user_id').in('id', trxIds)
      : { data: [] as any[] }

    // Ambil profiles
    const { data: profilesData } = await supabase.from('profiles').select('id, full_name, email')

    // Gabungkan data
    const merged = (trxData || []).map((trx: any) => {
      const userRec = userIds?.find((u: any) => u.id === trx.id)
      const profile = profilesData?.find((p: any) => p.id === userRec?.user_id)
      return {
        ...trx,
        profiles: profile ? { full_name: profile.full_name, email: profile.email } : null
      }
    })

    setTransactions(merged as any)
    setFetching(false)
  }

  useEffect(() => { fetchData() }, [])

  // Simpan transaksi baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Sesi login habis. Silakan login ulang.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('transactions').insert([{
      product_id: parseInt(productId),
      location_id: parseInt(locationId),
      user_id: user.id,
      type: type,
      quantity: parseInt(quantity),
      notes: notes
    }])

    if (error) {
      alert('Gagal menyimpan transaksi: ' + error.message)
    } else {
      setQuantity('')
      setNotes('')
      fetchData()
    }
    setLoading(false)
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

  // Simpan edit (delete lama + insert baru agar stok auto-adjust)
  const saveEdit = async () => {
    if (!editingId) return

    if (!confirm('Simpan perubahan? Stok akan otomatis disesuaikan.')) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Sesi login habis.')
      return
    }

    // 1. Hapus transaksi lama (trigger akan reverse stok)
    const { error: delErr } = await supabase
      .from('transactions')
      .delete()
      .eq('id', editingId)

    if (delErr) {
      alert('Gagal update transaksi: ' + delErr.message)
      return
    }

    // 2. Insert transaksi baru dengan data yang diedit
    const { error: insErr } = await supabase.from('transactions').insert([{
      product_id: parseInt(editProductId),
      location_id: parseInt(editLocationId),
      user_id: user.id,
      type: editType,
      quantity: parseInt(editQty),
      notes: editNotes,
      transaction_date: new Date().toISOString()
    }])

    if (insErr) {
      alert('Gagal simpan perubahan: ' + insErr.message)
    } else {
      cancelEdit()
      fetchData()
    }
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
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-8 py-10 text-center text-slate-400">Belum ada transaksi.</td>
                </tr>
              ) : (
                transactions.map((trx) => (
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