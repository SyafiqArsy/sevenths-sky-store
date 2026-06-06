import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({
  slug,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {category}
        </p>

        <h3 className="mt-1 font-medium">
          {name}
        </h3>

        <p className="mt-2 font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}