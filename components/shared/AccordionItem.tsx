'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

// Simple utility to merge class names
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

interface AccordionItemProps {
  id: string
  title: string
  children: ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
  isOpen: boolean
  onToggle: () => void
  className?: string
  contentClassName?: string
}

export default function AccordionItem({
  id,
  title,
  children,
  icon,
  defaultOpen = false,
  isOpen,
  onToggle,
  className = '',
  contentClassName = '',
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0)

  // Calculate height when isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(contentRef.current.scrollHeight)
      } else {
        setHeight(0)
      }
    }
  }, [isOpen])

  // Handle transition end to set height to auto for nested content
  const handleTransitionEnd = () => {
    if (isOpen && contentRef.current) {
      setHeight('auto')
    }
  }

  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-100', className)} style={{ borderRadius: 'var(--radius-md)' }}>
      {/* Accordion header */}
      <button
        id={`accordion-${id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left focus-ring rounded-xl touch-feedback"
        style={{ borderRadius: 'var(--radius-md)' }}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Optional icon */}
          {icon && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--color-bg-hover)' }}
            >
              {icon}
            </div>
          )}
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </span>
        </div>

        {/* Chevron icon */}
        <svg
          className={cn(
            'w-5 h-5 flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
          style={{ color: 'var(--color-text-muted)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Accordion content panel */}
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div ref={contentRef} className={cn('px-4 pb-4', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Helper hook for managing accordion state
export function useAccordion(initialOpen?: string) {
  const [openItem, setOpenItem] = useState<string | null>(initialOpen || null)

  const toggle = (id: string) => {
    setOpenItem(prev => (prev === id ? null : id))
  }

  const isOpen = (id: string) => openItem === id

  return { openItem, toggle, isOpen }
}

// Compound component for managing multiple accordions
interface AccordionGroupProps {
  children: ReactNode | ((props: { toggle: (id: string) => void; isOpen: (id: string) => boolean }) => ReactNode)
  allowMultiple?: boolean
  className?: string
}

export function AccordionGroup({
  children,
  allowMultiple = false,
  className = '',
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  const isOpen = (id: string) => openItems.has(id)

  return (
    <div className={className}>
      {typeof children === 'function'
        ? (children as (props: { toggle: (id: string) => void; isOpen: (id: string) => boolean }) => ReactNode)({ toggle, isOpen })
        : children}
    </div>
  )
}
