"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import QuantitySelector from "./QuantitySelector";
import { addToCart } from "@/src/lib/cart";
import { useCart } from "@/src/context/CartContext";
import { useToast } from "@/src/context/ToastContext";
import { startCursorLoading, stopCursorLoading } from "@/src/lib/cursorLoading";

type Props = {
  productId: number;
  stock: number;
};

export default function ProductActions({
  productId,
  stock,
}: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const { refreshCart } = useCart();

  async function handleAddToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    startCursorLoading();

    try {
      const result = await addToCart(
        token,
        productId,
        quantity
      );

      if (!result.success) {
        showToast(result.message, "error");
        return;
      }

      await refreshCart();

      setAdded(true);
      showToast("Added to cart successfully!", "success");

      setTimeout(() => setAdded(false), 2000);
    } finally {
      setLoading(false);
      stopCursorLoading();
    }
  }

  return (
    <>
      <div className="mt-8">
        <p className="text-sm font-medium mb-3 text-gray-600">
          Quantity
        </p>

        <QuantitySelector
          stock={stock}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <motion.button
        onClick={handleAddToCart}
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        className={`mt-8 w-full py-4 rounded-full font-medium text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
          added
            ? "bg-emerald-500 text-white"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        <ShoppingBag size={18} />
        {loading
          ? "Adding..."
          : added
          ? "Added!"
          : "Add To Cart"}
      </motion.button>
    </>
  );
}
