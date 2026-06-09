"use client";

import FAQAccordion from "@/src/components/contact/FAQAccordion";
import PolicyModal from "@/src/components/contact/PolicyModal";
import { useState } from "react";

const faqItems = [
  {
    question:
      "How long is shipping?",
    answer:
      "Orders are processed within 1 business day and usually arrive within 2–5 business days.",
  },

  {
    question:
      "Can I return products?",
    answer:
      "Yes. Returns can be requested within 7 days after the package has been received.",
  },

  {
    question:
      "How do I track my order?",
    answer:
      "You can track your order through the Order History page after logging into your account. You can also contact admin for more information about the order",
  },

  {
    question:
      "What payment methods are accepted?",
    answer:
      "We currently support bank transfer and Midtrans payment gateway.",
  },
];

const policies = {
  shipping: {
    title: "Shipping Policy",
    content: `
1. Order Processing
    - Orders are processed after payment is confirmed.
    - Processing typically takes 1–2 business days.
    - Orders placed on holidays will be processed on the next business day.

2. Shipping Time
    - Domestic shipping typically takes 2–7 business days.
    - Estimates may vary depending on location.

3. Shipping Cost
    - Shipping costs are calculated at checkout.
    - Costs may vary depending on weight and destination.

4. Delivery Delays
    - Delays due to weather, the carrier, or circumstances beyond the seller’s control are not the store’s responsibility.
    - Incorrect Address
    - Customers are responsible for ensuring the address is correct.
    - Incorrect addresses may result in delays or additional fees.

5. Lost Packages
    - The store will assist with the investigation process with the carrier.
    - Resolution follows the carrier’s relevant policies.
`,
  },

  return: {
    title: "Return Policy",
    content: `
1. Return Period
    - Returns can be requested within 7 days of receiving the item.

2. Items can be returned if:
    - The wrong product was shipped.
    - The product was damaged upon receipt.
    - The product has a manufacturing defect.
    - Non-Eligible Returns

3. Returns are not accepted if:
    - The wrong size was selected.
    - Change of personal preference.
    - The product has been used.
    - Original tags or packaging are missing.

4. Return Process
    - Contact customer support.
    - Include a photo or video of the product.
    - Our team will verify the return.

5. Refunds
    - Refunds will be processed after the product is received and inspected.
    - Funds will be refunded via the available payment method.
`,
  },

  privacy: {
    title: "Privacy Policy",
    content: `
1.Information We Collect
Data that may be collected:
    - Name
    - Email
    - Phone number
    - Shipping address
    - Order history

2. How We Use Information
Data is used to:
    - Process orders
    - Send order notifications
    - Provide customer service
    - Improve the user experience

3. Data Protection
    - Customer data is stored securely.
    - Access is restricted to operational needs only.
    - Third-Party Services

4. Third-Party Services
Certain data may be shared with:
    - Payment providers
    - Shipping providers
Solely for the purpose of completing transactions.

5. User Rights
    - Customers may:
    - Request changes to their data
    - Request account deletion
    - Contact the support team regarding privacy
`,
  },

  terms: {
    title: "Terms & Conditions",
    content: `
Acceptance of Terms
By using this website, users are deemed to have agreed to all terms and conditions.

1. Product Information
    - We strive to display product information as accurately as possible.
    - Product colors may vary slightly depending on the user’s device screen.

2. Pricing
    - Prices are subject to change at any time without notice.
    - Price changes do not affect orders that have already been confirmed.

3. Orders
    - We reserve the right to cancel orders in the event of pricing errors, stock issues, or suspected suspicious activity.
    - Intellectual Property
    - The Seventh Sky Store’s logos, designs, photos, and content are protected by copyright.
    - They may not be used without written permission.

4. Limitation of Liability
    - The store is not liable for any indirect losses arising from the use of the website or products.

5. Changes to Terms
    - These terms may be updated at any time.
`,
  },
};

