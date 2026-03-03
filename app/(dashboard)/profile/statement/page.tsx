'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  FileText,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  CreditCard,
  ShoppingBag,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Transaction {
  id: string
  date: string
  description: string
  type: 'credit' | 'debit'
  amount: string
  status: 'completed' | 'pending' | 'failed'
  category: string
}

export default function StatementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all')
  const [dateRange, setDateRange] = useState('30')

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2nd June 2026',
      description: 'Voucher cashback (1/6) - Amazon Shopping',
      type: 'credit',
      amount: '+₹1,000',
      status: 'completed',
      category: 'Cashback'
    },
    {
      id: '2',
      date: '2nd June 2026',
      description: 'Voucher Purchase - Amazon Shopping',
      type: 'debit',
      amount: '-₹1,000',
      status: 'completed',
      category: 'Purchase'
    },
    {
      id: '3',
      date: '1st June 2026',
      description: 'Loan disbursement',
      type: 'credit',
      amount: '+₹50,000',
      status: 'completed',
      category: 'Loan'
    },
    {
      id: '4',
      date: '1st June 2026',
      description: 'Processing fee',
      type: 'debit',
      amount: '-₹500',
      status: 'completed',
      category: 'Fee'
    },
    {
      id: '5',
      date: '30th May 2026',
      description: 'Loan repayment',
      type: 'credit',
      amount: '+₹2,000',
      status: 'completed',
      category: 'Repayment'
    },
    {
      id: '6',
      date: '28th May 2026',
      description: 'Voucher cashback (2/6) - Amazon Shopping',
      type: 'credit',
      amount: '+₹1,000',
      status: 'completed',
      category: 'Cashback'
    },
    {
      id: '7',
      date: '25th May 2026',
      description: 'Voucher Purchase - Flipkart',
      type: 'debit',
      amount: '-₹500',
      status: 'completed',
      category: 'Purchase'
    }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    return matchesSearch && matchesType
  })

  const totalCredit = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[^0-9.-]/g, '')), 0)

  const totalDebit = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount.replace(/[^0-9.-]/g, ''))), 0)

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Failed</Badge>
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Statement</h1>
          <p className="text-gray-500 mt-1">View and download your transaction history</p>
        </div>
        <Button className="bg-[#712CDC] hover:bg-[#5b24b5]">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Credit</p>
                <p className="text-2xl font-bold text-green-600">₹{totalCredit.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Debit</p>
                <p className="text-2xl font-bold text-red-600">₹{totalDebit.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Net Balance</p>
                <p className="text-2xl font-bold text-[#712CDC]">₹{(totalCredit - totalDebit).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#712CDC]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              {(['all', 'credit', 'debit'] as const).map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  onClick={() => setFilterType(type)}
                  className={cn(
                    filterType === type ? 'bg-[#712CDC] hover:bg-[#5b24b5]' : ''
                  )}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#712CDC]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#712CDC]" />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      transaction.type === 'credit' ? "bg-green-50" : "bg-red-50"
                    )}>
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="w-6 h-6 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{transaction.date}</span>
                        <span className="text-gray-300">•</span>
                        <Badge variant="secondary" className="text-xs">{transaction.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-semibold",
                      transaction.type === 'credit' ? "text-green-600" : "text-red-600"
                    )}>
                      {transaction.amount}
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Download Options */}
      <Card className="border-gray-100 shadow-sm bg-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-900">Need a detailed statement?</h3>
              <p className="text-sm text-gray-500 mt-1">Download your complete transaction history as PDF</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#712CDC] text-[#712CDC] hover:bg-purple-50">
                <Calendar className="w-4 h-4 mr-2" />
                Select Date Range
              </Button>
              <Button className="bg-[#712CDC] hover:bg-[#5b24b5]">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
