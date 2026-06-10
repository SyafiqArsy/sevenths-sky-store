"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { checkout } from "@/src/lib/checkout";
import { getCart } from "@/src/lib/cart";

type CartItem = {
  id: number;
  quantity: number;

  product: {
    id: number;
    name: string;
    image: string;
    price: string;
    stock: number;
  };
};

export default function CheckoutForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });

  const [pageLoading, setPageLoading] =
  useState(true);

useEffect(() => {
  async function loadCart() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const result =
    await getCart(token);

    const items =
    result.data.items || [];

    setCartItems(items);

    if (items.length === 0) {
    router.replace("/cart");
        if (pageLoading) {
            return (
                <div className="mt-20">
                Loading...
                </div>
            );
        }
    return;
    }
  }

  setPageLoading(false);

  loadCart();
}, [router]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
        item.quantity,
    0
  );

async function handleSubmit(
  e: React.FormEvent
) {
  if (loading) return;

  e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const result =
        await checkout(
          token,
          form
        );

      if (!result.success) {
        alert(result.message);
        return;
      }

    const snapToken =
      result.data.snap_token;

    window.snap.pay(
      snapToken,
      {
        onSuccess: function () {

          alert(
            "Payment successful"
          );

          router.push("/orders");
          router.refresh();
        },

        onPending: function () {

          alert(
            "Waiting for payment"
          );

          router.push("/orders");
        },

        onError: function () {

          alert(
            "Payment failed"
          );
        },

        onClose: function () {

          alert(
            "Payment popup closed"
          );
        },
      }
    );

    } catch {
      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-12">

      {/* Left */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold">
            Shipping Information
          </h2>

          <p className="mt-2 text-gray-500">
            Enter your delivery details
          </p>
        </div>

        <input
          type="text"
          placeholder="Recipient Name"
          value={form.recipient_name}
          onChange={(e) =>
            setForm({
              ...form,
              recipient_name:
                e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-4"
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone:
                e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-4"
          required
        />

        <textarea
          rows={5}
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address:
                e.target.value,
            })
          }
          className="w-full border rounded-xl px-4 py-4"
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-4"
            required
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={form.postal_code}
            onChange={(e) =>
              setForm({
                ...form,
                postal_code:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-full font-medium hover:opacity-90 transition"
        >
          {loading
            ? "Processing..."
            : "Place Order"}
        </button>
      </form>

      {/* Right */}
      <div className="border rounded-3xl p-8 h-fit sticky top-32">
        <h2 className="text-2xl font-bold">
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p className="mt-6 text-gray-500">
            Cart is empty
          </p>
        ) : (
          <>
            <div className="mt-8 space-y-5">
              {cartItems.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium">
                        {
                          item.product
                            .name
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty{" "}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <span className="font-medium">
                      Rp{" "}
                      {(
                        Number(
                          item.product
                            .price
                        ) *
                        item.quantity
                      ).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="flex justify-between">
                <span>
                  Subtotal
                </span>

                <span>
                  Rp{" "}
                  {total.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>

              <div className="flex justify-between mt-3">
                <span>
                  Shipping
                </span>

                <span>
                  Free
                </span>
              </div>

              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total</span>

                <span>
                  Rp{" "}
                  {total.toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}