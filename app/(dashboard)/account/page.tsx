'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
  const [accountState] = useState<AccountState>('hot')

  // Shop transactions
  const shopTransactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      title: 'Voucher cashback (1/6)',
      subtitle: 'Amazon shopping (ID: XXX)',
      date: '2nd June 2026',
      transactionId: 'ID: XXX',
      amount: '+₹1,000'
    },
    {
      id: '2',
      type: 'debit',
      title: 'Voucher Purchase: Amazon Shopping',
      date: '2nd June 2026',
      transactionId: 'ID: XXX',
      amount: '-₹1,000'
    }
  ]

  const creditTransactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      title: 'Loan withdrawal',
      date: '2nd June 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹60,000',
      amount: '-₹1,000'
    },
    {
      id: '2',
      type: 'debit',
      title: 'Loan withdrawal',
      date: '1st June 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹59,000',
      amount: '-₹1,000'
    },
    {
      id: '3',
      type: 'credit',
      title: 'Loan repayment',
      date: '30th May 2026',
      transactionId: 'ID: XXX',
      outstanding: '₹58,000',
      amount: '+₹1,000'
    }
  ]

  const currentTransactions = activeTab === 'shop' ? shopTransactions : creditTransactions

  const renderTransactionItem = (transaction: Transaction) => (
    <div
      key={transaction.id}
      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            transaction.type === 'credit' ? "bg-green-50" : "bg-red-50"
          )}
        >
          {transaction.type === 'credit' ? (
            <ArrowUpRight className="w-6 h-6 text-green-600" />
          ) : (
            <ArrowDownRight className="w-6 h-6 text-red-600" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium text-gray-800">
            {transaction.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Date:</span>
            <span className="text-xs text-gray-700">{transaction.date}</span>
          </div>
          {transaction.subtitle && (
            <span className="text-xs text-gray-500">{transaction.subtitle}</span>
          )}
          {transaction.outstanding && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Outstanding:</span>
              <span className="text-xs text-gray-700 font-medium">{transaction.outstanding}</span>
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right">
        <span
          className={cn(
            "text-lg font-semibold",
            transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
          )}
        >
          {transaction.amount}
        </span>
        <p className="text-xs text-gray-500 mt-1">{transaction.transactionId}</p>
      </div>
    </div>
  )

  const renderColdState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Empty State Illustration */}
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        You haven't transacted yet
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Start by making your first withdrawal or explore our merchants
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button className="flex-1 bg-[#712CDC] hover:bg-[#5b24b5]">
          Refer your Friends
        </Button>
        <Button variant="outline" className="flex-1 border-[#712CDC] text-[#712CDC] hover:bg-purple-50">
          Continue where you left
        </Button>
      </div>

      {/* Product Recommendations */}
      <div className="w-full mt-12">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Popular Merchants</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Product Card 1 */}
          <Card className="border-gray-100 hover:border-purple-200 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    SAMSUNG 7 108 cm (43 inch) 4K Ultra HD LED Tizen TV
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Tower C, UNITECH CYB..</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 line-through">MPR ₹150,000</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">-10%</Badge>
                  </div>
                  <p className="text-base font-semibold text-gray-800 mt-1">₹135,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 2 */}
          <Card className="border-gray-100 hover:border-purple-200 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">Croma Electronics Store</p>
                  <p className="text-xs text-gray-500 mt-1">Tower C, UNITECH CYB..</p>
                  <p className="text-xs text-gray-400 mt-1">Retail Stores</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-gray-600">4.5</span>
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371 1.24.588 1.81l2.8 2.034c.784.57 1.838-.197 1.539-1.118l-1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Account</h1>
        <p className="text-gray-500 mt-1">Track your transactions and spending</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Borrowed</p>
                <p className="text-3xl font-bold text-gray-900">₹60,000</p>
                <p className="text-xs text-gray-500 mt-2">Till date</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Outstanding Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹45,000</p>
                <p className="text-xs text-gray-500 mt-2">To be repaid</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                <TrendingDown className="w-7 h-7 text-[#712CDC]" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-gray-500">Next due:</span>
              <span className="text-xs text-gray-700 font-medium">15th June 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
            <TabsList className="w-full bg-gray-100 p-1 h-auto">
              <TabsTrigger
                value="credit"
                className="flex-1 py-2.5 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Credit
              </TabsTrigger>
              <TabsTrigger
                value="shop"
                className="flex-1 py-2.5 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop
              </TabsTrigger>
            </TabsList>

            <TabsContent value="credit" className="mt-4">
              {accountState === 'hot' ? (
                <div className="divide-y divide-gray-100">
                  {currentTransactions.map(renderTransactionItem)}
                </div>
              ) : (
                renderColdState()
              )}
            </TabsContent>

            <TabsContent value="shop" className="mt-4">
              {accountState === 'hot' ? (
                <div className="divide-y divide-gray-100">
                  {currentTransactions.map(renderTransactionItem)}
                </div>
              ) : (
                renderColdState()
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-medium text-gray-900">Repay Loan</p>
                <p className="text-xs text-gray-500">Make a payment</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-medium text-gray-900">View Statement</p>
                <p className="text-xs text-gray-500">Download PDF</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="text-left">
                <p className="font-medium text-gray-900">Get Help</p>
                <p className="text-xs text-gray-500">Contact support</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
