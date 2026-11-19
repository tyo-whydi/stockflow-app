'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
  Warehouse,
} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

      if (loginError) {
        setError(
          loginError.message === 'Invalid login credentials'
            ? 'Email atau password tidak sesuai. Periksa kembali lalu coba lagi.'
            : 'Login belum berhasil. Periksa koneksi internet dan coba lagi.',
        )
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (loginError) {
      console.error('Gagal login:', loginError)
      setError('Terjadi kendala saat login. Silakan coba beberapa saat lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-shell relative flex min-h-screen items-stretch overflow-hidden bg-white">
      <div className="login-decoration login-decoration-one" aria-hidden="true" />
      <div className="login-decoration login-decoration-two" aria-hidden="true" />

      <section className="login-story relative hidden w-[48%] flex-col justify-between overflow-hidden px-12 py-10 text-white lg:flex xl:px-16 xl:py-12">
        <div className="login-story-grid" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-black/10 backdrop-blur">
            <Warehouse size={23} strokeWidth={2} />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">StockFlow</span>
            <span className="block text-[11px] font-medium tracking-wide text-emerald-100/70">WAREHOUSE MANAGEMENT</span>
          </span>
        </div>

        <div className="relative z-10 max-w-xl py-12">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100/15 bg-white/[0.08] px-3.5 py-2 text-xs font-semibold text-emerald-50">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.8)]" />
            Sistem gudang dalam satu kendali
          </span>
          <h1 className="max-w-lg text-4xl font-bold leading-[1.14] tracking-tight xl:text-5xl">
            Stok tertata.
            <br />
            Operasional <span className="text-emerald-200">lebih lancar.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-emerald-50/75">
            Kelola produk, pergerakan barang, dan lokasi penyimpanan dengan alur kerja yang mudah diikuti.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300/15 text-emerald-100">
                <PackageCheck size={18} />
              </span>
              <p className="text-sm font-semibold">Stok terpantau</p>
              <p className="mt-1 text-xs leading-5 text-emerald-50/65">Informasi barang dan rak lebih mudah ditemukan.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-300/15 text-sky-100">
                <ShieldCheck size={18} />
              </span>
              <p className="text-sm font-semibold">Akses terjaga</p>
              <p className="mt-1 text-xs leading-5 text-emerald-50/65">Masuk dengan akun terdaftar untuk mulai bekerja.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-emerald-50/55">
          <span>© {new Date().getFullYear()} StockFlow</span>
          <span>Warehouse management system</span>
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-[52%] lg:px-12 xl:px-20">
        <div className="login-form-wrap w-full max-w-[440px]">
          <div className="mb-9 text-center lg:text-left">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-xl shadow-emerald-900/15 lg:hidden">
              <Warehouse size={27} />
            </div>
            <p className="mb-2 text-sm font-semibold text-emerald-700">Selamat datang kembali</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[34px]">Masuk ke StockFlow</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Gunakan akun Anda untuk melanjutkan ke dashboard gudang.
            </p>
          </div>

          <div className="login-form-card rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-35px_rgba(15,23,42,.28)] sm:p-8">
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm leading-5 text-red-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">!</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <div className="login-input-wrap relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <span className="text-xs text-slate-400">Minimal 6 karakter</span>
                </div>
                <div className="login-input-wrap relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Memeriksa akun...
                  </>
                ) : (
                  <>
                    Masuk ke dashboard
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2.5 border-t border-slate-100 pt-5">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              <p className="text-xs leading-5 text-slate-500">
                Akses hanya tersedia untuk pengguna StockFlow yang telah terdaftar.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400 lg:text-left">
            © {new Date().getFullYear()} StockFlow · Sistem manajemen gudang
          </p>
        </div>
      </section>
    </main>
  )
}
