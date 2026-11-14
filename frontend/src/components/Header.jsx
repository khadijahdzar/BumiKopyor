import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingCart, User, X } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/produk', label: 'Produk' },
  { to: '/#petani', label: 'Petani' },
  { to: '/#edukasi', label: 'Edukasi' },
]

export default function Header({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="BumiKopyor beranda">
          <img
            src="/assets/logobumikopyor.png"
            alt="BumiKopyor Logo"
            className="h-9 w-auto max-w-[160px] object-contain sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'text-[#14452B] after:absolute after:inset-x-0 after:-bottom-[22px] after:h-0.5 after:rounded-full after:bg-[#14452B]'
                    : 'text-gray-500 hover:text-[#14452B]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex lg:gap-4">
          <Link
            to="/masuk"
            className="text-sm font-semibold text-gray-600 transition hover:text-[#14452B]"
          >
            Masuk
          </Link>
          <Link
            to="/mitra"
            className="rounded-xl bg-[#14452B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#113B24] lg:px-5"
          >
            Daftar sebagai Mitra
          </Link>
          <button
            type="button"
            className="relative rounded-xl p-2 text-[#113B24] transition hover:bg-[#F3F7F4]"
            aria-label={`Keranjang belanja, ${cartCount} item`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d68d47] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-xl p-2 text-[#113B24] transition hover:bg-[#F3F7F4]"
            aria-label="Akun"
          >
            <User className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            className="relative rounded-xl p-2 text-[#113B24]"
            aria-label={`Keranjang, ${cartCount} item`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d68d47] px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-xl p-2 text-[#113B24]"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="grid gap-1 border-t border-gray-100 bg-white px-4 py-4 md:hidden"
          aria-label="Navigasi mobile"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isActive ? 'bg-[#EBF3EE] text-[#14452B]' : 'text-gray-700 hover:bg-[#F3F7F4]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/mitra"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-xl bg-[#14452B] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Daftar sebagai Mitra
          </Link>
        </nav>
      )}
    </header>
  )
}
