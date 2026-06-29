"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getOrder } from "@/src/lib/order";

type Props = {
  orderId: number;
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

export default function OrderDetailView({ orderId }: Props) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const result = await getOrder(token, orderId);

      setOrder(result.data);

      setLoading(false);
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="mt-12 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <p className="mt-12 text-gray-400">
        Order not found.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      {/* Summary */}
      <div className="mt-8 border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">
          {order.order_number}
        </h2>

        <div className="flex gap-3 mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getPaymentBadge(
              order.payment_status
            )}`}
          >
            {order.payment_status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getOrderBadge(
              order.order_status
            )}`}
          >
            {order.order_status}
          </span>
        </div>
      </div>

      {/* Shipping */}
      <div className="mt-6 border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">
          Shipping Information
        </h3>

        <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="mt-0.5 font-medium">{order.recipient_name}</p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p className="mt-0.5 font-medium">{order.phone}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Address</p>
            <p className="mt-0.5 font-medium">
              {order.address}, {order.city} {order.postal_code}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6 border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">
          Ordered Items
        </h3>

        <div className="mt-5 space-y-4">
          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="font-medium text-sm">
                  {item.product_name}
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  Qty {item.quantity} × Rp{" "}
                  {Number(item.product_price).toLocaleString("id-ID")}
                </p>
              </div>

              <p className="font-semibold text-sm">
                Rp{" "}
                {Number(item.subtotal).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>
              Rp {Number(order.total_price).toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>
              Rp {Number(order.shipping_cost).toLocaleString("id-ID")}
            </span>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span>
              Rp{" "}
              {Number(order.grand_total).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
