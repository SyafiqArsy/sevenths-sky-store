"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCart } from "@/src/lib/cart";

type CartContextType = {
  count: number;
  refreshCart: () => Promise<void>;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] =
    useState(0);

  async function refreshCart() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setCount(0);
      return;
    }

    try {
      const result =
        await getCart(token);

      const total =
        result.data.items.reduce(
          (
            sum: number,
            item: any
          ) =>
            sum + item.quantity,
          0
        );

      setCount(total);
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        count,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}