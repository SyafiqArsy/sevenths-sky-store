"use client";

import { useEffect, useState } from "react";

import {
  getAdminOrder,
} from "@/src/lib/admin";

type Props = {
  orderId: number;
};

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

export default function AdminOrderDetail({
  orderId,
}: Props) {

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadOrder() {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const result =
        await getAdminOrder(
          token,
          orderId
        );

      setOrder(result.data);

      setLoading(false);
    }

    loadOrder();

  }, [orderId]);

  if (loading) {
    return (
      <p className="mt-10">
        Loading order...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="mt-10">
        Order not found
      </p>
    );
  }

return (
  <div className="mt-10 space-y-8">

    {/* Order Summary */}

    <div className="border rounded-3xl p-8">

        <h2 className="text-2xl font-bold">
        {order.order_number}
        </h2>

        <p className="mt-3 text-gray-500">
        Order created on{" "}
        {new Date(
            order.created_at
        ).toLocaleString("id-ID")}
        </p>

        <div className="flex gap-3 mt-5">

        <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            capitalize
            ${getPaymentBadgeClass(
                order.payment_status
            )}
            `}
        >
            {order.payment_status}
        </span>

        <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            capitalize
            ${getOrderBadgeClass(
                order.order_status
            )}
            `}
        >
            {order.order_status}
        </span>

        </div>

    </div>

    {/* Customer Information */}

    <div className="border rounded-3xl p-8">

    <h3 className="text-xl font-bold">
        Customer Information
    </h3>

    <div className="mt-6 space-y-3">

        <p>
        <strong>
            Name:
        </strong>{" "}
        {order.user.name}
        </p>

        <p>
        <strong>
            Email:
        </strong>{" "}
        {order.user.email}
        </p>

        <p>
        <strong>
            Role:
        </strong>{" "}
        <span className="capitalize">
            {order.user.role}
        </span>
        </p>

    </div>

    </div>

    {/* Shipping Information */}

    <div className="border rounded-3xl p-8">

      <h3 className="text-xl font-bold">
        Shipping Information
      </h3>

      <div className="mt-6 space-y-3">

        <p>
          <strong>
            Recipient Name:
          </strong>{" "}
          {order.recipient_name}
        </p>

        <p>
          <strong>
            Phone:
          </strong>{" "}
          {order.phone}
        </p>

        <p>
          <strong>
            Address:
          </strong>{" "}
          {order.address}
        </p>

        <p>
          <strong>
            City:
          </strong>{" "}
          {order.city}
        </p>

        <p>
          <strong>
            Postal Code:
          </strong>{" "}
          {order.postal_code}
        </p>

      </div>

    </div>

    {/* Payment Information */}

    <div className="border rounded-3xl p-8">

    <h3 className="text-xl font-bold">
        Payment Information
    </h3>

    <div className="mt-6 space-y-3">

        <p>
        <strong>
            Payment Status:
        </strong>{" "}
        {order.payment_status}
        </p>

        <p>
        <strong>
            Payment Type:
        </strong>{" "}
        {order.payment_type ?? "-"}
        </p>

        <p>
        <strong>
            Transaction ID:
        </strong>{" "}
        {order.transaction_id ?? "-"}
        </p>

        <p>
        <strong>
            Paid At:
        </strong>{" "}
        {order.paid_at
            ? new Date(
                order.paid_at
            ).toLocaleString(
                "id-ID"
            )
            : "-"
        }
        </p>

    </div>

    </div>

    {/* Ordered Items */}

    <div className="border rounded-3xl p-8">

    <h3 className="text-xl font-bold">
        Ordered Items
    </h3>

    <div className="mt-6 overflow-x-auto">

        <table className="w-full">

        <thead>

            <tr className="border-b">

            <th className="text-left py-4">
                Product
            </th>

            <th className="text-left py-4">
                Price
            </th>

            <th className="text-left py-4">
                Qty
            </th>

            <th className="text-left py-4">
                Subtotal
            </th>

            </tr>

        </thead>

        <tbody>

            {order.items.map(
            (item: any) => (

                <tr
                key={item.id}
                className="border-b"
                >

                <td className="py-4">
                    {item.product_name}
                </td>

                <td className="py-4">
                    Rp{" "}
                    {Number(
                    item.product_price
                    ).toLocaleString(
                    "id-ID"
                    )}
                </td>

                <td className="py-4">
                    {item.quantity}
                </td>

                <td className="py-4 font-medium">
                    Rp{" "}
                    {Number(
                    item.subtotal
                    ).toLocaleString(
                    "id-ID"
                    )}
                </td>

                </tr>

            )
            )}

        </tbody>

        </table>

    </div>

    </div>

    {/* Total Summary */}

    <div className="border rounded-3xl p-8">

    <h3 className="text-xl font-bold">
        Payment Summary
    </h3>

    <div className="mt-6 space-y-4">

        <div className="flex justify-between">

        <span>
            Subtotal
        </span>

        <span>
            Rp{" "}
            {Number(
            order.total_price
            ).toLocaleString(
            "id-ID"
            )}
        </span>

        </div>

        <div className="flex justify-between">

        <span>
            Shipping Cost
        </span>

        <span>
            Rp{" "}
            {Number(
            order.shipping_cost
            ).toLocaleString(
            "id-ID"
            )}
        </span>

        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg">

        <span>
            Grand Total
        </span>

        <span>
            Rp{" "}
            {Number(
            order.grand_total
            ).toLocaleString(
            "id-ID"
            )}
        </span>

        </div>

    </div>

    </div>

  </div>
);
}