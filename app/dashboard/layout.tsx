'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard, Tags, Package, ArrowRightLeft, MapPin, FileText, LogOut, Warehouse, Users, UserCircle, AlertTriangle, History
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Kategori', href: '/dashboard/categories', icon: Tags },
  { name: 'Produk', href: '/dashboard/products', icon: Package },
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
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // ============ AUTH GUARD ============
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }
      setIsAuthenticated(true)

      const emailPrefix = user.email?.split('@')[0] || 'user'
      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle()
      setUserName(prof?.full_name || emailPrefix)
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
      const { data } = await supabase
        .from('stocks')
        .select('current_stock, products ( min_stock )')
      if (data) {
        const low = data.filter((s: any) => s.current_stock <= (s.products?.min_stock || 10)).length
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

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <aside className="w-72 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen shadow-sm">
        <div className="p-7 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
              <Warehouse className="text-white" size={26} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">StockFlow</h1>
              <p className="text-xs text-slate-400 font-medium">Warehouse System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-1.5 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3 mt-2">Menu Utama</p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const showBadge = item.badge === 'lowStock' && lowStockCount > 0
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? 'flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/25'
                    : 'flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                }
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[15px] flex-1">{item.name}</span>
                {showBadge && (
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-red-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <AlertTriangle size={10} />
                    {lowStockCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-5 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            <span className="text-[15px]">Keluar</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        <div className="flex-1">{children}</div>

        <footer className="py-6 px-10 text-center border-t border-slate-100 mt-auto">
          <p className="text-sm text-slate-400 font-medium">
            © 2026 <span className="text-slate-500 font-semibold">StockFlow</span>
          </p>
          <p className="text-xs text-slate-400 mt-1.5">
            Rekap ini dibuat oleh <span className="text-emerald-600 font-semibold">@{userName || 'user'}</span>
          </p>
        </footer>
      </main>
    </div>
  )
}