import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  ChevronRight,
  Globe,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  PackageCheck,
  Quote,
  ShoppingBasket,
  ShoppingCart,
  Snowflake,
  Sprout,
  Star,
  Truck,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react'
import '../App.css'

const products = [
  {
    name: 'Kelapa Kopyor Segar Utuh',
    description: 'Dipetik saat matang, kesegaran dan tekstur kopyor terjaga.',
    unit: 'Berat ± 1 kg / butir',
    price: 'Rp 65.000',
    suffix: '/ butir',
    badge: 'Paling Laris',
    category: 'Kelapa Kopyor Segar',
    rating: '4.9',
    label: 'Kopyor Segar',
  },
  {
    name: 'Daging Kopyor Beku Murni',
    description: 'Daging kopyor pilihan, dibekukan cepat tanpa bahan tambahan.',
    unit: 'Kemasan 500 gr / pack',
    price: 'Rp 85.000',
    suffix: '/ pack',
    badge: 'Stok Terbatas',
    category: 'Bahan Baku B2B',
    rating: '4.8',
    label: 'Frozen',
  },
  {
    name: 'Es Kopyor Tradisional Premium',
    description: 'Minuman kopyor segar dengan rasa autentik khas Pati.',
    unit: 'Botol 250 ml',
    price: 'Rp 32.000',
    suffix: '/ botol',
    badge: 'Siap Minum',
    category: 'Olahan Dingin',
    rating: '5.0',
    label: 'Olahan Dingin',
  },
  {
    name: 'Kopyor Virgin Coconut Oil (VCO)',
    description: 'VCO murni dari kelapa kopyor pilihan, diproses higienis.',
    unit: 'Botol 250 ml',
    price: 'Rp 110.000',
    suffix: '/ botol',
    badge: 'Organik',
    category: 'Bahan Baku B2B',
    rating: '4.9',
    label: 'Organik',
  },
]

const categories = ['Semua Produk', 'Kelapa Kopyor Segar', 'Olahan Dingin', 'Bahan Baku B2B']

const standards = [
  {
    icon: BadgeCheck,
    title: 'Kualitas Grade A Terkurasi',
    body: 'Setiap butir melewati proses seleksi dan kontrol mutu yang transparan.',
    link: 'Pelajari Standar Kualitas',
  },
  {
    icon: WalletCards,
    title: 'Harga Adil Petani',
    body: 'Kemitraan langsung memastikan nilai panen yang lebih baik untuk petani.',
    link: 'Lihat Dampak Ekonomi',
  },
  {
    icon: Snowflake,
    title: 'Rantai Dingin Cepat',
    body: 'Penanganan dan pengiriman terjaga agar kopyor tiba tetap segar.',
    link: 'Cek Jangkauan Kirim',
  },
  {
    icon: UsersRound,
    title: 'Mendukung UMKM Lokal',
    body: 'Bahan baku berkualitas untuk membantu bisnis kuliner tumbuh bersama.',
    link: 'Gabung Mitra Bisnis',
  },
]

const steps = [
  { icon: ShoppingBasket, title: 'Pilih Produk & Kebutuhan', note: 'Belanja sesuai kebutuhan' },
  { icon: Sprout, title: 'Panen Sesuai Pesanan', note: 'Langsung dari kebun mitra' },
  { icon: PackageCheck, title: 'Quality Control & Packing', note: 'Diperiksa dan dikemas aman' },
  { icon: Truck, title: 'Pengiriman Kilat Bergaransi', note: 'Dikirim cepat, tetap segar' },
]

const testimonials = [
  {
    name: 'Ibu Dijah',
    age: '21 Th',
    quote: 'Sekarang hasil panen lebih pasti. Pembeli dan harga jelas sejak awal.',
  },
  {
    name: 'Pak Pram',
    age: '28 Th',
    quote: 'Bergabung membuat saya bangga bertani kopyor dan membangun usaha di desa.',
  },
  {
    name: 'Pak Ono',
    age: '24 Th',
    quote: 'Kopyor sampai segar dan kualitasnya konsisten. Pelanggan saya suka!',
  },
]

