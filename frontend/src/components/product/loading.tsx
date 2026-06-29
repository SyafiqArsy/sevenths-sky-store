export default function LoadingProducts() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-12">
          <div className="h-4 w-20 bg-gray-200 rounded skeleton-shimmer" />

          <div className="h-12 w-64 bg-gray-200 rounded skeleton-shimmer mt-4" />
        </div>

        <div className="flex gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-10 w-24 rounded-full bg-gray-200 skeleton-shimmer"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] rounded-xl bg-gray-200 skeleton-shimmer" />

              <div className="mt-4 h-3 w-20 bg-gray-200 rounded skeleton-shimmer" />

              <div className="mt-2 h-5 w-40 bg-gray-200 rounded skeleton-shimmer" />

              <div className="mt-2 h-5 w-28 bg-gray-200 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
