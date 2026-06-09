"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getOrder } from "@/src/lib/order";

type Props = {
  orderId: number;
};

export default function OrderDetailView({
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
        await getOrder(
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
      <p className="mt-12">
        Loading order...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="mt-12">
        Order not found.
      </p>
    );
  }

  return (
    <div className="mt-12">

      <Link
        href="/orders"
        className="text-sm underline"
      >
        ← Back to Orders
      </Link>

      {/* Summary */}

      <div className="mt-8 border rounded-3xl p-8">

        <h2 className="text-2xl font-bold">
          {order.order_number}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div>
            <p className="text-gray-500">
              Payment Status
            </p>

            <p className="font-medium capitalize">
              {order.payment_status}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Order Status
            </p>

            <p className="font-medium capitalize">
              {order.order_status}
            </p>
          </div>

        </div>

      </div>

      {/* Shipping */}

      <div className="mt-8 border rounded-3xl p-8">

        <h2 className="text-xl font-bold">
          Shipping Information
        </h2>

        <div className="mt-6 space-y-3">

          <p>
            <strong>Name:</strong>{" "}
            {order.recipient_name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {order.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {order.address}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {order.city}
          </p>

          <p>
            <strong>Postal Code:</strong>{" "}
            {order.postal_code}
          </p>

        </div>

      </div>

      {/* Items */}

      <div className="mt-8 border rounded-3xl p-8">

        <h2 className="text-xl font-bold">
          Ordered Items
        </h2>

        <div className="mt-6 space-y-4">

          {order.items.map(
            (item: any) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <div>

                  <p className="font-medium">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty {item.quantity}
                  </p>

                </div>

                <p>
                  Rp{" "}
                  {Number(
                    item.subtotal
                  ).toLocaleString(
                    "id-ID"
                  )}
                </p>
              </div>
            )
          )}

        </div>

      </div>

      {/* Total */}

      <div className="mt-8 border rounded-3xl p-8">

        <div className="flex justify-between text-xl font-bold">

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
  );
}