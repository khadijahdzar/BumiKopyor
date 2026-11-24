import { Link } from 'react-router-dom'
import { Leaf, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d2e1c] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(64,113,73,0.45), transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(20,69,43,0.5), transparent 45%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-14 md:px-8 md:pb-16 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Leaf className="h-5 w-5 text-[#b8d7bf]" />
              </span>
              <span>
                <span className="block text-base font-bold">BumiKopyor</span>
                <span className="block text-[10px] text-white/50">Ekosistem Kelapa Kopyor Digital</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Menghubungkan kopyor asli Pati langsung dari petani ke meja Anda — segar, adil, dan
              transparan.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Jelajahi</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li><Link className="hover:text-white" to="/">Home</Link></li>
              <li><Link className="hover:text-white" to="/produk">Produk</Link></li>
              <li><Link className="hover:text-white" to="/kebun">Kebun & Petani</Link></li>
              <li><Link className="hover:text-white" to="/edukasi">Edukasi</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Layanan</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li><a className="hover:text-white" href="#mutu">Standar Mutu</a></li>
              <li><a className="hover:text-white" href="#mitra">Kemitraan Petani</a></li>
              <li><a className="hover:text-white" href="#b2b">Grosir B2B</a></li>
              <li><a className="hover:text-white" href="#syarat">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Hubungi Kami</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d7bf]" />
                <span>Margoyoso, Kab. Pati, Jawa Tengah 59154</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d7bf]" />
                <a className="hover:text-white" href="https://wa.me/6282134008512">+62 821-3400-8512</a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b8d7bf]" />
                <a className="hover:text-white" href="mailto:GotoWin@bumikopyor.id">GotoWin@bumikopyor.id</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BumiKopyor Indonesia. Hak cipta dilindungi.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="hover:text-white" href="#privasi">Privasi</a>
            <a className="hover:text-white" href="#syarat">Syarat</a>
            <a className="hover:text-white" href="#mutu">Mutu Kopyor</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
