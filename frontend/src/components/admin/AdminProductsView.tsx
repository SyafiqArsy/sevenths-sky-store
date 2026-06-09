"use client";

import {useEffect,useState,} from "react";
import {getAdminProducts,deleteProduct,} from "@/src/lib/admin";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  sku: string;

  image: string;

  price: string;
  stock: number;

  is_active: boolean;

  category: {
    name: string;
  };
};

export default function AdminProductsView() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  const [search, setSearch] =
  useState("");

  async function loadProducts() {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    const result =
      await getAdminProducts(
        token,
        search
      );

    setProducts(result.data);

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(
    id: number
  ) {
    const confirmed =
      confirm(
        "Delete this product?"
      );

    if (!confirmed) return;

    const token =
      localStorage.getItem("token");

    if (!token) return;

    await deleteProduct(
      token,
      id
    );

    loadProducts();
  }

  if (loading) {
    return (
      <p className="mt-8">
        Loading products...
      </p>
    );
  }

  return (
    <div className="mt-10">

      <div className="flex justify-end items-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border rounded-xl px-4 py-3 w-80"
        />

        <Link
          href="/admin/products/create"
          className="bg-black !text-white px-5 py-3 rounded-xl"
        >
          + Create Product
        </Link>
      </div>

      <div className="overflow-x-auto">

      <table className="w-full border">

        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-left">
              Image
            </th>

            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Stock
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map(
            (product) => (
              <tr
                key={product.id}
                className="border-b"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  {
                    product.category
                      .name
                  }
                </td>

                <td className="p-4">
                  Rp{" "}
                  {Number(
                    product.price
                  ).toLocaleString(
                    "id-ID"
                  )}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="p-4 flex gap-4">
                  <button
                    onClick={() =>
                      router.push(
                        `/admin/products/${product.id}/edit`
                      )
                    }
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
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
    </div>
  );
}