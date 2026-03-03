'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

const categories = [
  'Transaction/Payment/KYC',
  'Credit Card',
  'Bonds',
  'Others'
]

export default function RaiseTicketPage() {
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [ticketNumber, setTicketNumber] = useState('')

  const handleSubmit = () => {
    // Generate random ticket number
    const generatedTicket = Math.floor(1000000 + Math.random() * 9000000).toString()
    setTicketNumber(generatedTicket)
    setStep('success')
  }

  const handleBack = () => {
    if (step === 'success') {
      // Reset and go back
      setStep('form')
      setCategory('')
      setDescription('')
      setTicketNumber('')
      router.back()
    } else {
      router.back()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main
        className="flex w-full max-w-md flex-col bg-white overflow-hidden relative"
        style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <PageHeader title={step === 'form' ? 'Raise Ticket' : ''} onBack={handleBack} />

        {/* Content */}
        {step === 'form' ? (
          <div className="flex-1 overflow-y-auto px-5 py-4" style={{ backgroundColor: '#f9fafb' }}>
            {/* Title */}
            <h1 className="text-2xl font-medium text-gray-800 mb-6">
              Raise Ticket
            </h1>

            {/* Category Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-4 rounded-xl border text-left transition-all ${
                      category === cat
                        ? 'border-[#712CDC] bg-white'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      category === cat ? 'text-[#712CDC]' : 'text-gray-700'
                    }`}>
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Details of your issue
              </label>
              <div className="relative">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your message here"
                    rows={12}
                    maxLength={2000}
                    className="w-full px-4 py-3 outline-none text-sm resize-none"
                    style={{ height: '405px' }}
                  />
                </div>
                <span className="absolute bottom-3 right-4 text-sm text-gray-500">
                  {description.length}/2000
                </span>
              </div>
            </div>

            {/* Attach Image */}
            <div className="mb-6">
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                Attach a image
              </button>
            </div>

            {/* Submit Button */}
            <div className="pb-4">
              <button
                onClick={handleSubmit}
                disabled={!category || !description}
                className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: category && description ? '#712CDC' : '#9CA3AF' }}
              >
                Raise ticket
              </button>
            </div>
          </div>
        ) : (
          /* Success State - Bottom Sheet Style */
          <div className="flex-1 flex flex-col" style={{ backgroundColor: '#f9fafb' }}>
            {/* Success Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
              {/* Success Icon */}
              <div className="w-30 h-30 rounded-full bg-green-100 flex items-center justify-center mb-6" style={{ width: '122px', height: '122px' }}>
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Success Message */}
              <div className="text-center mb-6 w-full">
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Ticket raised successfully
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed px-4">
                  Our team will respond to your query as soon as possible. Please check your email for updates on this ticket
                </p>
              </div>

              {/* Ticket Number */}
              <div className="w-full flex justify-between items-center px-4 py-3 bg-white rounded-lg mb-6" style={{ border: '1px solid #e6e6e6', borderRadius: '8px' }}>
                <span className="text-base font-medium text-gray-500">Ticket number</span>
                <span className="text-base font-medium text-gray-800">{ticketNumber}</span>
              </div>
            </div>

            {/* Understood Button - Fixed at bottom */}
            <div className="px-5 pb-6 pt-4" style={{ backgroundColor: '#f9fafb' }}>
              <button
                onClick={handleBack}
                className="w-full h-14 rounded-full text-white font-medium transition-colors"
                style={{ backgroundColor: '#712CDC' }}
              >
                Understood
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
