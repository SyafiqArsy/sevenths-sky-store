"use client";

import { useEffect, useState } from "react";

import {
  getAdminOrders,
  updateOrderStatus,
} from "@/src/lib/admin";

export default function AdminOrders() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  async function loadOrders() {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    const result =
      await getAdminOrders(
        token,
        search
      );

    setOrders(result.data);

    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleStatusChange(
    orderId: number,
    status: string
  ) {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    await updateOrderStatus(
      token,
      orderId,
      status
    );

    await loadOrders();
  }

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>

      <div className="mt-10 bg-white rounded-3xl overflow-hidden">

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search order..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3 w-80"
          />

        </div>

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-5">
                Order
              </th>

              <th className="text-left p-5">
                Customer
              </th>

              <th className="text-left p-5">
                Total
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b"
              >

                <td className="p-5">
                  {order.order_number}
                </td>

                <td className="p-5">
                  {order.user.name}
                </td>

                <td className="p-5">
                  Rp{" "}
                  {Number(
                    order.grand_total
                  ).toLocaleString("id-ID")}
                </td>

                <td className="p-5">

                  <select
                    value={order.order_status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}