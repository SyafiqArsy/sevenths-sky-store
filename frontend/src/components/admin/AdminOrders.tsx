"use client";

import { useEffect, useState } from "react";
import {getAdminOrders,updateOrderStatus,} from "@/src/lib/admin";

function getAllowedStatuses(
  orderStatus: string,
  paymentStatus: string
) {
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

function getPaymentBadgeClass(
  status: string
) {
  switch (status) {

    case "paid":
      return "bg-green-100 text-green-700";

    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "failed":
      return "bg-red-100 text-red-700";

    case "expired":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getOrderBadgeClass(
  status: string
) {
  switch (status) {

    case "pending":
      return "bg-gray-100 text-gray-700";

    case "processing":
      return "bg-blue-100 text-blue-700";

    case "shipped":
      return "bg-purple-100 text-purple-700";

    case "completed":
      return "bg-green-100 text-green-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

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
                Payment
              </th>

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {orders.map((order) => {

              const allowedStatuses =
                getAllowedStatuses(
                  order.order_status,
                  order.payment_status
                );

              return (

            <tr
              key={order.id}
              className="border-b"
            >

              {/* Order */}

              <td className="p-5">
                {order.order_number}
              </td>

              {/* Customer */}

              <td className="p-5">
                {order.user.name}
              </td>

              {/* Total */}

              <td className="p-5">
                Rp{" "}
                {Number(
                  order.grand_total
                ).toLocaleString("id-ID")}
              </td>

              {/* Payment Status */}

              <td className="p-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    capitalize
                    ${getPaymentBadgeClass(
                      order.payment_status
                    )}
                  `}
                >
                  {order.payment_status}
                </span>

              </td>

              {/* Order Status */}

              <td className="p-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    capitalize
                    ${getOrderBadgeClass(
                      order.order_status
                    )}
                  `}
                >
                  {order.order_status}
                </span>

              </td>

              {/* Action */}

              <td className="p-5">

                <div className="flex gap-3">

                  <a
                    href={`/admin/orders/${order.id}`}
                    className="
                      px-4
                      py-2
                      border
                      rounded-lg
                      hover:bg-black
                      hover:text-white
                      transition
                    "
                  >
                    View
                  </a>

                  {allowedStatuses.length > 0 && (

                    <select
                      defaultValue=""
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className="
                        border
                        rounded-lg
                        px-3
                        py-2
                      "
                    >

                      <option value="" disabled>
                        Change Status
                      </option>

                      {allowedStatuses.map(
                        (status: string) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>

                        )
                      )}

                    </select>

                  )}

                </div>

              </td>

            </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}