import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };

// Placeholder text. Have it reviewed before launch; each product keeps its own terms.
export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="October 2026">
      <p>
        This website is run by {site.name}, a proprietorship registered in {site.city}, Gujarat, India (GSTIN {site.gstin}). By using it you agree
        to these terms.
      </p>
      <h2>Content</h2>
      <p>The text, images and marks on this site belong to {site.name}. Please do not copy them without permission.</p>
      <h2>Our products</h2>
      <p>Jyotishly, PlacementQuest and ArrowTheGame each have their own terms, published on their own sites.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