function ImagePlaceholder({ label, className = '' }) {
  return (
    <div
      className={`image-placeholder flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 px-5 text-center text-sm font-medium text-gray-500 ${className}`}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  )
}

function Brand({ light = false }) {
  return (
    <a className="flex shrink-0 items-center gap-3" href="#beranda" aria-label="BumiKopyor beranda">
      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${light ? 'bg-white/10' : 'bg-[#EBF3EE]'}`}>
        <Leaf className={`h-6 w-6 ${light ? 'text-[#b8d7bf]' : 'text-[#14452B]'}`} />
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-[#113B24]'}`}>BumiKopyor</span>
        <span className={`mt-1 block text-[10px] ${light ? 'text-white/60' : 'text-gray-500'}`}>Ekosistem Kelapa Kopyor Digital</span>
      </span>
    </a>
  )
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const visibleProducts = useMemo(
    () => activeCategory === categories[0]
      ? products
      : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Navigasi utama">
            <a className="nav-link nav-link-active" href="#beranda">Beranda</a>
            <Link className="nav-link" to="/produk">Produk</Link>
            <a className="nav-link" href="#petani">Petani</a>
            <a className="nav-link" href="#tentang">Tentang</a>
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <a href="#masuk" className="text-sm font-semibold text-gray-600 transition hover:text-[#14452B]">Masuk</a>
            <a href="#mitra" className="rounded-xl bg-[#14452B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#113B24]">Daftar sebagai Mitra</a>
            <button type="button" className="relative rounded-xl p-2 text-[#113B24] transition hover:bg-[#F3F7F4]" aria-label={`Keranjang belanja, ${cartCount} item`}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d68d47] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button type="button" className="relative rounded-xl p-2 text-[#113B24]" aria-label={`Keranjang, ${cartCount} item`}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d68d47] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-xl p-2 text-[#113B24]" aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="grid gap-1 border-t border-gray-100 bg-white px-5 py-4 md:hidden" aria-label="Navigasi mobile">
            {['Beranda', 'Produk', 'Petani', 'Tentang'].map((item) =>
              item === 'Produk' ? (
                <Link key={item} to="/produk" onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#F3F7F4]">{item}</Link>
              ) : (
                <a key={item} href={`#${item === 'Beranda' ? 'beranda' : item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-[#F3F7F4]">{item}</a>
              )
            )}
            <a href="#mitra" onClick={() => setMobileMenuOpen(false)} className="mt-2 rounded-xl bg-[#14452B] px-4 py-3 text-center text-sm font-semibold text-white">Daftar sebagai Mitra</a>
          </nav>
        )}
      </header>

      <main>
        <section id="beranda" className="overflow-hidden bg-[#F9FBF9]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 md:grid-cols-2 md:gap-10 md:pb-20 md:pt-16 lg:px-8 lg:pt-20">
            <div className="relative z-10">
              <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#dce9df] bg-[#EBF3EE] px-3.5 py-2 text-xs font-semibold leading-5 text-[#14452B]">
                <BadgeCheck className="h-4 w-4 shrink-0" />
                <span>Platform Kopyor Terpercaya #1 di Indonesia • Terverifikasi Langsung dari Pati</span>
              </div>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.13] tracking-[-0.045em] text-[#111827] sm:text-5xl lg:text-[60px]">
                Dari Kebun ke Meja, <span className="font-serif font-medium italic text-[#28633d]">Langsung dari Petani.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 md:text-[17px]">
                BumiKopyor memberdayakan ratusan petani kelapa kopyor asli di Pati melalui digitalisasi rantai pasok, jaminan kualitas panen bersertifikat, dan akses pasar langsung tanpa perantara tengkulak.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/produk" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14452B] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#113B24]">
                  Jelajahi Produk <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#mitra" className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-[#14452B] transition hover:border-[#14452B] hover:bg-[#F3F7F4]">
                  Daftar sebagai Petani
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <div className="flex -space-x-3" aria-label="Pelanggan BumiKopyor">
                  {['BK', 'UM', 'PT'].map((avatar, index) => (
                    <span key={avatar} className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#F9FBF9] text-[10px] font-bold text-[#14452B] ${['bg-[#dce9df]', 'bg-[#e9dfd0]', 'bg-[#e3e8d7]'][index]}`}>{avatar}</span>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                    <span className="flex gap-0.5 text-[#d89536]" aria-label="5 dari 5 bintang">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-3.5 w-3.5 fill-current" />)}</span>
                    <span className="ml-1">4.9/5</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">Dipercaya 2.400+ Pelanggan & Bisnis Kuliner</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[560px]">
              <ImagePlaceholder label="[Placeholder: Foto Kelapa Kopyor Belah Segar]" className="aspect-[1.08/1] min-h-[330px] w-full rounded-[28px] bg-[#eef2eb]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#14452B] shadow-lg sm:left-6 sm:top-6 sm:text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EBF3EE]"><Check className="h-3.5 w-3.5" /></span>
                100% Kopyor Asli Pati
              </div>
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:-bottom-6 sm:left-7 sm:right-7 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]"><Box className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900">Panen Terkini Hari Ini</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" /> Kebun Kec. Margoyoso & Tayu, Pati</p>
                  </div>
                  <div className="hidden border-l border-gray-100 pl-5 sm:block">
                    <p className="text-xs text-gray-500">Grade Super A</p>
                    <p className="mt-1 text-sm font-bold text-[#14452B]">Stok: 850 Butir</p>
                  </div>
                </div>
                <div className="mt-3 border-t border-gray-100 pt-3 sm:hidden">
                  <p className="text-xs font-semibold text-[#14452B]">Grade Super A · Stok: 850 Butir</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-5 pb-20 pt-10 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-[#e7eee8] bg-white shadow-[0_12px_35px_-24px_rgba(17,59,36,0.28)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sprout, value: '850+', label: 'Mitra Petani Terverifikasi' },
              { icon: BadgeCheck, value: '100%', label: 'Kopyor Asli Bergaransi' },
              { icon: Box, value: '12.000+', label: 'Butir Terjual ke Nusantara' },
              { icon: Star, value: '4.9 / 5', label: 'Kepuasan UMKM & Bisnis' },
            ].map(({ icon: Icon, value, label }, index) => (
              <div key={label} className={`flex items-center gap-4 px-5 py-6 sm:px-7 lg:py-7 ${index < 3 ? 'border-b border-gray-100 sm:border-r lg:border-b-0' : ''} ${index === 1 ? 'sm:border-r-0 lg:border-r' : ''}`}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]"><Icon className="h-5 w-5" /></span>
                <div><p className="text-2xl font-bold tracking-tight text-[#113B24]">{value}</p><p className="mt-1 text-xs leading-5 text-gray-500">{label}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="tentang" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
              <div>
                <p className="section-eyebrow">MENGAPA BUMIKOPYOR</p>
                <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#111827] md:text-4xl">Standarisasi Unggul Dari Hulu ke Hilir</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-gray-500">Kami menjaga setiap langkah perjalanan kopyor—dari kebun mitra di Pati hingga sampai dengan kualitas terbaik ke tangan Anda.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {standards.map(({ icon: Icon, title, body, link }) => (
                <article key={title} className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#cbdccd] hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-gray-900">{title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">{body}</p>
                  <a href="#produk" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#28633d] transition group-hover:gap-2">{link} <ArrowRight className="h-3.5 w-3.5" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="produk" className="bg-[#F9FBF9] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="inline-flex rounded-full bg-[#EBF3EE] px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#28633d]">KATALOG TERBAIK</span>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">Produk Kopyor Segar & Olahan Bernilai Tinggi</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500">Dipilih langsung dari petani mitra, diproses dengan standar kualitas terbaik untuk kebutuhan rumah hingga bisnis Anda.</p>
            </div>
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2 md:justify-center" role="tablist" aria-label="Filter kategori produk">
              {categories.map((category) => (
                <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition ${activeCategory === category ? 'bg-[#14452B] text-white shadow-sm' : 'border border-gray-200 bg-white text-gray-600 hover:border-[#b8cdbb] hover:text-[#14452B]'}`}>
                  {category}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <article key={product.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative p-3 pb-0">
                    <ImagePlaceholder label={`[Placeholder: Foto Produk ${product.name}]`} className="aspect-[1.12/1] w-full rounded-xl bg-[#f0f3ef]" />
                    <span className="absolute left-6 top-6 rounded-full bg-[#14452B] px-3 py-1.5 text-[10px] font-bold text-white shadow-sm">{product.badge}</span>
                    <span className="absolute bottom-3 right-6 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#14452B] shadow-sm">{product.label}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-600"><Star className="h-3.5 w-3.5 fill-[#d89536] text-[#d89536]" /> {product.rating} <span className="font-normal text-gray-400">(120+ ulasan)</span></div>
                    <h3 className="mt-2 min-h-11 text-sm font-bold leading-5 text-gray-900">{product.name}</h3>
                    <p className="mt-1 min-h-10 text-xs leading-5 text-gray-500">{product.description}</p>
                    <p className="mt-3 text-[11px] text-gray-400">{product.unit}</p>
                    <p className="mt-1 text-lg font-bold text-[#113B24]">{product.price}<span className="ml-1 text-xs font-medium text-gray-500">{product.suffix}</span></p>
                    <button type="button" onClick={() => setCartCount((count) => count + 1)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14452B] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#113B24]">
                      <ShoppingCart className="h-4 w-4" /> Pesan Sekarang
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link to="/produk" className="inline-flex items-center gap-2 rounded-xl border border-[#cbdccd] bg-white px-5 py-3 text-sm font-bold text-[#14452B] transition hover:bg-[#EBF3EE]">Lihat Semua Produk <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>

        <section id="petani" className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-9">
              <p className="section-eyebrow">CERITA PETANI & DAMPAK</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] md:text-4xl">Dari Tanah Pati untuk Nusantara</h2>
            </div>
            <article className="grid overflow-hidden rounded-3xl border border-gray-200 bg-[#F9FBF9] md:grid-cols-2">
              <div className="relative min-h-[300px] p-4 sm:min-h-[390px] sm:p-6">
                <ImagePlaceholder label="[Placeholder: Foto Petani Tersenyum Memegang Kelapa Kopyor]" className="h-full min-h-[270px] w-full bg-[#eef2eb] sm:min-h-[340px]" />
                <div className="absolute bottom-8 left-8 flex flex-wrap gap-2 sm:bottom-10 sm:left-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-gray-700 shadow-md"><MapPin className="h-3.5 w-3.5 text-[#28633d]" /> Kecamatan Margoyoso, Pati</span>
                  <span className="rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-gray-700 shadow-md">Mitra Sejak 2022</span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                <span className="inline-flex w-fit rounded-full bg-[#EBF3EE] px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#28633d]">KISAH TRANSFORMASI PETANI</span>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">Pak Joko — Petani Kopyor Margoyoso</h3>
                <p className="mt-4 text-sm leading-7 text-gray-600">Dulu hasil panen tergantung tengkulak. Sekarang lewat BumiKopyor, harga lebih adil, stok terserap, dan keluarga lebih tenang.</p>
                <a href="#petani" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#28633d]">Baca Profil Lengkap <ChevronRight className="h-4 w-4" /></a>
              </div>
            </article>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {testimonials.map((t) => (
                <article key={t.name} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <Quote className="h-5 w-5 text-[#cbdccd]" />
                  <p className="mt-3 text-sm leading-6 text-gray-600">“{t.quote}”</p>
                  <p className="mt-4 text-sm font-bold text-gray-900">{t.name} <span className="font-normal text-gray-400">· {t.age}</span></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="overflow-hidden rounded-3xl forest-cta px-6 py-12 text-white sm:px-10 md:px-14 md:py-16">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.16em] text-white/70">GABUNG EKOSISTEM BUMIKOPYOR</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Siap naikkan nilai panen kopyor Anda?</h2>
                <p className="mt-4 text-sm leading-6 text-white/75">Jadi mitra petani atau mitra bisnis. Dapatkan akses pasar, standar mutu, dan dukungan rantai dingin.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/produk" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c4dbb9] px-6 py-3.5 text-sm font-bold text-[#113B24] transition hover:bg-white">Mulai Belanja Kopyor <ArrowRight className="h-4 w-4" /></Link>
                  <a href="mailto:GotoWin@bumikopyor.id?subject=Konsultasi%20Pembelian%20Grosir" className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Konsultasi Pembelian Grosir (B2B)</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B2918] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 lg:px-8 lg:pt-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr] lg:gap-12">
            <div>
              <Brand light />
              <p className="mt-5 max-w-xs text-xs leading-6 text-white/60">Menghubungkan kopyor asli Pati dengan lebih banyak keluarga dan bisnis, sambil menumbuhkan kesejahteraan petani lokal.</p>
              <div className="mt-5 flex gap-2">
                {[Globe, MessageCircle, Mail].map((Icon, index) => <a key={index} href={['#sosial', 'https://wa.me/6282134008512', 'mailto:GotoWin@bumikopyor.id'][index]} aria-label={['Situs BumiKopyor', 'WhatsApp', 'Email'][index]} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"><Icon className="h-4 w-4" /></a>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Tentang BumiKopyor</h3>
              <ul className="mt-5 space-y-3 text-xs text-white/60">
                <li><a className="hover:text-white" href="#tentang">Kisah Kami & Petani</a></li><li><a className="hover:text-white" href="#tentang">Sertifikasi Mutu Kopyor</a></li><li><a className="hover:text-white" href="#tentang">Dampak & Rantai Pasok</a></li><li><a className="hover:text-white" href="#mitra">Karir & Kemitraan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Layanan & Produk</h3>
              <ul className="mt-5 space-y-3 text-xs text-white/60">
                <li><a className="hover:text-white" href="#produk">Kelapa Kopyor Segar Utuh</a></li><li><a className="hover:text-white" href="#produk">Daging Kopyor Beku (Frozen)</a></li><li><a className="hover:text-white" href="#mitra">Pemesanan Grosir B2B</a></li><li><a className="hover:text-white" href="#mitra">Kemitraan Petani Kebun</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hubungi Kami</h3>
              <ul className="mt-5 space-y-4 text-xs leading-5 text-white/60">
                <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d7bf]" /><span>Jl. Raya Pati - Tayu Km. 12, Margoyoso, Kab. Pati, Jawa Tengah 59154</span></li>
                <li className="flex gap-2"><span className="mt-0.5 text-[#b8d7bf]">☎</span><a className="hover:text-white" href="https://wa.me/6282134008512">+62 821-3400-8512</a></li>
                <li className="flex gap-2"><span className="mt-0.5 text-[#b8d7bf]">✉</span><a className="hover:text-white" href="mailto:GotoWin@bumikopyor.id">GotoWin@bumikopyor.id</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] text-white/50 md:flex-row md:items-center md:justify-between">
            <p>© 2026 BumiKopyor Indonesia. Hak cipta dilindungi undang-undang.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2"><a className="hover:text-white" href="#privasi">Kebijakan Privasi</a><a className="hover:text-white" href="#syarat">Syarat & Ketentuan</a><a className="hover:text-white" href="#mutu">Standar Mutu Kopyor</a></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
