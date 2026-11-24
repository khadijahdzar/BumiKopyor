import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomTabBar from './BottomTabBar'
import Footer from './Footer'
import { useLenis } from '../hooks/useLenis'

export default function Layout() {
  useLenis()
  const [cartCount, setCartCount] = useState(0)

  const handleAddToCart = () => setCartCount((c) => c + 1)

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#111827]">
      <Navbar cartCount={cartCount} />
      <main className="pt-14 md:pt-24">
        <Outlet context={{ cartCount, setCartCount, handleAddToCart }} />
      </main>
      <Footer />
      <BottomTabBar />
    </div>
  )
}
