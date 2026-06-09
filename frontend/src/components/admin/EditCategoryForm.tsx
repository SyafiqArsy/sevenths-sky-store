"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  getCategoryById,
  updateCategory,
} from "@/src/lib/admin";

export default function EditCategoryForm({
  id,
}: {
  id: number;
}) {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    async function loadCategory() {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const category =
        await getCategoryById(
          token,
          id
        );

      if (category) {
        setName(category.name);
      }

      setLoading(false);
    }

    loadCategory();

  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      setSaving(true);

      const result =
        await updateCategory(
          token,
          id,
          { name }
        );

      if (!result.success) {
        alert(
          result.message ||
          "Update failed"
        );
        return;
      }

      alert(
        "Category updated"
      );

      router.push(
        "/admin/categories"
      );

    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="mt-10">
        Loading...
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6"
    >

      <input
        type="text"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
        className="w-full border rounded-xl px-4 py-4"
      />

      <button
        type="submit"
        disabled={saving}
        className="bg-black text-white px-8 py-4 rounded-xl"
      >
        {saving
          ? "Saving..."
          : "Update Category"}
      </button>

    </form>
  );
}