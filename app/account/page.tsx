'use client'

import { useState } from 'react'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

type TabType = 'credit' | 'shop'
type AccountState = 'hot' | 'cold'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  title: string
  subtitle?: string
  date: string
  transactionId: string
  amount: string
  outstanding?: string
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('shop')
  const [accountState] = useState<AccountState>('hot') // Change to 'cold' to see empty state

  // Hot state transactions
  const shopTransactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      title: 'Voucher cashback (1/6)',
      subtitle: 'Amazon shopping (ID: XXX)',
      date: '2nd june 2026',
      transactionId: 'ID: XXX',
      amount: '+₹1,000'
    },
    {
      id: '2',
      type: 'debit',
      title: 'Voucher Purchase: Amazon Shopping',
      date: '2nd june 2026',
      transactionId: 'ID: XXX',
      amount: '-₹1,000'
    }
  ]

  const creditTransactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      title: 'Loan withdrawal',
      date: '2nd june 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹60,000',
      amount: '-₹1,000'
    },
    {
      id: '2',
      type: 'debit',
      title: 'Loan withdrawal',
      date: '2nd june 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹60,000',
      amount: '-₹1,000'
    },
    {
      id: '3',
      type: 'credit',
      title: 'Loan repayment',
      date: '2nd june 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹60,000',
      amount: '+₹1,000'
    }
  ]

  const currentTransactions = activeTab === 'shop' ? shopTransactions : creditTransactions

  const renderTransactionItem = (transaction: Transaction) => (
    <div
      key={transaction.id}
      className="flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-0"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#f8f5ff' }}
        >
          {transaction.type === 'credit' ? (
            <svg className="w-6 h-6" style={{ color: '#4e3379' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 10L0 10 0 0" transform="translate(7, 7)" />
            </svg>
          ) : (
            <svg className="w-6 h-6" style={{ color: '#4e3379' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M0 0L10 0 10 10" transform="translate(7, 7)" />
            </svg>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium text-gray-800">
            {transaction.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Date</span>
            <span className="text-xs text-gray-700">{transaction.date}</span>
          </div>
          {transaction.subtitle && (
            <span className="text-xs text-gray-500">{transaction.subtitle}</span>
          )}
          {transaction.outstanding && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Outstanding</span>
              <span className="text-xs text-gray-700">{transaction.outstanding}</span>
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <span
        className={`text-base font-medium ${
          transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {transaction.amount}
      </span>
    </div>
  )

  const renderColdState = () => (
    <div className="flex flex-col items-center justify-center px-8 py-12">
      {/* Empty State Illustration */}
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>

      <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">
        You haven't transacted yet
      </h3>
      <p className="text-sm text-gray-600 text-center mb-8">
        Start by making your first withdrawal
      </p>

      {/* CTAs */}
      <div className="w-full space-y-3">
        <button className="w-full py-3 rounded-full text-white font-medium text-sm" style={{ backgroundColor: '#712CDC' }}>
          Refer your Friends
        </button>
        <button className="w-full py-3 rounded-full border-2 border-[#712CDC] text-[#712CDC] font-medium text-sm">
          Continue where you left
        </button>
      </div>

      {/* Product Recommendations */}
      <div className="w-full mt-8">
        <h4 className="text-sm font-medium text-gray-600 mb-4">Popular Merchants</h4>
        <div className="space-y-3">
          {/* Product Card 1 */}
          <div className="bg-white rounded-xl p-3 border border-gray-200 flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                SAMSUNG 7 108 cm (43 inch) 4K Ultra HD LED Tizen TV
              </p>
              <p className="text-xs text-gray-500">Tower C, UNITECH CYB..</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 line-through">MPR ₹150,000</span>
                <span className="text-xs text-green-600 font-medium">-10%</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">₹135,000</p>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-xl p-3 border border-gray-200 flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Croma Electronics Store</p>
              <p className="text-xs text-gray-500">Tower C, UNITECH CYB..</p>
              <p className="text-xs text-gray-400">Retail Stores</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-600">4.5</span>
                <svg className="w-3 h-3 text-yellow-400 fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371 1.24.588 1.81l2.8 2.034c.784.57 1.838-.197 1.539-1.118l-1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main
        className="flex w-full max-w-md flex-col bg-white overflow-hidden relative"
        style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <PageHeader title="Your account" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f9fafb' }}>
          {/* Summary Cards */}
          <div className="flex gap-3 px-5 pt-4 pb-6">
            <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Borrowed</p>
              <p className="text-2xl font-semibold text-gray-800">₹60,000</p>
              <p className="text-xs text-gray-500 mt-1">till date</p>
            </div>
            <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Outstanding amount</p>
              <p className="text-2xl font-semibold text-gray-800">₹45,000</p>
              <p className="text-xs text-gray-500 mt-1">till date</p>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="px-5 pb-6">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Transactions</h2>

            {/* Tabs */}
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab('credit')}
                className={`flex-1 py-3 text-center text-lg font-medium transition-all ${
                  activeTab === 'credit'
                    ? 'text-[#712CDC]'
                    : 'text-gray-600'
                }`}
                style={{
                  borderBottom: activeTab === 'credit' ? '4px solid #712CDC' : '2px solid #f2f2f2'
                }}
              >
                Credit
              </button>
              <button
                onClick={() => setActiveTab('shop')}
                className={`flex-1 py-3 text-center text-lg font-medium transition-all ${
                  activeTab === 'shop'
                    ? 'text-[#712CDC]'
                    : 'text-gray-600'
                }`}
                style={{
                  borderBottom: activeTab === 'shop' ? '4px solid #712CDC' : '2px solid #f2f2f2'
                }}
              >
                Shop
              </button>
            </div>

            {/* Transactions List or Empty State */}
            {accountState === 'hot' ? (
              <div className="bg-white rounded-xl overflow-hidden">
                {currentTransactions.map(renderTransactionItem)}
              </div>
            ) : (
              renderColdState()
            )}
          </div>
        </div>

      </main>
    </div>
  )
}
