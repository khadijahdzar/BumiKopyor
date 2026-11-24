import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import KebunPage from './pages/KebunPage'
import EdukasiPage from './pages/EdukasiPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/produk" element={<CatalogPage />} />
              <Route path="/katalog" element={<CatalogPage />} />
              <Route path="/kebun" element={<KebunPage />} />
              <Route path="/edukasi" element={<EdukasiPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/masuk" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/keranjang" element={<CartPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
