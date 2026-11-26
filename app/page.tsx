import Link from 'next/link'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpFromLine,
  AlertTriangle,
  Boxes,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileSpreadsheet,
  MapPin,
  Menu,
  Package,
  ShieldCheck,
  Sparkles,
  Warehouse,
} from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Produk dan kategori',
    description: 'Atur SKU, kategori, dan batas minimum agar katalog mudah dicari dan dirawat.',
    tone: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Warehouse,
    title: 'Stok per lokasi',
    description: 'Lihat jumlah stok berdasarkan gudang dan rak penyimpanannya.',
    tone: 'bg-violet-50 text-violet-700',
  },
  {
    icon: ArrowRightLeft,
    title: 'Barang masuk dan keluar',
    description: 'Catat pergerakan barang dengan jumlah, lokasi, dan petugas yang bertanggung jawab.',
    tone: 'bg-sky-50 text-sky-700',
  },
  {
    icon: AlertTriangle,
    title: 'Peringatan stok minimum',
    description: 'Kenali posisi stok yang perlu segera diisi ulang sebelum terlambat.',
    tone: 'bg-amber-50 text-amber-700',
  },
  {
    icon: FileSpreadsheet,
    title: 'Laporan siap diekspor',
    description: 'Tinjau ringkasan stok dan unduh laporan untuk kebutuhan operasional.',
    tone: 'bg-teal-50 text-teal-700',
  },
  {
    icon: ShieldCheck,
    title: 'Riwayat dan pengguna',
    description: 'Telusuri aktivitas dan kelola akses pengguna dari satu tempat.',
    tone: 'bg-blue-50 text-blue-700',
  },
]

