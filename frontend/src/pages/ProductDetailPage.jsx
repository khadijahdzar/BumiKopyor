import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronRight,
  Heart,
  Leaf,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Star,
  Truck,
} from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const badgeStyles = {
  green: 'bg-[#EBF3EE] text-[#14452B]',
  cyan: 'bg-cyan-50 text-cyan-800',
  amber: 'bg-amber-50 text-amber-800',
  orange: 'bg-orange-50 text-orange-800',
  teal: 'bg-teal-50 text-teal-800',
  white: 'bg-white text-gray-700 border border-gray-200',
}

const formatPrice = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

export default function ProductDetailPage() {
  const { id } = useParams()
  return <ProductDetailContent key={id} id={id} />
}

function ProductDetailContent({ id }) {
  const navigate = useNavigate()
  const { handleAddToCart } = useOutletContext() || {}

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id],
  )

  const [activeSlide, setActiveSlide] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [wishlisted, setWishlisted] = useState(Boolean(product?.wishlist))
  const [addedFeedback, setAddedFeedback] = useState(false)

  // Demo buyer reviews state
  const [customReviews, setCustomReviews] = useState([])
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF3EE] text-[#14452B]">
          <Leaf className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-[#113B24]">Produk tidak ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">
          Produk yang Anda cari mungkin sudah dipindahkan atau stoknya sedang diperbarui.
        </p>
        <Link
          to="/produk"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#14452B] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#113B24]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>
      </div>
    )
  }

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [
          { label: product.imageLabel || product.name, caption: product.description },
          { label: `Asal: ${product.location}`, caption: `Diproduksi oleh ${product.farmer}` },
          { label: 'Standar Mutu BumiKopyor', caption: 'Seleksi ketat & kemasan rantai dingin' },
        ]

  const currentGallery = gallery[activeSlide] || gallery[0]
  const maxStock = product.stock || 50
  const isPreorder = product.stockStatus === 'preorder'

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.location === product.location))
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category && p.location !== product.location))
    .filter((p, idx, arr) => arr.findIndex((x) => x.id === p.id) === idx)
    .slice(0, 3)

  const allReviews = [...customReviews, ...(product.sampleReviews || [])]

  const handleAddMultiple = () => {
    if (!handleAddToCart) return
    for (let i = 0; i < qty; i += 1) {
      handleAddToCart(product)
    }
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1800)
  }

  const handleBuyNow = () => {
    if (handleAddToCart) {
      for (let i = 0; i < qty; i += 1) {
        handleAddToCart(product)
      }
    }
    navigate('/checkout')
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewText.trim()) return
    setCustomReviews((prev) => [
      {
        id: `custom-${Date.now()}`,
        author: 'Pembeli Terverifikasi',
        rating: reviewRating,
        date: 'Baru saja',
        comment: reviewText.trim(),
      },
      ...prev,
    ])
    setReviewText('')
    setReviewRating(5)
    setReviewSubmitted(true)
  }

  const waMessage = `Halo BumiKopyor, saya tertarik dengan produk ${product.name} (${qty} ${product.unit?.replace('/', '') || 'unit'})`

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-5 sm:pt-6 md:px-8 md:pt-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-gray-500"
      >
        <Link to="/" className="hover:text-[#14452B]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <Link to="/produk" className="hover:text-[#14452B]">
          Produk
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <span className="text-gray-600">{product.category}</span>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <span className="truncate font-semibold text-[#113B24]">{product.name}</span>
      </nav>

      {/* Top Product Section: Gallery + Purchase Info */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        {/* Left: Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#eef2eb] via-[#dce9df] to-[#c5d9c8] shadow-sm">
            {currentGallery.image || product.image ? (
              <>
                <img
                  src={currentGallery.image || product.image}
                  alt={currentGallery.label || product.name}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 pt-10 text-white">
                  <p className="text-xs font-bold sm:text-sm">{currentGallery.label}</p>
                  <p className="mt-0.5 text-[11px] text-white/85">{currentGallery.caption}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-[#14452B] shadow-sm backdrop-blur">
                  <Leaf className="h-7 w-7" />
                </span>
                <p className="mt-4 text-lg font-bold text-[#113B24] sm:text-xl">
                  {currentGallery.label}
                </p>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-gray-600 sm:text-sm">
                  {currentGallery.caption}
                </p>
              </div>
            )}

            <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
              {product.badges?.map((b) => (
                <span
                  key={b.label}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-xs ${badgeStyles[b.variant] || badgeStyles.green}`}
                >
                  {b.label}
                </span>
              ))}
            </div>

            {isPreorder && (
              <span className="absolute right-4 top-4 rounded-full bg-[#113B24]/90 px-3 py-1 text-[11px] font-bold text-white">
                Pre-Order · {product.unitDetail}
              </span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {gallery.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`flex items-center gap-2.5 overflow-hidden rounded-2xl border p-2 text-left transition ${
                    activeSlide === idx
                      ? 'border-[#14452B] bg-[#EBF3EE]/70 shadow-xs ring-1 ring-[#14452B]/20'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-[#F7F9F6]'
                  }`}
                >
                  {(item.image || product.image) && (
                    <img
                      src={item.image || product.image}
                      alt={item.label}
                      className="h-11 w-11 shrink-0 rounded-xl object-cover sm:h-12 sm:w-12"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-[11px] font-bold text-[#113B24]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-500">{item.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Info & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_36px_rgba(17,59,36,0.05)] sm:p-7"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF3EE] px-3 py-1 text-[11px] font-bold text-[#14452B]">
              <MapPin className="h-3 w-3" />
              {product.location}
            </span>
            <span className="rounded-full bg-[#F7F9F6] px-3 py-1 text-[11px] font-semibold text-gray-600 ring-1 ring-gray-100">
              {product.category}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#d89536]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-4 w-4"
                  fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-500">
              ({product.reviews + customReviews.length} ulasan)
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-2 border-y border-gray-100 py-4">
            <span className="text-3xl font-bold tracking-tight text-[#113B24]">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm font-medium text-gray-500">{product.unit}</span>
            {product.priceLabel && (
              <span className="ml-auto rounded-full bg-[#F7F9F6] px-2.5 py-1 text-[11px] font-semibold text-[#28633d]">
                {product.priceLabel}
              </span>
            )}
          </div>

          {/* Meta Grid: Availability & Stock */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F7F9F6] px-4 py-3">
              <p className="text-[11px] font-medium text-gray-500">Ketersediaan</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-[#113B24]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isPreorder ? 'bg-[#d89536]' : 'bg-emerald-600'
                  }`}
                />
                {isPreorder ? 'Pre-Order Terjadwal' : 'Tersedia Siap Kirim'}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F9F6] px-4 py-3">
              <p className="text-[11px] font-medium text-gray-500">Stok & Info</p>
              <p className="mt-0.5 text-sm font-bold text-gray-900">
                {maxStock} {product.unit?.replace('/', '') || 'unit'} tersisa
              </p>
            </div>
          </div>

          {/* Farmer / Spec */}
          <div className="mt-3 rounded-2xl border border-gray-100 px-4 py-3 text-xs text-gray-600">
            <span className="font-semibold text-gray-800">Mitra & Kemasan:</span>{' '}
            {product.farmer} ({product.location}) · {product.spec || product.unitDetail}
          </div>

          {/* Quantity */}
          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Jumlah
            </span>
            <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-[#F7F9F6] p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#14452B] transition hover:bg-white disabled:opacity-40"
                aria-label="Kurangi jumlah"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[2.25rem] text-center text-sm font-bold tabular-nums text-gray-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(maxStock, q + 1))}
                disabled={qty >= maxStock}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#14452B] transition hover:bg-white disabled:opacity-40"
                aria-label="Tambah jumlah"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleAddMultiple}
              className="flex min-w-[170px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#14452B] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24]"
            >
              {addedFeedback ? (
                <>
                  <Check className="h-4 w-4" />
                  Ditambahkan!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Tambah ke Keranjang
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              className="flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-2xl border border-[#14452B] bg-[#EBF3EE] px-5 py-3.5 text-sm font-semibold text-[#14452B] transition hover:bg-[#dce9df]"
            >
              Beli Sekarang
            </motion.button>

            <button
              type="button"
              onClick={() => setWishlisted((w) => !w)}
              className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl border transition ${
                wishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-red-500'
              }`}
              aria-label="Tambah ke wishlist"
            >
              <Heart className="h-5 w-5" fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Chat via WhatsApp */}
          <a
            href={`https://wa.me/6282134008512?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/70 py-3 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100/80"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat Petani / CS via WhatsApp
          </a>

          {/* Trust Row */}
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 sm:grid-cols-4">
            {[
              { icon: BadgeCheck, label: 'Asli Pati' },
              { icon: Leaf, label: 'Langsung Petani' },
              { icon: Snowflake, label: 'Rantai Dingin' },
              { icon: ShieldCheck, label: 'Garansi Segar' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 rounded-xl bg-[#F7F9F6] px-2.5 py-2 text-[11px] font-semibold text-gray-700"
              >
                <item.icon className="h-3.5 w-3.5 shrink-0 text-[#14452B]" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs + Artisan/Farmer Info */}
      <section className="mt-12 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex gap-2 overflow-x-auto border-b border-gray-100 pb-3 scrollbar-none">
          {[
            { id: 'description', label: 'Deskripsi & Spesifikasi' },
            { id: 'origin', label: 'Asal Kebun & Keunggulan' },
            { id: 'storage', label: 'Penyimpanan & Penyajian' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-[#14452B] text-white shadow-xs'
                  : 'bg-[#F7F9F6] text-gray-600 hover:bg-[#EBF3EE] hover:text-[#14452B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="text-sm leading-relaxed text-gray-600">
            {activeTab === 'description' && (
              <>
                <p>{product.description}</p>
                <ul className="mt-5 grid gap-2.5 rounded-2xl bg-[#F7F9F6] p-4 text-xs sm:grid-cols-2 sm:text-sm">
                  <li>
                    <strong className="text-[#113B24]">Kategori:</strong> {product.category}
                  </li>
                  <li>
                    <strong className="text-[#113B24]">Asal Sentra:</strong> {product.location}
                  </li>
                  <li>
                    <strong className="text-[#113B24]">Mitra Petani:</strong> {product.farmer}
                  </li>
                  <li>
                    <strong className="text-[#113B24]">Kemasan / Spesifikasi:</strong>{' '}
                    {product.spec || product.unitDetail}
                  </li>
                  <li>
                    <strong className="text-[#113B24]">Stok Tersedia:</strong> {maxStock}{' '}
                    {product.unit?.replace('/', '') || 'unit'}
                  </li>
                </ul>
              </>
            )}

            {activeTab === 'origin' && (
              <div className="space-y-3">
                <p>{product.originStory}</p>
                <p className="text-xs text-gray-500">
                  Setiap pembelian melalui BumiKopyor memastikan transparansi asal panen serta margin
                  yang adil bagi petani kopyor lokal di Kabupaten Pati.
                </p>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3">
                <p>{product.storageTips}</p>
                <div className="flex items-start gap-2.5 rounded-2xl bg-cyan-50/70 p-3.5 text-xs text-cyan-900">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                  <span>
                    Pengiriman luar kota direkomendasikan memilih kurir Rantai Dingin saat checkout agar
                    suhu produk terjaga.
                  </span>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-[#14452B]/10 bg-[#EBF3EE]/60 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#14452B]">
              <BadgeCheck className="h-4 w-4" />
              Mitra Terverifikasi Pati
            </div>
            <h3 className="mt-2 text-base font-bold text-[#113B24]">{product.farmer}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">
              Setiap panen melewati kurasi mutu sentra dan penanganan pasca-panen bersih langsung dari{' '}
              {product.location}.
            </p>
            <Link
              to="/kebun"
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#14452B] hover:underline"
            >
              Lihat peta kebun mitra <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-[#113B24] sm:text-2xl">
              Produk Serupa Lainnya
            </h2>
            <Link to="/produk" className="text-xs font-semibold text-[#14452B] hover:underline sm:text-sm">
              Lihat semua
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      <section className="mt-14 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#113B24] sm:text-xl">Ulasan Pembeli</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Rating rata-rata {product.rating}/5 dari {product.reviews + customReviews.length} ulasan
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#F7F9F6] px-3 py-1.5 text-sm font-bold text-[#113B24]">
            <Star className="h-4 w-4 fill-[#d89536] text-[#d89536]" />
            {product.rating}
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {allReviews.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada ulasan untuk produk ini.</p>
            ) : (
              allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl border border-gray-100 bg-[#F7F9F6] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900">{rev.author}</p>
                    <span className="text-[11px] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="mt-1 flex gap-0.5 text-[#d89536]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5"
                        fill={s <= rev.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="h-fit rounded-2xl border border-gray-100 bg-[#F7F9F6] p-4 sm:p-5"
          >
            <h3 className="text-sm font-bold text-[#113B24]">Tulis Ulasanmu</h3>
            <p className="mt-1 text-[11px] text-gray-500">
              Bagikan pengalaman Anda mencoba produk ini.
            </p>

            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  className="p-0.5 text-[#d89536]"
                  aria-label={`Beri ${star} bintang`}
                >
                  <Star
                    className="h-5 w-5"
                    fill={star <= reviewRating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value)
                setReviewSubmitted(false)
              }}
              placeholder="Ceritakan kualitas, rasa, dan pengemasannya..."
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-[#14452B] sm:text-sm"
            />

            {reviewSubmitted && (
              <p className="mt-2 text-xs font-semibold text-emerald-700">
                Ulasan berhasil ditambahkan!
              </p>
            )}

            <button
              type="submit"
              className="mt-3 w-full rounded-xl bg-[#14452B] py-2.5 text-xs font-semibold text-white transition hover:bg-[#113B24] sm:text-sm"
            >
              Kirim Ulasan
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
