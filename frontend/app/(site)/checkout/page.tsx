import CheckoutForm from "@/src/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          Checkout
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Shipping Information
        </h1>

        <CheckoutForm />

      </div>
    </main>
  );
}