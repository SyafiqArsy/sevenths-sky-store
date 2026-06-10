import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminGuard from "@/src/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>

      <div className="flex h-screen">

        <AdminSidebar />

        <main
          className="
            flex-1
            overflow-y-auto
            p-8
          "
        >
          {children}
        </main>

      </div>

    </AdminGuard>

  );
}