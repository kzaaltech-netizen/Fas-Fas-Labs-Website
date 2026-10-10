import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/effects/reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Partnerships, press, careers or product feedback. Write to FAS FAS Labs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        intro="For partnerships, press, jobs or feedback on our products, send us a message."
      />
      <section className="container-page grid gap-12 pb-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-10">
          <div>
            <p className="text-sm font-semibold">Email</p>
            <a href={`mailto:${site.email}`} className="font-display mt-3 block break-all text-2xl font-bold tracking-tight text-accent-text hover:underline md:text-3xl">
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold">Studio</p>
            <p className="mt-3 text-lg">
              {site.city}, Gujarat, {site.country}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Product support</p>
            <p className="mt-3 text-muted-foreground">For help with an account or a purchase, please mention the product name in your message.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
