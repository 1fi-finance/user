"use client";

import { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
  href?: string;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  onClick,
  href,
}: MenuItemProps) {
  const Component = href ? "a" : "button";
  const componentProps = href ? { href } : { onClick, type: "button" as const };

  return (
    <Component
      {...componentProps}
      className="w-full flex items-center gap-4 px-5 py-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {/* Icon container */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#f8f5ff" }}
      >
        <div className="text-[#712CDC]">{icon}</div>
      </div>

      {/* Text content */}
      <div className="flex-1 text-left">
        <h3 className="text-base font-medium text-[#404040]">{title}</h3>
        <p className="text-xs text-[#262626]">{subtitle}</p>
      </div>

      {/* Chevron right */}
      <svg
        className="w-5 h-5 text-gray-800 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Component>
  );
}
