import OrdersView from "@/src/components/order/OrdersView";

export default function OrdersPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          Account
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          My Orders
        </h1>

        <OrdersView />

      </div>
    </main>
  );
}