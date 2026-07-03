"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { count } = useCart();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change + body scroll lock
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isCollectionsPage = pathname === "/collections";

  const navBg = isCollectionsPage
    ? "bg-black text-white"
    : isHomePage
      ? scrolled
        ? "bg-white/90 backdrop-blur-xl shadow-sm text-black"
        : "bg-transparent text-white"
      : "bg-white/90 backdrop-blur-xl shadow-sm text-black";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="w-full px-6 lg:px-16 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.2em]"
          >
            SEVENTH SKY STORE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.15em]">
            <Link
              href="/#new-arrival"
              className="hover:opacity-60 transition-opacity"
            >
              New Arrival
            </Link>

            <Link
              href="/collections"
              className="hover:opacity-60 transition-opacity"
            >
              Collections
            </Link>

            <Link
              href="/products"
              className="hover:opacity-60 transition-opacity"
            >
              Shop
            </Link>

            <Link
              href="/contact"
              className="hover:opacity-60 transition-opacity"
            >
              About
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <div className="flex items-center gap-5">
                <Link
                  href="/orders"
                  className="text-[13px] uppercase tracking-wider hover:opacity-60 transition-opacity"
                >
                  My Orders
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-[13px] uppercase tracking-wider hover:opacity-60 transition-opacity"
                  >
                    Dashboard
                  </Link>
                )}

                <span className="text-[13px] text-gray-500">
                  Hi, {user.name}
                </span>
              </div>
            )}

            {!loading && !user && (
              <div className="flex items-center gap-5">
                <Link
                  href="/login"
                  className="text-[13px] uppercase tracking-wider hover:opacity-60 transition-opacity"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-[13px] uppercase tracking-wider hover:opacity-60 transition-opacity"
                >
                  Register
                </Link>
              </div>
            )}

            {!loading && user && (
              <button
                onClick={logout}
                className="text-[13px] uppercase tracking-wider hover:opacity-60 transition-opacity"
              >
                Logout
              </button>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingBag size={20} strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              <Link
                href="/#new-arrival"
                className="text-2xl font-medium py-3 block"
              >
                New Arrival
              </Link>

              <Link
                href="/collections"
                className="text-2xl font-medium py-3 block"
              >
                Collections
              </Link>

              <Link
                href="/products"
                className="text-2xl font-medium py-3 block"
              >
                Shop
              </Link>

              <Link
                href="/contact"
                className="text-2xl font-medium py-3 block"
              >
                About
              </Link>

              <div className="h-px bg-gray-200 my-4" />

              {user && (
                <>
                  <Link
                    href="/orders"
                    className="text-lg text-gray-600"
                  >
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-lg text-gray-600"
                    >
                      Dashboard
                    </Link>
                  )}

                  <p className="text-sm text-gray-400">
                    Signed in as {user.name}
                  </p>

                  <button
                    onClick={logout}
                    className="text-lg text-red-500 text-left py-3 px-1"
                  >
                    Logout
                  </button>
                </>
              )}

              {!loading && !user && (
                <>
                  <Link
                    href="/login"
                    className="text-lg text-gray-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="text-lg text-gray-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
