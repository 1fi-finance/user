"use client";

import { ReactNode, useRef, useEffect, useState, useId } from "react";
import { cn, generateId } from "@/lib/utils";

interface AccordionItemProps {
  /** Unique identifier for the accordion item (optional, auto-generated if not provided) */
  id?: string;
  /** Title displayed in the accordion header */
  title?: string;
  /** Content to display when accordion is open */
  children: ReactNode;
  /** Optional icon to display before the title */
  icon?: ReactNode;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when accordion is toggled */
  onToggle?: () => void;
  /** Whether the accordion should be open by default */
  defaultOpen?: boolean;
  /** Additional classes for the container */
  className?: string;
  /** Additional classes for the content area */
  contentClassName?: string;
}

export default function AccordionItem({
  id: idProp,
  title,
  children,
  icon,
  isOpen: isOpenProp,
  onToggle: onToggleProp,
  defaultOpen = false,
  className = "",
  contentClassName = "",
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0,
  );
  const generatedId = useId();

  // Handle both controlled and uncontrolled modes
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : internalOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggleProp?.();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  // Generate stable IDs for accessibility
  const id = idProp || generateId("accordion");
  const headerId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;

  // Calculate height when isOpen changes - only for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  // Handle transition end to set height to auto for nested content
  const handleTransitionEnd = () => {
    if (isOpen && contentRef.current) {
      setHeight(undefined);
    }
  };

  return (
    <div
      className={cn(
        "bg-[var(--color-bg-card)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--color-border)]",
        className,
      )}
    >
      {/* Accordion header */}
      <button
        id={headerId}
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 text-left focus-ring rounded-[var(--radius-md)] touch-manipulation"
        aria-expanded={isOpen}
        aria-controls={panelId}
        type="button"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Optional icon */}
          {icon && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[var(--color-bg-hover)]"
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
            {title}
          </span>
        </div>

        {/* Chevron icon */}
        <svg
          className={cn(
            "w-5 h-5 flex-shrink-0 text-[var(--color-text-muted)]",
            "transition-transform duration-300 motion-reduce:transition-none",
            isOpen && "rotate-180",
          )}
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

      {/* Accordion content panel - uses CSS transition with reduced motion support */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="overflow-hidden motion-reduce:transition-none"
        style={{
          height: height,
          transition: "height var(--transition-slow)",
        }}
        onTransitionEnd={handleTransitionEnd}
        hidden={!isOpen && height === 0}
      >
        <div ref={contentRef} className={cn("px-4 pb-4", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Helper hook for managing single accordion state
// ============================================

export function useAccordion(initialOpen?: string) {
  const [openItem, setOpenItem] = useState<string | null>(initialOpen || null);

  const toggle = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  const isOpen = (id: string) => openItem === id;

  return { openItem, toggle, isOpen };
}

// ============================================
// Compound component for managing multiple accordions
// ============================================

interface AccordionGroupProps {
  children:
    | ReactNode
    | ((props: {
        toggle: (id: string) => void;
        isOpen: (id: string) => boolean;
      }) => ReactNode);
  /** Allow multiple accordion items to be open simultaneously */
  allowMultiple?: boolean;
  /** Additional classes for the container */
  className?: string;
}

export function AccordionGroup({
  children,
  allowMultiple = false,
  className = "",
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isOpen = (id: string) => openItems.has(id);

  return (
    <div className={cn("space-y-3", className)}>
      {typeof children === "function"
        ? (
            children as (props: {
              toggle: (id: string) => void;
              isOpen: (id: string) => boolean;
            }) => ReactNode
          )({ toggle, isOpen })
        : children}
    </div>
  );
}
