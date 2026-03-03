'use client'

import Link from 'next/link'

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Panel - Branding & Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-32 right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float animate-delay-200" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float animate-delay-400" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-16 py-12 text-white">
          {/* Logo */}
          <div className="mb-12">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>
          
          {/* Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Start Your<br/>Investment<br/>Journey
          </h1>
          
          {/* Subtext */}
          <p className="text-lg xl:text-xl text-white/80 mb-12 max-w-md leading-relaxed">
            Join thousands of smart investors building wealth through our secure and intuitive platform.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-6 xl:gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 rounded-full border-2 border-[#712CDC] bg-white flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: ['#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3', '#e0e7ff'][i-1] }}
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
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#712CDC] flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

          {/* Desktop Logo (Hidden on mobile) */}
          <div className="hidden lg:block mb-10">
            <div className="w-12 h-12 rounded-xl bg-[#712CDC] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Get Started
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Create your account and start investing in minutes
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {/* Login Card */}
            <Link 
              href="/login"
              className="block p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-[#712CDC] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#712CDC]/10 flex items-center justify-center group-hover:bg-[#712CDC] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#712CDC] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Login to Account</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Existing investors sign in here</p>
                </div>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#712CDC] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Register Card */}
            <Link 
              href="/signup"
              className="block p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-[#712CDC] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#712CDC]/10 flex items-center justify-center group-hover:bg-[#712CDC] transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#712CDC] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Create Account</h3>
                  <p className="text-xs sm:text-sm text-gray-500">New investors register here</p>
                </div>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#712CDC] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs sm:text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full flex items-center justify-center gap-2 sm:gap-3 h-10 sm:h-12 px-3 sm:px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-medium text-gray-700 text-sm sm:text-base">Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 sm:gap-3 h-10 sm:h-12 px-3 sm:px-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
              </svg>
              <span className="font-medium text-gray-700 text-sm sm:text-base">Continue with Apple</span>
            </button>
          </div>

          {/* Footer Text */}
          <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#712CDC] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-[#712CDC] hover:underline">Privacy Policy</a>
          </p>
        </main>
      </div>
    </div>
  )
}
