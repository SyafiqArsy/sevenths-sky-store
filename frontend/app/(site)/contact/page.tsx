"use client";

import FAQAccordion from "@/src/components/contact/FAQAccordion";
import PolicyModal from "@/src/components/contact/PolicyModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Layers, Mail, Phone, Camera, ArrowRight } from "lucide-react";

const faqItems = [
  {
    question: "How long is shipping?",
    answer:
      "Orders are processed within 1 business day and usually arrive within 2–5 business days.",
  },
  {
    question: "Can I return products?",
    answer:
      "Yes. Returns can be requested within 7 days after the package has been received.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order through the Order History page after logging into your account. You can also contact admin for more information about the order",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We currently support bank transfer and Midtrans payment gateway.",
  },
];

const policies = {
  shipping: {
    title: "Shipping Policy",
    content: `1. Order Processing
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
    - Delays due to weather, the carrier, or circumstances beyond the seller's control are not the store's responsibility.
    - Incorrect Address
    - Customers are responsible for ensuring the address is correct.
    - Incorrect addresses may result in delays or additional fees.

5. Lost Packages
    - The store will assist with the investigation process with the carrier.
    - Resolution follows the carrier's relevant policies.
`,
  },

  return: {
    title: "Return Policy",
    content: `1. Return Period
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
    content: `1.Information We Collect
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
    content: `Acceptance of Terms
By using this website, users are deemed to have agreed to all terms and conditions.

1. Product Information
    - We strive to display product information as accurately as possible.
    - Product colors may vary slightly depending on the user's device screen.

2. Pricing
    - Prices are subject to change at any time without notice.
    - Price changes do not affect orders that have already been confirmed.

3. Orders
    - We reserve the right to cancel orders in the event of pricing errors, stock issues, or suspected suspicious activity.
    - Intellectual Property
    - The Seventh Sky Store's logos, designs, photos, and content are protected by copyright.
    - They may not be used without written permission.

4. Limitation of Liability
    - The store is not liable for any indirect losses arising from the use of the website or products.

5. Changes to Terms
    - These terms may be updated at any time.
`,
  },
};

export default function ContactPage() {
  const [activePolicy, setActivePolicy] = useState<keyof typeof policies | null>(null);

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
            Seventh Sky Store
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-bold">
            About Our Brand
          </h1>

          <p className="mt-6 text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Seventh Sky Store is a modern fashion brand
            focused on premium essentials, timeless
            streetwear, and everyday confidence.
          </p>
        </motion.section>

        <section className="mt-32">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
                Our Story
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                Elevating Everyday Style
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-gray-500 leading-relaxed space-y-6"
            >
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
            </motion.div>
          </div>
        </section>

        <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
              Why Seventh Sky
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Designed For Everyday Confidence
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Premium Quality",
                desc: "Carefully selected materials with long-lasting comfort and durability.",
              },
              {
                icon: Clock,
                title: "Timeless Design",
                desc: "Minimalist silhouettes inspired by modern streetwear and essentials.",
              },
              {
                icon: Layers,
                title: "Everyday Wear",
                desc: "Versatile pieces designed to fit daily lifestyles without sacrificing style.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                  <feature.icon size={22} className="text-gray-600" />
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-32"
          id="contact"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Get In Touch
          </h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            <a
              href="mailto:syafiqarsy24@gmail.com"
              className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>

              <h3 className="font-semibold">Email</h3>

              <p className="mt-2 text-gray-400 text-sm">
                syafiqarsy24@gmail.com
              </p>
            </a>

            <a
              href="https://wa.me/6285643449811"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>

              <h3 className="font-semibold">WhatsApp</h3>

              <p className="mt-2 text-gray-400 text-sm">
                +62 856-4344-9811
              </p>
            </a>

            <a
              href="https://instagram.com/syaqars"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                <Camera size={18} />
              </div>

              <h3 className="font-semibold">Instagram</h3>

              <p className="mt-2 text-gray-400 text-sm">
                @syaqars
              </p>
            </a>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          id="faq"
          className="mt-32"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          id="policies"
          className="mt-32"
        >
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400">
            Policies
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Policies & Information
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {(
              [
                { key: "shipping", label: "Shipping Policy" },
                { key: "return", label: "Return Policy" },
                { key: "privacy", label: "Privacy Policy" },
                { key: "terms", label: "Terms & Conditions" },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePolicy(item.key)}
                className="border border-gray-100 rounded-2xl p-6 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group"
              >
                <span className="font-medium">{item.label}</span>

                <ArrowRight
                  size={18}
                  className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-300"
                />
              </button>
            ))}
          </div>
        </motion.section>
      </div>

      <PolicyModal
        open={!!activePolicy}
        title={activePolicy ? policies[activePolicy].title : ""}
        content={activePolicy ? policies[activePolicy].content : ""}
        onClose={() => setActivePolicy(null)}
      />
    </main>
  );
}
