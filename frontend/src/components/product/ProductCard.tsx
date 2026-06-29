"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addToCart } from "@/src/lib/cart";
import { useCart } from "@/src/context/CartContext";
import { useToast } from "@/src/context/ToastContext";

type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  productId?: number;
};

export default function ProductCard({
  slug,
  name,
  price,
  image,
  category,
  productId,
}: ProductCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { refreshCart } = useCart();
  const [adding, setAdding] = useState(false);

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!productId) return;

    setAdding(true);
    try {
      const result = await addToCart(token, productId, 1);
      if (!result.success) {
        showToast(result.message, "error");
        return;
      }
      await refreshCart();
      showToast("Added to cart!", "success");
    } finally {
      setAdding(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="group block" data-cursor="view">
        <Link href={`/products/${slug}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick View + Add to Cart buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex gap-2 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <button
                className="flex-1 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-black py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-white transition-colors"
                data-cursor="pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/products/${slug}`);
                }}
              >
                <Eye size={14} />
                Quick View
              </button>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 flex items-center justify-center gap-2 bg-black/90 backdrop-blur-sm text-white py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-50"
                data-cursor="pointer"
              >
                <ShoppingBag size={14} />
                {adding ? "..." : "Add"}
              </button>
            </div>
          </div>
        </Link>

        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
            {category}
          </p>

          <h3 className="mt-1 font-medium text-[15px]">
            {name}
          </h3>

          <p className="mt-1.5 font-semibold text-[15px]">
            Rp {price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
