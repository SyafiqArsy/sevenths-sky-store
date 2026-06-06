export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-[0.2em]">
              SEVENTH SKY
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Elevating style beyond ordinary trends with
              timeless fashion and modern streetwear.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  New Arrival
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Collections
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  All Products
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping
                </a>
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

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>

            <a href="#" className="hover:text-white transition">
              TikTok
            </a>

            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}