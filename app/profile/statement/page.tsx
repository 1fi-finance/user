'use client'

import { useRouter } from 'next/navigation'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

export default function StatementPage() {
  const router = useRouter()

  const transactions = [
    {
      id: 1,
      type: 'investment',
      description: 'SIP - HDFC Flexicap Fund',
      amount: '-₹5,000',
      date: '26 Feb 2026',
      status: 'completed'
    },
    {
      id: 2,
      type: 'investment',
      description: 'Lumpsum - Parag Parikh Flexi Cap',
      amount: '-₹25,000',
      date: '20 Feb 2026',
      status: 'completed'
    },
    {
      id: 3,
      type: 'dividend',
      description: 'Dividend - Axis Bluechip Fund',
      amount: '+₹1,250',
      date: '15 Feb 2026',
      status: 'completed'
    },
    {
      id: 4,
      type: 'investment',
      description: 'SIP - ICICI Pru Bluechip Fund',
      amount: '-₹10,000',
      date: '10 Feb 2026',
      status: 'completed'
    },
    {
      id: 5,
      type: 'investment',
      description: 'SIP - HDFC Flexicap Fund',
      amount: '-₹5,000',
      date: '05 Feb 2026',
      status: 'completed'
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
        <PageHeader title="Statement" onBack={() => router.back()} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f9fafb' }}>
          {/* Summary Card */}
          <div className="mx-5 mt-4 p-4 bg-white rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-3">February 2026</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Total Invested</p>
                <p className="text-lg font-semibold text-gray-900">₹45,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Dividend Received</p>
                <p className="text-lg font-semibold text-green-600">+₹1,250</p>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="px-5 mt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Recent Transactions</h3>

            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'dividend' ? 'bg-green-100' : 'bg-purple-100'
                    }`}
                  >
                    {transaction.type === 'dividend' ? (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>

                  {/* Amount */}
                  <p
                    className={`text-sm font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
