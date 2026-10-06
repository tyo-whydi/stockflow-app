'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowRightLeft, Plus, Search, Filter, X } from 'lucide-react'

type Product = { id: number, sku: string }
type Location = { id: number, code: string }
type Transaction = {
  id: number
  type: 'IN' | 'OUT'
  quantity: number
  transaction_date: string
  notes: string
  products: { sku: string }
  locations: { code: string }
  profiles: { full_name: string, email: string } | null
}

const TABLE_HEADERS = ['Tanggal', 'Tipe', 'SKU', 'Rak', 'Qty', 'Petugas', 'Catatan']

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [productId, setProductId] = useState('')
  const [locationId, setLocationId] = useState('')
  const [type, setType] = useState<'IN' | 'OUT'>('IN')
  const [quantity, setQuantity] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT'>('ALL')
  const [filterDate, setFilterDate] = useState('')

  const fetchData = async () => {
    setFetching(true)
    const { data: prodData } = await supabase.from('products').select('id, sku').order('sku')
    const { data: locData } = await supabase.from('locations').select('id, code').order('code')
    if (prodData) setProducts(prodData)
    if (locData) setLocations(locData)

    const { data: trxData, error } = await supabase
      .from('transactions')
      .select('id, type, quantity, transaction_date, notes, user_id, products ( sku ), locations ( code )')
      .order('transaction_date', { ascending: false })
      .limit(200)

    if (error) { console.error(error.message); setFetching(false); return }

    const { data: profilesData } = await supabase.from('profiles').select('id, full_name, email')
    const merged = (trxData || []).map((trx: any) => {
      const profile = profilesData?.find(p => p.id === trx.user_id)
      return { ...trx, profiles: profile ? { full_name: profile.full_name, email: profile.email } : null }
    })
    setTransactions(merged as any)
    setFetching(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { alert('Sesi login habis.'); setLoading(false); return }

    const { error } = await supabase.from('transactions').insert([{
      product_id: parseInt(productId),
      location_id: parseInt(locationId),
      user_id: user.id,
      type, quantity: parseInt(quantity), notes
    }])

    if (error) alert('Gagal: ' + error.message)
    else { setQuantity(''); setNotes(''); fetchData() }
    setLoading(false)
  }

  // Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(trx => {
      const matchSearch = searchQuery === '' ||
        trx.products?.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trx.locations?.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trx.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trx.notes?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchType = filterType === 'ALL' || trx.type === filterType
      const matchDate = filterDate === '' || trx.transaction_date.startsWith(filterDate)

      return matchSearch && matchType && matchDate
    })
  }, [transactions, searchQuery, filterType, filterDate])

  const clearFilters = () => { setSearchQuery(''); setFilterType('ALL'); setFilterDate('') }
  const hasFilter = searchQuery || filterType !== 'ALL' || filterDate

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

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Input Transaksi Baru</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe</label>
            <select value={type} onChange={(e) => setType(e.target.value as 'IN' | 'OUT')}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-semibold">
              <option value="IN">IN (Masuk)</option>
              <option value="OUT">OUT (Keluar)</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Produk (SKU)</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition" required>
              <option value="">Pilih Produk...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.sku}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi Rak</label>
            <select value={locationId} onChange={(e) => setLocationId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition" required>
              <option value="">Pilih Rak...</option>
              {locations.map(l => <option key={l.id} value={l.id}>{l.code}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Jumlah</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" min="1"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
          </div>
          <div className="md:col-span-3">
            <button type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 text-white ${
                type === 'IN'
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/25'
              }`}>
              <Plus size={18} />
              {loading ? 'Menyimpan...' : `Simpan ${type}`}
            </button>
          </div>
          <div className="md:col-span-12">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Catatan (Opsional)</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Contoh: Kiriman dari supplier A"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
          </div>
        </form>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Filter & Pencarian</span>
          {hasFilter && (
            <button onClick={clearFilters} className="ml-auto flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700">
              <X size={14} /> Reset Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari SKU, rak, petugas, atau catatan..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-3">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-medium">
              <option value="ALL">Semua Tipe</option>
              <option value="IN">Hanya IN</option>
              <option value="OUT">Hanya OUT</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Menampilkan <span className="font-bold text-slate-700">{filteredTransactions.length}</span> dari {transactions.length} transaksi
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {TABLE_HEADERS.map((header, idx) => (
                  <th key={idx} className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr><td colSpan={7} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
              ) : filteredTransactions.length === 0 ? (
                <tr><td colSpan={7} className="px-8 py-10 text-center text-slate-400">
                  {hasFilter ? 'Tidak ada transaksi yang cocok dengan filter.' : 'Belum ada transaksi.'}
                </td></tr>
              ) : (
                filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(trx.transaction_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trx.type === 'IN' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>{trx.type}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800 whitespace-nowrap">{trx.products?.sku}</td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{trx.locations?.code}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{trx.quantity}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span className="font-medium text-slate-700">{trx.profiles?.full_name || trx.profiles?.email || 'System'}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{trx.notes || '-'}</td>
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