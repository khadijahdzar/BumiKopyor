import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import WordReveal from '../components/WordReveal'
import ProductCard from '../components/ProductCard'
import { products, categories, sortOptions } from '../data/products'

export default function CatalogPage() {
  const { handleAddToCart } = useOutletContext() || {}
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua Produk')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = useMemo(() => {
    let list = [...products]
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.farmer.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q),
      )
    }
    if (category !== 'Semua Produk') {
      list = list.filter((p) => p.category === category)
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
  }, [query, category, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Katalog</p>
        <WordReveal
          text="Semua Produk Kopyor Pati"
          className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
        />
        <p className="mt-3 text-sm text-gray-500">
          Segar, beku, olahan, dan bahan baku B2B — langsung dari petani mitra.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setQuery(search)
        }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk, petani, lokasi..."
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:ring-2"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setQuery('')
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#14452B]"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </form>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              category === c
                ? 'bg-[#14452B] text-white shadow-sm'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-[#F3F7F4]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Menampilkan <strong className="text-gray-800">{filtered.length}</strong> produk
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-sm text-gray-500">
          Tidak ada produk yang cocok. Coba ubah filter atau kata kunci.
        </div>
      )}
    </div>
  )
}
