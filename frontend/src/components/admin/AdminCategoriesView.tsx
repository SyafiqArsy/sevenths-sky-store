"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getAdminCategories,
  deleteCategory,
} from "@/src/lib/admin";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function AdminCategoriesView() {

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadCategories() {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const result =
      await getAdminCategories(
        token,
        search
      );

    setCategories(result.data);

    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, [search]);

  async function handleDelete(
    id: number
  ) {
    const confirmed =
      confirm(
        "Delete category?"
      );

    if (!confirmed) return;

    const token =
      localStorage.getItem("token");

    if (!token) return;

    await deleteCategory(
      token,
      id
    );

    loadCategories();
  }

  if (loading) {
    return (
      <p className="mt-8">
        Loading categories...
      </p>
    );
  }

  return (
    <div className="mt-10">

      <div className="flex justify-end items-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-3 w-80"
        />

        <Link
          href="/admin/categories/create"
          className="bg-black !text-white px-6 py-3 rounded-xl"
        >
          Create Category
        </Link>

      </div>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-50 border-b">

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Slug
            </th>

            <th className="p-4 text-left">
              Action
            </th>

          </tr>
        </thead>

        <tbody>

          {categories.map(
            (category) => (
              <tr
                key={category.id}
                className="border-b"
              >

                <td className="p-4">
                  {category.name}
                </td>

                <td className="p-4">
                  {category.slug}
                </td>

                <td className="p-4 flex gap-4">

                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="text-blue-500"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        category.id
                      )
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}