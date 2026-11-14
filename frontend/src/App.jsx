import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produk" element={<CatalogPage />} />
        <Route path="/katalog" element={<CatalogPage />} />
        {/* Placeholder routes agar nav tidak 404 */}
        <Route path="/masuk" element={<HomePage />} />
        <Route path="/mitra" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
