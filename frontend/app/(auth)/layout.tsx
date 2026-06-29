export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      {/* Left - Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

        <div className="relative text-center px-12">
          <h1 className="text-4xl font-bold tracking-[0.2em]">
            SEVENTH SKY
          </h1>

          <p className="mt-4 text-gray-400 tracking-wider text-sm uppercase">
            Premium Fashion Store
          </p>

          <div className="mt-8 w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </main>
  );
}
