"use client";

import { useState } from "react";

const sizes = ["S", "M", "L", "XL"];

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] =
    useState("M");

  return (
    <div className="flex gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`w-12 h-12 rounded-full border transition ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "border-gray-300"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}