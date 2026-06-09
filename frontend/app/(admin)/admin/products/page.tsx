import AdminProductsView from "@/src/components/admin/AdminProductsView";

export default function AdminProductsPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="p-10">

        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <AdminProductsView />

      </div>
    </main>
  );
}