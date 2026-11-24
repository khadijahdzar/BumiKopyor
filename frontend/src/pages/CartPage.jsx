import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf } from 'lucide-react'
import { useCart } from '../context/CartContext'
import WordReveal from '../components/WordReveal'

const formatPrice = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

export default function CartPage() {
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Belanja</p>
        <WordReveal
          text="Keranjang Anda"
          className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
        />
        <p className="mt-3 text-sm text-gray-500">
          {cartCount === 0
            ? 'Belum ada produk. Jelajahi katalog kopyor segar dari petani mitra.'
            : `${cartCount} item siap dipesan.`}
        </p>
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-14 flex flex-col items-center rounded-3xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center"
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
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500">{items.length} produk</p>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Kosongkan keranjang
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#eef2eb] to-[#dce9df] text-center text-[10px] font-medium text-gray-500 sm:h-24 sm:w-24">
                    {item.imageLabel?.slice(0, 24) || item.name.slice(0, 20)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold leading-snug text-[#111827] sm:text-[15px]">
                          {item.name}
                        </h3>
                        {item.farmer && (
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                            <Leaf className="h-3 w-3 text-[#14452B]" />
                            {item.farmer}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label={`Hapus ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-base font-bold text-[#113B24]">
                        {formatPrice(item.price)}
                        <span className="ml-1 text-xs font-normal text-gray-500">{item.unit}</span>
                      </p>
                      <div className="flex items-center gap-1 rounded-2xl border border-gray-200 bg-[#F7F9F6] p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-[#14452B] hover:bg-white"
                          aria-label="Kurangi"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-[#14452B] hover:bg-white"
                          aria-label="Tambah"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-right text-xs text-gray-500">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-sm font-bold text-gray-900">Ringkasan pesanan</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>Subtotal ({cartCount} item)</dt>
                <dd className="font-semibold text-gray-900">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Ongkir</dt>
                <dd className="text-xs font-medium text-[#14452B]">Dihitung saat checkout</dd>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <dt className="font-bold text-gray-900">Total</dt>
                  <dd className="text-lg font-bold text-[#113B24]">{formatPrice(cartTotal)}</dd>
                </div>
              </div>
            </dl>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14452B] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24]"
            >
              Lanjut Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/produk"
              className="mt-3 block text-center text-xs font-semibold text-[#14452B] hover:underline"
            >
              + Tambah produk lain
            </Link>
            <p className="mt-4 text-[11px] leading-relaxed text-gray-400">
              Checkout penuh (alamat, pembayaran) akan tersedia setelah backend terhubung. Ini demo UI.
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
