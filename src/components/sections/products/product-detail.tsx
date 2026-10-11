import Image from "next/image";
import type { Product } from "@/content/products";
import { Reveal } from "@/components/effects/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProductIcon } from "@/components/product/product-icon";
import { ProductVisual } from "@/components/product/product-visual";
import { BrowserFrame, PhoneFrame } from "@/components/product/device-frame";
import { panelSurface, productAccentText, productVars } from "@/components/product/product-panel";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const browserShot = product.gallery.find((g) => g.frame === "browser");
  const phoneShot = product.gallery.find((g) => g.frame === "phone");

  return (
    <section id={product.slug} aria-labelledby={`${product.slug}-title`} className="scroll-mt-40 py-10 md:py-16" style={productVars(product)}>
      <div className={cn("relative overflow-hidden rounded-[var(--radius-xl)] p-5 sm:p-6 md:p-12 lg:p-16", panelSurface)}>
        {/* Header row */}
        <div className="relative grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
          <Reveal>
            <p className={cn("text-sm font-medium", productAccentText)}>{product.category}</p>
            <div className="mt-6 flex items-center gap-3 sm:gap-4">
              <ProductIcon product={product} size={64} className="size-12 sm:size-16" />
              <h2 id={`${product.slug}-title`} className="text-product-title min-w-0">
                {product.name}
              </h2>
            </div>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted-foreground md:text-xl">{product.oneLiner}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.platforms.map((pl) => (
                <span key={pl} className="rounded-full border border-black/10 px-3 py-1 text-xs dark:border-white/15">
                  {pl}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href={product.url} external variant="product">
                Visit {product.name}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex w-full justify-center">
            {browserShot && phoneShot ? (
              <>
              <div className="md:hidden">
                <ProductVisual product={product} />
              </div>
              <div className="relative hidden w-full pb-10 pr-10 md:block">
                <BrowserFrame url={product.url} className="w-full">
                  <Image src={browserShot.src} alt={browserShot.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-cover object-top" />
                </BrowserFrame>
                <PhoneFrame className="absolute -bottom-2 right-0 w-[30%] min-w-[110px]">
                  <div className="absolute inset-0" style={{ background: product.theme.panelLight }}>
                    <div className="absolute inset-x-0 bottom-0 top-[8%]">
                      <Image src={phoneShot.src} alt={phoneShot.alt} fill sizes="200px" className="object-cover object-top" />
                    </div>
                  </div>
                </PhoneFrame>
              </div>
              </>
            ) : (
              <ProductVisual product={product} />
            )}
          </Reveal>
        </div>

        {/* Stats */}
        {product.stats.length > 0 && (
          <dl className="relative mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-black/10 pt-8 dark:border-white/10">
            {product.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display block text-4xl font-bold tracking-tight">{s.value}</span>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Features */}
        <ul
          className={cn(
            "relative mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-black/10 bg-black/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10",
            product.features.length % 3 === 0 && "lg:grid-cols-3",
          )}
        >
          {product.features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.05} className="bg-[var(--panel-light)] p-6 dark:bg-[var(--panel-dark)] md:p-8">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Why */}
        <Reveal className="relative mt-14 grid gap-4 md:grid-cols-[200px_1fr]">
          <p className="font-semibold">Why we built it</p>
          <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{product.why}</p>
        </Reveal>
      </div>
    </section>
  );
}
