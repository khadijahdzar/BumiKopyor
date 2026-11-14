import { Link } from 'react-router-dom'
import { Globe, Leaf, Mail, MapPin, MessageCircle } from 'lucide-react'

function Brand({ light = false }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="BumiKopyor beranda">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
          light ? 'bg-white/10' : 'bg-[#EBF3EE]'
        }`}
      >
        <Leaf className={`h-6 w-6 ${light ? 'text-[#b8d7bf]' : 'text-[#14452B]'}`} />
      </span>
      <span className="leading-tight">
        <span
          className={`block text-lg font-bold tracking-tight ${
            light ? 'text-white' : 'text-[#113B24]'
          }`}
        >
          BumiKopyor
        </span>
        <span className={`mt-1 block text-[10px] ${light ? 'text-white/60' : 'text-gray-500'}`}>
          Ekosistem Kelapa Kopyor Digital
        </span>
      </span>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0B2918] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 lg:px-8 lg:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Brand light />
            <p className="mt-5 max-w-xs text-xs leading-6 text-white/60">
              Menghubungkan kopyor asli Pati dengan lebih banyak keluarga dan bisnis, sambil
              menumbuhkan kesejahteraan petani lokal.
            </p>
            <div className="mt-5 flex gap-2">
              {[Globe, MessageCircle, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href={['#sosial', 'https://wa.me/6282134008512', 'mailto:GotoWin@bumikopyor.id'][index]}
                  aria-label={['Situs BumiKopyor', 'WhatsApp', 'Email'][index]}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Tentang BumiKopyor</h3>
            <ul className="mt-5 space-y-3 text-xs text-white/60">
              <li>
                <Link className="hover:text-white" to="/#tentang">
                  Kisah Kami & Petani
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/#tentang">
                  Sertifikasi Mutu Kopyor
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/#tentang">
                  Dampak & Rantai Pasok
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/#mitra">
                  Karir & Kemitraan
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Layanan & Produk</h3>
            <ul className="mt-5 space-y-3 text-xs text-white/60">
              <li>
                <Link className="hover:text-white" to="/produk">
                  Kelapa Kopyor Segar Utuh
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/produk">
                  Daging Kopyor Beku (Frozen)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/#mitra">
                  Pemesanan Grosir B2B
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" to="/#mitra">
                  Kemitraan Petani Kebun
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Hubungi Kami</h3>
            <ul className="mt-5 space-y-4 text-xs leading-5 text-white/60">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d7bf]" />
                <span>Jl. Raya Pati - Tayu Km. 12, Margoyoso, Kab. Pati, Jawa Tengah 59154</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-[#b8d7bf]">☎</span>
                <a className="hover:text-white" href="https://wa.me/6282134008512">
                  +62 821-3400-8512
                </a>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-[#b8d7bf]">✉</span>
                <a className="hover:text-white" href="mailto:GotoWin@bumikopyor.id">
                  GotoWin@bumikopyor.id
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 BumiKopyor Indonesia. Hak cipta dilindungi undang-undang.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-white" href="#privasi">
              Kebijakan Privasi
            </a>
            <a className="hover:text-white" href="#syarat">
              Syarat & Ketentuan
            </a>
            <a className="hover:text-white" href="#mutu">
              Standar Mutu Kopyor
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
