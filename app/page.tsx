'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Package, ArrowDownToLine, ArrowUpFromLine, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type ChartData = {
  name: string
  IN: number
  OUT: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, inToday: 0, outToday: 0 })
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact', head: true })

      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      
      const { data: trxData } = await supabase
        .from('transactions')
        .select('type, quantity, transaction_date')
        .gte('transaction_date', sevenDaysAgo.toISOString())

      const groupedData: Record<string, { IN: number, OUT: number }> = {}
      
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        groupedData[dateStr] = { IN: 0, OUT: 0 }
      }

      trxData?.forEach(trx => {
        const dateStr = new Date(trx.transaction_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        if (groupedData[dateStr]) {
          if (trx.type === 'IN') groupedData[dateStr].IN += trx.quantity
          if (trx.type === 'OUT') groupedData[dateStr].OUT += trx.quantity
        }
      })

      const chartArray = Object.keys(groupedData).map(key => ({
        name: key,
        IN: groupedData[key].IN,
        OUT: groupedData[key].OUT
      }))

      const todayStr = new Date().toLocaleDateString('id-ID')
      let inToday = 0
      let outToday = 0
      trxData?.forEach(trx => {
        const trxDateStr = new Date(trx.transaction_date).toLocaleDateString('id-ID')
        if (trxDateStr === todayStr) {
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

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-emerald-600" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Ringkasan aktivitas gudang 7 hari terakhir.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-blue-600">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Varian Produk</p>
            <p className="text-3xl font-bold text-gray-800">{loading ? '...' : stats.totalProducts}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-emerald-50 p-4 rounded-lg text-emerald-600">
            <ArrowDownToLine size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Barang Masuk Hari Ini</p>
            <p className="text-3xl font-bold text-emerald-600">{loading ? '...' : stats.inToday}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-50 p-4 rounded-lg text-orange-600">
            <ArrowUpFromLine size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Barang Keluar Hari Ini</p>
            <p className="text-3xl font-bold text-orange-600">{loading ? '...' : stats.outToday}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Aktivitas Barang (7 Hari Terakhir)</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                cursor={{ fill: '#f8fafc' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="IN" name="Barang Masuk" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="OUT" name="Barang Keluar" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}