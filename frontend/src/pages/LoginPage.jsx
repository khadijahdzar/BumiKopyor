import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Leaf, Mail, Lock, ArrowRight, Shield, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import WordReveal from '../components/WordReveal'

function GoogleIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.08.72-2.46 1.16-4.22 1.16-3.24 0-5.99-2.19-6.97-5.14H1.02v3.14C3.05 21.18 7.21 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.03 14.01A7.19 7.19 0 0 1 4.65 12c0-.7.13-1.38.38-2.01V6.85H1.02A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.02 5.15l4.01-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.8 0 3.41.62 4.68 1.83l3.51-3.51C18.07 1.19 15.3 0 12 0 7.21 0 3.05 2.82 1.02 6.85l4.01 3.14c.98-2.95 3.73-5.24 6.97-5.24Z"
      />
    </svg>
  )
}

export default function LoginPage({ mode }) {
  const { login, registerUser, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const isRegister =
    mode === 'register' ||
    location.pathname === '/daftar' ||
    location.pathname === '/register'

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleNotice, setGoogleNotice] = useState('')

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

  const getRedirectTarget = (role) => {
    if (role === 'admin') return '/admin'
    if (['/masuk', '/login', '/daftar', '/register'].includes(from)) return '/'
    return from
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const normalized = email.trim().toLowerCase()

    if (isRegister) {
      if (!fullName.trim()) {
        setError('Masukkan nama lengkap Anda.')
        return
      }
      if (!normalized) {
        setError('Masukkan alamat email yang valid.')
        return
      }
      if (password.length < 6) {
        setError('Kata sandi minimal 6 karakter.')
        return
      }
      if (password !== confirmPassword) {
        setError('Konfirmasi kata sandi tidak cocok.')
        return
      }
      setLoading(true)
      setTimeout(() => {
        registerUser({ name: fullName, email: normalized })
        navigate(getRedirectTarget('user'), { replace: true })
        setLoading(false)
      }, 400)
      return
    }

    setLoading(true)
    // Demo auth: cocokkan email sederhana
    setTimeout(() => {
      if (normalized.includes('admin')) {
        login('admin')
        navigate(getRedirectTarget('admin'), { replace: true })
      } else if (normalized.length > 0) {
        login('user')
        navigate(getRedirectTarget('user'), { replace: true })
      } else {
        setError('Masukkan email untuk login demo.')
      }
      setLoading(false)
    }, 400)
  }

  const quickLogin = (role) => {
    login(role)
    navigate(getRedirectTarget(role), { replace: true })
  }

  const handleGoogleClick = () => {
    // Placeholder UI: credentials & OAuth flow akan disambungkan ke backend
    setGoogleNotice('Login dengan Google menunggu integrasi credentials backend.')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-5 md:px-8 md:pt-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="hidden lg:block">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Akun</p>
          <WordReveal
            text={isRegister ? 'Daftar ke BumiKopyor' : 'Masuk ke BumiKopyor'}
            className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
            {isRegister
              ? 'Buat akun untuk menyimpan keranjang, checkout lebih cepat, dan terhubung dengan kebun kopyor Pati.'
              : 'Akses katalog, keranjang, dan (untuk admin) dashboard mitra. Saat ini memakai autentikasi demo — backend akan ditambahkan kemudian.'}
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
              {isRegister
                ? 'Opsi Lanjutkan dengan Google siap dihubungkan ke backend'
                : 'Demo admin: email mengandung "admin"'}
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_40px_rgba(17,59,36,0.06)] sm:p-8"
        >
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#14452B] text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-[#113B24]">
                {isRegister ? 'Daftar' : 'Masuk'}
              </h1>
              <p className="text-xs text-gray-500">BumiKopyor</p>
            </div>
          </div>

          <h2 className="mt-6 hidden text-xl font-bold text-[#113B24] lg:block">
            {isRegister ? 'Form daftar' : 'Form masuk'}
          </h2>
          <p className="mt-1 hidden text-sm text-gray-500 lg:block">
            {isRegister
              ? 'Daftar dengan Google atau isi data akun Anda.'
              : 'Lanjutkan dengan Google, isi email, atau gunakan tombol cepat di bawah.'}
          </p>

          {/* Opsi tampilan Lanjutkan dengan Google (menunggu credentials backend) */}
          <button
            type="button"
            onClick={handleGoogleClick}
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-xs transition hover:border-gray-300 hover:bg-[#F7F9F6] active:scale-[0.99] sm:py-3.5 sm:text-sm"
          >
            <GoogleIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            <span className="truncate">Lanjutkan dengan Google</span>
          </button>

          {googleNotice && (
            <p className="mt-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-center text-[11px] font-medium text-amber-800 sm:text-xs">
              {googleNotice}
            </p>
          )}

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">
                {isRegister ? 'atau daftar dengan email' : 'atau masuk dengan email'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Nama lengkap
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap Anda"
                    className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F6] py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:bg-white focus:ring-2"
                  />
                </div>
              </div>
            )}

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
                  placeholder={isRegister ? 'nama@email.com' : 'user@bumikopyor.id atau admin@...'}
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
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? 'Minimal 6 karakter' : 'Bebas (demo)'}
                  className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F6] py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-xs font-semibold text-gray-700"
                >
                  Konfirmasi kata sandi
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full rounded-2xl border border-gray-200 bg-[#F7F9F6] py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:bg-white focus:ring-2"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14452B] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#113B24] disabled:opacity-60"
            >
              {loading ? 'Memproses...' : isRegister ? 'Daftar' : 'Masuk'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {!isRegister && (
            <>
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
            </>
          )}

          <p className="mt-6 text-center text-xs text-gray-500">
            {isRegister ? (
              <>
                Sudah punya akun?{' '}
                <Link to="/masuk" className="font-semibold text-[#14452B] hover:underline">
                  Masuk sekarang
                </Link>
              </>
            ) : (
              <>
                Belum punya akun?{' '}
                <Link to="/daftar" className="font-semibold text-[#14452B] hover:underline">
                  Daftar sekarang
                </Link>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
