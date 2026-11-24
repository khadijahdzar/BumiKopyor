import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Leaf, Mail, Lock, ArrowRight, Shield, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import WordReveal from '../components/WordReveal'

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF3EE] text-[#14452B]">
          <User className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#113B24]">Sudah masuk</h1>
        <p className="mt-2 text-sm text-gray-500">
          Halo, <strong>{user?.name}</strong> ({user?.email})
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-2xl bg-[#14452B] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Ke Beranda
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="rounded-2xl border border-[#14452B]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#14452B]"
            >
              Dashboard Admin
            </Link>
          )}
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Demo auth: cocokkan email sederhana
    const normalized = email.trim().toLowerCase()
    setTimeout(() => {
      if (normalized.includes('admin')) {
        login('admin')
        navigate(from === '/masuk' ? '/admin' : from, { replace: true })
      } else if (normalized.length > 0) {
        login('user')
        navigate(from === '/masuk' ? '/' : from, { replace: true })
      } else {
        setError('Masukkan email untuk login demo.')
      }
      setLoading(false)
    }, 400)
  }

  const quickLogin = (role) => {
    login(role)
    navigate(role === 'admin' ? '/admin' : from === '/masuk' ? '/' : from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Akun</p>
          <WordReveal
            text="Masuk ke BumiKopyor"
            className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
            Akses katalog, keranjang, dan (untuk admin) dashboard mitra. Saat ini memakai autentikasi
            demo — backend akan ditambahkan kemudian.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]">
                <Leaf className="h-4 w-4" />
              </span>
              Produk kopyor langsung dari petani Pati
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#14452B]">
                <Shield className="h-4 w-4" />
              </span>
              Demo admin: email mengandung &quot;admin&quot;
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_40px_rgba(17,59,36,0.06)] sm:p-8"
        >
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#14452B] text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-[#113B24]">Masuk</h1>
              <p className="text-xs text-gray-500">BumiKopyor</p>
            </div>
          </div>

          <h2 className="mt-6 hidden text-xl font-bold text-[#113B24] lg:block">Form masuk</h2>
          <p className="mt-1 hidden text-sm text-gray-500 lg:block">
            Isi email (demo) atau gunakan tombol cepat di bawah.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@bumikopyor.id atau admin@..."
                  className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F6] py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:bg-white focus:ring-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-gray-700">
                Kata sandi
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Bebas (demo)"
                  className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F6] py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14452B] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24] disabled:opacity-60"
            >
              {loading ? 'Memproses...' : 'Masuk'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">atau demo cepat</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => quickLogin('user')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-[#F3F7F4]"
            >
              <User className="h-4 w-4" />
              User
            </button>
            <button
              type="button"
              onClick={() => quickLogin('admin')}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#14452B]/20 bg-[#EBF3EE] py-3 text-sm font-semibold text-[#14452B] transition hover:bg-[#dce9df]"
            >
              <Shield className="h-4 w-4" />
              Admin
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Belum punya akun? Fitur daftar akan tersedia di tahap berikutnya.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
