"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

const menus = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Products",
    href: "/admin/products",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Orders",
    href: "/admin/orders",
  },
];

export default function AdminSidebar() {

  const pathname =
    usePathname();

    const { logout } =
  useAuth();

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-6">

        <Link href="/" className="block text-2xl font-bold mb-10 hover:opacity-80 transition">
        Seventh Sky Store
        </Link>

        <nav className="space-y-2">

            {menus.map((menu) => {

            const active =
                pathname === menu.href;

            return (
                <Link
                key={menu.href}
                href={menu.href}
                className={`block px-4 py-3 rounded-xl transition ${
                    active
                    ? "bg-black !text-white"
                    : "hover:bg-gray-100"
                }`}
                >
                {menu.name}
                </Link>
            );
            })}

            <button
                onClick={logout}
                className="w-full mt-10 text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
                >
                Logout
            </button>

        </nav>

    </aside>
  );
}