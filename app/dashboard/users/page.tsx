'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserCog, ShieldCheck, User } from 'lucide-react'

type Profile = {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'staff' | 'manager'
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([])
  const [fetching, setFetching] = useState(true)
  const [currentUserRole, setCurrentUserRole] = useState<string>('')

  const fetchUsers = async () => {
    setFetching(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      setCurrentUserRole(profile?.role || 'staff')
    }
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: true })
    if (data) setUsers(data)
    setFetching(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId)
    if (error) alert('Gagal update role: ' + error.message)
    else fetchUsers()
  }

  if (currentUserRole !== 'admin') {
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manajemen User</h1>
          <p className="text-slate-500">Kelola hak akses staff gudang.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-8 py-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan={3} className="px-8 py-10 text-center text-slate-400">Memuat data...</td></tr>
            ) : (
              users.map((u) => (
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
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border outline-none cursor-pointer transition ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        u.role === 'manager' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="staff">Staff (Hanya Input)</option>
                      <option value="manager">Manager (Lihat Laporan)</option>
                      <option value="admin">Admin (Akses Penuh)</option>
                    </select>
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