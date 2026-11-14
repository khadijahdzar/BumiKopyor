import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f2e1a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Leaf className="h-5 w-5 text-[#b8d7bf]" />
              </span>
              <span className="text-lg font-bold tracking-tight">BumiKopyor</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
              Ekosistem agritech terpadu yang mempertemukan petani kelapa kopyor unggul dengan pelaku
              UMKM serta industri kuliner nusantara.
            </p>
            <p className="mt-4 text-xs font-medium text-white/50">
              Terverifikasi · Berkelanjutan · Adil
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">Tentang BumiKopyor</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/#petani" className="hover:text-white">
                  Kisah Petani Nusantara
                </Link>
              </li>
              <li>
                <a href="#sertifikasi" className="hover:text-white">
                  Sertifikasi Kultur Jaringan
                </a>
              </li>
              <li>
                <a href="#transparansi" className="hover:text-white">
                  Transparansi Rantai Pasok
                </a>
              </li>
              <li>
                <a href="#karir" className="hover:text-white">
                  Karir & Kolaborasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">Layanan & Produk</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/produk" className="hover:text-white">
                  Kelapa Kopyor Segar Grade A
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-white">
                  Daging Kopyor Beku (Frozen)
                </Link>
              </li>
              <li>
                <a href="#b2b" className="hover:text-white">
                  Pemesanan Kontrak B2B
                </a>
              </li>
              <li>
                <a href="#bibit" className="hover:text-white">
                  Bibit Kopyor Genjah Kultur
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wide text-white">Hubungi Kami</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                Sentra Perkebunan Kopyor Pati
                <br />
                Dukuhseti, Kabupaten Pati
                <br />
                Jawa Tengah 59158
              </li>
              <li className="pt-1">
                WhatsApp:{' '}
                <a href="https://wa.me/6281249002800" className="hover:text-white">
                  +62 812-4900-2800
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:kemitraan@bumikopyor.id" className="hover:text-white">
                  kemitraan@bumikopyor.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BumiKopyor Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#privasi" className="hover:text-white">
              Kebijakan Privasi
            </a>
            <a href="#syarat" className="hover:text-white">
              Syarat & Ketentuan
            </a>
            <a href="#mutu" className="hover:text-white">
              Standar Mutu Kopyor
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
