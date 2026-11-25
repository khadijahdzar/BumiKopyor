import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Heart, Star, ShoppingCart, MapPin } from 'lucide-react'

const badgeStyles = {
  green: 'bg-[#EBF3EE] text-[#14452B]',
  cyan: 'bg-cyan-50 text-cyan-800',
  amber: 'bg-amber-50 text-amber-800',
  orange: 'bg-orange-50 text-orange-800',
  teal: 'bg-teal-50 text-teal-800',
  white: 'bg-white/90 text-gray-700 border border-gray-200',
}

export default function ProductCard({ product, index = 0, onAddToCart }) {
  const {
    id,
    name,
    description,
    price,
    priceLabel,
    unit,
    unitDetail,
    rating,
    reviews,
    badges = [],
    farmer,
    location,
    stockStatus,
    image,
    imageLabel,
  } = product

  const [wishlisted, setWishlisted] = useState(Boolean(product.wishlist))

  const formatPrice = (n) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(17,59,36,0.04)]"
    >
      <Link to={`/produk/${id}`} className="relative block aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#eef2eb] to-[#dce9df]">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm font-medium text-gray-500 transition duration-300 group-hover:scale-105">
            {imageLabel || name}
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeStyles[b.variant] || badgeStyles.green}`}
            >
              {b.label}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setWishlisted((w) => !w)
          }}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition ${
            wishlisted
              ? 'opacity-100 text-red-500'
              : 'text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
          }`}
          aria-label="Wishlist"
        >
          <Heart className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        {stockStatus === 'preorder' && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#113B24]/90 px-2.5 py-1 text-[10px] font-bold text-white">
            Pre-Order
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link to={`/produk/${id}`} className="block flex-1">
          <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
            <Star className="h-3.5 w-3.5 fill-[#d89536] text-[#d89536]" />
            <span className="font-semibold text-gray-800">{rating}</span>
            <span>({reviews})</span>
          </div>

          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#111827] transition group-hover:text-[#14452B]">
            {name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">{description}</p>

          <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-500">
            <MapPin className="h-3 w-3 shrink-0 text-[#14452B]" />
            <span className="truncate">
              {farmer} · {location}
            </span>
          </div>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <Link to={`/produk/${id}`} className="block min-w-0">
            <p className="text-lg font-bold tracking-tight text-[#113B24]">{formatPrice(price)}</p>
            <p className="text-[11px] text-gray-500">
              {priceLabel || unitDetail} {unit}
            </p>
          </Link>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onAddToCart?.(product)
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#14452B] text-white shadow-md transition hover:bg-[#113B24]"
            aria-label={`Tambah ${name} ke keranjang`}
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}
