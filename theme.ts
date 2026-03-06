/**
 * Design System Theme Configuration
 *
 * Centralized design tokens for consistent UI across the application.
 * All colors, spacing, typography, and animation values are defined here.
 */

// ============================================
// Color Palette (Maintaining current purple theme)
// ============================================
export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: "#712cdc",
    light: "#ede8ff",
    dark: "#5c22a5",
    50: "#f5f3ff",
    100: "#ede8ff",
    200: "#ddd4ff",
    300: "#c4b0ff",
    400: "#a884fd",
    500: "#8c27fc",
    600: "#712cdc",
    700: "#5c22a5",
    800: "#4a1d87",
    900: "#3f186f",
  },

  // Semantic colors
  success: {
    DEFAULT: "#10b981",
    light: "#ecfdf5",
    dark: "#047857",
  },
  warning: {
    DEFAULT: "#f59e0b",
    light: "#fffbeb",
    dark: "#b45309",
  },
  error: {
    DEFAULT: "#ef4444",
    light: "#fef2f2",
    dark: "#b91c1c",
  },
  info: {
    DEFAULT: "#3b82f6",
    light: "#eff6ff",
    dark: "#1d4ed8",
  },

  // Neutral grayscale
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Text colors
  text: {
    primary: "#1a1a1a",
    secondary: "#595959",
    muted: "#a6a6a6",
    light: "#d1d5db",
    inverse: "#ffffff",
  },

  // Background colors
  bg: {
    DEFAULT: "#ffffff",
    subtle: "#f9fafb",
    card: "#ffffff",
    hover: "#f3f4f6",
    pressed: "#e5e7eb",
  },

  // Border colors
  border: {
    DEFAULT: "#e5e7eb",
    subtle: "#f3f4f6",
    strong: "#d1d5db",
  },
} as const;

// ============================================
// Typography
// ============================================
export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },

  // Font sizes with line heights
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
  },

  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Letter spacing
  letterSpacing: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
  },
} as const;

// ============================================
// Spacing
// ============================================
export const spacing = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// ============================================
// Border Radius
// ============================================
export const borderRadius = {
  none: "0",
  sm: "0.5rem", // 8px
  md: "0.75rem", // 12px
  lg: "1rem", // 16px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// ============================================
// Shadows
// ============================================
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// ============================================
// Transitions
// ============================================
export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ============================================
// Z-Index Scale
// ============================================
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ============================================
// Animation
// ============================================
export const animations = {
  // Durations
  duration: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  // Easing functions
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // Keyframe animations (CSS custom properties for use in styled-components or CSS-in-JS)
  keyframes: {
    fadeIn: "@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }",
    slideUp:
      "@keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }",
    slideDown:
      "@keyframes slide-down { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }",
    scaleIn:
      "@keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }",
    shake:
      "@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }",
  },
} as const;

// ============================================
// Breakpoints
// ============================================
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============================================
// Touch & Accessibility
// ============================================
export const accessibility = {
  // Minimum touch target size (44px per WCAG 2.5.5)
  minTouchTarget: "44px",

  // Focus ring styles
  focusRing: {
    width: "2px",
    offset: "2px",
    color: colors.primary.DEFAULT,
    style: `outline: 2px solid ${colors.primary.DEFAULT}; outline-offset: 2px;`,
  },

  // Reduced motion preference
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
} as const;

// ============================================
// Component-Specific Tokens
// ============================================
export const components = {
  // Card component
  card: {
    padding: spacing[4],
    borderRadius: borderRadius.md,
    shadow: shadows.sm,
    shadowHover: shadows.md,
  },

  // Button component
  button: {
    minHeight: accessibility.minTouchTarget,
    paddingX: spacing[4],
    paddingY: spacing[2.5],
    borderRadius: borderRadius.full,
    fontSize: typography.fontSize.sm[0],
    fontWeight: typography.fontWeight.medium,
  },

  // Input component
  input: {
    minHeight: accessibility.minTouchTarget,
    paddingX: spacing[4],
    borderRadius: borderRadius.lg,
    borderColor: colors.border.DEFAULT,
    focusBorderColor: colors.primary.DEFAULT,
  },

  // Avatar component
  avatar: {
    sizes: {
      sm: "2rem", // 32px
      md: "3rem", // 48px
      lg: "5rem", // 80px
      xl: "8rem", // 128px
    },
  },
} as const;

// ============================================
// Utility Types
// ============================================
export type ColorKey = keyof typeof colors;
export type FontSizeKey = keyof typeof typography.fontSize;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;

// ============================================
// CSS Variable Generator
// ============================================
/**
 * Generates CSS custom properties for the design system.
 * Import this into your global CSS or CSS-in-JS solution.
 */
export function generateCSSVariables(): string {
  return `
    :root {
      /* Primary Colors */
      --color-primary: ${colors.primary.DEFAULT};
      --color-primary-light: ${colors.primary.light};
      --color-primary-dark: ${colors.primary.dark};
      
      /* Semantic Colors */
      --color-success: ${colors.success.DEFAULT};
      --color-success-light: ${colors.success.light};
      --color-warning: ${colors.warning.DEFAULT};
      --color-error: ${colors.error.DEFAULT};
      --color-info: ${colors.info.DEFAULT};
      
      /* Text Colors */
      --color-text-primary: ${colors.text.primary};
      --color-text-secondary: ${colors.text.secondary};
      --color-text-muted: ${colors.text.muted};
      
      /* Background Colors */
      --color-bg: ${colors.bg.DEFAULT};
      --color-bg-subtle: ${colors.bg.subtle};
      --color-bg-card: ${colors.bg.card};
      --color-bg-hover: ${colors.bg.hover};
      
      /* Border Colors */
      --color-border: ${colors.border.DEFAULT};
      
      /* Border Radius */
      --radius-sm: ${borderRadius.sm};
      --radius-md: ${borderRadius.md};
      --radius-lg: ${borderRadius.lg};
      --radius-xl: ${borderRadius.xl};
      --radius-full: ${borderRadius.full};
      
      /* Shadows */
      --shadow-sm: ${shadows.sm};
      --shadow-md: ${shadows.md};
      --shadow-lg: ${shadows.lg};
      
      /* Transitions */
      --transition-fast: ${transitions.fast};
      --transition-base: ${transitions.base};
      --transition-slow: ${transitions.slow};
    }
  `;
}

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  animations,
  breakpoints,
  accessibility,
  components,
};
