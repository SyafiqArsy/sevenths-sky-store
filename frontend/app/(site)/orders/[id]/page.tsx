import OrderDetailView from "@/src/components/order/OrderDetailView";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
          Account
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Order Detail
        </h1>

        <OrderDetailView
          orderId={Number(id)}
        />

      </div>
    </main>
  );
}