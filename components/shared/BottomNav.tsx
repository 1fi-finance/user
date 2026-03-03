'use client'

import { ReactNode } from 'react'

export interface NavItem {
  id: string
  label: string
  icon: ReactNode | ((isActive: boolean) => ReactNode)
  badge?: number | string
  disabled?: boolean
  href?: string
}

interface BottomNavProps {
  items: NavItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
  maxWidth?: string
}

export default function BottomNav({
  items,
  activeTab,
  onTabChange,
  className = '',
  maxWidth = '393px',
}: BottomNavProps) {
  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 bg-white border-t
        flex justify-around items-center safe-area-bottom z-50
        ${className}
      `}
      style={{
        maxWidth,
        margin: '0 auto',
        borderColor: 'var(--color-border)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item) => {
        const isActive = activeTab === item.id
        const isDisabled = item.disabled ?? false

        const renderItemIcon = () => {
          const iconContent =
            typeof item.icon === 'function'
              ? item.icon(isActive)
              : item.icon

          return (
            <div className="relative">
              {iconContent}
              {/* Badge */}
              {item.badge && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{
                    backgroundColor: 'var(--color-error)',
                  }}
                  aria-label={`${item.badge} notifications`}
                >
                  {typeof item.badge === 'number' && item.badge > 9
                    ? '9+'
                    : item.badge}
                </span>
              )}
            </div>
          )
        }

        const buttonContent = (
          <>
            {renderItemIcon()}
            <span
              className={`text-xs font-medium transition-colors ${
                isActive
                  ? 'text-[#712cdc]'
                  : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
            {/* Active indicator */}
            {isActive && (
              <span
                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  transform: 'translateX(-50%) translateY(-50%)',
                }}
                aria-hidden="true"
              />
            )}
          </>
        )

        const sharedButtonProps = {
          key: item.id,
          onClick: () => !isDisabled && onTabChange(item.id),
          ...(item.href ? {} : { disabled: isDisabled }),
          className: `
            relative flex flex-col items-center gap-1
            min-w-[64px] min-h-[44px] justify-center py-2 px-3
            focus-ring rounded-lg touch-feedback
            ${isActive ? 'text-[#712cdc]' : 'text-gray-400'}
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `,
          'aria-current': (isActive ? 'page' : undefined) as 'page' | undefined,
          'aria-label': item.label,
          'aria-disabled': isDisabled,
        }

        return item.href ? (
          <a
            key={sharedButtonProps.key}
            href={item.href}
            className={sharedButtonProps.className}
            aria-current={sharedButtonProps['aria-current']}
            aria-label={sharedButtonProps['aria-label']}
            onClick={sharedButtonProps.onClick as any}
            role="link"
          >
            {buttonContent}
          </a>
        ) : (
          <button
            key={sharedButtonProps.key}
            type="button"
            className={sharedButtonProps.className}
            aria-current={sharedButtonProps['aria-current']}
            aria-label={sharedButtonProps['aria-label']}
            aria-disabled={sharedButtonProps['aria-disabled']}
            onClick={sharedButtonProps.onClick}
            disabled={isDisabled}
          >
            {buttonContent}
          </button>
        )
      })}
    </nav>
  )
}

// Default navigation items for common use cases
export const defaultNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (isActive) => (
      <svg
        className="w-6 h-6"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: (isActive) => (
      <svg
        className="w-6 h-6"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (isActive) => (
      <svg
        className="w-6 h-6"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (isActive) => (
      <svg
        className="w-6 h-6"
        fill={isActive ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
]

// Convenience component with default items
interface BottomNavDefaultProps extends Omit<BottomNavProps, 'items'> {
  items?: NavItem[]
}

export function BottomNavDefault(props: BottomNavDefaultProps) {
  return <BottomNav items={props.items ?? defaultNavItems} {...props} />
}
