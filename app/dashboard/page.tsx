'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Boxes,
  CalendarDays,
  Clock3,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  ScanLine,
  TrendingUp,
  Warehouse,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ChartData = {
  date: string
  label: string
  inbound: number
  outbound: number
}

type StockRow = {
  current_stock: number
  products: { sku: string; min_stock: number | null }[] | { sku: string; min_stock: number | null } | null
  locations: { code: string }[] | { code: string } | null
}

type TransactionRow = {
  id: number
  type: 'IN' | 'OUT'
  quantity: number
  transaction_date: string
  notes: string | null
  products: { sku: string }[] | { sku: string } | null
  locations: { code: string }[] | { code: string } | null
}

type DashboardStats = {
  totalProducts: number
  totalUnits: number
  lowStockCount: number
  inToday: number
  outToday: number
}

const initialStats: DashboardStats = {
  totalProducts: 0,
  totalUnits: 0,
  lowStockCount: 0,
  inToday: 0,
  outToday: 0,
}

const quickActions = [
  {
    label: 'Catat barang masuk',
    description: 'Terima stok ke gudang',
    href: '/dashboard/transactions',
    icon: ArrowDownToLine,
    tone: 'emerald',
  },
  {
    label: 'Catat barang keluar',
    description: 'Perbarui stok keluar',
    href: '/dashboard/transactions',
    icon: ArrowUpFromLine,
    tone: 'orange',
  },
  {
    label: 'Tambah produk',
    description: 'Kelola katalog SKU',
    href: '/dashboard/products',
    icon: Plus,
    tone: 'blue',
  },
  {
    label: 'Lihat stok gudang',
    description: 'Cari stok per lokasi',
    href: '/dashboard/stock',
    icon: ScanLine,
    tone: 'violet',
  },
]

function localDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function firstRelated<T>(relationship: T | T[] | null | undefined): T | undefined {
  return Array.isArray(relationship) ? relationship[0] : relationship ?? undefined
}

