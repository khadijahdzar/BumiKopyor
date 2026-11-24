import { NavLink } from 'react-router-dom'
import { Home, ShoppingBag, Trees, BookOpen, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/produk', label: 'Produk', icon: ShoppingBag },
  { to: '/kebun', label: 'Kebun', icon: Trees },
  { to: '/edukasi', label: 'Edukasi', icon: BookOpen },
]

/**
 * Bottom tab bar — hanya tampil di mobile
 */
export default function BottomTabBar() {
  const { isAdmin } = useAuth()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/40 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      aria-label="Navigasi bawah"
    >
      <div className="mx-auto flex h-[64px] max-w-lg items-stretch justify-around px-1">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold transition ${
                isActive ? 'text-[#14452B]' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-12 items-center justify-center rounded-2xl transition ${
                    isActive ? 'bg-[#EBF3EE]' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
                </span>
                <span className="truncate">{label}</span>
              </>
            )}
          </NavLink>
        ))}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-semibold transition ${
                isActive ? 'text-[#14452B]' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-12 items-center justify-center rounded-2xl transition ${
                    isActive ? 'bg-[#EBF3EE]' : ''
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
                </span>
                <span className="truncate">Admin</span>
              </>
            )}
          </NavLink>
        )}
      </div>
    </nav>
  )
}
