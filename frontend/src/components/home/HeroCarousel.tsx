"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero/1.png",
    title: "ELEVATE YOUR STYLE",
    subtitle: "Premium Fashion Beyond Limits",
  },
  {
    image: "/images/hero/1.png",
    title: "MOVE WITH CONFIDENCE",
    subtitle: "Designed For Everyday Expression",
  },
  {
    image: "/images/hero/1.png",
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

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-x-0 bottom-16 z-10 text-center text-white px-6">
                <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
                  {slide.title}
                </h1>

                <p className="mt-4 text-lg md:text-2xl text-white/90">
                  {slide.subtitle}
                </p>

                <button className="mt-8 bg-white text-black px-10 py-4 font-semibold rounded-md hover:bg-gray-200 transition">
                  SHOP NOW
                </button>

                <div className="mt-8 flex justify-center gap-3">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => emblaApi?.scrollTo(dotIndex)}
                      className={`h-3 w-3 rounded-full transition ${
                        selectedIndex === dotIndex
                          ? "bg-white"
                          : "bg-white/40"
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
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full border border-white/60 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full border border-white/60 text-white backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
}