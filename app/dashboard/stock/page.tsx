'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { Warehouse, Search, Filter, X, TrendingUp, AlertTriangle, Package, Boxes } from 'lucide-react'

type StockRow = {
  id: number
  current_stock: number
  product_id: number
  location_id: number
  products: { sku: string, min_stock: number, categories: { name: string } | null }
  locations: { code: string }
}

type ViewMode = 'per-rak' | 'per-sku'

export default function StockPage() {
  const [stocks, setStocks] = useState<StockRow[]>([])
  const [fetching, setFetching] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'AMAN' | 'MENIPIS' | 'KOSONG'>('ALL')
  const [viewMode, setViewMode] = useState<ViewMode>('per-rak')

  const fetchStocks = async () => {
    setFetching(true)
    const { data, error } = await supabase
      .from('stocks')
      .select(`
        id, current_stock, product_id, location_id,
        products ( sku, min_stock, categories ( name ) ),
        locations ( code )
      `)
      .order('current_stock', { ascending: false })

    if (error) console.error('Error:', error.message)
    if (data) setStocks(data as any)
    setFetching(false)
  }

  useEffect(() => { fetchStocks() }, [])

  // Stats
  const stats = useMemo(() => {
    const totalUnit = stocks.reduce((sum, s) => sum + s.current_stock, 0)
    const lowStock = stocks.filter(s => s.current_stock <= (s.products?.min_stock || 10) && s.current_stock > 0).length
    const kosong = stocks.filter(s => s.current_stock === 0).length
    const totalRak = new Set(stocks.map(s => s.locations?.code)).size
    const totalSku = new Set(stocks.map(s => s.product_id)).size
    return { totalUnit, lowStock, kosong, totalRak, totalSku }
  }, [stocks])

  // Filter
  const filtered = useMemo(() => {
    return stocks.filter(s => {
      const matchSearch = searchQuery === '' ||
        s.products?.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.locations?.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.products?.categories?.name?.toLowerCase().includes(searchQuery.toLowerCase())

      const min = s.products?.min_stock || 10
      let matchStatus = true
      if (filterStatus === 'AMAN') matchStatus = s.current_stock > min
      else if (filterStatus === 'MENIPIS') matchStatus = s.current_stock <= min && s.current_stock > 0
      else if (filterStatus === 'KOSONG') matchStatus = s.current_stock === 0

      return matchSearch && matchStatus
    })
  }, [stocks, searchQuery, filterStatus])

  const hasFilter = searchQuery || filterStatus !== 'ALL'

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <Warehouse className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Stok Gudang</h1>
          <p className="text-slate-500">Detail stok real-time setiap SKU di setiap rak.</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Package size={14} className="text-blue-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total SKU</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.totalSku}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Boxes size={14} className="text-purple-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Rak Aktif</p>
          </div>
          <p className="text-2xl font-bold text-slate-800">{stats.totalRak}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-emerald-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Unit</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.totalUnit.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-orange-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Menipis</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} className="text-red-500" />
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Kosong</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.kosong}</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Filter & Pencarian</span>
          {hasFilter && (
            <button
              onClick={() => { setSearchQuery(''); setFilterStatus('ALL') }}
              className="ml-auto flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
            >
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
              placeholder="Cari SKU, rak, atau kategori..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-medium"
            >
              <option value="ALL">Semua Status</option>
              <option value="AMAN">✓ Aman</option>
              <option value="MENIPIS">⚠ Menipis</option>
              <option value="KOSONG">✗ Kosong</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('per-rak')}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  viewMode === 'per-rak'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Per Rak
              </button>
              <button
                onClick={() => setViewMode('per-sku')}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  viewMode === 'per-sku'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Per SKU
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Menampilkan <span className="font-bold text-slate-700">{filtered.length}</span> dari {stocks.length} baris stok
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {viewMode === 'per-rak' ? (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rak</th>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Stok</th>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Min</th>
                  <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                  <tr><td colSpan={6} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-8 py-10 text-center text-slate-400">Tidak ada data stok.</td></tr>
                ) : (
                  filtered.map((s) => {
                    const min = s.products?.min_stock || 10
                    const isLow = s.current_stock <= min && s.current_stock > 0
                    const isZero = s.current_stock === 0
                    return (
                      <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-semibold text-emerald-700 whitespace-nowrap">{s.products?.sku}</td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{s.products?.categories?.name || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold">{s.locations?.code}</span>
                        </td>
                        <td className={`px-6 py-4 text-right font-bold text-lg ${isZero ? 'text-red-600' : isLow ? 'text-orange-600' : 'text-emerald-600'}`}>
                          {s.current_stock.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500 text-sm">{min}</td>
                        <td className="px-6 py-4">
                          {isZero ? (
                            <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">✗ Kosong</span>
                          ) : isLow ? (
                            <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">⚠ Menipis</span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">✓ Aman</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          ) : (
            // VIEW PER SKU (di-group)
            <PerSkuView stocks={filtered} fetching={fetching} />
          )}
        </div>
      </div>
    </div>
  )
}

// ===============================
// SUB-KOMPONEN: View Per SKU
// ===============================
function PerSkuView({ stocks, fetching }: { stocks: StockRow[], fetching: boolean }) {
  // Group by SKU
  const grouped = useMemo(() => {
    const map: Record<string, { sku: string, category: string, min: number, total: number, perRak: { code: string, qty: number }[] }> = {}
    stocks.forEach(s => {
      const sku = s.products?.sku || 'Unknown'
      if (!map[sku]) {
        map[sku] = {
          sku,
          category: s.products?.categories?.name || '-',
          min: s.products?.min_stock || 10,
          total: 0,
          perRak: []
        }
      }
      map[sku].total += s.current_stock
      if (s.current_stock > 0) {
        map[sku].perRak.push({ code: s.locations?.code || '-', qty: s.current_stock })
      }
    })
    return Object.values(map).sort((a, b) => a.total - b.total)
  }, [stocks])

  if (fetching) {
    return <div className="px-8 py-10 text-center text-slate-400">Memuat data...</div>
  }
  if (grouped.length === 0) {
    return <div className="px-8 py-10 text-center text-slate-400">Tidak ada data.</div>
  }

  return (
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-100">
        <tr>
          <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
          <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Kategori</th>
          <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sebaran Rak</th>
          <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total Stok</th>
          <th className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody>
        {grouped.map((g) => {
          const isLow = g.total <= g.min && g.total > 0
          const isZero = g.total === 0
          return (
            <tr key={g.sku} className="border-b border-slate-50 hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-bold text-emerald-700 whitespace-nowrap">{g.sku}</td>
              <td className="px-6 py-4 text-slate-600 text-sm">{g.category}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {g.perRak.length === 0 ? (
                    <span className="text-slate-400 text-xs italic">Tidak ada stok</span>
                  ) : (
                    g.perRak.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                        {r.code}: <span className="font-bold">{r.qty}</span>
                      </span>
                    ))
                  )}
                </div>
              </td>
              <td className={`px-6 py-4 text-right font-bold text-lg ${isZero ? 'text-red-600' : isLow ? 'text-orange-600' : 'text-emerald-600'}`}>
                {g.total.toLocaleString('id-ID')}
              </td>
              <td className="px-6 py-4">
                {isZero ? (
                  <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">✗ Kosong</span>
                ) : isLow ? (
                  <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">⚠ Menipis</span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap">✓ Aman</span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}