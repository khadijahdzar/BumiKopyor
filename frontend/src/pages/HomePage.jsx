import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Leaf,
  MapPin,
  Snowflake,
  Star,
  UsersRound,
  WalletCards,
} from 'lucide-react'
import WordReveal from '../components/WordReveal'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const standards = [
  { icon: BadgeCheck, title: 'Kualitas Grade A', body: 'Setiap butir melewati seleksi dan kontrol mutu transparan dari kebun Pati.' },
  { icon: WalletCards, title: 'Harga Adil Petani', body: 'Kemitraan langsung memastikan nilai panen yang lebih baik untuk petani.' },
  { icon: Snowflake, title: 'Rantai Dingin Cepat', body: 'Penanganan dan pengiriman terjaga agar kopyor tiba tetap segar.' },
  { icon: UsersRound, title: 'UMKM Lokal', body: 'Bahan baku berkualitas untuk membantu bisnis kuliner tumbuh bersama.' },
]

const featured = products.slice(0, 4)

export default function HomePage() {
  const { handleAddToCart } = useOutletContext() || {}

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, #dce9df, transparent 70%)' }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#14452B]/15 bg-[#EBF3EE] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#14452B]"
            >
              <Leaf className="h-3.5 w-3.5" />
              Asli dari Pati, Jawa Tengah
            </motion.span>

            <WordReveal
              text="Kelapa Kopyor Segar Langsung dari Kebun"
              className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-[#113B24] sm:text-5xl lg:text-[3.25rem]"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-gray-600"
            >
              BumiKopyor menghubungkan petani kopyor Pati dengan pembeli dan bisnis kuliner.
              Segar, adil, dan transparan dari kebun ke meja Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/produk"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#14452B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#14452B]/25 transition hover:bg-[#113B24]"
              >
                Lihat Produk
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/kebun"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#14452B]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#14452B] transition hover:bg-[#F3F7F4]"
              >
                Jelajahi Kebun
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex -space-x-2.5">
                {['BK', 'UM', 'PT'].map((a, i) => (
                  <span
                    key={a}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-[#14452B] ${
                      ['bg-[#dce9df]', 'bg-[#e9dfd0]', 'bg-[#e3e8d7]'][i]
                    }`}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  <span className="flex gap-0.5 text-[#d89536]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500">Dipercaya 2.400+ pelanggan</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="aspect-[1.05/1] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eef2eb] via-[#dce9df] to-[#c5d9c8] shadow-2xl shadow-[#14452B]/10">
              <div className="flex h-full items-center justify-center p-8 text-center text-sm font-medium text-gray-500">
                Foto Kelapa Kopyor Belah Segar
              </div>
            </div>
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#14452B] shadow-lg backdrop-blur sm:left-6 sm:top-6">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EBF3EE]">
                <Check className="h-3.5 w-3.5" />
              </span>
              100% Kopyor Asli Pati
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:right-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">Panen Terkini</p>
                  <p className="text-xs text-gray-500">Kebun Margoyoso & Tayu, Pati</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Mengapa BumiKopyor</p>
            <WordReveal text="Standar dari Kebun sampai Pengiriman" className="mt-3 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl" />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-gray-100 bg-[#F7F9F6] p-6 transition hover:border-[#14452B]/15 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBF3EE] text-[#14452B]">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Produk Unggulan</p>
              <WordReveal text="Pilihan Kopyor Terbaik Minggu Ini" className="mt-2 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl" />
            </div>
            <Link to="/produk" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14452B] hover:underline">
              Lihat semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="forest-cta relative mx-auto max-w-7xl overflow-hidden rounded-[28px] px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <WordReveal text="Jadi Mitra Petani atau Mitra Bisnis" className="mx-auto max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl" wordClassName="text-white" />
          <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
            Bergabung dengan ekosistem kopyor digital — panen lebih pasti, harga lebih adil, pasar lebih luas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/kebun" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#14452B] shadow transition hover:bg-[#EBF3EE]">
              Daftar sebagai Petani
            </Link>
            <Link to="/produk" className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Pesan Grosir B2B
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
