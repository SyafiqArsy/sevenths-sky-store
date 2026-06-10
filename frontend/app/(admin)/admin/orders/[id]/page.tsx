import AdminOrderDetail from "@/src/components/admin/AdminOrderDetail";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold">
        Order Detail
      </h1>

      <AdminOrderDetail
        orderId={Number(id)}
      />

    </div>
  );
}