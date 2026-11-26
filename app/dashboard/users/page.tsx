'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useCompanyContext } from '@/lib/company-context'
import { Building2, UserCog, ShieldCheck, User, Search, RefreshCw, Users, UserRoundPlus, UserMinus, Save } from 'lucide-react'

type CompanyUser = {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'staff' | 'manager'
}
type UserRole = CompanyUser['role']

export default function UsersPage() {
  const { activeCompanyId, activeCompanyName, activeCompanyRole, updateCompanyName } = useCompanyContext()
  const [users, setUsers] = useState<CompanyUser[]>([])
  const [fetching, setFetching] = useState(true)
  const [currentUserId, setCurrentUserId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL')
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState<UserRole>('staff')
  const [companyDraft, setCompanyDraft] = useState({ id: activeCompanyId, name: activeCompanyName })
  const [savingCompany, setSavingCompany] = useState(false)

  const fetchUsers = async () => {
    setFetching(true)
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) {
        console.error('Gagal memeriksa pengguna saat ini:', authError.message)
        setErrorMessage('Akun saat ini belum dapat diverifikasi.')
        return
      }
      if (!user) {
        setErrorMessage('Sesi login tidak ditemukan. Silakan masuk kembali.')
        return
      }
      setCurrentUserId(user.id)

      const { data: membershipRows, error: membershipError } = await supabase
        .from('company_memberships')
        .select('user_id, role')
        .eq('company_id', activeCompanyId)
        .order('created_at', { ascending: true })
      if (membershipError) {
        console.error('Gagal memuat anggota perusahaan:', membershipError.message)
        setErrorMessage('Daftar anggota belum dapat dimuat.')
        return
      }

      const memberIds = (membershipRows ?? []).map((membership) => membership.user_id)
      const { data: profileRows, error: profilesError } = memberIds.length > 0
        ? await supabase
          .from('profiles')
          .select('id, email, full_name')
          .in('id', memberIds)
        : { data: [], error: null }
      if (profilesError) {
        console.error('Gagal memuat profil anggota:', profilesError.message)
        setErrorMessage('Profil anggota belum dapat dimuat.')
        return
      }

      const profileById = new Map((profileRows ?? []).map((profile) => [profile.id, profile]))
      setUsers((membershipRows ?? []).flatMap((membership) => {
        const profile = profileById.get(membership.user_id)
        return profile ? [{ ...profile, role: membership.role as UserRole }] : []
      }))
      setErrorMessage('')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (activeCompanyRole !== 'admin') return
    const request = window.setTimeout(() => void fetchUsers(), 0)
    return () => window.clearTimeout(request)
  }, [activeCompanyId, activeCompanyRole])

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    if (userId === currentUserId && activeCompanyRole === 'admin' && newRole !== 'admin') {
      setErrorMessage('Akun admin yang sedang digunakan tidak dapat menurunkan hak aksesnya sendiri.')
      return
    }
    setUpdatingUserId(userId)
    setErrorMessage('')
    const target = users.find((companyUser) => companyUser.id === userId)
    if (!target) {
      setErrorMessage('Anggota perusahaan tidak ditemukan.')
      setUpdatingUserId(null)
      return
    }
    const { error } = await supabase.rpc('add_company_member', {
      p_company_id: activeCompanyId,
      p_email: target.email,
      p_role: newRole,
    })
    if (error) {
      console.error('Gagal memperbarui hak akses:', error.message)
      setErrorMessage('Hak akses gagal diperbarui. Periksa izin dan koneksi.')
    } else await fetchUsers()
    setUpdatingUserId(null)
  }

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault()
    const email = memberEmail.trim().toLowerCase()
    if (!email) return
    setUpdatingUserId(email)
    setErrorMessage('')
    const { error } = await supabase.rpc('add_company_member', {
      p_company_id: activeCompanyId,
      p_email: email,
      p_role: memberRole,
    })
    if (error) {
      console.error('Gagal menambahkan anggota perusahaan:', error.message)
      setErrorMessage('Anggota gagal ditambahkan. Email harus memiliki akun StockFlow terlebih dahulu.')
    } else {
      setMemberEmail('')
      await fetchUsers()
    }
    setUpdatingUserId(null)
  }

  const handleRemoveMember = async (userId: string) => {
    if (userId === currentUserId) {
      setErrorMessage('Pindah ke perusahaan lain sebelum mengeluarkan akun Anda sendiri.')
      return
    }
    const member = users.find((companyUser) => companyUser.id === userId)
    if (!member || !confirm(`Keluarkan ${member.full_name || member.email} dari perusahaan ini?`)) return
    setUpdatingUserId(userId)
    setErrorMessage('')
    const { error } = await supabase.rpc('remove_company_member', {
      p_company_id: activeCompanyId,
      p_user_id: userId,
    })
    if (error) {
      console.error('Gagal mengeluarkan anggota:', error.message)
      setErrorMessage('Anggota gagal dikeluarkan. Pastikan masih ada admin perusahaan.')
    } else await fetchUsers()
    setUpdatingUserId(null)
  }

  const handleRenameCompany = async (event: React.FormEvent) => {
    event.preventDefault()
    const name = (companyDraft.id === activeCompanyId ? companyDraft.name : activeCompanyName).trim()
    if (name.length < 2) {
      setErrorMessage('Nama perusahaan minimal 2 karakter.')
      return
    }
    setSavingCompany(true)
    setErrorMessage('')
    const { error } = await supabase
      .from('companies')
      .update({ name })
      .eq('id', activeCompanyId)
    if (error) {
      console.error('Gagal memperbarui nama perusahaan:', error.message)
      setErrorMessage('Nama perusahaan gagal diperbarui.')
    } else {
      updateCompanyName(activeCompanyId, name)
      setCompanyDraft({ id: activeCompanyId, name })
    }
    setSavingCompany(false)
  }

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.trim().toLowerCase()
    const matchesSearch = !query ||
      user.full_name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    return matchesSearch && (roleFilter === 'ALL' || user.role === roleFilter)
  })

  if (activeCompanyRole !== 'admin') {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <ShieldCheck size={64} className="text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">Akses Ditolak</h1>
          <p className="text-slate-500 mt-2">Hanya Admin yang dapat mengakses halaman ini.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
          <UserCog className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Perusahaan & Anggota</h1>
          <p className="text-slate-500">Kelola identitas perusahaan dan akses anggota di workspace aktif.</p>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => void fetchUsers()} className="inline-flex shrink-0 items-center gap-1 font-semibold">
            <RefreshCw size={14} /> Muat ulang
          </button>
        </div>
      )}

      <div className="mb-6 grid gap-4 xl:grid-cols-2">
        <form onSubmit={handleRenameCompany} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Building2 size={19} /></span>
            <div>
              <h2 className="font-bold text-slate-900">Identitas perusahaan</h2>
              <p className="text-xs text-slate-500">Nama ini hanya berlaku untuk perusahaan aktif.</p>
            </div>
          </div>
          <label htmlFor="company-name" className="mb-2 block text-sm font-semibold text-slate-700">Nama perusahaan</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="company-name"
              value={companyDraft.id === activeCompanyId ? companyDraft.name : activeCompanyName}
              onChange={(event) => setCompanyDraft({ id: activeCompanyId, name: event.target.value })}
              maxLength={120}
              required
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
            />
            <button type="submit" disabled={savingCompany} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50">
              <Save size={16} /> {savingCompany ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>

        <form onSubmit={handleAddMember} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><UserRoundPlus size={19} /></span>
            <div>
              <h2 className="font-bold text-slate-900">Tambahkan anggota</h2>
              <p className="text-xs text-slate-500">Akun harus sudah terdaftar di StockFlow.</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_150px_auto]">
            <input
              type="email"
              value={memberEmail}
              onChange={(event) => setMemberEmail(event.target.value)}
              placeholder="nama@perusahaan.com"
              aria-label="Email anggota"
              required
              className="min-w-0 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
            />
            <select value={memberRole} onChange={(event) => {
              const value = event.target.value
              if (value === 'admin' || value === 'manager' || value === 'staff') setMemberRole(value)
            }} aria-label="Peran anggota" className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" disabled={updatingUserId === memberEmail.trim().toLowerCase()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50">
              <UserRoundPlus size={16} /> Tambah
            </button>
          </div>
        </form>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Total pengguna', value: users.length, icon: Users, color: 'text-slate-800' },
          { label: 'Admin', value: users.filter((user) => user.role === 'admin').length, icon: ShieldCheck, color: 'text-violet-700' },
          { label: 'Staff & manager', value: users.filter((user) => user.role !== 'admin').length, icon: User, color: 'text-emerald-700' },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600"><Icon size={20} /></span>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{fetching ? '—' : stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 gap-3 border-b border-slate-100 p-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative">
            <span className="sr-only">Cari pengguna</span>
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari nama atau email..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <select
            value={roleFilter}
            onChange={(event) => {
              const value = event.target.value
              if (value === 'ALL' || value === 'admin' || value === 'manager' || value === 'staff') setRoleFilter(value)
            }}
            aria-label="Filter peran pengguna"
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="ALL">Semua peran</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <p className="text-xs text-slate-500 sm:col-span-2">
            Menampilkan <span className="font-semibold text-slate-700">{filteredUsers.length}</span> dari {users.length} pengguna
          </p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : (
              filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400">
                  {users.length ? 'Tidak ada pengguna yang cocok.' : 'Belum ada pengguna.'}
                </td></tr>
              ) : filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="px-8 py-5 font-medium text-slate-800">
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-slate-400" />
                      {u.full_name || 'Tanpa Nama'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-600">{u.email}</td>
                  <td className="px-8 py-5">
                    <select
                      value={u.role}
                      disabled={updatingUserId === u.id || u.id === currentUserId}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === 'admin' || value === 'manager' || value === 'staff') {
                          void handleRoleChange(u.id, value)
                        }
                      }}
                      aria-label={`Hak akses ${u.full_name || u.email}`}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border outline-none cursor-pointer transition ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        u.role === 'manager' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <option value="staff">Staff (Hanya Input)</option>
                      <option value="manager">Manager (Lihat Laporan)</option>
                      <option value="admin">Admin (Akses Penuh)</option>
                    </select>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button
                      type="button"
                      onClick={() => void handleRemoveMember(u.id)}
                      disabled={updatingUserId === u.id || u.id === currentUserId}
                      aria-label={`Keluarkan ${u.full_name || u.email}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <UserMinus size={17} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}