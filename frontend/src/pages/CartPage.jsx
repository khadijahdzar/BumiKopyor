import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Snowflake,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from 'lucide-react'
import { useCart } from '../context/CartContext'

const formatPrice = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

export default function CartPage() {
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()

  const shippingEstimate = cartTotal > 0 ? 20000 : 0
  const discount = 0
  const grandTotal = cartTotal + shippingEstimate - discount

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-5 sm:pb-16 sm:pt-6 md:px-8 md:pt-8">
      {/* Breadcrumb / title */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#28633d]">
            Proses Pembelian
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl">
            Keranjang Belanja Kopyor
          </h1>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 sm:text-xs">
          <span className="rounded-full bg-[#14452B] px-2.5 py-1 text-white">1. Keranjang</span>
          <span className="hidden sm:inline">→</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1">2. Checkout</span>
          <span className="hidden sm:inline">→</span>
          <span className="hidden rounded-full bg-gray-100 px-2.5 py-1 sm:inline">3. Selesai</span>
        </div>
      </div>

      {/* Cold chain banner */}
      <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-[#EBF3EE] px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 shadow-sm">
          <Snowflake className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#113B24] sm:text-sm">
            Pengiriman Khusus Rantai Dingin / ASAP
          </p>
          <p className="text-[11px] leading-relaxed text-gray-500 sm:text-xs">
            Produk segar & beku dijaga suhu optimal. Estimasi tiba mengikuti zona pengiriman Anda.
          </p>
        </div>
        <Link
          to="/produk"
          className="shrink-0 text-[11px] font-semibold text-[#14452B] hover:underline sm:text-xs"
        >
          + Tambah produk
        </Link>
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EBF3EE] text-[#14452B]">
            <ShoppingBag className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-lg font-bold text-[#113B24]">Keranjang masih kosong</h2>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Tambah kelapa kopyor, daging beku, atau olahan dari halaman produk.
          </p>
          <Link
            to="/produk"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#14452B] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24]"
          >
            Lihat Produk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px] lg:gap-6 xl:grid-cols-[1fr_340px]">
          {/* Items */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-xs shadow-sm">
              <p className="font-semibold text-gray-700">
                <span className="text-[#14452B]">{cartCount}</span> item · {items.length} produk
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="font-semibold text-red-600 hover:underline"
              >
                Kosongkan
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#eef2eb] to-[#dce9df] sm:h-20 sm:w-20 sm:rounded-2xl">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-center text-[9px] font-medium text-gray-500 sm:text-[10px]">
                          {(item.imageLabel || item.name).slice(0, 18)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold leading-snug text-[#111827] line-clamp-2">
                            {item.name}
                          </h3>
                          {item.farmer && (
                            <p className="mt-0.5 text-[11px] text-gray-500">{item.farmer}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-[#113B24] sm:text-base">
                          {formatPrice(item.price)}
                          <span className="ml-1 text-[10px] font-normal text-gray-400">{item.unit}</span>
                        </p>
                        <div className="flex items-center gap-0.5 rounded-xl border border-gray-200 bg-[#F7F9F6] p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#14452B] hover:bg-white"
                            aria-label="Kurangi"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.75rem] text-center text-sm font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#14452B] hover:bg-white"
                            aria-label="Tambah"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-1.5 text-right text-[11px] text-gray-500">
                        Subtotal {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {/* Guarantees */}
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { icon: Snowflake, title: 'Rantai dingin', body: 'Suhu terjaga' },
                { icon: BadgeCheck, title: 'Produk terverifikasi', body: 'Dari mitra Pati' },
                { icon: ShieldCheck, title: 'Garansi kesegaran', body: 'Klaim mudah' },
              ].map((g) => (
                <div
                  key={g.title}
                  className="flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
                >
                  <g.icon className="h-4 w-4 shrink-0 text-[#14452B]" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-800">{g.title}</p>
                    <p className="text-[10px] text-gray-400">{g.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit space-y-3 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-sm font-bold text-gray-900">Ringkasan Belanja</h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Total Harga ({cartCount} item)</dt>
                  <dd className="font-semibold text-gray-900">{formatPrice(cartTotal)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" /> Ongkir (estimasi)
                  </dt>
                  <dd className="font-semibold text-gray-900">{formatPrice(shippingEstimate)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <dt>Diskon</dt>
                    <dd className="font-semibold">−{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <dt className="font-bold text-gray-900">Total Pembayaran</dt>
                    <dd className="text-lg font-bold text-[#113B24]">{formatPrice(grandTotal)}</dd>
                  </div>
                </div>
              </dl>

              <Link
                to="/checkout"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14452B] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24]"
              >
                Lanjut ke Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/produk"
                className="mt-2 block text-center text-xs font-semibold text-[#14452B] hover:underline"
              >
                Belanja produk lain
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#F7F9F6] p-4 text-[11px] leading-relaxed text-gray-500">
              <p className="font-semibold text-gray-700">Catatan pengiriman</p>
              <p className="mt-1">
                Produk segar sebaiknya dipesan H−1. Area luar Jawa mengikuti jadwal kurir rantai dingin.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
