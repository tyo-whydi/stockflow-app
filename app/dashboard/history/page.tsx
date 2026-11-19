'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { History, Search, X, Plus, Pencil, Trash2, User, Clock, Filter, Download, RefreshCw } from 'lucide-react'

type AuditLog = {
  id: number
  user_id: string
  table_name: string
  record_id: string
  action: 'INSERT' | 'UPDATE' | 'DELETE'
  description: string
  created_at: string
}

type Profile = { id: string, full_name: string | null, email: string }
type AuditAction = 'ALL' | 'INSERT' | 'UPDATE' | 'DELETE'
type AuditTable = 'ALL' | 'categories' | 'locations' | 'products' | 'transactions' | 'profiles'

const TABLE_LABELS: Record<string, string> = {
  categories: 'Kategori',
  locations: 'Lokasi Rak',
  products: 'Produk',
  transactions: 'Transaksi',
  profiles: 'User'
}

export default function HistoryPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [fetching, setFetching] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterAction, setFilterAction] = useState<AuditAction>('ALL')
  const [filterTable, setFilterTable] = useState<AuditTable>('ALL')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchData = async () => {
    setFetching(true)
    try {
      const [logsResult, profilesResult] = await Promise.all([
        supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('profiles').select('id, full_name, email'),
      ])
      if (logsResult.error || profilesResult.error) {
        const error = logsResult.error ?? profilesResult.error
        console.error('Gagal memuat histori aktivitas:', error?.message)
        setErrorMessage('Histori belum dapat dimuat. Periksa koneksi lalu coba lagi.')
        return
      }
      if (logsResult.data) setLogs(logsResult.data as AuditLog[])
      if (profilesResult.data) setProfiles(profilesResult.data)
      setErrorMessage('')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    const request = window.setTimeout(() => void fetchData(), 0)
    return () => window.clearTimeout(request)
  }, [])

  const getUserName = useCallback((userId: string) => {
    const profile = profiles.find(p => p.id === userId)
    return profile?.full_name || profile?.email?.split('@')[0] || 'System'
  }, [profiles])

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const userName = getUserName(log.user_id)
      const matchSearch = searchQuery === '' ||
        log.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchAction = filterAction === 'ALL' || log.action === filterAction
      const matchTable = filterTable === 'ALL' || log.table_name === filterTable
      return matchSearch && matchAction && matchTable
    })
  }, [logs, getUserName, searchQuery, filterAction, filterTable])

  const actionBadge = (action: string) => {
    if (action === 'INSERT') return { label: 'Tambah', color: 'bg-emerald-100 text-emerald-700', icon: Plus }
    if (action === 'UPDATE') return { label: 'Edit', color: 'bg-blue-100 text-blue-700', icon: Pencil }
    return { label: 'Hapus', color: 'bg-red-100 text-red-700', icon: Trash2 }
  }

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return {
      date: d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  }

  const exportHistory = () => {
    if (filteredLogs.length === 0) return
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`
    const rows = filteredLogs.map((log) => [
      log.created_at,
      log.action,
      TABLE_LABELS[log.table_name] || log.table_name,
      getUserName(log.user_id),
      log.description ?? '',
      log.record_id,
    ])
    const csv = [
      ['Waktu', 'Aksi', 'Bagian', 'Pengguna', 'Deskripsi', 'ID Data'],
      ...rows,
    ].map((row) => row.map(escapeCsv).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `Histori_Aktivitas_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <History className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Histori Aktivitas</h1>
          <p className="text-slate-500">Catatan lengkap semua aktivitas di sistem.</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchData()} className="inline-flex shrink-0 items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Coba lagi
          </button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Total aktivitas dimuat', value: logs.length, style: 'text-slate-900' },
          { label: 'Penambahan data', value: logs.filter((log) => log.action === 'INSERT').length, style: 'text-emerald-700' },
          { label: 'Perubahan & penghapusan', value: logs.filter((log) => log.action !== 'INSERT').length, style: 'text-blue-700' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.style}`}>{fetching ? '—' : stat.value.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Filter</span>
          {(searchQuery || filterAction !== 'ALL' || filterTable !== 'ALL') && (
            <button
              onClick={() => { setSearchQuery(''); setFilterAction('ALL'); setFilterTable('ALL') }}
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
              placeholder="Cari nama user atau deskripsi..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-3">
            <select
              value={filterAction}
              onChange={(e) => {
                const action = e.target.value
                if (action === 'ALL' || action === 'INSERT' || action === 'UPDATE' || action === 'DELETE') {
                  setFilterAction(action)
                }
              }}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-medium"
            >
              <option value="ALL">Semua Aksi</option>
              <option value="INSERT">Tambah</option>
              <option value="UPDATE">Edit</option>
              <option value="DELETE">Hapus</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <select
              value={filterTable}
              onChange={(e) => {
                const table = e.target.value
                if (table === 'ALL' || table === 'categories' || table === 'locations' ||
                  table === 'products' || table === 'transactions' || table === 'profiles') {
                  setFilterTable(table)
                }
              }}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition font-medium"
            >
              <option value="ALL">Semua Tabel</option>
              <option value="categories">Kategori</option>
              <option value="locations">Lokasi Rak</option>
              <option value="products">Produk</option>
              <option value="transactions">Transaksi</option>
              <option value="profiles">User</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Menampilkan <span className="font-bold text-slate-700">{filteredLogs.length}</span> dari {logs.length} aktivitas
        </p>
        <button
          type="button"
          onClick={exportHistory}
          disabled={filteredLogs.length === 0}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download size={16} /> Export histori (CSV)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {fetching ? (
          <div className="px-8 py-16 text-center text-slate-400">Memuat data...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="px-8 py-16 text-center text-slate-400">
            {searchQuery || filterAction !== 'ALL' || filterTable !== 'ALL'
              ? 'Tidak ada aktivitas yang cocok.'
              : 'Belum ada aktivitas.'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLogs.map((log) => {
              const badge = actionBadge(log.action)
              const BadgeIcon = badge.icon
              const { date, time } = formatDateTime(log.created_at)
              return (
                <div key={log.id} className="p-6 hover:bg-slate-50 transition flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${badge.color} shrink-0`}>
                    <BadgeIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {TABLE_LABELS[log.table_name] || log.table_name}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium">{log.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        <span className="font-semibold text-slate-700">{getUserName(log.user_id)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {date} • {time}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}