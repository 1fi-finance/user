'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

export default function InviteFriendsPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const referralCode = 'PNSUW7'

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join 1Fi',
        text: `Use my referral code ${referralCode} to get ₹200 bonus!`,
        url: window.location.href
      })
    } else {
      handleCopyCode()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main
        className="flex w-full max-w-md flex-col bg-white overflow-hidden relative"
        style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <PageHeader title="Refer your Friends" onBack={() => router.back()} />

        {/* Content with gradient background */}
        <div
          className="flex-1 overflow-y-auto relative"
          style={{
            backgroundColor: '#ffffff',
            backgroundImage: `
              radial-gradient(circle at 14% 9%, rgba(132, 17, 255, 0.25) 0%, transparent 40%),
              radial-gradient(circle at 47% 21%, rgba(255, 195, 99, 0.25) 0%, transparent 53%),
              radial-gradient(circle at 95% 38%, rgba(255, 117, 250, 0.2) 0%, transparent 53%)
            `
          }}
        >
          {/* Decorative coins */}
          <div className="absolute top-4 right-4 opacity-30">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
              <ellipse cx="45" cy="15" rx="22" rx="15" fill="#fcc05e" />
              <ellipse cx="45" cy="15" rx="22" rx="15" fill="#fdce42" cx="2" cy="2" />
              <path d="M50 20 Q52 25 48 30 Q45 28 50 20" fill="#e5a401" />
            </svg>
          </div>
          <div className="absolute top-20 left-4 opacity-20">
            <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
              <ellipse cx="25" cy="10" rx="13" ry="9" fill="#fcc05e" />
              <ellipse cx="25" cy="10" rx="13" ry="9" fill="#fbc145" cx="1" cy="1" />
            </svg>
          </div>

          <div className="relative px-5 pt-8 pb-6">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Refer and get ₹200
              </h1>
              <p className="text-base text-gray-600">
                When they make their first withdrawal
              </p>
            </div>

            {/* Reward Cards */}
            <div className="flex gap-4 mb-8">
              {/* For Them Card */}
              <div className="flex-1 relative overflow-hidden rounded-2xl p-5" style={{ backgroundColor: '#faa4ff', opacity: 0.8 }}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-20 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-20 rounded-full -ml-8 -mb-8"></div>
                <p className="text-white text-opacity-80 text-sm mb-1">for them</p>
                <p className="text-white text-2xl font-semibold">₹200</p>
              </div>

              {/* For You Card */}
              <div className="flex-1 relative overflow-hidden rounded-2xl p-5" style={{ backgroundColor: '#712CDC' }}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-20 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-20 rounded-full -ml-8 -mb-8"></div>
                <p className="text-white text-opacity-80 text-sm mb-1">for You !</p>
                <p className="text-white text-2xl font-semibold">₹200</p>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="bg-white rounded-2xl p-5 mb-6" style={{ border: '1px solid #e6e6e6' }}>
              <label className="block text-sm text-gray-600 mb-3">
                Share your code
              </label>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-lg font-medium text-gray-900 tracking-wider">
                    {referralCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 rounded-xl text-white font-medium text-sm transition-colors"
                  style={{ backgroundColor: '#712CDC' }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white rounded-xl border border-gray-200 transition-colors hover:bg-gray-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="#712CDC" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-base font-medium text-gray-900">Share via apps</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
                <svg className="w-6 h-6" fill="none" stroke="#712CDC" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base font-medium text-gray-900">Share via email</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
                <svg className="w-6 h-6" fill="none" stroke="#712CDC" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-base font-medium text-gray-900">Share via WhatsApp</span>
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white rounded-xl border border-gray-200 transition-colors hover:bg-gray-50">
                <svg className="w-6 h-6" fill="none" stroke="#712CDC" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-base font-medium text-gray-900">Share via SMS</span>
              </button>
            </div>

            {/* Info Text */}
            <div className="mt-8 text-center px-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Your friend will get ₹200 in their wallet when they sign up using your referral code.
                You will get ₹200 when they make their first withdrawal.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
