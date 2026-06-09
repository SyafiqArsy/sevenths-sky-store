import AdminOrders from "@/src/components/admin/AdminOrders";

export default function AdminOrdersPage() {
    return (
      <main className="pt-32 pb-20">
        <div className="p-10">
  
          <h1 className="text-4xl font-bold">
            Orders
          </h1>
  
          <AdminOrders />
  
        </div>
      </main>
    );
}