'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Clock,
  FileText,
  CreditCard,
  User,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface FAQ {
  question: string
  answer: string
  category: string
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const faqs: FAQ[] = [
    {
      question: 'How do I complete my KYC verification?',
      answer: 'To complete your KYC verification, go to Profile > Profile Details and fill in your personal information. You will need to submit your Aadhaar card, PAN card, and a selfie. Our team will verify your documents within 24-48 hours.',
      category: 'KYC'
    },
    {
      question: 'What documents are required for KYC?',
      answer: 'You need to submit: 1) Aadhaar Card (mandatory), 2) PAN Card, 3) A selfie with your face clearly visible. Make sure the documents are clear and not expired.',
      category: 'KYC'
    },
    {
      question: 'How long does loan disbursement take?',
      answer: 'Once your loan is approved, the amount is typically disbursed within 24-48 hours to your registered bank account. The exact time may vary depending on your bank.',
      category: 'Loan'
    },
    {
      question: 'What is the interest rate on loans?',
      answer: 'Our interest rates range from 12% to 24% per annum depending on your credit score, loan amount, and tenure. You can view the exact rate during the loan application process.',
      category: 'Loan'
    },
    {
      question: 'How can I repay my loan?',
      answer: 'You can repay your loan through: 1) Auto-debit from your bank account, 2) UPI payment, 3) Net banking transfer. Go to Account > Repay Loan to make a payment.',
      category: 'Loan'
    },
    {
      question: 'Why was my transaction declined?',
      answer: 'Transaction can be declined due to: 1) Insufficient balance, 2) Bank server issues, 3) Security concerns. Please contact your bank or our support team for assistance.',
      category: 'Transaction'
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Go to Profile > Profile Details to update your personal information. Some details like phone number may require OTP verification for security.',
      category: 'Account'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All your personal and financial data is encrypted and stored securely. We comply with all relevant data protection regulations.',
      category: 'Security'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = ['All', 'KYC', 'Loan', 'Transaction', 'Account', 'Security']

  const toggleFaq = (question: string) => {
    setOpenFaq(openFaq === question ? null : question)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support & FAQs</h1>
        <p className="text-gray-500 mt-1">Find answers to common questions</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-gray-200 focus:border-[#712CDC] focus:ring-[#712CDC]"
        />
      </div>

      {/* Contact Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-gray-100 shadow-sm hover:border-purple-200 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Chat Support</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm hover:border-purple-200 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Call Us</p>
              <p className="text-sm text-gray-500">+91 1800 123 4567</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm hover:border-purple-200 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#712CDC]" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Support</p>
              <p className="text-sm text-gray-500">Reply within 24h</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={category === 'All' ? 'default' : 'secondary'}
            className={cn(
              "cursor-pointer px-4 py-2",
              category === 'All' ? "bg-[#712CDC] hover:bg-[#5b24b5]" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* FAQs */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#712CDC]" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.question)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-xs text-[#712CDC] font-medium">{faq.category}</span>
                    <p className="font-medium text-gray-900 mt-1">{faq.question}</p>
                  </div>
                  {openFaq === faq.question ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === faq.question && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found</p>
              <p className="text-sm text-gray-400 mt-1">Try different keywords or contact support</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'How to Apply for Loan', icon: CreditCard },
              { title: 'KYC Guidelines', icon: User },
              { title: 'Privacy Policy', icon: Shield },
              { title: 'Terms & Conditions', icon: FileText },
            ].map((link) => (
              <Button
                key={link.title}
                variant="outline"
                className="justify-start h-auto py-3 text-left"
              >
                <link.icon className="w-4 h-4 mr-2 text-[#712CDC]" />
                <span className="text-sm">{link.title}</span>
                <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Time Info */}
      <Card className="border-gray-100 shadow-sm bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#712CDC] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Average Response Time</h3>
              <p className="text-sm text-gray-600 mt-1">
                We typically respond to all queries within 1 hour during business hours (9 AM - 9 PM). 
                For emails, expect a response within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
