import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  MapPin,
  Search,
  Star,
  BadgeCheck,
  Phone,
  Navigation,
  Trees,
  Filter,
} from 'lucide-react'
import WordReveal from '../components/WordReveal'
import KebunMap from '../components/KebunMap'

const FARMS = [
  {
    id: 1,
    name: 'Agro Kopyor Kenanti',
    verified: true,
    rating: 4.9,
    reviews: 128,
    location: 'Dukuhseti, Pati',
    address: 'Jl. Raya Dukuhseti KM 3, Pati',
    lat: -6.4335,
    lng: 111.0185,
    phone: '+62 821-3400-8512',
    focus: 'Kelapa kopyor segar Grade A & daging kopyor',
    trees: 520,
    tags: ['Sentra Produksi', 'Siap Kunjung'],
    filter: 'Sentra Produksi',
  },
  {
    id: 2,
    name: 'Sentra Bibit Kelapa Kopyor Genjah Beringin Dewantara',
    verified: true,
    rating: 5.0,
    reviews: 64,
    location: 'Margoyoso, Pati',
    address: 'Dusun Beringin, Margoyoso',
    lat: -6.6178,
    lng: 111.0956,
    phone: '+62 812-3456-7890',
    focus: 'Bibit kopyor genjah & pendampingan kebun',
    trees: 380,
    tags: ['Bibit & Perbibitan'],
    filter: 'Bibit & Perbibitan',
  },
  {
    id: 3,
    name: 'Bibit Kopyor Greenhouse Nusantara',
    verified: true,
    rating: 4.8,
    reviews: 41,
    location: 'Tayu, Pati',
    address: 'Kawasan Greenhouse Tayu',
    lat: -6.5396,
    lng: 111.0531,
    phone: '+62 813-2211-4455',
    focus: 'Greenhouse & pembibitan modern',
    trees: 210,
    tags: ['Wisata Edukasi'],
    filter: 'Wisata Edukasi',
  },
  {
    id: 4,
    name: 'Kampung Kopyor Pati',
    verified: true,
    rating: 4.7,
    reviews: 89,
    location: 'Gembong, Pati',
    address: 'Desa Gembong RT 02',
    lat: -6.6967,
    lng: 110.9565,
    phone: '+62 857-1111-2233',
    focus: 'Klaster petani & agrowisata kopyor',
    trees: 740,
    tags: ['Sentra Produksi', 'Wisata Edukasi'],
    filter: 'Sentra Produksi',
  },
  {
    id: 5,
    name: 'Kebun Kelapa Kopyor Agro Potensi',
    verified: true,
    rating: 4.6,
    reviews: 33,
    location: 'Cluwak, Pati',
    address: 'Jl. Raya Cluwak–Pati',
    lat: -6.5172,
    lng: 110.9412,
    phone: '+62 822-9988-7766',
    focus: 'Kopyor potong langsung & olahan lokal',
    trees: 290,
    tags: ['Kopyor Potong Langsung'],
    filter: 'Kopyor Potong Langsung',
  },
]

const FILTERS = [
  'Semua Kebun',
  'Sentra Produksi',
  'Bibit & Perbibitan',
  'Wisata Edukasi',
  'Kopyor Potong Langsung',
]

