'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User, Lock, Save, Mail, Shield } from 'lucide-react'

export default function ProfilePage() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || '')
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (prof) {
          setFullName(prof.full_name || '')
          setRole(prof.role || 'staff')
        }
      }
    }
    fetchProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingProfile(true)
    setMessage('')
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Sesi habis.'); setLoadingProfile(false); return }

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id)

    if (error) setError('Gagal update: ' + error.message)
    else setMessage('Profil berhasil diupdate!')
    setLoadingProfile(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setError('Password tidak cocok!'); return }
    if (newPassword.length < 6) { setError('Password minimal 6 karakter.'); return }

    setLoadingPassword(true)
    setMessage('')
    setError('')

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) setError('Gagal ganti password: ' + error.message)
    else {
      setMessage('Password berhasil diganti!')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoadingPassword(false)
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

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl mb-6 text-sm font-medium">
          ✓ {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-medium">
          ⚠ {error}
        </div>
      )}

      {/* Informasi Akun */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
          <Mail className="text-slate-400" size={20} />
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-semibold text-slate-900">{email}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
            <Shield size={16} className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-700 capitalize">{role}</span>
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
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingProfile}
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
          <Lock className="text-slate-400" size={20} />
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