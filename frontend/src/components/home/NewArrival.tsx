import Image from "next/image";

const collections = [
  {
    title: "Hoodies",
    image: "/images/newArrival/1.jpg",
  },
  {
    title: "Jackets",
    image: "/images/newArrival/1.jpg",
  },
  {
    title: "T-Shirts",
    image: "/images/newArrival/1.jpg",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            New Arrival
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Discover Our New Collection
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-[500px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 opacity-80">
                    Explore →
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}