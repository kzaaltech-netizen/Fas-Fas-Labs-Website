import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "Privacy policy for the FAS FAS Labs website: what we collect and how to contact us.",
  path: "/privacy",
});

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
      <h2>Analytics</h2>
      <p>
        We use Google Analytics to see how many people visit, which pages they read and where they came from. It sets cookies and collects usage
        data such as pages viewed, device and browser type, and approximate location. It does not receive what you type into the contact form. You
        can opt out with the{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">
          Google Analytics opt-out add-on
        </a>
        . Google&apos;s use of this data is covered by the{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">
          Google privacy policy
        </a>
        .
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
