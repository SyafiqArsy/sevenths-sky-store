import Image from "next/image";
import { getProduct, getProducts } from "@/src/lib/api";
import ProductCard from "@/src/components/product/ProductCard";
import ProductActions from "@/src/components/product/ProductActions";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  const products = await getProducts();

  const relatedProducts = products
    .filter(
      (item: any) =>
        item.category.slug === product.category.slug &&
        item.slug !== product.slug
    )
    .slice(0, 4);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <p className="uppercase tracking-[0.2em] text-xs text-gray-400">
              {product.category.name}
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="mt-6 text-3xl font-bold">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </p>

            <div className="mt-8 h-px bg-gray-100" />

            <p className="mt-8 text-gray-500 leading-relaxed text-sm">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  product.stock > 0
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />
              <p className="text-sm text-gray-500">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            <div className="mt-auto pt-8">
              <ProductActions
                productId={product.id}
                stock={product.stock}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
              Recommended
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              You May Also Like
            </h2>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item: any) => (
                <ProductCard
                  key={item.id}
                  slug={item.slug}
                  name={item.name}
                  category={item.category.name}
                  image={item.image}
                  price={Number(item.price)}
                  productId={item.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
