import CartView from "@/src/components/cart/CartView";

export default function CartPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold">
          Shopping Cart
        </h1>

        <CartView />
      </div>
    </main>
  );
}