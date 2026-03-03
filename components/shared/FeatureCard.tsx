'use client'

import { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  value?: string
  subtitle: string
  color?: string
  className?: string
}

export default function FeatureCard({
  icon,
  title,
  value,
  subtitle,
  color = '#712cdc',
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`
        relative bg-white rounded-xl p-4 shadow-sm
        border border-gray-100 card-hover overflow-hidden
        ${className}
      `}
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${color}08, transparent 60%)` }}
      />

      <div className="relative flex items-start justify-between gap-3">
        {/* Title and icon */}
        <div className="flex-1">
          <p
            className="text-sm font-medium leading-tight text-gray-900"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </p>
        </div>

        {/* Icon container with colored background */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <div className="transform scale-100">{icon}</div>
        </div>
      </div>

      {/* Value and subtitle */}
      <div className="relative mt-3">
        {value && (
          <p
            className="text-2xl font-bold"
            style={{ color }}
          >
            {value}
          </p>
        )}
        <p
          className="text-xs mt-0.5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}
