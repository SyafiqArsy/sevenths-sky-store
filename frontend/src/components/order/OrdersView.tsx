"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getOrders } from "@/src/lib/order";

type Order = {
  id: number;
  order_number: string;
  grand_total: string;
  payment_status: string;
  order_status: string;
  created_at: string;
};

export default function OrdersView() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadOrders() {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const result =
        await getOrders(token);

      setOrders(result.data);

      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="mt-12">
        Loading orders...
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-semibold">
          No Orders Yet
        </h2>

        <p className="mt-4 text-gray-500">
          Your orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">

      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-3xl p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Order Number
              </p>

              <h3 className="font-semibold mt-1">
                {order.order_number}
              </h3>

              <p className="mt-3 text-gray-500">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <p className="font-medium capitalize">
                {order.payment_status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Status
              </p>

              <p className="font-medium capitalize">
                {order.order_status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="font-bold">
                Rp{" "}
                {Number(
                  order.grand_total
                ).toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>

            <Link
              href={`/orders/${order.id}`}
              className="px-6 py-3 border rounded-full hover:bg-black hover:text-white transition"
            >
              View Details
            </Link>

          </div>
        </div>
      ))}

    </div>
  );
}