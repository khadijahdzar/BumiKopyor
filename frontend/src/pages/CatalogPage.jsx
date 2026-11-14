import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Grid2x2,
  LayoutList,
  MessageSquare,
  Search,
  ShieldCheck,
  Snowflake,
  X,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { products, sortOptions } from '../data/products'

const PAGE_SIZE = 6

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState(['Grade A Super', 'Siap Kirim'])
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState(1)
  const [cartCount, setCartCount] = useState(2)

  const filtered = useMemo(() => {
    let list = [...products]

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.farmer.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }

    if (activeTags.length > 0) {
      list = list.filter((p) =>
        activeTags.every(
          (t) => p.tags.includes(t) || p.badges.some((b) => b.label === t),
        ),
      )
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list.sort((a, b) => b.id - a.id)
        break
      default:
        list.sort((a, b) => b.reviews - a.reviews)
    }

    return list
  }, [query, activeTags, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const removeTag = (tag) => {
    setActiveTags((t) => t.filter((x) => x !== tag))
    setPage(1)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(search)
    setPage(1)
  }

  const handleAddToCart = () => {
    setCartCount((c) => c + 1)
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#111827]">
      <Header cartCount={cartCount} />

      <main>
        <section className="border-b border-gray-100 bg-[#F7F9F6]">
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#14452B]">
                Beranda
              </Link>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-[#14452B]">Katalog Produk</span>
              <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#EBF3EE] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#28633d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28633d]" />
                SENTRA KELAPA KOPYOR PATI TERPADU
              </span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                  Katalog Produk Kopyor{' '}
                  <span className="font-serif font-medium italic text-[#28633d]">Segar & Olahan</span>
                </h1>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Dipanen langsung dari kebun mitra petani terkurasi di Pati dengan standar mutu Grade A dan
                  jaminan armada rantai dingin ke seluruh Indonesia.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-[#14452B]" />
                  Sensor Akustik
                  <span className="font-normal text-gray-400">Garansi 100% Kopyor</span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                  <Snowflake className="h-4 w-4 text-[#0d9488]" />
                  Rantai Dingin
                  <span className="font-normal text-gray-400">Suhu Aman −18°C</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kelapa kopyor utuh, daging beku vakum, VCO murni, atau sirup..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-[#14452B] focus:ring-2 focus:ring-[#14452B]/15"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-[10px] font-medium text-gray-400 sm:inline">
                  Shortcut: ENTER
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14452B] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#113B24]"
                >
                  <Search className="h-4 w-4" />
                  Cari Produk
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>
                Menampilkan{' '}
                <strong className="text-gray-900">
                  {pageItems.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–
                  {Math.min(currentPage * PAGE_SIZE, filtered.length)}
                </strong>{' '}
                dari <strong className="text-gray-900">{filtered.length}</strong> produk kopyor
              </span>
              {activeTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#c5dbc9] bg-[#EBF3EE] px-2.5 py-1 text-xs font-semibold text-[#14452B] transition hover:bg-[#dce9df]"
                >
                  {tag}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-gray-500">
                <span>Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setPage(1)
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#14452B]"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex rounded-lg border border-gray-200 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === 'grid' ? 'bg-[#EBF3EE] text-[#14452B]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="Tampilan grid"
                >
                  <Grid2x2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === 'list' ? 'bg-[#EBF3EE] text-[#14452B]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="Tampilan list"
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
              <p className="text-sm font-semibold text-gray-700">Tidak ada produk yang cocok</p>
              <p className="mt-1 text-xs text-gray-500">Coba ubah kata kunci atau hapus filter aktif.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setQuery('')
                  setActiveTags([])
                  setPage(1)
                }}
                className="mt-4 rounded-xl bg-[#14452B] px-4 py-2.5 text-xs font-bold text-white"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid gap-4'
              }
            >
              {pageItems.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}

          <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f2e1a] via-[#14452B] to-[#1a5c32] p-6 text-white shadow-lg sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wide text-[#b8d7bf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b8d7bf]" />
                  PROGRAM KEMITRAAN BISNIS & INDUSTRI
                </span>
                <h2 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">
                  Butuh Pasokan Kopyor Rutin untuk Restoran atau Kafe?
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  BumiKopyor menyediakan kontrak pasokan bergaransi tonase mingguan dengan harga fixed
                  petani, jaminan armada rantai dingin bersertifikat, dan faktur resmi PPN.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8e6a0] px-5 py-3 text-sm font-bold text-[#113B24] transition hover:bg-[#d4edb0]"
                >
                  <MessageSquare className="h-4 w-4" />
                  Konsultasi Harga Grosir (B2B)
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Download className="h-4 w-4" />
                  Unduh Brosur Spesifikasi
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center sm:text-left">
              <div>
                <p className="text-lg font-bold sm:text-xl">100+ Mitra</p>
                <p className="mt-0.5 text-xs text-white/60">Resto & Hotel</p>
              </div>
              <div>
                <p className="text-lg font-bold sm:text-xl">Garansi 100%</p>
                <p className="mt-0.5 text-xs text-white/60">Retur Ganti Baru</p>
              </div>
              <div>
                <p className="text-lg font-bold sm:text-xl">Fixed Price</p>
                <p className="mt-0.5 text-xs text-white/60">Kontrak 3–12 Bulan</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              Menampilkan halaman <strong className="text-gray-800">{currentPage}</strong> dari{' '}
              <strong className="text-gray-800">{totalPages}</strong> halaman
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
                    n === currentPage
                      ? 'bg-[#14452B] text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
