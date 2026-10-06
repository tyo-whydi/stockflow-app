'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Download, Printer, Search, X } from 'lucide-react'

type StockReport = {
  id: number
  current_stock: number
  products: { sku: string, min_stock: number }
  locations: { code: string }
}

export default function ReportsPage() {
  const [stocks, setStocks] = useState<StockReport[]>([])
  const [fetching, setFetching] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLowStockOnly, setShowLowStockOnly] = useState(false)

  const fetchStocks = async () => {
    setFetching(true)
    const { data } = await supabase
      .from('stocks')
      .select('id, current_stock, products ( sku, min_stock ), locations ( code )')
      .order('current_stock', { ascending: true })
    if (data) setStocks(data as any)
    setFetching(false)
  }

  useEffect(() => { fetchStocks() }, [])

  const filteredStocks = useMemo(() => {
    return stocks.filter(s => {
      const matchSearch = searchQuery === '' ||
        s.products?.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.locations?.code?.toLowerCase().includes(searchQuery.toLowerCase())
      const isLow = s.current_stock <= (s.products?.min_stock || 10)
      const matchLow = !showLowStockOnly || isLow
      return matchSearch && matchLow
    })
  }, [stocks, searchQuery, showLowStockOnly])

  const handleExportCSV = () => {
    if (filteredStocks.length === 0) return alert('Belum ada data untuk di-export')
    const headers = ['SKU', 'Lokasi Rak', 'Stok Saat Ini', 'Min Stok', 'Status']
    const rows = filteredStocks.map(s => {
      const isLow = s.current_stock <= (s.products?.min_stock || 10)
      return [s.products?.sku, s.locations?.code, s.current_stock, s.products?.min_stock, isLow ? 'Stok Menipis' : 'Aman']
    })
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.setAttribute('href', URL.createObjectURL(blob))
    link.setAttribute('download', `Laporan_Stok_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  const lowStockCount = stocks.filter(s => s.current_stock <= (s.products?.min_stock || 10)).length

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-start mb-8 no-print">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
            <FileText className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Laporan Stok Akhir</h1>
            <p className="text-slate-500">Pantau stok terkini di setiap rak secara real-time.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-3 rounded-xl transition-all shadow-sm">
            <Printer size={18} />
            Print
          </button>
          <button onClick={handleExportCSV}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25">
            <Download size={18} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Print Header - Only Shows When Printing */}
      <div className="hidden print:block mb-8">
        <h1 className="text-2xl font-bold text-black">LAPORAN STOK GUDANG</h1>
        <p className="text-sm text-gray-600">StockFlow Warehouse System</p>
        <p className="text-sm text-gray-600">Tanggal Cetak: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <hr className="my-4 border-black" />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6 no-print">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari SKU atau rak..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-5">
            <button
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className={`w-full flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-xl transition-all border ${
                showLowStockOnly
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              ⚠ Hanya Stok Menipis
              {lowStockCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${showLowStockOnly ? 'bg-red-200 text-red-800' : 'bg-red-100 text-red-700'}`}>
                  {lowStockCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {(searchQuery || showLowStockOnly) && (
          <button
            onClick={() => { setSearchQuery(''); setShowLowStockOnly(false) }}
            className="mt-3 flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            <X size={14} /> Reset Filter
          </button>
        )}
        <p className="text-xs text-slate-500 mt-3">
          Menampilkan <span className="font-bold text-slate-700">{filteredStocks.length}</span> dari {stocks.length} item
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-0">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 print:bg-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lokasi Rak</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stok Saat Ini</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : filteredStocks.length === 0 ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                {searchQuery || showLowStockOnly ? 'Tidak ada data yang cocok.' : 'Belum ada data stok.'}
              </td></tr>
            ) : (
              filteredStocks.map((stock) => {
                const isLow = stock.current_stock <= (stock.products?.min_stock || 10)
                return (
                  <tr key={stock.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-8 py-5 font-semibold text-slate-800">{stock.products?.sku}</td>
                    <td className="px-8 py-5 text-slate-600">{stock.locations?.code}</td>
                    <td className={`px-8 py-5 font-bold ${isLow ? 'text-red-600' : 'text-emerald-600'}`}>
                      {stock.current_stock}
                    </td>
                    <td className="px-8 py-5">
                      {isLow ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold">⚠ Stok Menipis</span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold">✓ Aman</span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block mt-12">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Dicetak oleh: StockFlow System</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-16">Disetujui oleh,</p>
            <p className="text-sm text-gray-600 border-t border-black pt-1 px-8">(.....................)</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          aside { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}