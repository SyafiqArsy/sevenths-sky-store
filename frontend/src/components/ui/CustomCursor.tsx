"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

function isLightBackground(element: Element | null): boolean {
  let el: Element | null = element;
  let depth = 0;

  while (el && depth < 10) {
    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;

    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.6;
      }
    }

    el = el.parentElement;
    depth++;
  }

  return true;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [clicking, setClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [isLight, setIsLight] = useState(true);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 500 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 500 });

  // Clear loading when pathname changes (navigation complete)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Force white cursor on collections page
  const isCollectionsPage = pathname === "/collections";

  // Detect link clicks to show loading
  useEffect(() => {
    if (isTouch) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");
      if (link) {
        const href = link.getAttribute("href");
        // Only show loading for internal navigation
        if (href && href.startsWith("/") && !href.startsWith("//")) {
          setLoading(true);
          // Safety timeout: clear loading after 5s if something goes wrong
          setTimeout(() => setLoading(false), 5000);
        }
      }
    };

    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [isTouch]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!fine);
    if (!fine) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsLight(isLightBackground(el));
    };

    const onMouseDown = () => {
      setClicking(true);
      setTimeout(() => setClicking(false), 300);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  // Detect data-cursor elements
  useEffect(() => {
    if (isTouch) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]");
      if (cursorEl) {
        setCursorType(cursorEl.getAttribute("data-cursor"));
      } else {
        setCursorType(null);
      }
    };

    window.addEventListener("mouseover", handleOver);
    return () => window.removeEventListener("mouseover", handleOver);
  }, [isTouch]);

  // Listen for custom cursor loading events (from API calls, form submissions, etc.)
  useEffect(() => {
    const onStart = () => setLoading(true);
    const onStop = () => setLoading(false);

    window.addEventListener("cursor-loading-start", onStart);
    window.addEventListener("cursor-loading-stop", onStop);

    return () => {
      window.removeEventListener("cursor-loading-start", onStart);
      window.removeEventListener("cursor-loading-stop", onStop);
    };
  }, []);

  if (isTouch) return null;

  const ringSize = cursorType === "explore" ? 80 : cursorType === "view" ? 60 : cursorType === "pointer" ? 50 : 36;
  const cursorColor = isCollectionsPage ? "#ffffff" : isLight ? "#111111" : "#ffffff";
  const borderColor = isCollectionsPage ? "rgba(255, 255, 255, 0.6)" : isLight ? "rgba(17, 17, 17, 0.6)" : "rgba(255, 255, 255, 0.6)";
  const spinnerSize = loading ? ringSize + 12 : ringSize;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Loading spinner ring */}
      {loading && (
        <motion.div
          className="absolute rounded-full"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            width: spinnerSize,
            height: spinnerSize,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {/* Spinning arc */}
          <svg
            className="w-full h-full animate-spin"
            viewBox="0 0 50 50"
            style={{ animationDuration: "0.8s" }}
          >
            <circle
              cx="25"
              cy="25"
              r="22"
              fill="none"
              stroke={cursorColor}
              strokeWidth="2"
              strokeDasharray="80 60"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      )}

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${loading ? "transparent" : borderColor}`,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.8 : 1,
          rotate: loading ? 360 : 0,
        }}
        transition={loading ? { rotate: { duration: 1.5, repeat: Infinity, ease: "linear" }, default: { type: "spring", damping: 20, stiffness: 300 } } : { type: "spring", damping: 20, stiffness: 300 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: cursorColor,
        }}
        animate={{
          width: loading ? 6 : 8,
          height: loading ? 6 : 8,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </div>
  );
}
