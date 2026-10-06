'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Package, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Activity, Calendar } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type ChartData = { name: string, IN: number, OUT: number }

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, inToday: 0, outToday: 0 })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const monthName = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
      setCurrentMonth(monthName)

      // Total produk
      const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact', head: true })

      // Awal bulan (tanggal 1) dan akhir bulan
      const firstDay = new Date(year, month, 1, 0, 0, 0)
      const lastDay = new Date(year, month + 1, 0, 23, 59, 59)
      const daysInMonth = lastDay.getDate()

      // Ambil semua transaksi bulan ini
      const { data: trxData } = await supabase
        .from('transactions')
        .select('type, quantity, transaction_date')
        .gte('transaction_date', firstDay.toISOString())
        .lte('transaction_date', lastDay.toISOString())

      // Siapkan data semua tanggal 1 s/d akhir bulan
      const groupedData: Record<number, { IN: number, OUT: number }> = {}
      for (let d = 1; d <= daysInMonth; d++) {
        groupedData[d] = { IN: 0, OUT: 0 }
      }

      trxData?.forEach(trx => {
        const dayNum = new Date(trx.transaction_date).getDate()
        if (groupedData[dayNum]) {
          if (trx.type === 'IN') groupedData[dayNum].IN += trx.quantity
          if (trx.type === 'OUT') groupedData[dayNum].OUT += trx.quantity
        }
      })

      const chartArray = Object.keys(groupedData).map(key => ({
        name: String(key),
        IN: groupedData[Number(key)].IN,
        OUT: groupedData[Number(key)].OUT
      }))

      // Hitung transaksi HARI INI
      const todayStr = new Date().toLocaleDateString('id-ID')
      let inToday = 0, outToday = 0
      trxData?.forEach(trx => {
        if (new Date(trx.transaction_date).toLocaleDateString('id-ID') === todayStr) {
          if (trx.type === 'IN') inToday += trx.quantity
          if (trx.type === 'OUT') outToday += trx.quantity
        }
      })

      setStats({ totalProducts: prodCount || 0, inToday, outToday })
      setChartData(chartArray)
      setLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Varian Produk', value: stats.totalProducts, icon: Package, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Barang Masuk Hari Ini', value: stats.inToday, icon: ArrowDownToLine, color: '#059669', bg: '#ecfdf5' },
    { label: 'Barang Keluar Hari Ini', value: stats.outToday, icon: ArrowUpFromLine, color: '#f97316', bg: '#fff7ed' },
  ]

  const totalIn = chartData.reduce((acc, d) => acc + d.IN, 0)
  const totalOut = chartData.reduce((acc, d) => acc + d.OUT, 0)

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          </div>
          <p className="text-slate-500 text-base ml-14">Ringkasan aktivitas gudang bulan {currentMonth}</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <Activity className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-slate-400 font-medium">STATUS SISTEM</p>
            <p className="text-sm font-semibold text-emerald-600">● Aktif</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div key={idx} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow animate-in">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">{card.label}</p>
                  <p className="text-5xl font-bold text-slate-900 tracking-tight">
                    {loading ? '...' : card.value.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: card.bg, color: card.color }}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm animate-in">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="text-emerald-600" size={20} />
              <h2 className="text-xl font-bold text-slate-900">Aktivitas Barang</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Pergerakan stok 1 — {chartData.length} {currentMonth}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase">Total Masuk</p>
              <p className="text-lg font-bold text-emerald-600">{totalIn.toLocaleString('id-ID')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium uppercase">Total Keluar</p>
              <p className="text-lg font-bold text-orange-600">{totalOut.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex gap-5 text-sm border-l border-slate-100 pl-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-600 font-medium">Masuk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-slate-600 font-medium">Keluar</span>
              </div>
            </div>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="flex items-center justify-center text-slate-400" style={{ height: '380px' }}>
            Belum ada data transaksi.
          </div>
        ) : (
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                  interval={0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', padding: '12px 16px', fontSize: '14px' }}
                  cursor={{ fill: '#f8fafc' }}
                  labelFormatter={(label) => `Tanggal ${label} ${currentMonth}`}
                />
                <Bar dataKey="IN" name="Barang Masuk" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OUT" name="Barang Keluar" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}