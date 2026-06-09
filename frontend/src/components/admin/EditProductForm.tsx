"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  getAdminCategories,
  getAdminProduct,
  updateProduct,
} from "@/src/lib/admin";

type Category = {
  id: number;
  name: string;
};

export default function EditProductForm({
  id,
}: {
  id: number;
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    is_active: true,
  });

  useEffect(() => {
    async function loadData() {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const [
        categoriesResult,
        productResult,
      ] = await Promise.all([
        getAdminCategories(token),
        getAdminProduct(token, id),
      ]);

      setCategories(
        categoriesResult.data
      );

      const product =
        productResult.data;

      setForm({
        category_id:
          String(product.category_id),
        name:
          product.name,
        description:
          product.description,
        price:
          product.price,
        stock:
          String(product.stock),
        is_active:
          product.is_active,
      });

      setPreview(
        product.image
      );
    }

    loadData();
  }, [id]);

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "_method",
        "PUT"
      );

      formData.append(
        "category_id",
        form.category_id
      );

      formData.append(
        "name",
        form.name
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "price",
        form.price
      );

      formData.append(
        "stock",
        form.stock
      );

      formData.append(
        "true",
        String(form.is_active)
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      const result =
        await updateProduct(
          token,
          id,
          formData
        );

      if (!result.success) {

        alert(
          result.message ||
          "Update failed"
        );

        return;
      }

      alert(
        "Product updated"
      );

      router.push(
        "/admin/products"
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

      <select
        value={form.category_id}
        onChange={(e) =>
          setForm({
            ...form,
            category_id:
              e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-4"
      >
        {categories.map(
          (category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          )
        )}
      </select>

      <input
        type="text"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name:
              e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-4"
      />

      <textarea
        rows={5}
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description:
              e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-4"
      />

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-4"
        />

        <input
          type="number"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock:
                e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-4"
        />

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImageChange
        }
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-8 py-4 rounded-xl"
      >
        {loading
          ? "Updating..."
          : "Update Product"}
      </button>

    </form>
  );
}