"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const taglines = ["Streetwear", "Minimal", "Premium", "Timeless"];

export default function TypographyShowcase() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-black text-white py-20 md:py-48 overflow-hidden"
      data-cursor="explore"
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"
        />

        {/* Main typography */}
        <div className="space-y-2">
          {["SEVENTH", "SKY", "STORE"].map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <h2 className="text-4xl md:text-8xl lg:text-[10rem] font-black tracking-[0.05em] leading-[0.9]">
                {word}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Dynamic tagline */}
        <div className="mt-16 h-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="uppercase tracking-[0.3em] md:tracking-[0.5em] text-sm text-white/50"
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-16"
        />
      </div>
    </section>
  );
}
