import Image from "next/image";
import {getProduct,getProducts,} from "@/src/lib/api";
import QuantitySelector from "@/src/components/product/QuantitySelector";
import SizeSelector from "@/src/components/product/SizeSelector";
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
      item.category.slug ===
        product.category.slug &&
      item.slug !== product.slug
  )
  .slice(0, 4);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>

            <p className="uppercase tracking-[0.2em] text-sm text-gray-500">
              {product.category.name}
            </p>

            <h1 className="mt-4 text-5xl font-bold">
              {product.name}
            </h1>

            <p className="mt-6 text-3xl font-semibold">
              Rp{" "}
              {Number(product.price).toLocaleString("id-ID")}
            </p>

            <p className="mt-8 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">
                Stock Available
            </p>

            <p className="font-semibold">
                {product.stock}
            </p>
            </div>

            <div className="mt-10">
            <p className="font-medium mb-4">
                Size
            </p>

            <SizeSelector />
            </div>

            <div className="mt-10">
            <p className="font-medium mb-4">
                Quantity
            </p>

            </div>

            <ProductActions
              productId={product.id}
              stock={product.stock}
            />

          </div>

        </div>

      </div>

        <section className="mt-32">
        <div className="max-w-7xl mx-auto px-6">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Recommended
            </p>

            <h2 className="mt-3 text-4xl font-bold">
            You May Also Like
            </h2>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item: any) => (
                <ProductCard
                key={item.id}
                slug={item.slug}
                name={item.name}
                category={item.category.name}
                image={item.image}
                price={Number(item.price)}
                />
            ))}
            </div>

        </div>
        </section>

    </main>
  );
}