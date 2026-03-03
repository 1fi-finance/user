'use client'

import { useState, useRef, useEffect } from 'react'

export default function LoginPage() {
  const [step, setStep] = useState<'mobile' | 'otp' | 'email'>('mobile')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [pan, setPan] = useState('')
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [otp, setOtp] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (step === 'otp') {
      // Focus first input when OTP step is shown
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }
  }, [step])

  const handleMobileSubmit = () => {
    if (agreeTerms && mobileNumber.length === 10) {
      setStep('otp')
    }
  }

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setStep('email')
    }
  }

  const handleEmailSubmit = () => {
    console.log({ email, pan, fullName, dob })
    // Handle form submission
  }

  const handleBack = () => {
    if (step === 'email') {
      setStep('otp')
      setOtp('')
    } else if (step === 'otp') {
      setStep('mobile')
      setOtp('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main className="flex w-full max-w-md flex-col bg-white overflow-hidden relative" style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>

        {/* Status Bar */}
        <div className="flex w-full h-12 bg-white items-end justify-center px-4 pb-2">
          <span className="text-sm font-medium text-gray-900">9:41</span>
        </div>

        {/* Mobile Number Section */}
        {step === 'mobile' && (
          <div className="flex flex-col flex-1 px-6 pt-8 gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Mobile Number
              </h1>
              <p className="text-sm text-gray-600">
                Please use the mobile number linked with your investments
              </p>
            </div>

            {/* Mobile Input */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#712CDC] transition-colors">
                <span className="text-gray-600 font-medium">+91</span>
                <span className="text-gray-300 mx-3">|</span>
                <input
                  type="tel"
                  placeholder="Enter 10 digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#712CDC] focus:ring-[#712CDC]"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree with 1Fi's T&C and Privacy Policy
              </label>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Button */}
            <div className="pb-8">
              <button
                onClick={handleMobileSubmit}
                disabled={!agreeTerms || mobileNumber.length !== 10}
                className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: agreeTerms && mobileNumber.length === 10 ? '#712CDC' : '#9CA3AF' }}
              >
                Proceed to confirm amount
              </button>
            </div>
          </div>
        )}

        {/* OTP Section */}
        {step === 'otp' && (
          <div className="flex flex-col flex-1 px-6 pt-8 gap-8">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 w-fit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>

            {/* Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-900">
                OTP verification
              </h1>
              <p className="text-sm text-gray-600">
                Enter the OTP sent to your mobile number +91 {mobileNumber}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const value = e.target.value

                      // Only allow digits
                      if (!/^\d*$/.test(value)) return

                      const newOtp = otp.split('')
                      newOtp[index] = value
                      setOtp(newOtp.join(''))

                      // Move to next input if value is entered
                      if (value && index < 5) {
                        inputRefs.current[index + 1]?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace - move to previous input
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        inputRefs.current[index - 1]?.focus()
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault()
                      const pastedData = e.clipboardData.getData('text/plain').slice(0, 6)
                      if (/^\d+$/.test(pastedData)) {
                        setOtp(pastedData)
                        // Focus the next empty input or the last one
                        const nextIndex = Math.min(pastedData.length, 5)
                        inputRefs.current[nextIndex]?.focus()
                      }
                    }}
                    className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-200 rounded-xl outline-none focus:border-[#712CDC] transition-colors"
                  />
                ))}
              </div>

              {/* Resend Link */}
              <div className="text-center">
                <button className="text-sm text-[#712CDC] font-medium">
                  Resend OTP
                </button>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Not You & Continue */}
            <div className="flex flex-col gap-4 pb-8">
              <button
                onClick={handleBack}
                className="text-sm text-gray-600 text-center"
              >
                Not you?
              </button>

              <button
                onClick={handleOtpSubmit}
                disabled={otp.length !== 6}
                className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: otp.length === 6 ? '#712CDC' : '#9CA3AF' }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Email, PAN, DOB Section */}
        {step === 'email' && (
          <div className="flex flex-col flex-1 px-6 pt-8 gap-5 overflow-y-auto">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 w-fit pb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>

            {/* Header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Please enter your details
              </h1>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter your Email ID
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#712CDC] transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* PAN Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter your PAN number
                </label>
                <input
                  type="text"
                  placeholder="Enter your 10 digits PAN"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  maxLength={10}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#712CDC] transition-colors placeholder:text-gray-400 uppercase"
                />
              </div>

              {/* Full Name Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter your full name as per PAN card
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#712CDC] transition-colors placeholder:text-gray-400"
                />
              </div>

              {/* DOB Field */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Enter your Date of Birth as per PAN card
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YY"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  maxLength={8}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#712CDC] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Continue Button */}
            <div className="pb-8 pt-4">
              <button
                onClick={handleEmailSubmit}
                disabled={!email || !pan || !fullName || !dob}
                className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: (email && pan && fullName && dob) ? '#712CDC' : '#9CA3AF' }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
