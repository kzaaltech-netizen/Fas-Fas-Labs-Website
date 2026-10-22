import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/effects/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description: "Careers at FAS FAS Labs, a small product team in Ahmedabad. See open roles, what working here is like and how hiring works.",
  path: "/careers",
});

const perks = [
  { title: "Work on live products", text: "What you build goes out to real users, usually within your first few weeks." },
  { title: "Three different products", text: "Astrology, test preparation and games, so there is always something new to learn." },
  { title: "Small team", text: "Seven people. You will know everyone and work directly with them." },
];

const steps = [
  { title: "Intro call", text: "A short conversation about you and the work you want to do." },
  { title: "Task or portfolio review", text: "A small task, or a walk-through of something you have built." },
  { title: "Meet the team", text: "Talk with the people you would work with, then we make a decision." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader title="Careers" intro="We are a small team in Ahmedabad building our own consumer products." />

      <Section className="pt-4 md:pt-8" aria-labelledby="roles-title">
        <h2 id="roles-title" className="text-display-md">
          Open roles
        </h2>
        <Reveal>
          <div className="mt-8 flex flex-col items-start gap-6 rounded-[var(--radius-lg)] border p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="text-xl font-semibold">There are no open roles at the moment.</p>
              <p className="mt-2 max-w-[52ch] text-muted-foreground">
                You can still send us your CV or portfolio. We will get in touch when a role opens up that fits.
              </p>
            </div>
            <ButtonLink href={`mailto:${site.email}?subject=Working%20at%20FAS%20FAS%20Labs`}>Email us</ButtonLink>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0 md:pt-0" aria-labelledby="life-title">
        <h2 id="life-title" className="text-display-md">
          Working here
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="border-t pt-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0" aria-labelledby="process-title">
        <h2 id="process-title" className="text-display-md">
          How hiring works
        </h2>
        <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} className="border-t pt-6">
              <p className="text-sm text-muted-foreground">Step {i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
