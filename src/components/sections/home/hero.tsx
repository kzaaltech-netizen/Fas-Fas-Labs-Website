import { ArrowUpRight } from "lucide-react";
import { PlateAssembly } from "@/components/brand/plate-assembly";
import { SilkBackground } from "@/components/effects/silk-background";
import { SplitText } from "@/components/effects/split-text";
import { Reveal } from "@/components/effects/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProductIcon } from "@/components/product/product-icon";
import { products } from "@/content/products";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden pt-28">
      <SilkBackground />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="container-page relative flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="order-2 lg:order-1">
            <Reveal delay={0.1}>
              <p className="text-muted-foreground">
                Product studio in {site.city}, {site.country}
              </p>
            </Reveal>
            <h1 className="text-display-xl mt-5">
              <SplitText
                onMount
                delay={0.2}
                lines={[[{ text: "Fast to ship." }], [{ text: "Built to " }, { text: "stay.", em: true }]]}
              />
            </h1>
            <Reveal delay={0.6}>
              <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                We make our own apps: an astrology app, a placement test practice site and a puzzle game. All three are live and used every day.
              </p>
            </Reveal>
            <Reveal delay={0.75} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/products">See our products</ButtonLink>
              <ButtonLink href="/about" variant="ghost">
                About us
              </ButtonLink>
            </Reveal>
          </div>
          <div className="order-1 mx-auto w-[min(48vw,220px)] sm:w-[min(52vw,280px)] lg:order-2 lg:w-full lg:max-w-[520px]">
            <PlateAssembly />
          </div>
        </div>
      </div>

      <Reveal delay={1} className="container-page relative pb-8 pt-12">
        <ul className="flex flex-wrap gap-2 border-t pt-6">
          {products.map((p) => (
            <li key={p.slug}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-2 rounded-full border bg-surface/60 py-1.5 pl-1.5 pr-3.5 text-sm backdrop-blur transition-colors hover:border-border-strong hover:bg-surface"
              >
                <ProductIcon product={p} size={26} className="rounded-full" />
                {p.name}
                <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
