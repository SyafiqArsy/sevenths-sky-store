export default function BrandStatement() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Accent Blur */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-40 text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-gray-400 mb-8">
          Seventh Sky Store
        </p>

        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
          ELEVATE
          <br />
          YOUR STYLE
        </h2>

        <p className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
          Premium fashion designed for those who move with confidence,
          embrace individuality, and express themselves beyond ordinary
          trends.
        </p>

        <button className="mt-12 border border-white px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-white hover:text-black transition duration-300">
          Explore Collection
        </button>
      </div>
    </section>
  );
}