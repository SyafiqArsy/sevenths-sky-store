"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Seventh", "Sky", "Store"];

export default function BrandIntro() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<
    "counter" | "pause1" | "logo" | "pause2" | "type0" | "fade0" | "type1" | "fade1" | "type2" | "fade2" | "pause3" | "shrink" | "exit"
  >("counter");
  const [percentage, setPercentage] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const played = sessionStorage.getItem("brand-intro-played");
    if (played) { setShow(false); return; }
    setShow(true);
    sessionStorage.setItem("brand-intro-played", "true");
  }, []);

  // Counter: 0 → 100 in 2s
  useEffect(() => {
    if (phase !== "counter" || !show) return;
    const duration = 2000;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    counterRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercentage(Math.min(Math.round(eased * 100), 100));
      if (step >= steps) {
        if (counterRef.current) clearInterval(counterRef.current);
      }
    }, interval);
    return () => { if (counterRef.current) clearInterval(counterRef.current); };
  }, [phase, show]);

  // counter → pause1
  useEffect(() => {
    if (percentage < 100) return;
    const t = setTimeout(() => setPhase("pause1"), 200);
    return () => clearTimeout(t);
  }, [percentage]);

  // pause1 → logo
  useEffect(() => {
    if (phase !== "pause1") return;
    const t = setTimeout(() => setPhase("logo"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // logo → pause2
  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(() => setPhase("pause2"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // pause2 → type0
  useEffect(() => {
    if (phase !== "pause2") return;
    const t = setTimeout(() => setPhase("type0"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // Typing effect for each word
  useEffect(() => {
    const typingPhases = ["type0", "type1", "type2"];
    if (!typingPhases.includes(phase)) return;

    const wordIndex = phase === "type0" ? 0 : phase === "type1" ? 1 : 2;
    const word = words[wordIndex];

    if (currentLetter < word.length) {
      const t = setTimeout(() => setCurrentLetter((p) => p + 1), 80);
      return () => clearTimeout(t);
    } else {
      // Word done → show for 0.5s then fade
      const t = setTimeout(() => {
        if (phase === "type0") setPhase("fade0");
        else if (phase === "type1") setPhase("fade1");
        else setPhase("fade2");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, currentLetter]);

  // Each fade → reset letter, go to next type or pause3
  useEffect(() => {
    if (phase === "fade0") {
      const t = setTimeout(() => {
        setCurrentLetter(0);
        setPhase("type1");
      }, 500);
      return () => clearTimeout(t);
    }
    if (phase === "fade1") {
      const t = setTimeout(() => {
        setCurrentLetter(0);
        setPhase("type2");
      }, 500);
      return () => clearTimeout(t);
    }
    if (phase === "fade2") {
      const t = setTimeout(() => {
        setCurrentLetter(0);
        setPhase("pause3");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // pause3 → shrink
  useEffect(() => {
    if (phase !== "pause3") return;
    const t = setTimeout(() => setPhase("shrink"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // shrink → exit
  useEffect(() => {
    if (phase !== "shrink") return;
    const t = setTimeout(() => setPhase("exit"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  // exit → hide
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [phase]);

  if (!show) return null;

  const typingPhases = ["type0", "type1", "type2", "fade0", "fade1", "fade2"];
  const isTyping = typingPhases.includes(phase);
  const currentTypingIndex = phase.startsWith("type0") || phase === "fade0" ? 0
    : phase.startsWith("type1") || phase === "fade1" ? 1
    : phase.startsWith("type2") || phase === "fade2" ? 2
    : -1;
  const isFading = phase.startsWith("fade");
  const displayedText = currentTypingIndex >= 0 ? words[currentTypingIndex].slice(0, currentLetter) : "";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        >
          {/* Counter */}
          <AnimatePresence>
            {(phase === "counter" || phase === "pause1") && (
              <motion.div
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <span
                  className="block text-[7rem] md:text-[11rem] lg:text-[14rem] font-bold text-white leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {percentage}
                  <span className="text-[0.35em] align-top ml-1 opacity-60">%</span>
                </span>
                <div className="mt-6 w-40 md:w-56 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/60 rounded-full transition-all duration-100"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo */}
          <AnimatePresence>
            {(phase === "logo" || phase === "pause2") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div
                  className="text-6xl md:text-8xl font-bold text-white tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  SS
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-4 text-xs text-white/40 tracking-[0.5em] uppercase"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  Seventh Sky Store
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Typing one word at a time */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                key={`word-${currentTypingIndex}`}
                initial={{ opacity: 0 }}
                animate={isFading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                <span
                  className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {displayedText}
                  {!isFading && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-[2px] md:w-[3px] h-[0.6em] bg-white ml-1 align-middle"
                    />
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SS logo before shrink */}
          <AnimatePresence>
            {phase === "pause3" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div
                  className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  SS
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shrink to navbar */}
          <AnimatePresence>
            {phase === "shrink" && (
              <motion.div
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 0.25, x: "-40vw", y: "-45vh" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="text-center"
              >
                <div
                  className="text-6xl md:text-8xl font-bold text-white tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  SS
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.04] blur-[100px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
