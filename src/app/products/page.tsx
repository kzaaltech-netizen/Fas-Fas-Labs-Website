import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ProductSubnav } from "@/components/sections/products/product-subnav";
import { ProductDetail } from "@/components/sections/products/product-detail";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Jyotishly, PlacementQuest and ArrowTheGame: three live products built by FAS FAS Labs.",
  alternates: { canonical: "/products" },
};

const jsonLd = products.map((p) => ({
  "@context": "https://schema.org",
  "@type": p.slug === "arrowthegame" ? "VideoGame" : "SoftwareApplication",
  name: p.name,
  url: p.url,
  description: p.oneLiner,
  applicationCategory: p.slug === "arrowthegame" ? "GameApplication" : p.slug === "placementquest" ? "EducationalApplication" : "LifestyleApplication",
  operatingSystem: "Web",
  author: { "@type": "Organization", name: "FAS FAS Labs" },
}));

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        title="Our products"
        intro="An astrology app, a placement test practice site and a puzzle game. All three are designed, built and run by our team."
      />
      <ProductSubnav />
      <div className="container-page">
        {products.map((p) => (
          <ProductDetail key={p.slug} product={p} />
        ))}
        <div className="flex flex-col items-start gap-4 border-t py-16 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">Questions about our products?</p>
          <Link href="/contact" className="text-lg text-accent-text underline-offset-4 hover:underline">
            Contact us →
          </Link>
        </div>
      </div>
    </>
  );
}