const sampleMovements = [
  { name: 'Kopi Arabika 250g', note: 'Barang masuk · Rak A-02', amount: '+24', positive: true },
  { name: 'Kantong Kemasan', note: 'Barang keluar · Rak B-04', amount: '−12', positive: false },
  { name: 'Teh Melati Premium', note: 'Barang masuk · Rak A-01', amount: '+36', positive: true },
]

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#fbfcfa] text-slate-950">
      <header className="relative z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="StockFlow, beranda">
            <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
              <Warehouse size={21} strokeWidth={2.2} />
            </span>
            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-slate-950">
              Stock<span className="text-emerald-700">Flow</span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
            <Link href="#fitur" className="text-[13px] font-semibold text-slate-600 transition hover:text-emerald-700">
              Fitur
            </Link>
            <Link href="#cara-kerja" className="text-[13px] font-semibold text-slate-600 transition hover:text-emerald-700">
              Cara kerja
            </Link>
            <Link href="#tentang" className="text-[13px] font-semibold text-slate-600 transition hover:text-emerald-700">
              Tentang
            </Link>
          </nav>

          <details className="relative md:hidden">
            <summary
              aria-label="Buka navigasi"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            >
              <span className="sr-only">Menu</span>
              <Menu size={18} aria-hidden="true" />
            </summary>
            <nav
              aria-label="Navigasi utama"
              className="absolute right-0 top-full z-50 mt-2 flex w-52 flex-col rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"
            >
              <Link href="#fitur" className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                Fitur
              </Link>
              <Link href="#cara-kerja" className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                Cara kerja
              </Link>
              <Link href="#tentang" className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                Tentang
              </Link>
            </nav>
          </details>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-xl px-3 py-2.5 text-[13px] font-bold text-slate-700 transition hover:bg-slate-100 sm:px-4"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-emerald-700 px-3 text-xs font-bold text-white shadow-md shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800 sm:gap-2 sm:px-5 sm:text-[13px]"
            >
              <span className="sm:hidden">Masuk</span>
              <span className="hidden sm:inline">Buka aplikasi</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_68%_30%,rgba(16,185,129,0.10),transparent_37%),radial-gradient(ellipse_at_6%_15%,rgba(14,165,233,0.07),transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12 lg:pb-28 lg:pt-24">
          <div className="max-w-[600px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-2 text-[11px] font-bold tracking-wide text-emerald-800 shadow-sm">
              <Sparkles size={14} className="text-emerald-600" />
              INVENTARIS LEBIH MUDAH, SETIAP HARI
            </div>
            <h1 className="text-[clamp(2.8rem,6.1vw,5.25rem)] font-extrabold leading-[1.03] tracking-[-0.065em] text-slate-950">
              Persediaan beres.
              <span className="mt-1 block bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Bisnis melaju.
              </span>
            </h1>
            <p className="mt-6 max-w-[500px] text-[16px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
              Kelola stok, transaksi, dan lokasi barang dari satu tempat. Lebih sedikit
              pekerjaan manual, lebih banyak waktu untuk mengembangkan usaha.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
              >
                Kelola inventaris <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#fitur"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-white hover:text-emerald-800"
              >
                Jelajahi fitur <ChevronRight size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-600" /> Katalog produk</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-600" /> Riwayat transaksi</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-600" /> Pantauan stok</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
            <div className="absolute -inset-5 -z-10 rounded-[38px] bg-gradient-to-br from-emerald-200/50 via-cyan-100/35 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_35px_90px_-38px_rgba(15,23,42,.35)]">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Boxes size={18} /></span>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">Ringkasan gudang</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">Data simulasi · pratinjau</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                  Pratinjau UI
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-5">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold text-slate-500">Total produk</p>
                    <Package size={16} className="text-sky-600" />
                  </div>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">1.284</p>
                  <p className="mt-1 text-[10px] text-slate-400">SKU dalam katalog</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold text-slate-500">Stok terpantau</p>
                    <Boxes size={16} className="text-violet-600" />
                  </div>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">8.650</p>
                  <p className="mt-1 text-[10px] text-slate-400">unit di semua lokasi</p>
                </div>
              </div>

              <div className="mx-4 rounded-2xl border border-slate-100 p-4 sm:mx-5 sm:p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">Aktivitas stok</p>
                    <p className="mt-1 text-[10px] text-slate-400">Barang masuk dan keluar</p>
                  </div>
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500">7 hari terakhir</span>
                </div>
                <div
                  role="img"
                  aria-label="Contoh grafik aktivitas stok selama tujuh hari, menampilkan barang masuk dan keluar."
                  className="flex h-[112px] items-end justify-between gap-2 border-b border-l border-slate-100 px-2 pb-0"
                >
                  {[48, 69, 54, 82, 63, 94, 72, 58, 86, 68, 96, 76].map((height, index) => (
                    <div key={index} className="flex h-full flex-1 items-end justify-center gap-1">
                      <span className="w-full max-w-[11px] rounded-t-sm bg-emerald-500/80" style={{ height: `${height}%` }} />
                      <span className="w-full max-w-[11px] rounded-t-sm bg-sky-200" style={{ height: `${Math.max(20, height - 23)}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[9px] font-medium text-slate-400">
                  <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                </div>
                <div className="mt-4 flex gap-4 text-[10px] font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-emerald-500" /> Masuk</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-sky-200" /> Keluar</span>
                </div>
              </div>

              <div className="p-4 pt-5 sm:px-5 sm:pb-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[12px] font-bold text-slate-800">Transaksi terbaru</p>
                  <span className="text-[10px] font-semibold text-emerald-700">Contoh tampilan</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {sampleMovements.map((movement) => (
                    <div key={movement.name} className="flex items-center gap-3 py-2.5 first:pt-1">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${movement.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                        {movement.positive ? <ArrowDownToLine size={15} /> : <ArrowUpFromLine size={15} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-bold text-slate-800">{movement.name}</p>
                        <p className="mt-0.5 truncate text-[10px] text-slate-400">{movement.note}</p>
                      </div>
                      <span className={`text-xs font-extrabold ${movement.positive ? 'text-emerald-700' : 'text-orange-600'}`}>{movement.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><Clock3 size={18} /></span>
              <span><span className="block text-[11px] font-bold text-slate-800">Pantau stok minimum</span><span className="mt-0.5 block text-[10px] text-slate-400">Tahu kapan harus mengisi ulang</span></span>
            </div>
          </div>
        </div>
      </section>

      <section id="fitur" className="scroll-mt-20 border-y border-slate-200/70 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-emerald-700">SEMUA YANG DIBUTUHKAN</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-4xl">
              Lebih jelas dari barang datang sampai terkirim.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              Peralatan sederhana dan terhubung untuk membantu tim bekerja dengan lebih teratur.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <article key={feature.title} className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/[0.05]">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tone} transition-transform group-hover:scale-105`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-[15px] font-bold tracking-tight text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-slate-500">{feature.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-emerald-700">ALUR YANG LEBIH RINGKAS</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl">
              Satu alur. Lebih sedikit pekerjaan berulang.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              Mulai dengan mencatat produk dan lokasi, lalu perbarui stok setiap kali barang bergerak.
              Riwayat dan ringkasannya selalu siap saat dibutuhkan.
            </p>
            <Link href="/login" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-900">
              Masuk ke StockFlow <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute bottom-10 left-[27px] top-10 w-px bg-gradient-to-b from-emerald-300 via-emerald-200 to-transparent sm:left-[31px]" />
            <div className="space-y-4">
              {[
                { number: '01', title: 'Susun katalog', text: 'Tambahkan produk, kategori, dan batas stok sesuai kebutuhan.', icon: Package },
                { number: '02', title: 'Atur lokasi penyimpanan', text: 'Petakan gudang dan rak agar tim tahu barang berada di mana.', icon: MapPin },
                { number: '03', title: 'Catat dan pantau pergerakan', text: 'Perbarui stok setiap transaksi, lalu tinjau ringkasan dan riwayatnya.', icon: ArrowDownToLine },
              ].map((step) => {
                const Icon = step.icon
                return (
                  <article key={step.number} className="relative flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:gap-5 sm:p-6">
                    <span className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                      <Icon size={20} />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald-700">LANGKAH {step.number}</p>
                      <h3 className="mt-1 text-sm font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-[13px]">{step.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="scroll-mt-20 px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#082c25] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-[40px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-200">
                <ShieldCheck size={14} /> DIBUAT UNTUK OPERASIONAL YANG LEBIH TENANG
              </span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
                Mulai rapikan inventaris hari ini.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50/70 sm:text-base">
                Buka dashboard StockFlow untuk mengelola produk, stok gudang, transaksi, dan laporan.
              </p>
            </div>
            <Link href="/login" className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-bold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50">
              Masuk ke dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-emerald-700 text-white"><Warehouse size={16} /></span>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">StockFlow</span>
          </Link>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} StockFlow. Inventaris lebih rapi, bisnis lebih siap.</p>
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-emerald-700">
            <CircleHelp size={14} /> Masuk ke akun <ArrowRight size={13} />
          </Link>
        </div>
      </footer>
    </main>
  )
}
