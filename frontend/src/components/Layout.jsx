import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomTabBar from './BottomTabBar'
import Footer from './Footer'
import { useLenis } from '../hooks/useLenis'
import { useCart } from '../context/CartContext'

export default function Layout() {
  useLenis()
  const { cartCount, addToCart } = useCart()

  const handleAddToCart = (product) => {
    if (product) addToCart(product)
    else addToCart({ id: Date.now(), name: 'Item', price: 0, unit: '', quantity: 1 })
  }

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#111827]">
      <Navbar cartCount={cartCount} />
      <main className="pt-14 md:pt-24">
        <Outlet context={{ cartCount, handleAddToCart }} />
      </main>
      <Footer />
      <BottomTabBar />
    </div>
  )
}
