"use client";

import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">Last updated: March 2026</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              At Neoweave, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our platform. Please read this privacy
              policy carefully.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We may collect personal information that you voluntarily provide
              to us when you register on the platform, express an interest in
              obtaining information about us or our products and services, when
              you participate in activities on the platform, or otherwise when
              you contact us.
            </p>
            <p className="text-gray-600 mb-4">
              This may include your name, email address, phone number,
              government-issued identification for KYC verification, financial
              information, and any other information you choose to provide.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use personal information collected via our platform for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To facilitate account creation and logon process</li>
              <li>To verify your identity for KYC compliance</li>
              <li>To send administrative information to you</li>
              <li>To fulfill and manage your orders and payments</li>
              <li>To post testimonials with your consent</li>
              <li>
                To request feedback and contact you about your use of our
                services
              </li>
              <li>To enforce our terms, conditions, and policies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We only share information with the following third parties:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Identity verification and KYC service providers</li>
              <li>Data analytics services</li>
              <li>Cloud computing services</li>
              <li>Financial institutions and payment processors</li>
              <li>Legal and compliance authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Data Retention
            </h2>
            <p className="text-gray-600 mb-4">
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy policy. No
              purpose in the list will require us keeping your personal
              information for longer than the period of time in which users have
              an account with us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              You have the right to access, correct, update, or delete your
              personal information. You may exercise these rights by contacting
              us through our support channels. We will respond to your request
              within 30 days.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, despite our safeguards and
              efforts to secure your information, no electronic transmission
              over the Internet or information storage technology can be
              guaranteed to be 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 mb-4">
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to access or store information. Specific
              information about how we use such technologies and how you can
              refuse certain cookies is set out in our Cookie Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-gray-600 mb-4">
              We may update this privacy policy from time to time. The updated
              version will be indicated by an updated &quot;Last updated&quot;
              date and the updated version will be effective as soon as it is
              accessible. We encourage you to review this privacy policy
              frequently to be informed of how we are protecting your
              information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have questions or comments about this policy, you may email
              us or contact us through our support channels.
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
