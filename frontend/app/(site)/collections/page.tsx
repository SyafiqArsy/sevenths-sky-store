"use client";

import { useEffect, useState } from "react";
import FlyingPosters from "@/src/components/collections/FlyingPosters";
import Galaxy from "@/src/components/collections/Galaxy";
import { getProducts } from "@/src/lib/api";

export default function CollectionsPage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const products = await getProducts();
        const urls = products.map((p: { image: string }) => p.image).filter(Boolean);
        setImages(urls);
      } catch (error) {
        console.error("Failed to fetch collection images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Layer 1: Galaxy Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Galaxy
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          starSpeed={0.5}
          speed={1}
          mouseInteraction={true}
          mouseRepulsion={true}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          transparent={false}
          className="w-full h-full"
        />
      </div>

      {/* Layer 2: FlyingPosters */}
      <div className="absolute inset-0 z-10">
        {images.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <FlyingPosters
            items={images}
            planeWidth={320}
            planeHeight={320}
            distortion={3}
            scrollEase={0.01}
            cameraFov={45}
            cameraZ={20}
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
