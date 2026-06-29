"use client";

import { useState } from "react";
import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminGuard from "@/src/components/admin/AdminGuard";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="md:hidden flex items-center gap-3 p-4 border-b border-gray-100 bg-white">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={22} />
            </button>

            <span className="font-semibold tracking-wider text-sm">
              SEVENTH SKY ADMIN
            </span>
          </div>

          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
