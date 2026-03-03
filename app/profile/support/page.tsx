'use client'

import { useRouter } from 'next/navigation'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

export default function SupportPage() {
  const router = useRouter()

  const faqs = [
    {
      id: 1,
      question: 'How do I update my profile information?',
      answer: 'Go to Profile details from the main profile page and edit your information.'
    },
    {
      id: 2,
      question: 'How do I change my mobile number?',
      answer: 'You can update your mobile number in the Profile details section.'
    },
    {
      id: 3,
      question: 'How to check my investment statement?',
      answer: 'Navigate to the Statement section from the profile page to view all your transactions.'
    },
    {
      id: 4,
      question: 'How long does it take to resolve a ticket?',
      answer: 'We typically respond to all tickets within 1 hour.'
    }
  ]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main
        className="flex w-full max-w-md flex-col bg-white overflow-hidden relative"
        style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <PageHeader title="Support and FAQs" onBack={() => router.back()} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ backgroundColor: '#f9fafb' }}>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Still need help?</h3>
            <p className="text-xs text-gray-600 mb-4">
              Our support team is available 24/7 to assist you.
            </p>
            <button
              onClick={() => router.push('/profile/ticket')}
              className="w-full py-3 rounded-full text-white font-medium text-sm"
              style={{ backgroundColor: '#712CDC' }}
            >
              Raise a Ticket
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}
