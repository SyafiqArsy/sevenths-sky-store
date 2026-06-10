"use client";

import { useEffect, useState } from "react";
import {getCart,updateCartItem,removeCartItem,} from "@/src/lib/cart";
import { useCart } from "@/src/context/CartContext";
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

  const [items, setItems] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadCart() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const result =
      await getCart(token);

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
    const token =
      localStorage.getItem("token");

    if (!token) return;

    await updateCartItem(
      token,
      itemId,
      quantity
    );

    await loadCart();
    await refreshCart();
  }

  async function handleRemove(
    itemId: number
  ) {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    await removeCartItem(
      token,
      itemId
    );

    await loadCart();
    await refreshCart();
  }

  if (loading) {
    return (
      <p className="mt-12">
        Loading cart...
      </p>
    );
  }

  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
        item.quantity,
    0
  );

  return (
    <div className="mt-12 grid lg:grid-cols-[1fr_350px] gap-12">

      {/* Cart Items */}
      <div className="space-y-6">

        {items.map((item) => (

          <div
            key={item.id}
            className="border rounded-2xl p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {item.product.name}
              </h3>

              <p className="text-gray-500">
                Rp{" "}
                {Number(
                  item.product.price
                ).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  handleUpdate(
                    item.id,
                    item.quantity - 1
                  )
                }
                disabled={
                  item.quantity <= 1
                }
                className="border px-3 py-1 rounded"
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  handleUpdate(
                    item.id,
                    item.quantity + 1
                  )
                }
                className="border px-3 py-1 rounded"
              >
                +
              </button>

              <button
                onClick={() =>
                  handleRemove(item.id)
                }
                className="ml-4 text-red-500"
              >
                Remove
              </button>

            </div>
          </div>

        ))}

      </div>

      {/* Summary */}
      <div className="border rounded-3xl p-8 h-fit sticky top-32">

        <h2 className="text-2xl font-bold">
          Order Summary
        </h2>

        <div className="mt-8 flex justify-between">
          <span>Total</span>

          <span className="font-semibold">
            Rp{" "}
            {total.toLocaleString(
              "id-ID"
            )}
          </span>
        </div>

        {items.length > 0 && (
        <Link
            href="/checkout"
            className="mt-8 block w-full text-center bg-black !text-white py-4 rounded-full"
        >
            Checkout
        </Link>
        )}

      </div>

    </div>
  );
}