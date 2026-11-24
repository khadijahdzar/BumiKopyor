import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import KebunPage from './pages/KebunPage'
import EdukasiPage from './pages/EdukasiPage'
import AdminPage from './pages/AdminPage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/produk" element={<CatalogPage />} />
            <Route path="/katalog" element={<CatalogPage />} />
            <Route path="/kebun" element={<KebunPage />} />
            <Route path="/edukasi" element={<EdukasiPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
