'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { CompanyContextProvider, type CompanyMembership } from '@/lib/company-context'
import {
  LayoutDashboard, Tags, Package, ArrowRightLeft, MapPin, FileText, LogOut, Warehouse, Users, UserCircle, AlertTriangle, History, Boxes, Menu, X, Building2
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Kategori', href: '/dashboard/categories', icon: Tags },
  { name: 'Produk', href: '/dashboard/products', icon: Package },
  { name: 'Stok Gudang', href: '/dashboard/stock', icon: Boxes },
  { name: 'Transaksi', href: '/dashboard/transactions', icon: ArrowRightLeft },
  { name: 'Lokasi Rak', href: '/dashboard/locations', icon: MapPin },
  { name: 'Laporan', href: '/dashboard/reports', icon: FileText, badge: 'lowStock' },
  { name: 'Histori Aktivitas', href: '/dashboard/history', icon: History },
  { name: 'Manajemen User', href: '/dashboard/users', icon: Users },
  { name: 'Profil Saya', href: '/dashboard/profile', icon: UserCircle },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [lowStockSummary, setLowStockSummary] = useState({ companyId: '', count: 0 })
  const [loading, setLoading] = useState(true)
  const [membershipsLoading, setMembershipsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')
  const [memberships, setMemberships] = useState<CompanyMembership[]>([])
  const [activeCompanyId, setActiveCompanyId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyError, setCompanyError] = useState('')
  const [creatingCompany, setCreatingCompany] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const loadMemberships = useCallback(async (currentUserId: string, preferredCompanyId?: string) => {
    setMembershipsLoading(true)
    const { data, error } = await supabase
      .from('company_memberships')
      .select('company_id, role, companies ( id, name )')
      .eq('user_id', currentUserId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Gagal memuat perusahaan pengguna:', error.message)
      setCompanyError('Daftar perusahaan belum dapat dimuat. Coba muat ulang halaman.')
      setMembershipsLoading(false)
      return
    }

    const rows = (data ?? []) as {
      company_id: string
      role: CompanyMembership['role']
      companies: { id: string; name: string } | { id: string; name: string }[] | null
    }[]
    const loadedMemberships = rows.flatMap((row) => {
      const company = Array.isArray(row.companies) ? row.companies[0] : row.companies
      return company ? [{
        companyId: row.company_id,
        companyName: company.name,
        role: row.role,
      }] : []
    })

    setMemberships(loadedMemberships)
    setCompanyError('')
    const storedCompanyId = window.localStorage.getItem('stockflow.activeCompanyId')
    const selected = loadedMemberships.find((membership) => membership.companyId === preferredCompanyId)
      ?? loadedMemberships.find((membership) => membership.companyId === storedCompanyId)
      ?? loadedMemberships[0]
    setActiveCompanyId(selected?.companyId ?? '')
    if (selected) window.localStorage.setItem('stockflow.activeCompanyId', selected.companyId)
    setMembershipsLoading(false)
  }, [])
  const activeCompanyRole = memberships.find((membership) => membership.companyId === activeCompanyId)?.role
  const lowStockCount = activeCompanyRole === 'staff' || lowStockSummary.companyId !== activeCompanyId
    ? 0
    : lowStockSummary.count

  // ============ AUTH GUARD ============
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Gagal memeriksa sesi pengguna:', error.message)
        router.replace('/login')
        return
      }
      if (!user) {
        router.replace('/login')
        return
      }
      setUserId(user.id)
      setIsAuthenticated(true)
      await loadMemberships(user.id)
      setLoading(false)
    }

    void checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/')
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [router, loadMemberships])

  // ============ LOW STOCK CHECK ============
  useEffect(() => {
    if (!isAuthenticated || !activeCompanyId || activeCompanyRole === 'staff') return
    const checkLowStock = async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('current_stock, products ( min_stock )')
        .eq('company_id', activeCompanyId)
      if (error) {
        console.error('Gagal memeriksa stok menipis:', error.message)
        return
      }
      if (data) {
        const low = data.filter((stock) => {
          const product = Array.isArray(stock.products) ? stock.products[0] : stock.products
          return stock.current_stock <= (product?.min_stock ?? 10)
        }).length
        setLowStockSummary({ companyId: activeCompanyId, count: low })
      }
    }
    checkLowStock()
    const interval = setInterval(checkLowStock, 60000)
    return () => clearInterval(interval)
  }, [pathname, isAuthenticated, activeCompanyId, activeCompanyRole])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  const handleCreateCompany = async (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = companyName.trim()
    if (trimmedName.length < 2) {
      setCompanyError('Nama perusahaan minimal 2 karakter.')
      return
    }

    setCreatingCompany(true)
    setCompanyError('')
    const { data: createdCompanyId, error } = await supabase.rpc('create_company', { p_name: trimmedName })
    if (error) {
      console.error('Gagal membuat perusahaan:', error.message)
      setCompanyError('Perusahaan gagal dibuat. Periksa koneksi lalu coba lagi.')
    } else {
      setCompanyName('')
      await loadMemberships(userId, createdCompanyId)
    }
    setCreatingCompany(false)
  }

  const handleCompanyChange = (nextCompanyId: string) => {
    setActiveCompanyId(nextCompanyId)
    window.localStorage.setItem('stockflow.activeCompanyId', nextCompanyId)
    setIsMobileMenuOpen(false)
  }

  // Loading screen sambil verifikasi
  if (loading || membershipsLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  if (companyError && memberships.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <p role="alert" className="text-sm text-red-700">{companyError}</p>
          <button type="button" onClick={() => void loadMemberships(userId)} className="mt-4 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white">
            Coba lagi
          </button>
        </div>
      </div>
    )
  }

  if (memberships.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-5">
        <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-9">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Building2 size={23} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Mulai workspace</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Buat perusahaan pertama Anda</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Perusahaan memiliki katalog, stok, transaksi, dan anggota yang terpisah.
          </p>
          {companyError && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{companyError}</p>}
          <form onSubmit={handleCreateCompany} className="mt-6 space-y-3">
            <label htmlFor="company-name" className="block text-sm font-semibold text-slate-700">Nama perusahaan</label>
            <input
              id="company-name"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              maxLength={120}
              placeholder="Contoh: PT Maju Bersama"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              required
            />
            <button type="submit" disabled={creatingCompany} className="flex min-h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60">
              {creatingCompany ? 'Membuat perusahaan...' : 'Buat perusahaan'}
            </button>
          </form>
        </section>
      </main>
    )
  }

  const activeMembership = memberships.find((membership) => membership.companyId === activeCompanyId)
  if (!activeMembership) {
    return <div className="p-8 text-sm text-red-700" role="alert">Perusahaan aktif tidak ditemukan. Muat ulang halaman.</div>
  }

  const navigation = (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
      <p className="mb-3 px-3 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        Menu utama
      </p>
      {menuItems.filter((item) => activeMembership.role === 'admin'
        || (activeMembership.role === 'manager' && item.href !== '/dashboard/users')
        || (activeMembership.role === 'staff' && ['/dashboard/transactions', '/dashboard/profile'].includes(item.href))
      ).map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        const showBadge = item.badge === 'lowStock' && lowStockCount > 0
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={isActive ? 'page' : undefined}
            className={
              isActive
                ? 'flex items-center gap-3 rounded-xl bg-emerald-700 px-3.5 py-3 text-white shadow-md shadow-emerald-900/10 transition'
                : 'flex items-center gap-3 rounded-xl px-3.5 py-3 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
            }
          >
            <Icon size={19} strokeWidth={isActive ? 2.4 : 1.9} />
            <span className="flex-1 text-[13px] font-semibold">{item.name}</span>
            {showBadge && (
              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isActive ? 'bg-white text-amber-700' : 'bg-amber-50 text-amber-800'
              }`}>
                <AlertTriangle size={10} />
                {lowStockCount}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <CompanyContextProvider value={{
      activeCompanyId: activeMembership.companyId,
      activeCompanyName: activeMembership.companyName,
      activeCompanyRole: activeMembership.role,
      memberships,
      updateCompanyName: (companyId, name) => setMemberships((current) =>
        current.map((membership) => membership.companyId === companyId
          ? { ...membership, companyName: name }
          : membership),
      ),
    }}>
    <div className="min-h-screen w-full bg-slate-50 lg:flex">
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
          aria-label="Tutup menu navigasi"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[min(18rem,calc(100vw-2.5rem))] shrink-0 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:z-20 lg:w-64 lg:translate-x-0 lg:shadow-sm ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-700 p-2.5 shadow-lg shadow-emerald-900/15">
              <Warehouse className="text-white" size={23} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">StockFlow</h1>
              <p className="text-[11px] font-medium text-slate-400">Warehouse system</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="border-b border-slate-100 px-4 py-4">
          <label htmlFor="active-company" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Perusahaan aktif
          </label>
          <select
            id="active-company"
            value={activeMembership.companyId}
            onChange={(event) => handleCompanyChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-500"
          >
            {memberships.map((membership) => (
              <option key={membership.companyId} value={membership.companyId}>{membership.companyName}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs capitalize text-slate-400">Akses {activeMembership.role}</p>
        </div>

        {activeMembership.role === 'admin' && <details className="border-b border-slate-100 px-4 py-3">
          <summary className="cursor-pointer list-none text-xs font-semibold text-emerald-700 hover:text-emerald-800">
            + Buat perusahaan lain
          </summary>
          <form onSubmit={handleCreateCompany} className="mt-3 space-y-2">
            <label htmlFor="additional-company-name" className="sr-only">Nama perusahaan baru</label>
            <input
              id="additional-company-name"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              maxLength={120}
              placeholder="Nama perusahaan"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-emerald-500"
              required
            />
            <button type="submit" disabled={creatingCompany} className="w-full rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">
              {creatingCompany ? 'Membuat...' : 'Buat perusahaan'}
            </button>
            {companyError && <p role="alert" className="text-xs text-red-600">{companyError}</p>}
          </form>
        </details>}

        {navigation}

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={19} />
            <span className="text-[13px] font-semibold">Keluar</span>
          </button>
        </div>
      </aside>

      <main className="flex min-h-screen min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100"
            aria-label="Buka menu navigasi"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={21} />
          </button>
          <div className="flex items-center gap-2">
            <Warehouse size={18} className="text-emerald-700" />
            <span className="max-w-[52vw] truncate text-sm font-bold text-slate-900">{activeMembership.companyName}</span>
          </div>
          <span className="h-10 w-10" aria-hidden="true" />
        </div>

        <div key={activeMembership.companyId} className="dashboard-content flex-1">
          {activeMembership.role === 'staff'
            && !['/dashboard/transactions', '/dashboard/profile'].includes(pathname)
            ? (
              <div role="alert" className="flex min-h-[50vh] items-center justify-center p-8 text-center">
                <div>
                  <Building2 size={40} className="mx-auto mb-3 text-slate-400" />
                  <h1 className="text-xl font-bold text-slate-900">Akses terbatas</h1>
                  <p className="mt-2 text-sm text-slate-500">Akun Staff hanya dapat mencatat transaksi dan mengelola profil.</p>
                </div>
              </div>
            )
            : children}
        </div>

        <footer className="mt-auto flex flex-col gap-1 border-t border-slate-200/70 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} <span className="font-semibold text-slate-500">StockFlow</span>
          </p>
          <p className="text-xs text-slate-400">Warehouse management system</p>
        </footer>
      </main>
    </div>
    </CompanyContextProvider>
  )
}