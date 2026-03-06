"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/theme";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  value?: string;
  subtitle: string;
  color?: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  value,
  subtitle,
  color = colors.primary.DEFAULT,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "relative bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-sm)]",
        "border border-[var(--color-border)] card-hover overflow-hidden",
      )}
      style={{
        borderRadius: "var(--radius-md)",
        minHeight: "44px",
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${color}08, transparent 60%)`,
          transitionDuration: "var(--transition-base)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        {/* Title and icon */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium leading-tight text-[var(--color-text-primary)]"
            style={{ textWrap: "balance" }}
          >
            {title}
          </p>
        </div>

        {/* Icon container with colored background */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `${color}15`,
            minWidth: "44px",
            minHeight: "44px",
          }}
          aria-hidden="true"
        >
          <div className="transform scale-100">{icon}</div>
        </div>
      </div>

      {/* Value and subtitle */}
      <div className="relative mt-3">
        {value && (
          <p className="text-2xl font-bold" style={{ color }}>
            {value}
          </p>
        )}
        <p className="text-xs mt-0.5 text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
