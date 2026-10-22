import { Hero } from "@/components/sections/home/hero";
import { ProductsShowcase } from "@/components/sections/home/products-showcase";
import { Numbers } from "@/components/sections/home/numbers";
import { Faq } from "@/components/sections/home/faq";
import { CareersBand } from "@/components/sections/home/careers-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsShowcase />
      <Numbers />
      <Faq />
      <CareersBand />
    </>
  );
}
