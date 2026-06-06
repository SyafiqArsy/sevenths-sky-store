"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";


export default function Navbar() {
  const { user, loading, logout } = useAuth();
  
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="w-full px-10 lg:px-16 h-24 flex items-center justify-between text-white">
        <Link
          href="/"
          className="text-2xl font-medium tracking-[0.25em]"
        >
          SEVENTH SKY STORE
        </Link>

        <nav className="hidden md:flex items-center gap-14 text-sm uppercase tracking-wider">
          <Link href="#" className="hover:opacity-70 transition">
            New Arrival
          </Link>

          <Link href="#" className="hover:opacity-70 transition">
            Collections
          </Link>

          <Link href="#" className="hover:opacity-70 transition">
            Shop
          </Link>

          <Link href="#" className="hover:opacity-70 transition">
            About
          </Link>
        </nav>

        {user && (
          <span className="text-sm">
            Hi, {user.name}
          </span>
        )}

        <div className="flex items-center gap-6">
          <Search
            size={22}
            strokeWidth={1.75}
            className="cursor-pointer hover:opacity-70 transition"
          />

          {!loading && !user && (
            <Link
              href="/login"
              className="text-sm uppercase"
            >
              Login
            </Link>
          )}

          {!loading && user && (
            <button
              onClick={logout}
              className="text-sm uppercase"
            >
              Logout
            </button>
          )}

          <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition">
            <ShoppingBag size={22} strokeWidth={1.75} />
            <span className="text-sm">0</span>
          </div>
        </div>
      </div>
    </header>
  );
}