export default function DashboardPage() {
  const [stats, setStats] = useState(initialStats)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [lowStockRows, setLowStockRows] = useState<StockRow[]>([])
  const [recentTransactions, setRecentTransactions] = useState<TransactionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchDashboard = useCallback(async () => {
    const now = new Date()
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startWeek = new Date(startToday)
    startWeek.setDate(startWeek.getDate() - 6)
    const endToday = new Date(startToday)
    endToday.setDate(endToday.getDate() + 1)

    try {
      const [productResult, stockResult, activityResult, recentResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase
          .from('stocks')
          .select('current_stock, products ( sku, min_stock ), locations ( code )'),
        supabase
          .from('transactions')
          .select('type, quantity, transaction_date')
          .gte('transaction_date', startWeek.toISOString())
          .lt('transaction_date', endToday.toISOString())
          .order('transaction_date', { ascending: true }),
        supabase
          .from('transactions')
          .select('id, type, quantity, transaction_date, notes, products ( sku ), locations ( code )')
          .order('transaction_date', { ascending: false })
          .limit(6),
      ])

      const errors = [
        productResult.error,
        stockResult.error,
        activityResult.error,
        recentResult.error,
      ].filter((error) => error !== null)

      setErrorMessage('')
      if (errors.length > 0) {
        errors.forEach((error) => console.error('Gagal memuat data dashboard:', error.message))
        setErrorMessage('Sebagian data belum dapat dimuat. Periksa koneksi lalu coba muat ulang.')
      }

      const stocks = (stockResult.data ?? []) as StockRow[]
      const transactions = (activityResult.data ?? []) as Pick<
        TransactionRow,
        'type' | 'quantity' | 'transaction_date'
      >[]
      const recent = (recentResult.data ?? []) as TransactionRow[]

      const groupedByDate = new Map<string, ChartData>()
      for (let offset = 6; offset >= 0; offset -= 1) {
        const date = new Date(startToday)
        date.setDate(date.getDate() - offset)
        const key = localDateKey(date)
        groupedByDate.set(key, {
          date: key,
          label: date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
          inbound: 0,
          outbound: 0,
        })
      }

      let inToday = 0
      let outToday = 0
      transactions.forEach((transaction) => {
        const day = groupedByDate.get(localDateKey(new Date(transaction.transaction_date)))
        if (!day) return

        if (transaction.type === 'IN') {
          day.inbound += transaction.quantity
          if (new Date(transaction.transaction_date) >= startToday) inToday += transaction.quantity
        } else if (transaction.type === 'OUT') {
          day.outbound += transaction.quantity
          if (new Date(transaction.transaction_date) >= startToday) outToday += transaction.quantity
        }
      })

      const lowStocks = stocks.filter(
        (stock) => stock.current_stock <= (firstRelated(stock.products)?.min_stock ?? 10),
      )

      setStats({
        totalProducts: productResult.count ?? 0,
        totalUnits: stocks.reduce((total, stock) => total + stock.current_stock, 0),
        lowStockCount: lowStocks.length,
        inToday,
        outToday,
      })
      setChartData(Array.from(groupedByDate.values()))
      setLowStockRows(lowStocks.slice(0, 5))
      setRecentTransactions(recent)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Gagal memuat dashboard:', error)
      setErrorMessage('Dashboard tidak dapat dimuat. Periksa koneksi lalu coba muat ulang.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const request = window.setTimeout(() => void fetchDashboard(), 0)
    return () => window.clearTimeout(request)
  }, [fetchDashboard])

  const handleRefresh = () => {
    setLoading(true)
    void fetchDashboard()
  }

  const totals = useMemo(
    () => chartData.reduce(
      (result, day) => ({
        inbound: result.inbound + day.inbound,
        outbound: result.outbound + day.outbound,
      }),
      { inbound: 0, outbound: 0 },
    ),
    [chartData],
  )

  const statCards = [
    {
      label: 'Total SKU',
      value: stats.totalProducts,
      detail: 'varian produk terdaftar',
      icon: Package,
      color: 'text-blue-700',
      iconBackground: 'bg-blue-50',
      accent: 'bg-blue-500',
    },
    {
      label: 'Total unit stok',
      value: stats.totalUnits,
      detail: 'unit di seluruh lokasi',
      icon: Boxes,
      color: 'text-violet-700',
      iconBackground: 'bg-violet-50',
      accent: 'bg-violet-500',
    },
    {
      label: 'Barang masuk hari ini',
      value: stats.inToday,
      detail: 'unit diterima',
      icon: ArrowDownToLine,
      color: 'text-emerald-700',
      iconBackground: 'bg-emerald-50',
      accent: 'bg-emerald-500',
    },
    {
      label: 'Barang keluar hari ini',
      value: stats.outToday,
      detail: 'unit dikirim',
      icon: ArrowUpFromLine,
      color: 'text-orange-700',
      iconBackground: 'bg-orange-50',
      accent: 'bg-orange-500',
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <header className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <Warehouse size={16} />
            <span>Ringkasan operasional</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Dashboard gudang
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
            Pantau stok dan pergerakan barang dalam satu tampilan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-sm">
            <CalendarDays size={17} className="text-slate-400" />
            <span>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Muat ulang dashboard"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Muat ulang</span>
          </button>
        </div>
      </header>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={handleRefresh}
            className="shrink-0 font-semibold underline underline-offset-2"
          >
            Coba lagi
          </button>
        </div>
      )}

      <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 px-5 py-6 text-white shadow-xl shadow-emerald-900/10 sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[36px] border-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-36 right-1/4 h-64 w-64 rounded-full bg-teal-300/10 blur-2xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-200 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-200" />
              </span>
              Sistem gudang aktif
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Operasional lebih terkontrol.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/85 sm:text-base">
              Catat pergerakan, temukan stok kritis, dan jaga setiap lokasi tetap tertata.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/transactions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <Plus size={18} />
              Catat transaksi
            </Link>
            <Link
              href="/dashboard/reports"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Lihat laporan
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Ringkasan stok dan transaksi" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <article
              key={card.label}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${card.accent}`} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    {loading ? <span className="text-slate-300">—</span> : card.value.toLocaleString('id-ID')}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{card.detail}</p>
                </div>
                <div className={`rounded-xl p-3 ${card.iconBackground} ${card.color}`}>
                  <Icon size={21} strokeWidth={2.2} />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section aria-label="Akses cepat" className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Akses cepat</h2>
            <p className="mt-0.5 text-sm text-slate-500">Langsung ke pekerjaan yang sering dilakukan.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            const tone = {
              emerald: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100',
              orange: 'bg-orange-50 text-orange-700 group-hover:bg-orange-100',
              blue: 'bg-blue-50 text-blue-700 group-hover:bg-blue-100',
              violet: 'bg-violet-50 text-violet-700 group-hover:bg-violet-100',
            }[action.tone]

            return (
              <Link
                key={action.label}
                href={action.href}
                className="group flex min-h-[88px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${tone}`}>
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800">{action.label}</span>
                  <span className="mt-1 block text-xs text-slate-500">{action.description}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
        <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                  <Activity size={18} />
                </span>
                <h2 className="text-base font-bold text-slate-900">Pergerakan barang</h2>
              </div>
              <p className="mt-2 text-sm text-slate-500">Ringkasan barang masuk dan keluar selama 7 hari.</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Masuk</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-700">{totals.inbound.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Keluar</p>
                <p className="mt-0.5 text-lg font-bold text-orange-700">{totals.outbound.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {loading && chartData.length === 0 ? (
            <div className="h-[260px] animate-pulse rounded-xl bg-slate-50 sm:h-[300px]" />
          ) : (
            <div className="h-[260px] w-full sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="inboundFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="outboundFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.16} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#eef2f6" strokeDasharray="4 5" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    width={42}
                  />
                  <Tooltip
                    labelFormatter={(_, payload) => {
                      const date = payload?.[0]?.payload?.date
                      return date
                        ? new Date(`${date}T12:00:00`).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })
                        : ''
                    }}
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString('id-ID')} unit`,
                      name === 'inbound' ? 'Barang masuk' : 'Barang keluar',
                    ]}
                    contentStyle={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 12px 30px rgba(15, 23, 42, .1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="inbound"
                    name="Barang masuk"
                    stroke="#059669"
                    strokeWidth={2.5}
                    fill="url(#inboundFill)"
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="outbound"
                    name="Barang keluar"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    fill="url(#outboundFill)"
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          {!loading && chartData.every((day) => day.inbound === 0 && day.outbound === 0) && (
            <p className="mt-2 text-center text-xs text-slate-400">Belum ada transaksi dalam 7 hari terakhir.</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Barang masuk
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
              Barang keluar
            </span>
            {lastUpdated && (
              <span className="ml-auto inline-flex items-center gap-1.5 text-slate-400">
                <Clock3 size={13} />
                Diperbarui {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-amber-50 p-2 text-amber-700">
                  <AlertTriangle size={18} />
                </span>
                <h2 className="text-base font-bold text-slate-900">Perlu perhatian</h2>
              </div>
              <p className="mt-2 text-sm text-slate-500">Posisi stok yang mencapai batas minimum.</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
              {loading ? '—' : stats.lowStockCount.toLocaleString('id-ID')}
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((item) => <div key={item} className="h-14 animate-pulse rounded-xl bg-slate-50" />)}
            </div>
          ) : lowStockRows.length === 0 ? (
            <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 text-center">
              <span className="mb-2 rounded-full bg-white p-2.5 text-emerald-600 shadow-sm">
                <TrendingUp size={19} />
              </span>
              <p className="text-sm font-semibold text-slate-800">Stok terkendali</p>
              <p className="mt-1 text-xs text-slate-500">Tidak ada posisi stok di bawah batas minimum.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {lowStockRows.map((stock, index) => {
                const product = firstRelated(stock.products)
                const location = firstRelated(stock.locations)
                return (
                <div key={`${product?.sku ?? 'sku'}-${location?.code ?? index}-${index}`} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Package size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-slate-800">{product?.sku ?? 'SKU tidak tersedia'}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} />
                      {location?.code ?? 'Lokasi tidak tersedia'}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-sm font-bold text-amber-700">{stock.current_stock.toLocaleString('id-ID')}</span>
                    <span className="text-[11px] text-slate-400">unit tersisa</span>
                  </span>
                </div>
                )
              })}
            </div>
          )}
          <Link
            href="/dashboard/stock"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
          >
            Tinjau semua stok
            <ArrowRight size={15} />
          </Link>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
                <Activity size={18} />
              </span>
              <h2 className="text-base font-bold text-slate-900">Transaksi terbaru</h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">Aktivitas terakhir yang tercatat di gudang.</p>
          </div>
          <Link
            href="/dashboard/transactions"
            className="inline-flex min-h-10 items-center gap-1.5 self-start rounded-lg px-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:self-auto"
          >
            Semua transaksi
            <ArrowRight size={15} />
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3 p-5 sm:p-6">
            {[0, 1, 2].map((item) => <div key={item} className="h-12 animate-pulse rounded-lg bg-slate-50" />)}
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <p className="text-sm font-medium text-slate-700">Belum ada transaksi.</p>
            <p className="mt-1 text-xs text-slate-500">Transaksi yang dicatat akan muncul di sini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:px-6">Waktu</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">SKU / lokasi</th>
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Tipe</th>
                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:px-6">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((transaction) => {
                  const isInbound = transaction.type === 'IN'
                  const product = firstRelated(transaction.products)
                  const location = firstRelated(transaction.locations)
                  return (
                    <tr key={transaction.id} className="transition hover:bg-slate-50/70">
                      <td className="whitespace-nowrap px-5 py-3.5 sm:px-6">
                        <span className="block text-sm font-medium text-slate-700">
                          {new Date(transaction.transaction_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          {new Date(transaction.transaction_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="block text-sm font-semibold text-slate-800">{product?.sku ?? 'SKU tidak tersedia'}</span>
                        <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={11} />
                          {location?.code ?? '—'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isInbound ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {isInbound ? <ArrowDownToLine size={13} /> : <ArrowUpFromLine size={13} />}
                          {isInbound ? 'Masuk' : 'Keluar'}
                        </span>
                      </td>
                      <td className={`whitespace-nowrap px-5 py-3.5 text-right text-sm font-bold sm:px-6 ${isInbound ? 'text-emerald-700' : 'text-orange-700'}`}>
                        {isInbound ? '+' : '−'}{transaction.quantity.toLocaleString('id-ID')} unit
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
