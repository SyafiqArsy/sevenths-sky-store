"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <div className="flex gap-2 overflow-x-auto pb-4 mb-12">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            selectedCategory === "all"
              ? "bg-black text-white shadow-lg shadow-black/20"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.slug
                ? "bg-black text-white shadow-lg shadow-black/20"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-32"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>

            <h3 className="text-2xl font-semibold">
              No Products Found
            </h3>

            <p className="mt-3 text-gray-400">
              Try another category.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                category={product.category.name}
                image={product.image}
                price={Number(product.price)}
                productId={product.id}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
