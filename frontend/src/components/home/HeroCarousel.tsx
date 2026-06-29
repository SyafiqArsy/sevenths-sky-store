"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/images/hero/1.png",
    title: "ELEVATE YOUR STYLE",
    subtitle: "Premium Fashion Beyond Limits",
  },
  {
    image: "/images/hero/2.png",
    title: "MOVE WITH CONFIDENCE",
    subtitle: "Designed For Everyday Expression",
  },
  {
    image: "/images/hero/3.png",
    title: "MODERN ESSENTIALS",
    subtitle: "Timeless Pieces For Every Wardrobe",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();

    emblaApi.on("select", onSelect);

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex-[0_0_100%] h-screen"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

              <div className="absolute inset-x-0 bottom-20 z-10 text-center text-white px-6">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
                        {slide.title}
                      </h1>

                      <p className="mt-4 text-lg md:text-xl text-white/80 tracking-wide">
                        {slide.subtitle}
                      </p>

                      <Link href="/products">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-8 bg-white text-black px-10 py-4 font-medium rounded-full text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                        >
                          Shop Now
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 flex justify-center gap-2">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => emblaApi?.scrollTo(dotIndex)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        selectedIndex === dotIndex
                          ? "bg-white w-8"
                          : "bg-white/40 w-4"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/30 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-white/30 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
