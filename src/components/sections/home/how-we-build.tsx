import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/effects/reveal";

const points = [
  {
    title: "One owner per product",
    text: "Each product has one person responsible for it, from the first design to how it does after launch.",
  },
  {
    title: "Small, regular releases",
    text: "We ship small updates often and fix problems quickly, instead of waiting for big launches.",
  },
  {
    title: "Start from the user",
    text: "We look at what people actually struggle with first, and choose the technology after that.",
  },
  {
    title: "Shared foundations",
    text: "Sign-in, payments, analytics and our design system are built once and reused, so new products start faster.",
  },
];

export function HowWeBuild() {
  return (
    <Section aria-labelledby="build-title" className="pt-12 md:pt-20">
      <Reveal>
        <h2 id="build-title" className="text-display-lg">
          How we work
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="border-t pt-6">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-3 text-muted-foreground">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
