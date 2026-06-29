import HeroSection from "@/src/components/home/HeroSection";
import FeaturedCollection from "@/src/components/home/FeaturedCollection";
import NewArrival from "@/src/components/home/NewArrival";
import BrandStatement from "@/src/components/home/BrandStatement";
import TypographyShowcase from "@/src/components/home/TypographyShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrival />
      <FeaturedCollection />
      <TypographyShowcase />
      <BrandStatement />
    </>
  );
}
