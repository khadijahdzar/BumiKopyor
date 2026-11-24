import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const DEMO_USERS = {
  user: {
    id: 'u1',
    name: 'Pengunjung',
    email: 'user@bumikopyor.id',
    role: 'user',
  },
  admin: {
    id: 'a1',
    name: 'Admin BumiKopyor',
    email: 'admin@bumikopyor.id',
    role: 'admin',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = useCallback((role = 'user') => {
    setUser(DEMO_USERS[role] || DEMO_USERS.user)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isUser: user?.role === 'user',
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}
