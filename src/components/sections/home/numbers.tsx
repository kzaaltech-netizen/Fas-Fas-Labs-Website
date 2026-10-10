import { Reveal } from "@/components/effects/reveal";
import { Section } from "@/components/layout/section";
import { site } from "@/content/site";

const stats = [
  { value: String(site.teamSize), label: "people on the team" },
  { value: "3", label: "live products" },
  { value: "3,059", label: "practice questions in PlacementQuest" },
  { value: "96", label: "levels in ArrowTheGame" },
];

export function Numbers() {
  return (
    <Section aria-label="Studio in numbers" className="py-12 md:py-20">
      <Reveal>
        <dl className="grid grid-cols-2 border-t lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-b py-8 pr-6 odd:border-r lg:border-b-0 lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0 max-lg:[&:nth-child(even)]:pl-6"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display block text-5xl font-bold tracking-tight md:text-6xl">{s.value}</span>
                <span className="mt-2 block max-w-[22ch] text-sm text-muted-foreground">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
