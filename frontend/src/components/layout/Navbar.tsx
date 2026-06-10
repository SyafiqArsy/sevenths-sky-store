"use client";

import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

import { useAuth } from "@/src/context/AuthContext";
import { useCart } from "@/src/context/CartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { count } = useCart();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={isHomePage ? "absolute top-0 left-0 right-0 z-50" : "sticky top-0 z-50 bg-white border-b border-gray-200"}>
      <div className={`w-full px-10 lg:px-16 h-24 flex items-center justify-between ${isHomePage ? "text-white" : "text-black"}`}>
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-medium tracking-[0.25em]"
        >
          SEVENTH SKY STORE
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-14 text-sm uppercase tracking-wider">
          <Link
            href="/#new-arrival"
            className="hover:opacity-70 transition"
          >
            New Arrival
          </Link>

          <Link
            href="/#featured-collection"
            className="hover:opacity-70 transition"
          >
            Collections
          </Link>

          <Link
            href="/products"
            className="hover:opacity-70 transition"
          >
            Shop
          </Link>

          <Link
            href="/contact"
            className="hover:opacity-70 transition"
          >
            About
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {user && (
            <div className="flex items-center gap-4">

              <Link
                href="/orders"
                className="text-sm uppercase"
              >
                My Orders
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm uppercase"
                >
                  Dashboard
                </Link>
              )}

              <span className="text-sm">
                Hi, {user.name}
              </span>

            </div>
          )}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="text-sm uppercase hover:opacity-70 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-sm uppercase hover:opacity-70 transition"
              >
                Register
              </Link>
            </>
          )}

          {!loading && user && (
            <button
              onClick={logout}
              className="text-sm uppercase hover:opacity-70 transition"
            >
              Logout
            </button>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            <ShoppingBag
              size={22}
              strokeWidth={1.75}
            />

            <span className="text-sm">
              {count}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}