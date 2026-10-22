import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { ProductSubnav } from "@/components/sections/products/product-subnav";
import { ProductDetail } from "@/components/sections/products/product-detail";
import { JsonLd } from "@/components/seo/json-ld";
import { products } from "@/content/products";
import { site } from "@/content/site";
import { orgId, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Jyotishly (Vedic astrology), PlacementQuest (placement test practice) and ArrowTheGame (puzzle game): three live products built by FAS FAS Labs.",
  path: "/products",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": products.map((p) => ({
    "@type": p.slug === "arrowthegame" ? ["VideoGame", "SoftwareApplication"] : "SoftwareApplication",
    "@id": `${site.url}/products#${p.slug}`,
    name: p.name,
    url: p.url,
    description: p.oneLiner,
    image: `${site.url}${p.screenshot?.src ?? p.icon}`,
    applicationCategory: p.slug === "arrowthegame" ? "GameApplication" : p.slug === "placementquest" ? "EducationalApplication" : "LifestyleApplication",
    operatingSystem: p.platforms.join(", "),
    featureList: p.bullets,
    publisher: { "@id": orgId },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
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
