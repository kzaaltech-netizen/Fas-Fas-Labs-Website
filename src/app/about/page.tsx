import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/effects/reveal";
import { PlateAssembly } from "@/components/brand/plate-assembly";
import { StoryTimeline } from "@/components/sections/about/story-timeline";
import { CareersBand } from "@/components/sections/home/careers-band";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `FAS FAS Labs is a ${site.teamSize}-person product studio in ${site.city}, ${site.country}, building Jyotishly, PlacementQuest and ArrowTheGame.`,
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "One owner per product", text: "Each product has one person responsible for it, from the first design to how it does after launch." },
  { title: "Small, regular releases", text: "We ship small updates often and fix problems quickly, instead of waiting for big launches." },
  { title: "Start from the user", text: "We look at what people actually struggle with first, and choose the technology after that." },
  { title: "Shared foundations", text: "Sign-in, payments, analytics and our design system are built once and reused, so new products start faster." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About FAS FAS Labs"
        intro={`A product studio in ${site.city}, ${site.country}. We are a team of ${site.teamSize} that designs, builds and runs its own apps.`}
      />

      <Section className="pt-4 md:pt-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal className="mx-auto w-[min(70vw,360px)]">
            <PlateAssembly />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display-md">Our story</h2>
            <p className="mt-6 text-lg leading-relaxed">
              FAS FAS Labs was registered in {site.city} in June {site.founded}. We started it to build and run consumer
              products of our own.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Today we run three of them: Jyotishly for Vedic astrology, PlacementQuest for placement test practice, and ArrowTheGame, a puzzle
              game with live 1v1 matches.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section aria-labelledby="timeline-title" className="pt-0 md:pt-0">
        <h2 id="timeline-title" className="text-display-md">
          Timeline
        </h2>
        <StoryTimeline />
      </Section>

      <Section aria-labelledby="principles-title" className="pt-0 md:pt-0">
        <h2 id="principles-title" className="text-display-md">
          How we work
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="border-t pt-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CareersBand />
    </>
  );
}
