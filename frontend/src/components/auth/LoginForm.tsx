"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/src/lib/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await login(
        email,
        password
      );

      if (!result.success) {
        alert(result.message);
        return;
      }

      localStorage.setItem(
        "token",
        result.data.token
      );

      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <h1 className="text-4xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back.
        </p>
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        {loading
          ? "Loading..."
          : "Login"}
      </button>
    </form>
  );
}