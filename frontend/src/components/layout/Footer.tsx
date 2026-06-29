import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-[0.2em]">
              SEVENTH SKY
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed text-sm">
              Elevating style beyond ordinary trends with
              timeless fashion and modern streetwear.
            </p>

            {/* Decorative accent */}
            <div className="mt-6 w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-5 uppercase tracking-wider text-sm">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/#new-arrival"
                  className="hover:text-white transition-colors"
                >
                  New Arrival
                </Link>
              </li>

              <li>
                <Link
                  href="/#collections"
                  className="hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-5 uppercase tracking-wider text-sm">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-5 uppercase tracking-wider text-sm">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/contact#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/contact#policies"
                  className="hover:text-white transition-colors"
                >
                  Policies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Seventh Sky Store.
            All rights reserved.
          </p>

          <div className="flex gap-8 text-sm text-gray-400">
            <a
              href="https://instagram.com/syaqars"
              className="relative hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
            >
              Instagram
            </a>

            <a
              href="https://tiktok.com/@langiterakhir"
              className="relative hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
            >
              TikTok
            </a>

            <a
              href="https://linkedin.com/in/syafiq-arsy"
              className="relative hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
