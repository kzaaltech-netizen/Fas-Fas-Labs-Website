import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/effects/reveal";
import { PlateAssembly } from "@/components/brand/plate-assembly";
import { StoryTimeline } from "@/components/sections/about/story-timeline";
import { CareersBand } from "@/components/sections/home/careers-band";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `FAS FAS Labs is a ${site.teamSize}-person product studio in ${site.city}, ${site.country}, building Jyotishly, PlacementQuest and ArrowTheGame.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About FAS FAS Labs"
        intro={`A product studio in ${site.city}, ${site.country}.`}
      />

      <Section className="pt-4 md:pt-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal className="mx-auto w-[min(70vw,360px)]">
            <PlateAssembly />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display-md">Our story</h2>
            <p className="mt-6 text-lg leading-relaxed">
              FAS FAS Labs was registered in {site.city} in June {site.founded}.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Today we run three products: Jyotishly for Vedic astrology, PlacementQuest for placement test practice, and ArrowTheGame, a puzzle
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


      <CareersBand />
    </>
  );
}
