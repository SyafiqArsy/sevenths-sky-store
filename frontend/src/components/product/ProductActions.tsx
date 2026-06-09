"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import QuantitySelector from "./QuantitySelector";
import { addToCart } from "@/src/lib/cart";
import { useCart } from "@/src/context/CartContext";

type Props = {
  productId: number;
  stock: number;
};

export default function ProductActions({
  productId,
  stock,
}: Props) {
  const router = useRouter();

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

const { refreshCart } = useCart();

  async function handleAddToCart() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const result = await addToCart(
        token,
        productId,
        quantity
      );

      if (!result.success) {
        alert(result.message);
        return;
      }

      await refreshCart();

      alert("Added to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-10">
        <p className="font-medium mb-4">
          Quantity
        </p>

        <QuantitySelector
          stock={stock}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-10 w-full bg-black text-white py-4 rounded-full font-medium hover:opacity-90 transition"
      >
        {loading
          ? "Adding..."
          : "Add To Cart"}
      </button>
    </>
  );
}