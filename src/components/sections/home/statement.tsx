import { Reveal } from "@/components/effects/reveal";
import { Section } from "@/components/layout/section";
import { site } from "@/content/site";

export function Statement() {
  return (
    <Section aria-label="About the studio">
      <Reveal>
        <p className="font-display max-w-[30ch] text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.15] tracking-tight">
          We are a team of {site.teamSize} in {site.city}. We design, build and run our own products, and we look after them long after launch.
        </p>
      </Reveal>
    </Section>
  );
}