export default function KebunPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua Kebun')
  const [selectedId, setSelectedId] = useState(1)

  const filtered = useMemo(() => {
    let list = [...FARMS]
    if (filter !== 'Semua Kebun') {
      list = list.filter((f) => f.filter === filter || (Array.isArray(f.tags) && f.tags.includes(filter)))
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.location.toLowerCase().includes(q) ||
          f.focus.toLowerCase().includes(q),
      )
    }
    return list
  }, [query, filter])

  const selected = FARMS.find((f) => f.id === selectedId) || filtered[0] || FARMS[0]

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-5 md:px-8 md:pt-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">
          Koneksi Agrowisata & Sentra Produksi
        </p>
        <WordReveal
          text="Eksplorasi Kebun & Sentra Kopyor Terverifikasi Pati"
          className="mt-2 text-2xl font-bold tracking-tight text-[#113B24] sm:text-3xl md:text-4xl"
        />
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Temukan lokasi kebun kopyor genjah, sentra pembibitan, kuliner, dan agrowisata kopyor asli
          langsung di sentra pertanian pesisir utara Pati, Jawa Tengah.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col gap-3 sm:mt-8">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kebun kopyor di daerah Pati..."
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none ring-[#14452B]/20 focus:border-[#14452B] focus:ring-2"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition sm:px-4 ${
                filter === f
                  ? 'bg-[#14452B] text-white shadow-sm'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-[#F3F7F4]'
              }`}
            >
              {f === 'Semua Kebun' ? (
                <span className="inline-flex items-center gap-1.5">
                  <Filter className="h-3 w-3" />
                  {f}
                </span>
              ) : (
                f
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List + Map */}
      <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-5">
        {/* Farm list */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
            <h2 className="text-sm font-bold text-gray-900">
              Daftar Kebun Pati{' '}
              <span className="font-medium text-gray-400">({filtered.length})</span>
            </h2>
            <span className="hidden text-[11px] text-gray-400 sm:inline">Urutan: Rating tertinggi</span>
          </div>
          <ul className="max-h-[min(520px,60vh)] divide-y divide-gray-50 overflow-y-auto">
            {filtered.map((farm, i) => {
              const active = selected?.id === farm.id
              return (
                <motion.li
                  key={farm.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.2) }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(farm.id)}
                    className={`flex w-full gap-3 px-4 py-4 text-left transition sm:gap-4 sm:px-5 ${
                      active ? 'bg-[#EBF3EE]/80' : 'hover:bg-[#F7F9F6]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {farm.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF3EE] px-2 py-0.5 text-[10px] font-bold text-[#14452B]">
                            <BadgeCheck className="h-3 w-3" />
                            Terverifikasi
                          </span>
                        )}
                        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-gray-800">
                          <Star className="h-3.5 w-3.5 fill-[#d89536] text-[#d89536]" />
                          {farm.rating}
                          <span className="font-normal text-gray-400">({farm.reviews})</span>
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-bold leading-snug text-[#113B24] sm:text-[15px]">
                        {farm.name}
                      </h3>
                      <p className="mt-1 flex items-start gap-1 text-[11px] text-gray-500 sm:text-xs">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#14452B]" />
                        <span>
                          {farm.location} · {farm.address}
                        </span>
                      </p>
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                        {farm.focus}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-[#F3F7F4] px-2 py-0.5 text-[10px] font-semibold text-[#14452B]">
                          <Trees className="mr-0.5 inline h-3 w-3" />
                          {farm.trees} pohon
                        </span>
                        {(Array.isArray(farm.tags) ? farm.tags : [farm.tags]).filter(Boolean).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </motion.li>
              )
            })}
            {filtered.length === 0 && (
              <li className="px-5 py-12 text-center text-sm text-gray-500">
                Tidak ada kebun yang cocok. Coba ubah filter atau kata kunci.
              </li>
            )}
          </ul>
        </div>

        {/* Map panel */}
        <div className="flex flex-col gap-3">
          <div className="relative z-0 isolate min-h-[320px] flex-1 overflow-hidden rounded-3xl border border-gray-100 bg-[#e8efe9] shadow-sm sm:min-h-[400px]">
            <KebunMap farms={filtered.length > 0 ? filtered : FARMS} selected={selected} onSelect={setSelectedId} />

            {/* Selected farm floating card */}
            {selected && (
              <div className="absolute bottom-3 left-3 right-3 z-[500] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
                <div className="flex gap-3">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#eef2eb] to-[#c5d9c8] text-center text-[9px] font-semibold text-[#14452B] sm:h-16 sm:w-16">
                    <Trees className="h-5 w-5" />
                    <span className="mt-0.5">{selected.trees} phn</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#113B24]">{selected.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
                      <MapPin className="h-3 w-3 shrink-0 text-[#14452B]" />
                      <span className="truncate">
                        {selected.address}, {selected.location}
                      </span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-[#14452B] px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-[#113B24]"
                      >
                        <Phone className="h-3 w-3" />
                        Hubungi
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-[#EBF3EE] px-2.5 py-1 text-[10px] font-semibold text-[#14452B] transition hover:bg-[#dce9df]"
                      >
                        <Navigation className="h-3 w-3" />
                        Petunjuk Arah
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 sm:text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-gray-100">
              <span className="h-2 w-2 rounded-full bg-[#14452B]" /> Sentra terpilih / terverifikasi
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-gray-100">
              <span className="h-2 w-2 rounded-full bg-[#d89536]" /> Wisata edukasi
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 overflow-hidden rounded-[28px] bg-[#0d2e1c] px-5 py-10 text-center sm:px-10 sm:py-12"
      >
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#b8d7bf]">
          Program Agrowisata & Kunjungan Kebun
        </p>
        <h2 className="mx-auto mt-2 max-w-xl text-xl font-bold text-white sm:text-2xl md:text-3xl">
          Tertarik Mengunjungi Kebun Mitra Kopyor Langsung?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/65">
          Jadwalkan kunjungan edukasi, tasting kopyor, atau tur kebun bersama petani mitra terverifikasi
          di Dukuhseti, Tayu, dan sekitarnya.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/6282134008512"
            className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#14452B] shadow transition hover:bg-[#EBF3EE]"
          >
            Jadwalkan Kunjungan Kebun
          </a>
          <a
            href="https://wa.me/6282134008512"
            className="inline-flex rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Konsultasi dengan Agrowisata
          </a>
        </div>
      </motion.div>
    </div>
  )
}
