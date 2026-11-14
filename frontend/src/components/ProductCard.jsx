import { Heart, MapPin, ShoppingCart, Star } from 'lucide-react'

const badgeStyles = {
  green: 'bg-[#14452B] text-white',
  white: 'bg-white/95 text-[#14452B] shadow-sm',
  orange: 'bg-[#c47a2c] text-white',
  cyan: 'bg-[#0d9488] text-white',
  amber: 'bg-[#d97706] text-white',
  teal: 'bg-[#0f766e] text-white',
}

function formatPrice(n) {
  return new Intl.NumberFormat('id-ID').format(n)
}

export default function ProductCard({ product, onAddToCart }) {
  const isPreOrder = product.stockStatus === 'preorder'

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative p-3 pb-0">
        <div
          className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#eef2eb] to-[#e4ebe3] text-center text-xs font-medium text-gray-400"
          role="img"
          aria-label={product.imageLabel}
        >
          <span className="px-4">[Foto: {product.imageLabel}]</span>
        </div>

        <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
          {product.badges.map((b) => (
            <span
              key={b.label}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold shadow-sm ${badgeStyles[b.variant] || badgeStyles.green}`}
            >
              {b.label}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-400 shadow-sm transition hover:bg-white hover:text-rose-500"
          aria-label="Tambah ke wishlist"
        >
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute bottom-2 left-5 right-5 flex items-center justify-between gap-2">
          <span className="inline-flex max-w-[55%] items-center gap-1 truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-gray-700 shadow-sm">
            <MapPin className="h-3 w-3 shrink-0 text-[#28633d]" />
            {product.farmer}
          </span>
          <span className="truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-gray-500 shadow-sm">
            {product.location}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
          <span className="inline-flex items-center gap-0.5 font-semibold text-gray-700">
            <Star className="h-3.5 w-3.5 fill-[#d89536] text-[#d89536]" />
            {product.rating.toFixed(1)}
            <span className="font-normal text-gray-400">({product.reviews} ulasan)</span>
          </span>
          <span className="rounded-full bg-[#F3F7F4] px-2 py-0.5 text-[10px] font-semibold text-[#28633d]">
            {product.unitDetail}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-5 text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium text-gray-400">{product.priceLabel}</p>
            <p className="text-lg font-bold tracking-tight text-[#113B24]">
              Rp {formatPrice(product.price)}
              <span className="ml-0.5 text-xs font-medium text-gray-500">{product.unit}</span>
            </p>
          </div>

          {isPreOrder ? (
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#cbdccd] bg-white px-3.5 py-2.5 text-xs font-bold text-[#14452B] transition hover:bg-[#EBF3EE]"
            >
              Pre-Order
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart?.(product)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#14452B] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#113B24]"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              + Keranjang
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
