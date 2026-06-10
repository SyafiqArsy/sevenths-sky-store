"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "@/src/lib/admin";

type DashboardStats = {
  total_products: number;
  total_categories: number;
  total_orders: number;
  total_revenue: string;
};

export default function AdminDashboardView() {

  const [stats, setStats] =
    useState<DashboardStats | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    console.log("Dashboard mounted");
    async function loadStats() {

      const token =
        localStorage.getItem("token");

        console.log("Token:", token);

      if (!token) {
        setLoading(false);
        return;
    }

      const result =
        await getDashboardStats(
          token
        );

      setStats(result.data);

      setLoading(false);
    }

    loadStats();

  }, []);

  if (loading) {
    return (
      <p className="mt-10">
        Loading dashboard...
      </p>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

      <div className="border rounded-2xl p-6">
        <p className="text-gray-500">
          Products
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {stats.total_products}
        </h2>
      </div>

      <div className="border rounded-2xl p-6">
        <p className="text-gray-500">
          Categories
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {stats.total_categories}
        </h2>
      </div>

      <div className="border rounded-2xl p-6">
        <p className="text-gray-500">
          Orders
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {stats.total_orders}
        </h2>
      </div>

      <div className="border rounded-2xl p-6">
        <p className="text-gray-500">
          Revenue
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Rp{" "}
          {Number(
            stats.total_revenue
          ).toLocaleString(
            "id-ID"
          )}
        </h2>
      </div>

    </div>
  );
}