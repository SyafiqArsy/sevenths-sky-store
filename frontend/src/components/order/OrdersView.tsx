"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { getOrders } from "@/src/lib/order";
import { loadMidtransScript } from "@/src/lib/loadMidtrans";

type Order = {
  id: number;
  order_number: string;
  grand_total: string;
  payment_status: string;
  order_status: string;
  created_at: string;

  midtrans_token: string | null;
};

function getPaymentBadge(status: string) {
  switch (status) {
    case "paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "failed":
      return "bg-red-50 text-red-700 border-red-200";
    case "expired":
      return "bg-gray-50 text-gray-500 border-gray-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

function getOrderBadge(status: string) {
  switch (status) {
    case "pending":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "shipped":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
}

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function handlePayNow(token: string) {
    await loadMidtransScript();

    // eslint-disable-next-line
    window.snap.pay(token, {
      onSuccess() {
        window.location.reload();
      },

      onPending() {
        window.location.reload();
      },

      onClose() {
        console.log("Payment popup closed");
      },
    });
  }

  useEffect(() => {
    async function loadOrders() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const result = await getOrders(token);

      setOrders(result.data);

      setLoading(false);
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="mt-12 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Package size={32} className="text-gray-300" />
        </div>

        <h2 className="text-2xl font-semibold">
          No Orders Yet
        </h2>

        <p className="mt-3 text-gray-400">
          Your orders will appear here after your first purchase.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="mt-12 space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Order
                </p>

                <h3 className="font-semibold mt-1 text-sm">
                  {order.order_number}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Payment
                </p>

                <span
                  className={`inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize border ${getPaymentBadge(
                    order.payment_status
                  )}`}
                >
                  {order.payment_status}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Status
                </p>

                <span
                  className={`inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize border ${getOrderBadge(
                    order.order_status
                  )}`}
                >
                  {order.order_status}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Total
                </p>

                <p className="font-bold mt-1">
                  Rp{" "}
                  {Number(order.grand_total).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <Link
                href={`/orders/${order.id}`}
                className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                View Details
              </Link>

              {order.payment_status === "pending" &&
                order.midtrans_token && (
                  <button
                    onClick={() =>
                      handlePayNow(order.midtrans_token!)
                    }
                    className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
