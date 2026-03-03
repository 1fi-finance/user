'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import FeatureCard from '@/components/shared/FeatureCard'
import MerchantCard from '@/components/shared/MerchantCard'
import ProductCard from '@/components/shared/ProductCard'
import AccordionItem, { useAccordion } from '@/components/shared/AccordionItem'
import BottomNav, { defaultNavItems } from '@/components/shared/BottomNav'

export default function SessionPage() {
  const params = useParams()
  const sessionId = params.id as string
  const { isOpen, toggle } = useAccordion('how') // Default open 'how' section

  const [selectedTab, setSelectedTab] = useState('home')
  const [copied, setCopied] = useState(false)

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId)
  }

  const copySessionId = () => {
    navigator.clipboard.writeText(sessionId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Feature icons as SVG components
  const InterestIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#712cdc" strokeWidth="2" fill="none"/>
      <path d="M30 15 L30 35 M30 35 L38 28 M30 35 L22 28" stroke="#712cdc" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )

  const NoChargesIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#712cdc" strokeWidth="2" fill="none"/>
      <text x="30" y="38" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#712cdc">₹</text>
    </svg>
  )

  const OverdraftIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#712cdc" strokeWidth="2" fill="none"/>
      <text x="30" y="40" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#712cdc">100</text>
      <path d="M22 20 Q30 15 38 20" stroke="#712cdc" strokeWidth="2" fill="none"/>
      <path d="M22 26 Q30 21 38 26" stroke="#712cdc" strokeWidth="2" fill="none"/>
    </svg>
  )

  const SecurityIcon = () => (
    <svg className="w-10 h-10" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="#712cdc" strokeWidth="2" fill="none"/>
      <path d="M20 28 L20 35 L30 42 L40 35 L40 28" stroke="#712cdc" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <path d="M30 42 L30 28" stroke="#712cdc" strokeWidth="2"/>
    </svg>
  )

  // Question icon for FAQ
  const QuestionIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
      <main
        className="relative w-full max-w-md mx-auto bg-white overflow-hidden pb-24 animate-fade-in"
        style={{ maxWidth: '393px' }}
      >
        {/* ============================================
            Hero Card Section
            ============================================ */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative h-52 card-hover">
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(258.27deg, #8c27fc 0%, #4f12ad 100%)',
            }}
          />

          {/* Money Illustration with floating animation */}
          <div className="absolute inset-0 flex items-end justify-end p-6">
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90 animate-float"
              aria-hidden="true"
            >
              {/* Money bag shape */}
              <path
                d="M70 15C70 15 45 28 38 48C30 70 22 85 30 105C38 125 52 138 70 140C88 138 102 125 110 105C118 85 110 70 102 48C95 28 70 15 70 15Z"
                fill="url(#bagGradient)"
                stroke="#e8c4ff"
                strokeWidth="1"
              />
              {/* Rupee symbol */}
              <text x="70" y="85" textAnchor="middle" fontSize="42" fontWeight="bold" fill="#fde047" fontFamily="Arial">₹</text>
              {/* Sparkles */}
              <circle cx="25" cy="40" r="6" fill="#fcbfff" opacity="0.9" />
              <circle cx="115" cy="30" r="4" fill="#fcbfff" opacity="0.8" />
              <circle cx="120" cy="95" r="7" fill="#fde047" opacity="0.8" />
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
          <div className="absolute inset-0 flex flex-col justify-center pl-5 pr-32">
            <h1 className="text-lg font-medium text-white animate-slide-up-fade">
              Borrow against your Mutual Funds
            </h1>
            <p className="text-lg font-medium mt-1 animate-slide-up-fade animate-delay-100" style={{ color: '#fde047' }}>
              at 0% interest
            </p>
          </div>

          {/* Explore Now Button */}
          <button className="absolute bottom-4 left-5 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1.5 focus-ring touch-feedback animate-slide-up-fade animate-delay-200">
            <span className="text-sm font-medium text-white">Explore now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ============================================
            Why 1fi Section
            ============================================ */}
        <section className="px-4 mt-8" aria-labelledby="why-1fi-heading">
          <h2 id="why-1fi-heading" className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Why 1fi?
          </h2>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <FeatureCard
              icon={<InterestIcon />}
              title="Low Interest Rates"
              value="0.8%"
              subtitle="p.a. on average"
            />

            <FeatureCard
              icon={<NoChargesIcon />}
              title="No Hidden Charges"
              value="₹0"
              subtitle="foreclosure charges"
            />

            <FeatureCard
              icon={<OverdraftIcon />}
              title="Overdraft Flexibility"
              value="100%"
              subtitle="of your MF value"
            />

            <FeatureCard
              icon={<SecurityIcon />}
              title="100% Security"
              subtitle="SEBI Registered custodian"
              color="#059669"
            />
          </div>
        </section>

        {/* ============================================
            How it Works Section
            ============================================ */}
        <section className="px-4 mt-6" aria-labelledby="how-it-works-heading">
          <AccordionItem
            id="how"
            title="How it works?"
            isOpen={isOpen('how')}
            onToggle={() => toggle('how')}
            defaultOpen={true}
          >
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              3 steps to shop with your investment
            </p>

            {/* Steps */}
            <div className="mt-4 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3 animate-slide-up-fade animate-delay-100">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>1</span>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Browse Products</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Explore offers from your favorite merchants
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 animate-slide-up-fade animate-delay-200">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>2</span>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Scan QR Code</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Pay securely at any partner store
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 animate-slide-up-fade animate-delay-300">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary-light)' }}
                >
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>3</span>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>Shop or Withdraw Instantly</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Get access to funds immediately
                  </p>
                </div>
              </div>

              {/* Cash back note */}
              <div
                className="p-3 rounded-lg mt-4"
                style={{
                  backgroundColor: 'var(--color-accent-yellow)',
                  border: '1px solid #fef08a',
                }}
              >
                <p className="text-xs font-medium" style={{ color: '#854d0e' }}>
                  💰 Get 100% cash-back on all interest charged on the loan
                </p>
              </div>
            </div>
          </AccordionItem>

          {/* Get Started Button */}
          <button className="w-full h-12 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-2 mt-4 focus-ring touch-feedback card-hover" style={{ backgroundColor: 'var(--color-primary)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Get started now
          </button>
        </section>

        {/* ============================================
            Popular Merchants Section
            ============================================ */}
        <section className="px-4 mt-8" aria-labelledby="merchants-heading">
          <h2 id="merchants-heading" className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Popular Merchants
          </h2>

          {/* Horizontal Scroll */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-4 scroll-snap-x scrollbar-hide">
            <MerchantCard
              name="Croma Electronics Store"
              address="Tower C, UNITECH CYBER PARK"
              category="Retail Stores"
              rating={4.5}
              icon={<span className="text-2xl" role="img">📺</span>}
            />

            <MerchantCard
              name="Tata Motors Limited"
              address="Tower C, UNITECH CYBER PARK"
              category="Automobiles"
              rating={4.2}
              icon={<span className="text-2xl" role="img">🚗</span>}
            />

            <MerchantCard
              name="Reliance Digital"
              address="Sector 18, Noida"
              category="Electronics"
              rating={4.3}
              icon={<span className="text-2xl" role="img">📱</span>}
            />
          </div>
        </section>

        {/* ============================================
            Best Offers Section
            ============================================ */}
        <section className="px-4 mt-8" aria-labelledby="offers-heading">
          <h2 id="offers-heading" className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Best offers for you
          </h2>

          <div className="space-y-3 mt-4">
            <ProductCard
              name="SAMSUNG 7 108 cm (43 inch) 4K Ultra HD LED Tizen TV"
              image={<span className="text-3xl" role="img">📺</span>}
              originalPrice={150000}
              discount={10}
              finalPrice={135000}
              location="Tower C, UNITECH CYBER PARK"
            />

            <ProductCard
              name="Sony WH-1000XM4 Wireless Noise Cancelling Headphones"
              image={<span className="text-3xl" role="img">🎧</span>}
              originalPrice={29990}
              discount={15}
              finalPrice={25491}
              location="Sector 18, Noida"
            />

            <ProductCard
              name="Apple MacBook Air M1 - 256GB SSD"
              image={<span className="text-3xl" role="img">💻</span>}
              originalPrice={82900}
              discount={8}
              finalPrice={76268}
              location="Online Store"
            />
          </div>
        </section>

        {/* ============================================
            FAQ Section
            ============================================ */}
        <section className="px-4 mt-8 mb-4" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            FAQ
          </h2>

          <div className="space-y-2">
            <AccordionItem
              id="faq-apply"
              title="How do I apply for a loan?"
              icon={<QuestionIcon />}
              isOpen={isOpen('faq-apply')}
              onToggle={() => toggle('faq-apply')}
              contentClassName="pt-0"
            >
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Simply link your mutual funds, get instant eligibility, and start shopping. The entire process takes less than 5 minutes.
              </p>
            </AccordionItem>

            <AccordionItem
              id="faq-interest"
              title="What is the interest rate?"
              icon={<QuestionIcon />}
              isOpen={isOpen('faq-interest')}
              onToggle={() => toggle('faq-interest')}
              contentClassName="pt-0"
            >
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Interest rates start as low as 0.8% p.a. Plus, you get 100% cashback on all interest charged!
              </p>
            </AccordionItem>

            <AccordionItem
              id="faq-time"
              title="How long does it take?"
              icon={<QuestionIcon />}
              isOpen={isOpen('faq-time')}
              onToggle={() => toggle('faq-time')}
              contentClassName="pt-0"
            >
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Approval is instant. Once approved, you can start using your credit line immediately at any partner merchant.
              </p>
            </AccordionItem>
          </div>
        </section>

        {/* ============================================
            Session Info Card
            ============================================ */}
        <section className="px-4 mb-4">
          <div
            className="rounded-xl p-4 border flex items-center justify-between"
            style={{
              backgroundColor: '#faf5ff',
              borderColor: '#d8b4fe',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#7c3aed' }}>
                Session ID
              </p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: '#5b21b6' }}>
                {sessionId}
              </p>
            </div>
            <button
              onClick={copySessionId}
              className="w-10 h-10 rounded-full flex items-center justify-center focus-ring touch-feedback"
              style={{ backgroundColor: '#ddd6fe' }}
              aria-label="Copy session ID"
            >
              {copied ? (
                <svg className="w-5 h-5" style={{ color: '#7c3aed' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" style={{ color: '#7c3aed' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </section>

        {/* ============================================
            Bottom Navigation
            ============================================ */}
        <BottomNav
          items={defaultNavItems}
          activeTab={selectedTab}
          onTabChange={handleTabChange}
        />
      </main>
    </div>
  )
}
