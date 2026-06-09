import AdminDashboardView from "@/src/components/admin/AdminDashboardView";

export default function AdminPage() {
  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <AdminDashboardView />

    </div>
  );
}