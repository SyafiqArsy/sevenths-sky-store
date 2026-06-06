import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-slate-600 mb-4">
              Seventh Sky Store
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Elevate
              <br />
              Your Style
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Premium fashion essentials designed for comfort,
              confidence, and everyday expression.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition">
                Shop Collection
              </button>

              <button className="border border-black px-8 py-4 rounded-full font-medium hover:bg-black hover:text-white transition">
                Explore
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-slate-900/5 rounded-full blur-3xl" />

            <Image
              src="/images/hero-fashion.jpg"
              alt="Fashion Collection"
              width={700}
              height={900}
              priority
              className="relative rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}