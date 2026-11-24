import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  MapPin,
  Truck,
  Snowflake,
  CreditCard,
  Building2,
  Wallet,
  ShieldCheck,
  BadgeCheck,
  Check,
} from 'lucide-react'
import { useCart } from '../context/CartContext'

const formatPrice = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

const SHIPPING = [
  {
    id: 'cold',
    name: 'Rantai Dingin Khusus',
    desc: 'Suhu terjaga untuk produk segar & beku',
    price: 20000,
    badge: 'Direkomendasikan',
  },
  {
    id: 'express',
    name: 'Express Same-Day (kota Pati)',
    desc: 'Tiba hari ini jika order sebelum 12.00',
    price: 35000,
    badge: null,
  },
  {
    id: 'pickup',
    name: 'Ambil di Sentra / Pickup',
    desc: 'Ambil sendiri di kebun mitra terpilih',
    price: 0,
    badge: 'Gratis',
  },
]

const PAYMENTS = [
  { id: 'va', name: 'Transfer Virtual Account', icon: Building2, detail: 'BCA, Mandiri, BNI, BRI' },
  { id: 'qris', name: 'QRIS (GoPay, ShopeePay, dll.)', icon: Wallet, detail: 'Scan & bayar instan' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', icon: Truck, detail: 'Area terpilih saja' },
  { id: 'card', name: 'Kartu Kredit / Debit', icon: CreditCard, detail: 'Visa, Mastercard' },
]

export default function CheckoutPage() {
  const { items, cartCount, cartTotal, clearCart } = useCart()
  const [shippingId, setShippingId] = useState('cold')
  const [paymentId, setPaymentId] = useState('va')
  const [placed, setPlaced] = useState(false)
  const [address, setAddress] = useState({
    name: 'Budi Santoso',
    phone: '+62 812-3456-7890',
    detail:
      'Jl. Merdeka Raya No. 42, RT 01/RW 03, Kel. Demaan, Kec. Pati, Kab. Pati, Jawa Tengah 59111',
  })

  if (items.length === 0 && !placed) {
    return <Navigate to="/keranjang" replace />
  }

  const shipping = SHIPPING.find((s) => s.id === shippingId) || SHIPPING[0]
  const shippingCost = shipping.price
  const serviceFee = 1500
  const grandTotal = cartTotal + shippingCost + serviceFee

  const handlePlaceOrder = () => {
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-5 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF3EE] text-[#14452B]">
          <Check className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h1 className="mt-5 text-xl font-bold text-[#113B24]">Pesanan berhasil dibuat</h1>
        <p className="mt-2 text-sm text-gray-500">
          Ini demo UI — belum terhubung ke backend pembayaran. Terima kasih!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/produk"
            className="rounded-2xl bg-[#14452B] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Belanja lagi
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700"
          >
            Ke beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-5 sm:pb-16 sm:pt-6 md:px-8 md:pt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#28633d]">
            Detail Checkout
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl">
            Selesaikan Pesanan
          </h1>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 sm:text-xs">
          <Link to="/keranjang" className="rounded-full bg-gray-100 px-2.5 py-1 hover:text-[#14452B]">
            1. Keranjang
          </Link>
          <span>→</span>
          <span className="rounded-full bg-[#14452B] px-2.5 py-1 text-white">2. Checkout</span>
          <span className="hidden sm:inline">→</span>
          <span className="hidden rounded-full bg-gray-100 px-2.5 py-1 sm:inline">3. Selesai</span>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {/* Address */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Alamat Pengiriman</h2>
                  <p className="mt-1 text-sm font-semibold text-[#113B24]">
                    {address.name}{' '}
                    <span className="font-normal text-gray-500">{address.phone}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{address.detail}</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 text-xs font-semibold text-[#14452B] hover:underline"
                onClick={() =>
                  setAddress((a) => ({
                    ...a,
                    detail: prompt('Alamat lengkap (demo):', a.detail) || a.detail,
                  }))
                }
              >
                Ubah
              </button>
            </div>
          </section>

          {/* Products */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-4 py-3 sm:px-5">
              <h2 className="text-sm font-bold text-gray-900">
                Produk dipesan{' '}
                <span className="font-medium text-gray-400">({cartCount} item)</span>
              </h2>
            </div>
            <ul className="divide-y divide-gray-50">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eef2eb] to-[#dce9df] text-[8px] font-medium text-gray-500 sm:h-14 sm:w-14 sm:text-[9px]">
                    {(item.imageLabel || item.name).slice(0, 14)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-gray-500">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-[#113B24]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Shipping */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Snowflake className="h-4 w-4 text-cyan-600" />
              Opsi Pengiriman
            </h2>
            <div className="mt-3 space-y-2">
              {SHIPPING.map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                    shippingId === s.id
                      ? 'border-[#14452B] bg-[#EBF3EE]/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingId === s.id}
                    onChange={() => setShippingId(s.id)}
                    className="mt-1 accent-[#14452B]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{s.name}</span>
                      {s.badge && (
                        <span className="rounded-full bg-[#14452B] px-2 py-0.5 text-[10px] font-bold text-white">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-gray-500">{s.desc}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-[#113B24]">
                    {s.price === 0 ? 'Gratis' : formatPrice(s.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-gray-900">Metode Pembayaran</h2>
            <div className="mt-3 space-y-2">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    paymentId === p.id
                      ? 'border-[#14452B] bg-[#EBF3EE]/50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentId === p.id}
                    onChange={() => setPaymentId(p.id)}
                    className="accent-[#14452B]"
                  />
                  <p.icon className="h-4 w-4 shrink-0 text-[#14452B]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                    <p className="text-[11px] text-gray-500">{p.detail}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Summary sticky */}
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-gray-900">Ringkasan Pembayaran</h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>Subtotal produk</dt>
                <dd className="font-semibold text-gray-900">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Ongkir ({shipping.name.split(' ')[0]})</dt>
                <dd className="font-semibold text-gray-900">
                  {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                </dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Biaya layanan</dt>
                <dd className="font-semibold text-gray-900">{formatPrice(serviceFee)}</dd>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <dt className="font-bold text-gray-900">Total Bayar</dt>
                  <dd className="text-lg font-bold text-[#113B24]">{formatPrice(grandTotal)}</dd>
                </div>
              </div>
            </dl>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="mt-5 w-full rounded-2xl bg-[#14452B] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24]"
            >
              Buat Pesanan · {formatPrice(grandTotal)}
            </motion.button>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: BadgeCheck, label: 'Mitra terverifikasi' },
                { icon: Snowflake, label: 'Rantai dingin' },
                { icon: ShieldCheck, label: 'Aman' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1 rounded-full bg-[#F7F9F6] px-2 py-1 text-[10px] font-medium text-gray-600"
                >
                  <b.icon className="h-3 w-3 text-[#14452B]" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-[64px] z-40 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-gray-400">Total bayar</p>
            <p className="text-base font-bold text-[#113B24]">{formatPrice(grandTotal)}</p>
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="rounded-xl bg-[#14452B] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
    </div>
  )
}
