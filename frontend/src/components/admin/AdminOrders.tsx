"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { getAdminOrders, updateOrderStatus } from "@/src/lib/admin";

function getAllowedStatuses(orderStatus: string, paymentStatus: string) {
  switch (orderStatus) {
    case "pending":
      return paymentStatus === "paid"
        ? ["processing", "cancelled"]
        : ["cancelled"];
    case "processing":
      return ["shipped"];
    case "shipped":
      return ["completed"];
    default:
      return [];
  }
}

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadOrders() {
    const token = localStorage.getItem("token");

    if (!token) return;

    const result = await getAdminOrders(token, search);

    setOrders(result.data);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, [search]);

  async function handleStatusChange(orderId: number, status: string) {
    const token = localStorage.getItem("token");

    if (!token) return;

    await updateOrderStatus(token, orderId, status);

    await loadOrders();
  }

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-gray-400">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading orders...
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-full sm:w-64 placeholder:text-gray-300 focus:border-black transition-colors"
          />
        </div>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Customer
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Total
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => {
                const allowedStatuses = getAllowedStatuses(
                  order.order_status,
                  order.payment_status
                );

                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-sm">
                      {order.order_number}
                    </td>

                    <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                      {order.user.name}
                    </td>

                    <td className="p-4 text-sm font-medium hidden md:table-cell">
                      Rp {Number(order.grand_total).toLocaleString("id-ID")}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPaymentBadge(
                          order.payment_status
                        )}`}
                      >
                        {order.payment_status}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getOrderBadge(
                          order.order_status
                        )}`}
                      >
                        {order.order_status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/admin/orders/${order.id}`}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
                        >
                          <Eye size={16} />
                        </a>

                        {allowedStatuses.length > 0 && (
                          <select
                            defaultValue=""
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:border-black transition-colors"
                          >
                            <option value="" disabled>
                              Update
                            </option>

                            {allowedStatuses.map((status: string) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
