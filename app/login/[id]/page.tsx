'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function SessionPage() {
  const params = useParams()
  const sessionId = params.id as string
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#f9fafb] font-sans">
      <main
        className="relative bg-white overflow-hidden"
        style={{ width: '393px', minHeight: '3362px' }}
      >
        {/* Status Bar */}
        <div className="flex w-full h-12 bg-[#f9fafb] items-end justify-center px-4 pb-2 sticky top-0 z-50">
          <span className="text-sm font-medium text-gray-900"></span>
        </div>

        {/* Gradient Card - Borrow Against Mutual Funds */}
        <div className="mx-5 mt-4 rounded-2xl overflow-hidden relative" style={{ height: '200px' }}>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(168.27deg, #8c27fc 0%, #4f12ad 100%)'
            }}
          />

          {/* Money Illustration */}
          <div className="absolute inset-0 flex items-end justify-end p-6">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              {/* Money bag - main shape */}
              <path
                d="M70 15C70 15 45 28 38 48C30 70 22 85 30 105C38 125 52 138 70 140C88 138 102 125 110 105C118 85 110 70 102 48C95 28 70 15 70 15Z"
                fill="url(#bagGradient)"
                stroke="#e8c4ff"
                strokeWidth="1"
              />
              {/* Rupee sign */}
              <text
                x="70"
                y="85"
                textAnchor="middle"
                fontSize="42"
                fontWeight="bold"
                fill="#fde047"
                fontFamily="Arial"
              >
                ₹
              </text>
              {/* Sparkles */}
              <circle cx="25" cy="40" r="6" fill="#fcbfff" opacity="0.9" />
              <circle cx="115" cy="30" r="4" fill="#fcbfff" opacity="0.8" />
              <circle cx="120" cy="95" r="7" fill="#fde047" opacity="0.8" />
              <circle cx="18" cy="100" r="5" fill="#8e8ed8" opacity="0.6" />
              {/* Floating rectangles */}
              <rect x="8" y="55" width="25" height="14" rx="3" fill="#8e8ed8" opacity="0.4" transform="rotate(-15 20 62)" />
              <rect x="107" y="65" width="22" height="12" rx="2" fill="#8e8ed8" opacity="0.4" transform="rotate(25 118 71)" />
              <defs>
                <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9f9f9" />
                  <stop offset="50%" stopColor="#e8c4ff" />
                  <stop offset="100%" stopColor="#6c29be" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center pl-6 pr-32">
            <h1 className="text-xl font-bold leading-tight" style={{ color: '#f8f5ff' }}>
              Borrow against your Mutual Funds
            </h1>
            <p className="text-xl font-semibold mt-1" style={{ color: '#fde047' }}>
              at 0% interest
            </p>
          </div>

          {/* Explore Now Button */}
          <button className="absolute bottom-4 left-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: '#f8f5ff' }}>Explore now</span>
            <svg className="w-4 h-4" fill="none" stroke="#f8f5ff" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Why 1fi Section */}
        <div className="px-5 mt-8">
          <h2 className="text-xl font-semibold text-[#404040] mb-4">
            Why 1fi ?
          </h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Low Interest Rates */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#712cdc]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#404040]">Low interest Rates</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#712cdc]">0.8%</span>
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mt-1">p.a. on average</p>
            </div>

            {/* No Hidden Charges */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#404040]">No hidden charges</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-green-600">₹0</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">foreclosure charges</p>
            </div>

            {/* Overdraft Flexibility */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#404040]">Overdraft Flexibility</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-blue-600">100%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">of your MF value</p>
            </div>

            {/* 100% Security */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#404040]">100% Security</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-[#404040]">SEBI Registered</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">custodian</p>
            </div>
          </div>
        </div>

        {/* How it works Section */}
        <div className="px-5 mt-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <button
              onClick={() => setExpandedSection(expandedSection === 'how' ? null : 'how')}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-base font-semibold text-[#404040]">How it works ?</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'how' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 'how' && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-[#595959]">3 steps to shop with your investment</p>

                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#712cdc]">1</span>
                  </div>
                  <p className="text-sm text-[#404040] pt-1">Browse Products</p>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#712cdc]">2</span>
                  </div>
                  <p className="text-sm text-[#404040] pt-1">Scan QR Code</p>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-[#712cdc]">3</span>
                  </div>
                  <p className="text-sm text-[#404040] pt-1">Shop or withdraw instantly</p>
                </div>

                <p className="text-xs text-[#000000] mt-2 p-2 bg-yellow-50 rounded-lg">
                  Get 100% cash-back on all interest charged on the loan
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Merchants Section */}
        <div className="px-5 mt-8">
          <h2 className="text-xl font-semibold text-[#404040] mb-4">
            Popular Merchants
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {/* Merchant Cards */}
            {[
              { name: 'Croma', color: 'bg-blue-500', icon: '📺' },
              { name: 'Apple', color: 'bg-gray-800', icon: '🍎' },
              { name: 'Amazon', color: 'bg-orange-500', icon: '📦' },
              { name: 'Flipkart', color: 'bg-yellow-500', icon: '🛒' },
              { name: 'Myntra', color: 'bg-pink-500', icon: '👗' },
              { name: 'Ajio', color: 'bg-purple-500', icon: '👔' },
            ].map((merchant, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 aspect-square"
              >
                <span className="text-3xl">{merchant.icon}</span>
                <span className="text-xs font-medium text-[#404040]">{merchant.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* More Merchants Button */}
        <div className="px-5 mt-4">
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 text-sm font-medium hover:border-[#712cdc] hover:text-[#712cdc] transition-colors">
            + View All Merchants
          </button>
        </div>

        {/* Session Info */}
        <div className="px-5 mt-8 mb-4">
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-600 uppercase tracking-wide">Session ID</p>
                <p className="text-sm font-semibold text-purple-900">{sessionId}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="px-5 pb-8 mt-4">
          <button className="w-full h-14 rounded-full text-white font-semibold text-base flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: '#712cdc' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Get started now
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 text-center">
          <p className="text-xs text-gray-400">
            Session active · © 2025 1fi
          </p>
        </div>
      </main>
    </div>
  )
}
