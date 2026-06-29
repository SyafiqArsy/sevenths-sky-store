import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { AuthProvider } from "@/src/context/AuthContext";
import { CartProvider } from "@/src/context/CartContext";
import { ToastProvider } from "@/src/context/ToastContext";
import SmoothScroll from "@/src/components/ui/SmoothScroll";
import CustomCursor from "@/src/components/ui/CustomCursor";
import ClickRipple from "@/src/components/ui/ClickRipple";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seventh Sky Store",
  description: "Premium Fashion Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>

        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={
            process.env
              .NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
          }
          strategy="beforeInteractive"
        />

        <SmoothScroll>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <CustomCursor />
                <ClickRipple />
                {children}
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </SmoothScroll>

      </body>
    </html>
  );
}
