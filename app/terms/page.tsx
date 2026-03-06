"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#712CDC] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">Neoweave</span>
          </Link>
          <Link
            href="/get-started"
            className="text-sm text-gray-600 hover:text-[#712CDC] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <p className="text-gray-600 mb-8">Last updated: March 2026</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Neoweave, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by these terms, please do not use this service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Use License
            </h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily use Neoweave for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or public display
              </li>
              <li>Transfer the materials to another person or entity</li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. User Account
            </h2>
            <p className="text-gray-600 mb-4">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account. You must immediately
              notify us of any unauthorized use of your account.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Investment Risks
            </h2>
            <p className="text-gray-600 mb-4">
              All investments involve risk, including the loss of principal.
              Past performance does not guarantee future results. You should
              carefully consider your investment objectives and risk tolerance
              before participating in any investment program.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              In no event shall Neoweave or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Governing Law
            </h2>
            <p className="text-gray-600 mb-4">
              These terms and conditions are governed by and construed in
              accordance with applicable laws, and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Your
              continued use of the platform following any changes indicates your
              acceptance of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms and Conditions, please
              contact us through our support channels.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Neoweave. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-[#712CDC] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-[#712CDC] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
