"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/src/lib/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await register(
        name,
        email,
        password,
        passwordConfirmation
      );

      if (!result.success) {
        alert(
          result.message ||
            "Registration failed"
        );

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
          Create Account
        </h1>

        <p className="mt-2 text-gray-500">
          Join Seventh Sky Store.
        </p>
      </div>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3"
      />

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

      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) =>
          setPasswordConfirmation(
            e.target.value
          )
        }
        className="w-full border rounded-xl px-4 py-3"
      />

      <button
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl"
      >
        {loading
          ? "Creating Account..."
          : "Register"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-black font-medium"
        >
          Login
        </Link>
      </p>
    </form>
  );
}