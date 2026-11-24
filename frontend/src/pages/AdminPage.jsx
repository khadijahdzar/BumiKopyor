import { Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Package, Users, ShoppingBag, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import WordReveal from '../components/WordReveal'

const stats = [
  { icon: Package, label: 'Produk aktif', value: '24' },
  { icon: ShoppingBag, label: 'Pesanan bulan ini', value: '186' },
  { icon: Users, label: 'Mitra petani', value: '48' },
  { icon: TrendingUp, label: 'Omzet (demo)', value: 'Rp 42jt' },
]

export default function AdminPage() {
  const { isAdmin, user } = useAuth()

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Admin</p>
        <WordReveal
          text={`Halo, ${user?.name || 'Admin'}`}
          className="mt-2 text-3xl font-bold tracking-tight text-[#113B24]"
        />
        <p className="mt-2 text-sm text-gray-500">
          Dashboard ringkas (demo) — kelola produk, pesanan, dan mitra kebun.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <s.icon className="h-5 w-5 text-[#14452B]" />
            <p className="mt-3 text-2xl font-bold text-[#113B24]">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900">Aksi cepat (placeholder)</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• Tambah / edit produk katalog</li>
          <li>• Verifikasi mitra petani baru</li>
          <li>• Lihat pesanan & status pengiriman</li>
          <li>• Update konten edukasi</li>
        </ul>
        <p className="mt-6 text-xs text-gray-400">
          Backend & CRUD penuh akan ditambahkan di tahap berikutnya.
        </p>
      </div>
    </div>
  )
}
