import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/effects/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faq } from "@/content/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export function Faq() {
  return (
    <Section aria-labelledby="faq-title">
      <JsonLd data={faqJsonLd} />
      <h2 id="faq-title" className="text-display-md">
        Questions
      </h2>
      <dl className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
        {faq.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05} className="border-t pt-6">
            <dt className="text-lg font-semibold">{f.q}</dt>
            <dd className="mt-3 text-muted-foreground">{f.a}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
