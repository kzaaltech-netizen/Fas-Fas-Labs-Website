import type { Metadata } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";

export const orgId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;

/**
 * Per-page metadata. Open Graph and Twitter are set on every page because Next
 * replaces a parent's `openGraph` instead of merging it, so pages would otherwise
 * share the home page's title and URL.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  // The root opengraph-image is not inherited once a page sets its own openGraph, so link it here.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }];
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: path, title: fullTitle, description, images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}

/** Organization and WebSite entities, rendered once in the root layout. Pages point at them by `@id`. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      description: site.description,
      email: site.email,
      foundingDate: "2026-06-24",
      numberOfEmployees: { "@type": "QuantitativeValue", value: site.teamSize },
      address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Gujarat", addressCountry: "IN" },
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, areaServed: "IN", availableLanguage: "en" },
      brand: products.map((p) => ({ "@type": "Brand", name: p.name, url: p.url })),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: site.name,
      url: site.url,
      inLanguage: "en-IN",
      publisher: { "@id": orgId },
    },
  ],
};
