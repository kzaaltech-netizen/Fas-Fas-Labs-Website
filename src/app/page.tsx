import { Hero } from "@/components/sections/home/hero";
import { ProductsShowcase } from "@/components/sections/home/products-showcase";
import { Numbers } from "@/components/sections/home/numbers";
import { CareersBand } from "@/components/sections/home/careers-band";
import { site } from "@/content/site";
import { products } from "@/content/products";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  foundingDate: String(site.founded),
  numberOfEmployees: site.teamSize,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Gujarat", addressCountry: "IN" },
  owns: products.map((p) => ({ "@type": "Product", name: p.name, url: p.url })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero />
      <ProductsShowcase />
      <Numbers />
      <CareersBand />
    </>
  );
}
