"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCategoryById, updateCategory } from "@/src/lib/admin";
import { useToast } from "@/src/context/ToastContext";

export default function EditCategoryForm({ id }: { id: number }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const category = await getCategoryById(token, id);

      if (category) {
        setName(category.name);
      }

      setLoading(false);
    }

    loadCategory();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      setSaving(true);

      const result = await updateCategory(token, id, { name });

      if (!result.success) {
        showToast(result.message || "Update failed", "error");
        return;
      }

      showToast("Category updated!", "success");
      router.push("/admin/categories");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 space-y-6 max-w-lg"
    >
      <h1 className="text-2xl font-bold">Edit Category</h1>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors"
        />
      </div>

      <motion.button
        type="submit"
        disabled={saving}
        whileTap={{ scale: 0.98 }}
        className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          "Update Category"
        )}
      </motion.button>
    </motion.form>
  );
}
