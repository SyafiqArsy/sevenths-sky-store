"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const firstRow = [
  "/images/featured/1.jpg",
  "/images/featured/2.jpg",
  "/images/featured/3.jpg",
  "/images/featured/4.jpg",
  "/images/featured/5.jpg",
];

const secondRow = [
  "/images/featured/6.jpg",
  "/images/featured/7.jpg",
  "/images/featured/8.jpg",
  "/images/featured/9.jpg",
  "/images/featured/10.jpg",
];

const firstRowLoop = [
  ...firstRow,
  ...firstRow,
  ...firstRow,
];
const secondRowLoop = [
  ...secondRow,
  ...secondRow,
  ...secondRow,
];

export default function FeaturedCollection() {
  return (
    <section id="featured-collection" className="py-24 bg-black overflow-hidden" data-cursor="explore">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="uppercase tracking-[0.3em] text-gray-400 text-sm">
          Featured Collection
        </p>

        <h2 className="mt-4 text-white text-3xl md:text-5xl font-bold">
          Inspired By Modern Streetwear
        </h2>
      </motion.div>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
            <div className="flex w-max gap-6 marquee-left">
            {firstRowLoop.map((image, index) => (
              <div
                key={index}
                className="group relative w-[200px] h-[260px] md:w-[280px] md:h-[350px] flex-shrink-0 overflow-hidden rounded-2xl"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
            <div className="flex w-max gap-6 marquee-right">
            {secondRowLoop.map((image, index) => (
              <div
                key={index}
                className="group relative w-[200px] h-[260px] md:w-[280px] md:h-[350px] flex-shrink-0 overflow-hidden rounded-2xl"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
