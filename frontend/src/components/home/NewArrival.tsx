"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getLatestProducts } from "@/src/lib/api";

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

export default function NewArrival() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getLatestProducts(3);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch latest products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const gridCols =
    products.length >= 3
      ? "md:grid-cols-3"
      : products.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <section id="new-arrival" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
            New Arrival
          </p>

          <h2 className="mt-3 text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
            Discover Our New Collection
          </h2>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8`}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[520px] rounded-3xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            No products available yet.
          </p>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8`}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                }}
                className="rounded-3xl overflow-hidden cursor-pointer"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block relative"
                  data-cursor="explore"
                >
                  <div className="relative h-[520px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />

                    <div className="absolute bottom-8 left-8 text-white">
                      {product.category && (
                        <p className="text-[15px] uppercase tracking-[0.2em] text-white/70 mb-1">
                          {product.category.name}
                        </p>
                      )}
                      <h3 className="text-[32px] font-bold leading-tight">
                        {product.name}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          Explore
                        </span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
