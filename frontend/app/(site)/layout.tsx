import Navbar from "@/src/components/layout/Navbar";
import ConditionalFooter from "@/src/components/layout/ConditionalFooter";
import BrandIntro from "@/src/components/intro/BrandIntro";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrandIntro />
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <ConditionalFooter />
    </>
  );
}
