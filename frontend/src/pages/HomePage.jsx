import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  ShoppingCart,
  Star,
} from 'lucide-react'
import '../App.css'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EBF3EE]">
              <Leaf className="h-5 w-5 text-[#14452B]" />
            </span>
            <span>
              <span className="block text-lg font-bold text-[#113B24]">BumiKopyor</span>
              <span className="text-[10px] text-gray-500">Platform Petani Kopyor Nusantara</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="nav-link nav-link-active">Beranda</Link>
            <Link to="/produk" className="nav-link">Produk</Link>
            <a href="#petani" className="nav-link">Petani</a>
            <a href="#edukasi" className="nav-link">Edukasi</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/masuk" className="hidden text-sm font-semibold text-gray-600 sm:block">Masuk</Link>
            <Link to="/mitra" className="rounded-xl bg-[#14452B] px-4 py-2.5 text-sm font-semibold text-white">
              Daftar sebagai Mitra
            </Link>
            <Link to="/produk" className="relative rounded-xl p-2 text-[#113B24]" aria-label="Keranjang">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-[#F9FBF9] py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce9df] bg-[#EBF3EE] px-3.5 py-2 text-xs font-semibold text-[#14452B]">
              <BadgeCheck className="h-4 w-4" />
              Platform Kopyor Terpercaya #1 di Indonesia
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
              Dari Kebun ke Meja,{' '}
              <span className="font-serif font-medium italic text-[#28633d]">Langsung dari Petani.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-gray-600">
              BumiKopyor memberdayakan petani kelapa kopyor asli di Pati melalui digitalisasi rantai pasok
              dan akses pasar langsung tanpa tengkulak.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-xl bg-[#14452B] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#113B24]"
              >
                Jelajahi Katalog Produk <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/mitra"
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-[#14452B] hover:bg-[#F3F7F4]"
              >
                Daftar sebagai Petani
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-gray-900">
              <span className="flex gap-0.5 text-[#d89536]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              4.9/5 · Dipercaya 2.400+ pelanggan
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <p className="section-eyebrow">KATALOG</p>
            <h2 className="mt-3 text-3xl font-bold text-[#111827]">Produk Kopyor Segar & Olahan</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
              Lihat seluruh katalog dengan filter, pencarian, dan opsi kemitraan B2B.
            </p>
            <Link
              to="/produk"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#cbdccd] bg-white px-5 py-3 text-sm font-bold text-[#14452B] hover:bg-[#EBF3EE]"
            >
              Buka Halaman Katalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0f2e1a] py-10 text-center text-sm text-white/60">
        <p>© 2026 BumiKopyor Indonesia · Landing page (versi ringkas) · Katalog lengkap di /produk</p>
      </footer>
    </div>
  )
}