export default function ContactPage() {
    const [activePolicy, setActivePolicy] =
    useState<
        keyof typeof policies | null
    >(null);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        <section className="text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Seventh Sky Store
          </p>

          <h1 className="mt-4 text-6xl font-bold">
            About Our Brand
          </h1>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Seventh Sky Store is a modern fashion brand
            focused on premium essentials, timeless
            streetwear, and everyday confidence.
          </p>
        </section>

        <section className="mt-32">
            <div className="grid lg:grid-cols-2 gap-16">

                <div>
                <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
                    Our Story
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                    Elevating Everyday Style
                </h2>
                </div>

                <div className="text-gray-600 leading-relaxed space-y-6">
                <p>
                    Seventh Sky Store was created with a simple
                    vision: to provide fashion pieces that balance
                    comfort, quality, and timeless aesthetics.
                </p>

                <p>
                    Inspired by modern streetwear and premium
                    essentials, our collections are designed for
                    individuals who value confidence and self
                    expression.
                </p>

                <p>
                    Every product is selected to become part of a
                    versatile wardrobe that can be worn beyond
                    seasonal trends.
                </p>
                </div>

            </div>
        </section>

        <section className="mt-32">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500 text-center">
                Why Seventh Sky
            </p>

            <h2 className="mt-4 text-4xl font-bold text-center">
                Designed For Everyday Confidence
            </h2>

            <div className="mt-16 grid md:grid-cols-3 gap-8">

                <div className="border rounded-3xl p-8">
                    <h3 className="text-xl font-semibold">
                        Premium Quality
                    </h3>

                    <p className="mt-4 text-gray-600">
                        Carefully selected materials with
                        long-lasting comfort and durability.
                    </p>
                </div>

                <div className="border rounded-3xl p-8">
                    <h3 className="text-xl font-semibold">
                        Timeless Design
                    </h3>

                    <p className="mt-4 text-gray-600">
                        Minimalist silhouettes inspired by
                        modern streetwear and essentials.
                    </p>
                </div>

                <div className="border rounded-3xl p-8">
                    <h3 className="text-xl font-semibold">
                        Everyday Wear
                    </h3>

                    <p className="mt-4 text-gray-600">
                        Versatile pieces designed to fit
                        daily lifestyles without sacrificing style.
                    </p>
                </div>

            </div>

        </section>

        <section className="mt-32" id="contact">

            <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
                Contact
            </p>

            <h2 className="mt-4 text-4xl font-bold">
                Get In Touch
            </h2>

            <div className="mt-12 grid lg:grid-cols-3 gap-8">

            {/* Email */}
            <a
                href="mailto:syafiqarsy24@gmail.com"
                className="
                border
                rounded-3xl
                p-8
                hover:shadow-lg
                hover:-translate-y-1
                transition
                block
                "
            >
                <h3 className="font-semibold">
                Email
                </h3>

                <p className="mt-3 text-gray-500">
                syafiqarsy24@gmail.com
                </p>
            </a>

            {/* WhatsApp */}
            <a
                href="https://wa.me/6285643449811"
                target="_blank"
                rel="noopener noreferrer"
                className="
                border
                rounded-3xl
                p-8
                hover:shadow-lg
                hover:-translate-y-1
                transition
                block
                "
            >
                <h3 className="font-semibold">
                WhatsApp
                </h3>

                <p className="mt-3 text-gray-500">
                +62 856-4344-9811
                </p>
            </a>

            {/* Instagram */}
            <a
                href="https://instagram.com/syaqars"
                target="_blank"
                rel="noopener noreferrer"
                className="
                border
                rounded-3xl
                p-8
                hover:shadow-lg
                hover:-translate-y-1
                transition
                block
                "
            >
                <h3 className="font-semibold">
                Instagram
                </h3>

                <p className="mt-3 text-gray-500">
                @syaqars
                </p>
            </a>

            </div>

        </section>

        <section id="faq" className="mt-32">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            FAQ
        </p>

        <h2 className="mt-4 text-4xl font-bold">
            Frequently Asked Questions
        </h2>

        <div className="mt-12">
            <FAQAccordion
            items={faqItems}
            />
        </div>

        </section>

        <section id="policies" className="mt-32">

        <p className="uppercase tracking-[0.3em] text-sm text-gray-500">
            Policies
        </p>

        <h2 className="mt-4 text-4xl font-bold">
            Policies & Information
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6">

            <button
            onClick={() =>
                setActivePolicy(
                "shipping"
                )
            }
            className="
                border
                rounded-3xl
                p-8
                text-left
                hover:shadow-lg
                transition
            "
            >
            Shipping Policy
            </button>

            <button
            onClick={() =>
                setActivePolicy(
                "return"
                )
            }
            className="
                border
                rounded-3xl
                p-8
                text-left
                hover:shadow-lg
                transition
            "
            >
            Return Policy
            </button>

            <button
            onClick={() =>
                setActivePolicy(
                "privacy"
                )
            }
            className="
                border
                rounded-3xl
                p-8
                text-left
                hover:shadow-lg
                transition
            "
            >
            Privacy Policy
            </button>

            <button
            onClick={() =>
                setActivePolicy(
                "terms"
                )
            }
            className="
                border
                rounded-3xl
                p-8
                text-left
                hover:shadow-lg
                transition
            "
            >
            Terms & Conditions
            </button>

        </div>

        </section>

      </div>

      <PolicyModal open={!!activePolicy} title={
            activePolicy
            ? policies[
                activePolicy
                ].title
            : ""
        }
        content={
            activePolicy
            ? policies[
                activePolicy
                ].content
            : ""
        }
        onClose={() =>
            setActivePolicy(null)
        }/>

    </main>
  );
}