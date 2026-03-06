"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [step, setStep] = useState<"mobile" | "otp" | "details">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleMobileSubmit = async () => {
    if (!agreeTerms || mobileNumber.length !== 10) return;

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = `91${mobileNumber}`;

      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: `+${formattedPhone}`,
      });

      if (!error) {
        setStep("otp");
      } else {
        setError(error.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = `91${mobileNumber}`;

      const { data, error } = await authClient.phoneNumber.verify({
        phoneNumber: `+${formattedPhone}`,
        code: otp,
      });

      if (!error && data) {
        window.location.href = "/dashboard";
      } else if (error?.message?.includes("not found")) {
        setStep("details");
      } else {
        setError(error?.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = `91${mobileNumber}`;

      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: `+${formattedPhone}`,
      });

      if (error) {
        setError(error.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailsSubmit = async () => {
    if (!email || !pan || !fullName || !dob) return;

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = `91${mobileNumber}`;

      const { data, error } = await authClient.phoneNumber.verify({
        phoneNumber: `+${formattedPhone}`,
        code: otp,
        fullName,
        email,
        pan,
      });

      if (!error && data) {
        window.location.href = "/dashboard";
      } else {
        setError(error?.message || "Failed to complete registration");
      }
    } catch (err) {
      setError("Failed to complete registration.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("otp");
      setOtp("");
    } else if (step === "otp") {
      setStep("mobile");
      setOtp("");
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel - Branding & Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid-signup"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-signup)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-32 right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float animate-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float animate-delay-400" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-16 py-12 text-white">
          {/* Back Link */}
          <div className="mb-12">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm">Back</span>
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Create
            <br />
            Your Account
          </h1>

          {/* Subtext */}
          <p className="text-lg xl:text-xl text-white/80 mb-12 max-w-md leading-relaxed">
            Join thousands of investors and start building your wealth today.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 xl:gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#712CDC] bg-white flex items-center justify-center text-xs font-medium"
                  style={{
                    backgroundColor: [
                      "#fef3c7",
                      "#dbeafe",
                      "#dcfce7",
                      "#fce7f3",
                      "#e0e7ff",
                    ][i - 1],
                  }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="font-semibold">10,000+</div>
              <div className="text-sm text-white/70">Active Investors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 bg-white">
        <main className="w-full max-w-sm sm:max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col items-center mb-6 sm:mb-8">
            <Link href="/get-started" className="self-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
            </Link>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#712CDC] flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          {/* Desktop Logo & Back */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <Link
              href="/get-started"
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Mobile Number Step */}
          {step === "mobile" && (
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Mobile Number
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms-signup"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#712CDC] focus:ring-[#712CDC]"
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms-signup"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  I agree with 1Fi's T&C and Privacy Policy
                </label>
              </div>

              {/* Button */}
              <button
                onClick={handleMobileSubmit}
                disabled={
                  !agreeTerms || mobileNumber.length !== 10 || isLoading
                }
                className="w-full h-12 sm:h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  backgroundColor:
                    agreeTerms && mobileNumber.length === 10 && !isLoading
                      ? "#712CDC"
                      : "#9CA3AF",
                }}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 w-fit"
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm">Back</span>
              </button>

              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  OTP verification
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Enter the OTP sent to your mobile number +91 {mobileNumber}
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!/^\d*$/.test(value)) return;
                        const newOtp = otp.split("");
                        newOtp[index] = value;
                        setOtp(newOtp.join(""));
                        if (value && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedData = e.clipboardData
                          .getData("text/plain")
                          .slice(0, 6);
                        if (/^\d+$/.test(pastedData)) {
                          setOtp(pastedData);
                          const nextIndex = Math.min(pastedData.length, 5);
                          inputRefs.current[nextIndex]?.focus();
                        }
                      }}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-200 rounded-xl outline-none focus:border-[#712CDC] transition-colors"
                      disabled={isLoading}
                    />
                  ))}
                </div>

                {/* Resend Link */}
                <div className="text-center">
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-[#712CDC] font-medium"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>

              {/* Continue */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleOtpSubmit}
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full h-12 sm:h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{
                    backgroundColor:
                      otp.length === 6 && !isLoading ? "#712CDC" : "#9CA3AF",
                  }}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Details Step (Email, PAN, DOB) */}
          {step === "details" && (
            <div className="flex flex-col gap-5">
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 w-fit"
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm">Back</span>
              </button>

              {/* Header */}
              <div className="flex flex-col gap-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Complete Your Profile
                </h1>
                <p className="text-sm text-gray-600">
                  Please provide your details to complete registration
                </p>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-4">
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
                    disabled={isLoading}
                  />
                </div>

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
                    disabled={isLoading}
                  />
                </div>

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
                    disabled={isLoading}
                  />
                </div>

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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleDetailsSubmit}
                disabled={!email || !pan || !fullName || !dob || isLoading}
                className="w-full h-12 sm:h-14 rounded-full text-white font-medium tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                style={{
                  backgroundColor:
                    email && pan && fullName && dob && !isLoading
                      ? "#712CDC"
                      : "#9CA3AF",
                }}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
