export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main className="flex w-full max-w-md flex-col bg-white overflow-hidden relative" style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>

        {/* Status Bar */}
        <div className="flex w-full h-12 bg-white items-end justify-center px-4 pb-2">
          <span className="text-sm font-medium text-gray-900">9:41</span>
        </div>

        {/* Illustration Section */}
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-gray-50 mx-4 rounded-2xl" style={{ marginTop: '16px', height: '492px' }}>
          {/* Logo */}
          <div className="w-20 h-20 rounded-full" style={{ backgroundColor: '#712CDC' }}></div>

          {/* Welcome Text */}
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Welcome
          </h1>

          {/* Subtitle */}
          <p className="text-base text-center text-gray-600">
            Get started with your account today
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-2 mt-auto bg-white" style={{ paddingBottom: '20px' }}>
          {/* Trust Text */}
          <p className="text-base font-medium text-gray-600 text-center px-8">
            Trusted by 10,000+ investors
          </p>

          {/* Get Started Button */}
          <div className="w-full px-5">
            <button
              className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors hover:opacity-90"
              style={{ backgroundColor: '#712CDC' }}
            >
              Get started
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
