"use client";

import {
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import {
  createCategory,
} from "@/src/lib/admin";

export default function CreateCategoryForm() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      setLoading(true);

      const result =
        await createCategory(
          token,
          { name }
        );

      if (!result.success) {
        alert(
          result.message ||
          "Failed"
        );
        return;
      }

      alert(
        "Category created"
      );

      router.push(
        "/admin/categories"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
    >

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="w-full border rounded-xl px-4 py-4"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-8 py-4 rounded-xl"
      >
        {loading
          ? "Creating..."
          : "Create Category"}
      </button>

    </form>
  );
}