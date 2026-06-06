"use client";

import { useState } from "react";

type Props = {
  stock: number;
};

export default function QuantitySelector({
  stock,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center border rounded-full w-fit overflow-hidden">
      <button
        onClick={decrease}
        className="px-5 py-3 hover:bg-gray-100"
      >
        −
      </button>

      <span className="px-6 font-medium">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="px-5 py-3 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}