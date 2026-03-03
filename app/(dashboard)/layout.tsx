'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  User,
  Wallet,
  Users,
  HelpCircle,
  FileText,
  Star,
  Ticket,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    title: 'Account',
    href: '/account',
    icon: Wallet,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Profile details',
    href: '/profile/details',
    icon: User,
    parent: '/profile',
  },
  {
    title: 'KYC Verification',
    href: '/profile/kyc',
    icon: Shield,
    parent: '/profile',
  },
  {
    title: 'Invite friends',
    href: '/profile/invite',
    icon: Users,
    parent: '/profile',
  },
  {
    title: 'Raise a ticket',
    href: '/profile/ticket',
    icon: Ticket,
    parent: '/profile',
  },
  {
    title: 'Support and FAQs',
    href: '/profile/support',
    icon: HelpCircle,
    parent: '/profile',
  },
  {
    title: 'Statement',
    href: '/profile/statement',
    icon: FileText,
    parent: '/profile',
  },
  {
    title: 'Rate us',
    href: '#',
    icon: Star,
    parent: '/profile',
  },
]

function NavContent({ collapsed = false, onItemClick }: { collapsed?: boolean; onItemClick?: () => void }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '#') return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  const groupedItems = [
    { title: 'Main', items: navItems.filter(item => !item.parent) },
    { title: 'Profile Menu', items: navItems.filter(item => item.parent) },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-2 px-4 py-4",
        collapsed ? "justify-center" : ""
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] flex items-center justify-center">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-gray-900">Bachat</span>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        {groupedItems.map((group, idx) => (
          <div key={group.title} className="px-3">
            {!collapsed && (
              <p className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon

                const linkContent = (
                  <Link
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-purple-50 text-[#712CDC]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon className={cn("w-5 h-5 flex-shrink-0", active && "text-[#712CDC]")} />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                )

                if (collapsed) {
                  return (
                    <TooltipProvider key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {linkContent}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                }

                return <div key={item.href}>{linkContent}</div>
              })}
            </div>
            {idx < groupedItems.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </ScrollArea>

      {/* User section */}
      <Separator />
      <div className={cn(
        "p-4",
        collapsed ? "flex justify-center" : ""
      )}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="w-5 h-5 text-[#712CDC]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Mehul Sethia</p>
              <p className="text-xs text-gray-500 truncate">+91*******839</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="w-10 h-10">
                  <LogOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300",
          isCollapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        <NavContent collapsed={isCollapsed} />
        
        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={cn("w-3 h-3 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#712CDC] to-[#9B6BFF] flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">Bachat</span>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <NavContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          "pt-16 md:pt-0",
          "md:ml-[280px] md:ml-[72px]"
        )}
      >
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
