'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCompanyContext } from '@/lib/company-context'
import { User, Lock, Save, Shield, ShieldCheck } from 'lucide-react'

export default function ProfilePage() {
  const { activeCompanyRole } = useCompanyContext()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const request = window.setTimeout(() => {
      void (async () => {
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          if (userError) throw userError
          if (!user) {
            setError('Sesi login tidak ditemukan. Silakan masuk kembali.')
            return
          }
          setEmail(user.email || '')
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single()
          if (profileError) throw profileError
          setFullName(profile.full_name || '')
        } catch (profileError) {
          console.error('Gagal memuat profil:', profileError)
          setError('Profil belum dapat dimuat. Coba muat ulang halaman.')
        } finally {
          setFetching(false)
        }
      })()
    }, 0)
    return () => window.clearTimeout(request)
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = fullName.trim()
    if (!trimmedName) {
      setError('Nama lengkap tidak boleh kosong.')
      return
    }
    setLoadingProfile(true)
    setMessage('')
    setError('')

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) {
        setError('Sesi login habis. Silakan masuk kembali.')
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ full_name: trimmedName })
        .eq('id', user.id)
      if (updateError) throw updateError
      setFullName(trimmedName)
      setMessage('Profil berhasil diperbarui.')
    } catch (profileError) {
      console.error('Gagal memperbarui profil:', profileError)
      setError('Profil gagal diperbarui. Periksa koneksi lalu coba lagi.')
    } finally {
      setLoadingProfile(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setError('Password tidak cocok!'); return }
    if (newPassword.length < 6) { setError('Password minimal 6 karakter.'); return }

    setLoadingPassword(true)
    setMessage('')
    setError('')

    try {
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword })
      if (passwordError) throw passwordError
      setMessage('Password berhasil diganti.')
      setNewPassword('')
      setConfirmPassword('')
    } catch (passwordError) {
      console.error('Gagal mengganti password:', passwordError)
      setError('Password gagal diperbarui. Pastikan koneksi aktif lalu coba lagi.')
    } finally {
      setLoadingPassword(false)
    }
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <User className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Profil Saya</h1>
          <p className="text-slate-500">Kelola informasi akun dan keamanan.</p>
        </div>
      </div>

      {fetching && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-500 shadow-sm">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-600" />
          Memuat informasi akun...
        </div>
      )}
      {message && (
        <div role="status" className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl mb-6 text-sm font-medium">
          ✓ {message}
        </div>
      )}
      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium">
          ⚠ {error}
        </div>
      )}

      {/* Informasi Akun */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <User size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Akun aktif</p>
            <p className="mt-1 font-semibold text-slate-900">{email || '—'}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2">
            <Shield size={16} className="text-purple-600" />
            <span className="text-xs font-bold text-purple-700 capitalize">{activeCompanyRole}</span>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              maxLength={100}
              disabled={fetching}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingProfile || fetching}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
          >
            <Save size={18} />
            {loadingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      {/* Ganti Password */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Ganti Password</h2>
            <p className="text-sm text-slate-500">Minimal 6 karakter untuk keamanan</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
              maxLength={72}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Konfirmasi Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              minLength={6}
              maxLength={72}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingPassword}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
          >
            <Lock size={18} />
            {loadingPassword ? 'Memproses...' : 'Ganti Password'}
          </button>
        </form>
      </div>
    </div>
  )
}