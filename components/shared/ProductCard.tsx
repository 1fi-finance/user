'use client'

import { ReactNode, useState } from 'react'

interface ProductCardProps {
  name: string
  image?: string | ReactNode
  originalPrice: number
  discount: number
  finalPrice: number
  location?: string
  onWishlistToggle?: (isWishlisted: boolean) => void
  onAddToCart?: () => void
  className?: string
}

export default function ProductCard({
  name,
  image,
  originalPrice,
  discount,
  finalPrice,
  location,
  onWishlistToggle,
  onAddToCart,
  className = '',
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlistClick = () => {
    const newValue = !isWishlisted
    setIsWishlisted(newValue)
    onWishlistToggle?.(newValue)
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      className={`
        relative bg-white rounded-xl p-3 shadow-sm
        border border-gray-100 card-hover
        ${className}
      `}
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      <div className="flex gap-3">
        {/* Product image */}
        <div
          className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-bg-hover)' }}
        >
          {typeof image === 'string' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : image || (
            <span className="text-3xl" role="img" aria-label="Product image">
              📦
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          {/* Wishlist button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center focus-ring touch-feedback"
            style={{
              backgroundColor: isWishlisted ? '#fecaca33' : 'var(--color-bg-hover)',
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <svg
              className="w-4 h-4"
              fill={isWishlisted ? '#ef4444' : 'none'}
              stroke={isWishlisted ? '#ef4444' : 'currentColor'}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Product name */}
          <p
            className="text-sm font-medium leading-tight pr-6 line-clamp-2"
            style={{ color: 'var(--color-text-primary)' }}
            title={name}
          >
            {name}
          </p>

          {/* Location */}
          {location && (
            <p
              className="text-xs mt-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {location}
            </p>
          )}

          {/* Price info */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xs line-through"
              style={{ color: 'var(--color-text-muted)' }}
            >
              MPR {formatPrice(originalPrice)}
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              -{discount}%
            </span>
          </div>

          {/* Final price */}
          <p
            className="text-base font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {formatPrice(finalPrice)}
          </p>
        </div>
      </div>

      {/* Add to cart button */}
      {onAddToCart && (
        <button
          onClick={onAddToCart}
          className="w-full mt-3 py-2 rounded-lg text-sm font-medium focus-ring touch-feedback flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      )}
    </div>
  )
}
