"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { getAdminCategories, getAdminProduct, updateProduct } from "@/src/lib/admin";
import { useToast } from "@/src/context/ToastContext";

type Category = {
  id: number;
  name: string;
};

export default function EditProductForm({ id }: { id: number }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

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
      const token = localStorage.getItem("token");

      if (!token) return;

      const [categoriesResult, productResult] = await Promise.all([
        getAdminCategories(token),
        getAdminProduct(token, id),
      ]);

      setCategories(categoriesResult.data);

      const product = productResult.data;

      setForm({
        category_id: String(product.category_id),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: String(product.stock),
        is_active: product.is_active,
      });

      setPreview(product.image);
    }

    loadData();
  }, [id]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("category_id", form.category_id);
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("is_active", form.is_active ? "1" : "0");

      if (image) {
        formData.append("image", image);
      }

      const result = await updateProduct(token, id, formData);

      if (!result.success) {
        showToast(result.message || "Update failed", "error");
        return;
      }

      showToast("Product updated!", "success");
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 space-y-6 max-w-2xl"
    >
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Category</label>
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Product Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors resize-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-600">Price (IDR)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-600">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:border-black transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-600">Product Image</label>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-black transition-colors">
            <Upload size={18} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              {image ? "Change image" : "Choose file"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl"
            />
          )}
        </div>
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
            Updating...
          </>
        ) : (
          "Update Product"
        )}
      </motion.button>
    </motion.form>
  );
}
