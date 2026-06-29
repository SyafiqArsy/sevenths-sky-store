"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, FolderTree, ClipboardList, DollarSign } from "lucide-react";

import { getDashboardStats } from "@/src/lib/admin";

type DashboardStats = {
  total_products: number;
  total_categories: number;
  total_orders: number;
  total_revenue: string;
};

const statCards = [
  {
    label: "Products",
    key: "total_products" as const,
    icon: Package,
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    label: "Categories",
    key: "total_categories" as const,
    icon: FolderTree,
    color: "bg-purple-50 text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    label: "Orders",
    key: "total_orders" as const,
    icon: ClipboardList,
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    label: "Revenue",
    key: "total_revenue" as const,
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
    isCurrency: true,
  },
];

export default function AdminDashboardView() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const result = await getDashboardStats(token);

      setStats(result.data);
      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-400 font-medium">
                  {card.label}
                </p>

                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <Icon size={18} className={card.color.split(" ")[1]} />
                </div>
              </div>

              <h2 className={`text-3xl font-bold ${card.color.split(" ")[1]}`}>
                {card.isCurrency
                  ? `Rp ${Number(stats[card.key]).toLocaleString("id-ID")}`
                  : stats[card.key]}
              </h2>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
