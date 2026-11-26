import { createClient } from '@supabase/supabase-js'

type CompanyRole = 'admin' | 'manager' | 'staff'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCompanyRole(value: unknown): value is CompanyRole {
  return value === 'admin' || value === 'manager' || value === 'staff'
}

export async function POST(request: Request) {
  const accessToken = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  if (!accessToken) {
    return Response.json({ error: 'Sesi login tidak ditemukan. Silakan masuk kembali.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Data permintaan tidak valid.' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return Response.json({ error: 'Data permintaan tidak valid.' }, { status: 400 })
  }

  const companyId = body.companyId
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const role = body.role
  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''

  if (
    typeof companyId !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(companyId) ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !isCompanyRole(role) ||
    fullName.length > 100
  ) {
    return Response.json({ error: 'Periksa kembali email, nama, role, dan perusahaan.' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!supabaseUrl || !anonKey || !serviceRoleKey || !siteUrl) {
    console.error('Konfigurasi server untuk pembuatan akun belum lengkap.')
    return Response.json({ error: 'Fitur pembuatan akun belum dikonfigurasi di server.' }, { status: 503 })
  }

  let redirectTo: string
  try {
    const parsedSiteUrl = new URL(siteUrl)
    if (parsedSiteUrl.protocol !== 'https:' && parsedSiteUrl.protocol !== 'http:') {
      throw new Error('Unsupported site URL protocol')
    }
    redirectTo = new URL('/dashboard/profile', parsedSiteUrl).toString()
  } catch {
    console.error('NEXT_PUBLIC_SITE_URL bukan URL yang valid.')
    return Response.json({ error: 'Konfigurasi alamat aplikasi belum valid.' }, { status: 503 })
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  })
  const { data: authData, error: authError } = await userClient.auth.getUser(accessToken)
  if (authError || !authData.user) {
    return Response.json({ error: 'Sesi login tidak valid. Silakan masuk kembali.' }, { status: 401 })
  }

  const { data: isCompanyAdmin, error: permissionError } = await userClient.rpc('has_company_role', {
    p_company_id: companyId,
    p_roles: ['admin'],
  })
  if (permissionError) {
    console.error('Gagal memeriksa hak Admin perusahaan:', permissionError.message)
    return Response.json({ error: 'Hak akses perusahaan belum dapat diverifikasi.' }, { status: 500 })
  }
  if (!isCompanyAdmin) {
    return Response.json({ error: 'Hanya Admin perusahaan yang dapat menambahkan anggota.' }, { status: 403 })
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  })
  const { data: invitation, error: invitationError } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName || email.split('@')[0] },
    redirectTo,
  })

  if (invitationError) {
    const errorText = invitationError.message.toLowerCase()
    const isExistingAccount = invitationError.code === 'user_already_exists' ||
      invitationError.code === 'email_exists' ||
      errorText.includes('already registered') ||
      errorText.includes('already been registered')

    if (!isExistingAccount) {
      console.error('Gagal mengirim undangan anggota:', invitationError.message)
      return Response.json({
        error: 'Undangan gagal dikirim. Periksa konfigurasi email Supabase lalu coba lagi.',
      }, { status: 502 })
    }

    const { error: addExistingError } = await userClient.rpc('add_company_member', {
      p_company_id: companyId,
      p_email: email,
      p_role: role,
    })
    if (addExistingError) {
      console.error('Gagal menambahkan akun terdaftar ke perusahaan:', addExistingError.message)
      return Response.json({
        error: 'Akun sudah terdaftar tetapi belum dapat ditambahkan ke perusahaan.',
      }, { status: 400 })
    }
    return Response.json({ status: 'existing' })
  }

  const invitedUser = invitation.user
  if (!invitedUser) {
    console.error('Supabase tidak mengembalikan akun setelah mengirim undangan.')
    return Response.json({ error: 'Akun undangan belum berhasil dibuat.' }, { status: 502 })
  }

  const { error: profileError } = await adminClient.from('profiles').upsert({
    id: invitedUser.id,
    email: invitedUser.email ?? email,
    full_name: fullName || email.split('@')[0],
    role: 'staff',
  }, { onConflict: 'id', ignoreDuplicates: true })
  if (profileError) {
    console.error('Gagal menyiapkan profil akun undangan:', profileError.message)
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(invitedUser.id)
    if (deleteError) console.error('Gagal membatalkan akun undangan:', deleteError.message)
    return Response.json({ error: 'Profil anggota gagal disiapkan. Silakan coba lagi.' }, { status: 500 })
  }

  const { error: addMemberError } = await userClient.rpc('add_company_member', {
    p_company_id: companyId,
    p_email: email,
    p_role: role,
  })
  if (addMemberError) {
    console.error('Gagal menambahkan akun undangan ke perusahaan:', addMemberError.message)
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(invitedUser.id)
    if (deleteError) console.error('Gagal membatalkan akun undangan:', deleteError.message)
    return Response.json({
      error: 'Akun undangan berhasil dibuat, tetapi akses perusahaan gagal disiapkan. Silakan coba lagi.',
    }, { status: 500 })
  }

  return Response.json({ status: 'invited' }, { status: 201 })
}
