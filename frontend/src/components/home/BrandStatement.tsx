"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BrandStatement() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Animated Accent */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/30 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-40 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.4em] text-sm text-gray-400 mb-8"
        >
          Seventh Sky Store
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
        >
          ELEVATE
          <br />
          YOUR STYLE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Premium fashion designed for those who move with confidence,
          embrace individuality, and express themselves beyond ordinary
          trends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 border border-white/60 px-10 py-4 uppercase tracking-wider text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300 rounded-full"
            >
              Explore Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
