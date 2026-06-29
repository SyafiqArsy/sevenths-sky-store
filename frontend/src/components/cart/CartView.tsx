"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";

import { getCart, updateCartItem, removeCartItem } from "@/src/lib/cart";
import { useCart } from "@/src/context/CartContext";
import { useToast } from "@/src/context/ToastContext";
import Link from "next/link";

type CartItem = {
  id: number;
  quantity: number;

  product: {
    id: number;
    name: string;
    image: string;
    price: string;
    stock: number;
  };
};

export default function CartView() {
  const { refreshCart } = useCart();
  const { showToast } = useToast();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const result = await getCart(token);

    setItems(result.data.items);

    setLoading(false);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleUpdate(
    itemId: number,
    quantity: number
  ) {
    const token = localStorage.getItem("token");

    if (!token) return;

    await updateCartItem(token, itemId, quantity);

    await loadCart();
    await refreshCart();
  }

  async function handleRemove(itemId: number) {
    const token = localStorage.getItem("token");

    if (!token) return;

    await removeCartItem(token, itemId);

    showToast("Item removed from cart", "info");

    await loadCart();
    await refreshCart();
  }

  if (loading) {
    return (
      <div className="mt-12 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag size={32} className="text-gray-300" />
        </div>

        <h2 className="text-2xl font-semibold">
          Your Cart is Empty
        </h2>

        <p className="mt-3 text-gray-400">
          Looks like you haven&apos;t added anything yet.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="mt-12 grid lg:grid-cols-[1fr_350px] gap-12">
      {/* Cart Items */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-100 rounded-2xl p-5 flex gap-5 items-center bg-white shadow-sm"
            >
              {/* Product Image */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[15px] truncate">
                  {item.product.name}
                </h3>

                <p className="text-gray-400 text-sm mt-0.5">
                  Rp{" "}
                  {Number(item.product.price).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleUpdate(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="w-9 h-9 md:w-8 md:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  −
                </button>

                <span className="w-8 text-center font-medium text-sm">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    handleUpdate(item.id, item.quantity + 1)
                  }
                  className="w-9 h-9 md:w-8 md:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="font-semibold text-[15px] w-28 text-right hidden md:block">
                Rp{" "}
                {(Number(item.product.price) * item.quantity).toLocaleString("id-ID")}
              </p>

              {/* Remove */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="border border-gray-100 rounded-2xl p-8 h-fit sticky top-28 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal ({items.length} items)</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span className="text-emerald-500">Free</span>
          </div>

          <div className="h-px bg-gray-100 my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block w-full text-center bg-black !text-white py-4 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
