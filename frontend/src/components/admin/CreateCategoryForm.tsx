"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createCategory } from "@/src/lib/admin";
import { useToast } from "@/src/context/ToastContext";

export default function CreateCategoryForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      setLoading(true);

      const result = await createCategory(token, { name });

      if (!result.success) {
        showToast(result.message || "Failed", "error");
        return;
      }

      showToast("Category created!", "success");
      router.push("/admin/categories");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 space-y-6 max-w-lg"
    >
      <h1 className="text-2xl font-bold">Create Category</h1>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Category Name</label>
        <input
          type="text"
          placeholder="e.g. Hoodies"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
          required
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating...
          </>
        ) : (
          "Create Category"
        )}
      </motion.button>
    </motion.form>
  );
}
