"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { checkout } from "@/src/lib/checkout";
import { getCart } from "@/src/lib/cart";
import { useToast } from "@/src/context/ToastContext";
import { startCursorLoading, stopCursorLoading } from "@/src/lib/cursorLoading";

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
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
  });

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const result = await getCart(token);

      const items = result.data.items || [];

      setCartItems(items);

      if (items.length === 0) {
        router.replace("/cart");
        return;
      }

      setPageLoading(false);
    }

    loadCart();
  }, [router]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  async function handleSubmit(e: React.FormEvent) {
    if (loading) return;

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Please login first", "error");
      return;
    }

    try {
      setLoading(true);
      startCursorLoading();

      const result = await checkout(token, form);

      if (!result.success) {
        showToast(result.message || "Checkout failed", "error");
        return;
      }

      const snapToken = result.data.snap_token;

      window.snap.pay(snapToken, {
        onSuccess: function () {
          showToast("Payment successful!", "success");
          router.push("/orders");
          router.refresh();
        },

        onPending: function () {
          showToast("Waiting for payment confirmation", "info");
          router.push("/orders");
        },

        onError: function () {
          showToast("Payment failed", "error");
        },

        onClose: function () {
          showToast("Payment cancelled", "info");
        },
      });
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
      stopCursorLoading();
    }
  }

  if (pageLoading) {
    return (
      <div className="mt-20 flex items-center gap-3 text-gray-400 justify-center">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-12">
      {/* Left */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">
            Shipping Information
          </h2>

          <p className="mt-2 text-gray-400 text-sm">
            Enter your delivery details
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-600">
            Recipient Name
          </label>
          <input
            type="text"
            placeholder="Full name"
            value={form.recipient_name}
            onChange={(e) =>
              setForm({ ...form, recipient_name: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. 08123456789"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-600">
            Address
          </label>
          <textarea
            rows={4}
            placeholder="Street address, district, province"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors resize-none"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              placeholder="e.g. 12345"
              value={form.postal_code}
              onChange={(e) =>
                setForm({ ...form, postal_code: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-300 focus:border-black transition-colors"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-black text-white py-4 rounded-full font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </motion.button>
      </form>

      {/* Right */}
      <div className="border border-gray-100 rounded-2xl p-8 h-fit sticky top-28 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>

        {cartItems.length === 0 ? (
          <p className="mt-6 text-gray-400 text-sm">
            Cart is empty
          </p>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {item.product.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <span className="font-medium text-sm">
                    Rp{" "}
                    {(
                      Number(item.product.price) * item.quantity
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
