import ProductsView from "@/src/components/product/ProductsView";
import { getCategories, getProducts } from "@/src/lib/api";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Shop
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            All Products
          </h1>
        </div>

        <ProductsView
          products={products}
          categories={categories}
        />
      </div>
    </main>
  );
}