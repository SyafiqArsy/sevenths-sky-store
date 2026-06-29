"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAdminOrder } from "@/src/lib/admin";

type Props = {
  orderId: number;
};

function getPaymentBadge(status: string) {
  switch (status) {
    case "paid":
      return "bg-emerald-50 text-emerald-700";
    case "pending":
      return "bg-amber-50 text-amber-700";
    case "failed":
      return "bg-red-50 text-red-700";
    case "expired":
      return "bg-gray-50 text-gray-500";
    default:
      return "bg-gray-50 text-gray-500";
  }
}

function getOrderBadge(status: string) {
  switch (status) {
    case "pending":
      return "bg-gray-50 text-gray-600";
    case "processing":
      return "bg-blue-50 text-blue-700";
    case "shipped":
      return "bg-purple-50 text-purple-700";
    case "completed":
      return "bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-50 text-gray-500";
  }
}

export default function AdminOrderDetail({ orderId }: Props) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const result = await getAdminOrder(token, orderId);

      setOrder(result.data);
      setLoading(false);
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <p className="mt-10 text-gray-400">Order not found</p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 space-y-6"
    >
      {/* Order Summary */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h2 className="text-2xl font-bold">
          {order.order_number}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Created on{" "}
          {new Date(order.created_at).toLocaleString("id-ID")}
        </p>

        <div className="flex gap-3 mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPaymentBadge(
              order.payment_status
            )}`}
          >
            {order.payment_status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getOrderBadge(
              order.order_status
            )}`}
          >
            {order.order_status}
          </span>
        </div>
      </div>

      {/* Customer */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Customer Information</h3>

        <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Name</p>
            <p className="mt-0.5 font-medium">{order.user.name}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p className="mt-0.5 font-medium">{order.user.email}</p>
          </div>

          <div>
            <p className="text-gray-400">Role</p>
            <p className="mt-0.5 font-medium capitalize">{order.user.role}</p>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Shipping Information</h3>

        <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Recipient</p>
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

      {/* Payment */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Payment Information</h3>

        <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Status</p>
            <p className="mt-0.5 font-medium capitalize">{order.payment_status}</p>
          </div>

          <div>
            <p className="text-gray-400">Payment Type</p>
            <p className="mt-0.5 font-medium">{order.payment_type ?? "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Transaction ID</p>
            <p className="mt-0.5 font-medium font-mono text-xs">{order.transaction_id ?? "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Paid At</p>
            <p className="mt-0.5 font-medium">
              {order.paid_at
                ? new Date(order.paid_at).toLocaleString("id-ID")
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Ordered Items</h3>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Qty
                </th>
                <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item: any) => (
                <tr key={item.id} className="border-b border-gray-50">
                  <td className="py-3 text-sm">{item.product_name}</td>
                  <td className="py-3 text-sm text-gray-500">
                    Rp {Number(item.product_price).toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 text-sm">{item.quantity}</td>
                  <td className="py-3 text-sm font-medium">
                    Rp {Number(item.subtotal).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Payment Summary</h3>

        <div className="mt-5 space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>Rp {Number(order.total_price).toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>Rp {Number(order.shipping_cost).toLocaleString("id-ID")}</span>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span>Rp {Number(order.grand_total).toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
