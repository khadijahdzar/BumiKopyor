import { motion } from 'motion/react'
import { MapPin, Trees, Users, Sprout } from 'lucide-react'
import WordReveal from '../components/WordReveal'

const farms = [
  {
    name: 'Kebun Pak Suyanto',
    location: 'Margoyoso, Pati',
    trees: 420,
    focus: 'Kelapa Kopyor Segar Grade A',
  },
  {
    name: 'Kebun Bu Kartini',
    location: 'Tayu, Pati',
    trees: 280,
    focus: 'Kopyor Wulung & Olahan',
  },
  {
    name: 'Koperasi Makmur',
    location: 'Gembong, Pati',
    trees: 950,
    focus: 'VCO & Bahan Baku B2B',
  },
  {
    name: 'Sentra Tayu',
    location: 'Tayu, Pati',
    trees: 610,
    focus: 'Flakes & Frozen Kopyor',
  },
]

export default function KebunPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Kebun</p>
        <WordReveal
          text="Mitra Kebun & Petani Kopyor"
          className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
        />
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Jaringan kebun mitra di Pati yang menanam, merawat, dan memanen kopyor dengan standar
          mutu bersama.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Trees, label: 'Pohon Mitra', value: '2.200+' },
          { icon: Users, label: 'Petani Aktif', value: '48' },
          { icon: Sprout, label: 'Kecamatan', value: '6' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <s.icon className="h-5 w-5 text-[#14452B]" />
            <p className="mt-3 text-2xl font-bold text-[#113B24]">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {farms.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-[#eef2eb] to-[#c5d9c8]">
              <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">
                {f.name}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-900">{f.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-[#14452B]" />
                {f.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full bg-[#EBF3EE] px-3 py-1 font-semibold text-[#14452B]">
                  {f.trees} pohon
                </span>
                <span className="rounded-full bg-gray-50 px-3 py-1 font-medium text-gray-600">
                  {f.focus}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="forest-cta mt-14 rounded-[28px] px-6 py-12 text-center sm:px-10"
      >
        <h2 className="text-xl font-bold text-white sm:text-2xl">Punya kebun kopyor di Pati?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
          Bergabung sebagai mitra petani — akses pasar digital, harga adil, dan pendampingan mutu.
        </p>
        <a
          href="https://wa.me/6282134008512"
          className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#14452B] shadow transition hover:bg-[#EBF3EE]"
        >
          Hubungi Tim Kemitraan
        </a>
      </motion.div>
    </div>
  )
}
