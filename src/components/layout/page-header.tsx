import { Reveal } from "@/components/effects/reveal";

/** Shared header for inner pages. */
export function PageHeader({ title, intro }: { title: string; intro?: React.ReactNode }) {
  return (
    <header className="relative pb-10 pt-36 md:pb-16 md:pt-44">
      <div className="container-page relative">
        <Reveal>
          <h1 className="text-display-xl max-w-[16ch]">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <div className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</div>
          </Reveal>
        )}
      </div>
    </header>
  );
}
