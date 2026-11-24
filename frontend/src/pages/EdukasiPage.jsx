import { motion } from 'motion/react'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'
import WordReveal from '../components/WordReveal'

const articles = [
  {
    title: 'Cara Membedakan Kopyor Asli vs Biasa',
    tag: 'Dasar',
    read: '5 menit',
    excerpt: 'Tanda fisik, suara, dan tekstur daging yang membedakan kelapa kopyor premium.',
  },
  {
    title: 'Rantai Dingin: Menjaga Kesegaran sampai Pembeli',
    tag: 'Logistik',
    read: '7 menit',
    excerpt: 'Praktik penanganan pasca panen agar kopyor tetap premium saat sampai di meja.',
  },
  {
    title: 'Budidaya Kopyor: Varietas & Perawatan',
    tag: 'Budidaya',
    read: '10 menit',
    excerpt: 'Pengenalan varietas lokal Pati dan tips merawat pohon agar panen stabil.',
  },
  {
    title: 'Peluang Usaha Olahan Kopyor untuk UMKM',
    tag: 'Bisnis',
    read: '8 menit',
    excerpt: 'Ide produk, margin, dan tips memulai usaha es kopyor atau VCO skala kecil.',
  },
]

export default function EdukasiPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8 md:pt-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#28633d]">Edukasi</p>
        <WordReveal
          text="Belajar tentang Kopyor & Ekosistemnya"
          className="mt-2 text-3xl font-bold tracking-tight text-[#113B24] sm:text-4xl"
        />
        <p className="mt-3 text-sm text-gray-500">
          Artikel singkat untuk petani, pembeli, dan pelaku UMKM yang ingin paham kopyor lebih
          dalam.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {articles.map((a, i) => (
          <motion.article
            key={a.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="group flex cursor-pointer flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-[#14452B]/15 hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
              <span className="rounded-full bg-[#EBF3EE] px-2.5 py-1 text-[#14452B]">{a.tag}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {a.read}
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug text-gray-900 group-hover:text-[#14452B]">
              {a.title}
            </h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">{a.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#14452B]">
              Baca selengkapnya <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 flex items-start gap-4 rounded-3xl border border-dashed border-[#14452B]/25 bg-[#EBF3EE]/50 p-6"
      >
        <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-[#14452B]" />
        <div>
          <h3 className="text-sm font-bold text-[#113B24]">Konten edukasi terus bertambah</h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            Versi berikutnya akan menambahkan video budidaya, panduan sertifikasi, dan modul untuk
            mitra petani.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
