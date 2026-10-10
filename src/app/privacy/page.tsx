import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

// Placeholder text. Have it reviewed before launch; each product keeps its own privacy policy.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="October 2026">
      <p>
        This page covers the {site.name} studio website ({site.url.replace("https://", "")}). Each of our products has its own privacy policy on its
        own site.
      </p>
      <h2>What we collect</h2>
      <p>
        This website does not ask you to create an account. If you write to us, we receive the name, email address and message you choose to send,
        and use them only to reply.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
