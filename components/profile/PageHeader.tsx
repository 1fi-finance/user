"use client";

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {!onBack && <div className="w-8" />}
      {title && <h1 className="text-lg font-medium text-gray-900">{title}</h1>}
      <div className="w-8" />
    </div>
  );
}
