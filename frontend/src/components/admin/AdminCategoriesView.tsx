"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

import { getAdminCategories, deleteCategory } from "@/src/lib/admin";
import ConfirmModal from "@/src/components/ui/ConfirmModal";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function AdminCategoriesView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  async function loadCategories() {
    const token = localStorage.getItem("token");

    if (!token) return;

    const result = await getAdminCategories(token, search);

    setCategories(result.data);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, [search]);

  async function confirmDelete() {
    if (deleteTarget === null) return;

    const token = localStorage.getItem("token");

    if (!token) return;

    await deleteCategory(token, deleteTarget);

    setDeleteTarget(null);

    loadCategories();
  }

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading categories...
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 placeholder:text-gray-300 focus:border-black transition-colors"
              />
            </div>

            <Link
              href="/admin/categories/create"
              className="bg-black !text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus size={16} />
              Create
            </Link>
          </div>
        </div>

        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 font-medium text-sm">
                    {category.name}
                  </td>

                  <td className="p-4 text-sm text-gray-400 font-mono">
                    {category.slug}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() => setDeleteTarget(category.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete Category"
        message="Are you sure you want to delete this category? Products in this category may be affected."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
