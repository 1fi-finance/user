"use client";

import { Gift, Home, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "HOME",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "OFFERS",
    href: "/dashboard#offers",
    icon: Gift,
  },
  {
    title: "ACCOUNT",
    href: "/account",
    icon: Wallet,
  },
  {
    title: "PROFILE",
    href: "/profile",
    icon: User,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) {
      return pathname === href.split("#")[0];
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                active
                  ? "text-[#712CDC] bg-purple-50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
