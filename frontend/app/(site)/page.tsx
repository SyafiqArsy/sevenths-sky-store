import HeroCarousel from "@/src/components/home/HeroCarousel";
import FeaturedCollection from "@/src/components/home/FeaturedCollection";
import NewArrival from "@/src/components/home/NewArrival";
import BrandStatement from "@/src/components/home/BrandStatement";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <NewArrival />
      <FeaturedCollection />
      <BrandStatement />
    </>
  );
}