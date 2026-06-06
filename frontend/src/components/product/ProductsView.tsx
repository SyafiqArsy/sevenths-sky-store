"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
};

type Props = {
  products: Product[];
  categories: Category[];
};

export default function ProductsView({
  products,
  categories,
}: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category.slug === selectedCategory
    );
  }, [products, selectedCategory]);

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4 mb-12">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition ${
            selectedCategory === "all"
              ? "bg-black text-white"
              : "border border-gray-300"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(category.slug)
            }
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition ${
              selectedCategory === category.slug
                ? "bg-black text-white"
                : "border border-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-32">
        <h3 className="text-3xl font-semibold">
            No Products Found
        </h3>

        <p className="mt-4 text-gray-500">
            Try another category.
        </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
            key={product.id}
            slug={product.slug}
            name={product.name}
            category={product.category.name}
            image={product.image}
            price={Number(product.price)}
            />
          ))}
        </div>
      )}
    </>
  );
}