import AdminGuard from "@/src/components/admin/AdminGuard";
import AdminDashboardView from "@/src/components/admin/AdminDashboardView";

export default function AdminPage() {
  return (
    <AdminGuard>

      <div className="p-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <AdminDashboardView />

      </div>

    </AdminGuard>
  );
}