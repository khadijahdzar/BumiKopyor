import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  User,
} from 'lucide-react'
import { articles } from '../data/articles'

export default function EdukasiDetailPage() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!article) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF3EE] text-[#14452B]">
          <BookOpen className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-[#113B24]">Artikel tidak ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">
          Artikel edukasi yang Anda cari belum tersedia atau telah dipindahkan.
        </p>
        <Link
          to="/edukasi"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#14452B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#113B24]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Edukasi
        </Link>
      </div>
    )
  }

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 pt-6 md:px-8 md:pt-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-gray-500"
      >
        <Link to="/" className="hover:text-[#14452B]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <Link to="/edukasi" className="hover:text-[#14452B]">
          Edukasi
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
        <span className="truncate font-semibold text-[#113B24]">{article.title}</span>
      </nav>

      <Link
        to="/edukasi"
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#14452B] ring-1 ring-gray-200 transition hover:bg-[#EBF3EE]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Semua Artikel Edukasi
      </Link>

      {/* Article Container */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_40px_rgba(17,59,36,0.05)] sm:p-10"
      >
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
          <span className="rounded-full bg-[#EBF3EE] px-3 py-1 text-[#14452B]">{article.tag}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.read} baca
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {article.date}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#113B24] sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-y border-gray-100 py-3.5 text-xs text-gray-600">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBF3EE] text-[#14452B]">
            <User className="h-4 w-4" />
          </span>
          <div>
            <p className="font-bold text-gray-900">{article.author}</p>
            <p className="text-[11px] text-gray-500">Edukasi Ekosistem BumiKopyor Pati</p>
          </div>
        </div>

        {/* Highlights Callout */}
        {article.highlights?.length > 0 && (
          <div className="mt-7 rounded-2xl border border-[#14452B]/15 bg-[#EBF3EE]/60 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#14452B]">
              Poin Penting Artikel
            </p>
            <ul className="mt-3 space-y-2">
              {article.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#14452B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Long-form Sections */}
        <div className="mt-8 space-y-8">
          {article.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3">
              <h2 className="text-lg font-bold tracking-tight text-[#113B24] sm:text-xl">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm leading-7 text-gray-700 sm:text-[15px]">
                  {p}
                </p>
              ))}
              {sec.tips && sec.tips.length > 0 && (
                <ul className="mt-3 space-y-2 rounded-2xl bg-[#F7F9F6] p-4 text-sm text-gray-700">
                  {sec.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#14452B]" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA inside article */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#0d2e1c] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold">Siap mencoba kopyor asli Pati?</p>
            <p className="mt-1 text-xs text-white/70">
              Jelajahi produk segar & bahan baku B2B langsung dari petani mitra terverifikasi.
            </p>
          </div>
          <Link
            to="/produk"
            className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#14452B] transition hover:bg-[#EBF3EE]"
          >
            Lihat Katalog Produk
          </Link>
        </div>
      </motion.article>

      {/* Related articles */}
      {otherArticles.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-[#113B24] sm:text-xl">Baca Artikel Lainnya</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {otherArticles.map((other) => (
              <Link
                key={other.slug}
                to={`/edukasi/${other.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:border-[#14452B]/20 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
                  <span className="rounded-full bg-[#EBF3EE] px-2.5 py-0.5 text-[#14452B]">
                    {other.tag}
                  </span>
                  <span>{other.read}</span>
                </div>
                <h3 className="mt-3 text-sm font-bold leading-snug text-gray-900 group-hover:text-[#14452B]">
                  {other.title}
                </h3>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#14452B]">
                  Baca artikel <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
