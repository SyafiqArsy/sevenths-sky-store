"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { register } from "@/src/lib/auth";
import { useToast } from "@/src/context/ToastContext";
import { startCursorLoading, stopCursorLoading } from "@/src/lib/cursorLoading";

export default function RegisterForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    startCursorLoading();

    try {
      const result = await register(
        name,
        email,
        password,
        passwordConfirmation
      );

      if (!result.success) {
        showToast(
          result.message || "Registration failed",
          "error"
        );
        return;
      }

      localStorage.setItem("token", result.data.token);

      showToast("Account created successfully!", "success");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } finally {
      setLoading(false);
      stopCursorLoading();
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Account
        </h1>

        <p className="mt-2 text-gray-400 text-sm">
          Join Seventh Sky Store.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={passwordConfirmation}
          onChange={(e) =>
            setPasswordConfirmation(e.target.value)
          }
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
          required
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-black text-white py-3.5 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </motion.button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.form>
  );
}
