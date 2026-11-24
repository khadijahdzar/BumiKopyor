import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Leaf, ShoppingCart, User, LogOut, Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

gsap.registerPlugin(ScrollTrigger)

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/produk', label: 'Produk' },
  { to: '/kebun', label: 'Kebun' },
  { to: '/edukasi', label: 'Edukasi' },
]

export default function Navbar() {
  const pillRef = useRef(null)
  const location = useLocation()
  const { user, isAdmin, logout } = useAuth()
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const pill = pillRef.current
    if (!pill) return
    const ctx = gsap.context(() => {
      gsap.fromTo(pill, { y: -40, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.15 })
      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => {
          const p = Math.min(1, self.scroll() / 180)
          gsap.to(pill, {
            backdropFilter: `blur(${12 + p * 10}px)`,
            backgroundColor: `rgba(255,255,255,${0.55 + p * 0.35})`,
            boxShadow: p > 0.3 ? '0 10px 40px rgba(17,59,36,0.12)' : '0 4px 24px rgba(17,59,36,0.06)',
            duration: 0.15,
            overwrite: true,
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Desktop pill nav */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden justify-center pt-4 md:flex lg:pt-5">
        <nav
          ref={pillRef}
          className="pointer-events-auto flex max-w-[min(920px,94vw)] items-center gap-1 rounded-full border border-white/40 bg-white/55 px-5 py-2.5 shadow-[0_4px_24px_rgba(17,59,36,0.06)] backdrop-blur-xl"
          aria-label="Navigasi utama"
        >
          <Link to="/" className="mr-2 flex shrink-0 items-center gap-2 rounded-full pr-2" aria-label="BumiKopyor beranda">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14452B] text-white shadow-sm">
              <Leaf className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="hidden text-sm font-bold tracking-tight text-[#113B24] sm:block">BumiKopyor</span>
          </Link>
          <div className="mx-1 hidden h-6 w-px bg-[#14452B]/15 lg:block" />
          <div className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                    isActive
                      ? 'bg-[#14452B] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-[#14452B]/08 hover:text-[#14452B]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mx-1 hidden h-6 w-px bg-[#14452B]/15 sm:block" />
          <div className="flex items-center gap-1.5 pl-1">
            <Link
              to="/keranjang"
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#113B24] transition hover:bg-[#14452B]/10"
              aria-label={`Keranjang, ${cartCount} item`}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d89536] px-1 text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-1">
                <span className="hidden items-center gap-1.5 rounded-full bg-[#EBF3EE] px-2.5 py-1.5 text-xs font-semibold text-[#14452B] lg:inline-flex">
                  {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  {user.name}
                </span>
                {isAdmin && (
                  <Link to="/admin" className="rounded-full bg-[#113B24] px-3 py-1.5 text-xs font-semibold text-white">
                    Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Keluar"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  to="/masuk"
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-[#14452B]/08"
                >
                  Masuk
                </Link>
                <Link
                  to="/masuk"
                  className="rounded-full bg-[#14452B] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#113B24]"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/30 bg-white/80 px-4 backdrop-blur-xl md:hidden">
        <Link to="/" className="flex items-center gap-2" aria-label="BumiKopyor">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14452B] text-white">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold text-[#113B24]">BumiKopyor</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/keranjang"
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-[#113B24] active:bg-[#EBF3EE]"
            aria-label={`Keranjang, ${cartCount} item`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d89536] px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500"
              aria-label="Keluar"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link
              to="/masuk"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF3EE] text-[#14452B]"
              aria-label="Masuk"
            >
              <User className="h-4 w-4" />
            </Link>
          )}
        </div>
      </header>
    </>
  )
}
