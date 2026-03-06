"use client";

import { ReactNode } from "react";

interface MerchantCardProps {
  name: string;
  address: string;
  category: string;
  rating: number;
  icon?: ReactNode;
  onDirectionsClick?: () => void;
  className?: string;
}

export default function MerchantCard({
  name,
  address,
  category,
  rating,
  icon,
  onDirectionsClick,
  className = "",
}: MerchantCardProps) {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-3.5 h-3.4 text-yellow-400 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <svg
            className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
          </svg>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-3.5 h-3.5 text-gray-200 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`
        bg-white rounded-xl p-3 shadow-sm border border-gray-100
        flex-shrink-0 card-hover
        ${className}
      `}
      style={{
        width: "240px",
        borderRadius: "var(--radius-md)",
      }}
    >
      {/* Main content */}
      <div className="flex items-start gap-3">
        {/* Icon/Emoji */}
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--color-bg-hover)" }}
        >
          {icon || (
            <span className="text-2xl" role="img" aria-label="Merchant icon">
              🏪
            </span>
          )}
        </div>

        {/* Merchant info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium truncate"
            style={{ color: "var(--color-text-primary)" }}
            title={name}
          >
            {name}
          </p>
          <p
            className="text-xs truncate mt-0.5"
            style={{ color: "var(--color-text-muted)" }}
            title={address}
          >
            {address}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {category}
          </p>
        </div>
      </div>

      {/* Footer with rating and directions */}
      <div
        className="flex items-center justify-between mt-3 pt-3 border-t"
        style={{ borderColor: "var(--color-divider)" }}
      >
        {/* Rating */}
        <div
          className="flex items-center gap-1.5"
          role="img"
          aria-label={`Rating: ${rating} out of 5 stars`}
        >
          {renderStars(rating)}
          <span
            className="text-xs font-medium ml-0.5"
            style={{ color: "var(--color-text-muted)" }}
          >
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Directions button */}
        {onDirectionsClick && (
          <button
            onClick={onDirectionsClick}
            className="flex items-center gap-1.5 text-xs font-medium focus-ring rounded-md px-2 py-1 -my-1 touch-feedback"
            style={{ color: "var(--color-primary)" }}
            aria-label={`Get directions to ${name}`}
          >
            <span>Get Directions</span>
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
