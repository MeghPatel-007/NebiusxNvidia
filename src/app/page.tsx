import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo";
import BackgroundRippleEffectDemo from "@/components/background-ripple-effect-demo";
import FeaturesSectionDemo from "@/components/features-section-demo-3";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
   <>
    <BackgroundRippleEffectDemo />
    <AppleCardsCarouselDemo />
    <LayoutGrid />
    <FeaturesSectionDemo />
   </>
  );
}
