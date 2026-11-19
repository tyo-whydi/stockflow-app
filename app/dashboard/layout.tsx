'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, Tags, Package, ArrowRightLeft, MapPin, FileText, LogOut, Warehouse, Users, UserCircle, AlertTriangle, History, Boxes, Menu, X
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
  const [lowStockCount, setLowStockCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ============ AUTH GUARD ============
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }
      setIsAuthenticated(true)
      setLoading(false)
    }

    checkAuth()

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/login')
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [router])

  // ============ LOW STOCK CHECK ============
  useEffect(() => {
    if (!isAuthenticated) return
    const checkLowStock = async () => {
      const { data, error } = await supabase
        .from('stocks')
        .select('current_stock, products ( min_stock )')
      if (error) {
        console.error('Gagal memeriksa stok menipis:', error.message)
        return
      }
      if (data) {
        const low = data.filter((stock) => {
          const product = Array.isArray(stock.products) ? stock.products[0] : stock.products
          return stock.current_stock <= (product?.min_stock ?? 10)
        }).length
        setLowStockCount(low)
      }
    }
    checkLowStock()
    const interval = setInterval(checkLowStock, 60000)
    return () => clearInterval(interval)
  }, [pathname, isAuthenticated])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  // Loading screen sambil verifikasi
  if (loading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  const navigation = (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
      <p className="mb-3 px-3 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        Menu utama
      </p>
      {menuItems.map((item) => {
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
            <span className="text-sm font-bold text-slate-900">StockFlow</span>
          </div>
          <span className="h-10 w-10" aria-hidden="true" />
        </div>

        <div className="flex-1">{children}</div>

        <footer className="mt-auto flex flex-col gap-1 border-t border-slate-200/70 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} <span className="font-semibold text-slate-500">StockFlow</span>
          </p>
          <p className="text-xs text-slate-400">Warehouse management system</p>
        </footer>
      </main>
    </div>
  )
}