import Link from "next/link";
import type { Product } from "@/content/products";
import { ButtonLink } from "@/components/ui/button";
import { ProductIcon } from "@/components/product/product-icon";
import { ProductVisual } from "@/components/product/product-visual";
import { cn } from "@/lib/utils";

/** CSS variables that scope a product's colors to its own panel. */
export function productVars(p: Product): React.CSSProperties {
  return {
    "--product-accent": p.theme.accent,
    "--product-accent-text": p.theme.accentText,
    "--panel-light": p.theme.panelLight,
    "--panel-dark": p.theme.panelDark,
  } as React.CSSProperties;
}

export const panelSurface =
  "bg-[var(--panel-light)] dark:bg-[var(--panel-dark)] border border-black/5 dark:border-white/[0.06]";
export const productAccentText = "text-[var(--product-accent-text)] dark:text-[var(--product-accent)]";

export function ProductPanel({ product, className }: { product: Product; className?: string }) {
  return (
    <article
      style={productVars(product)}
      className={cn(
        "relative grid overflow-hidden rounded-[var(--radius-xl)] p-6 md:p-10 lg:min-h-[min(600px,82svh)] lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-14",
        panelSurface,
        className,
      )}
      aria-labelledby={`panel-${product.slug}`}
    >
      <div className="relative flex flex-col">
        <p className={cn("text-sm font-medium", productAccentText)}>{product.category}</p>
        <div className="mt-6 flex items-center gap-4">
          <ProductIcon product={product} size={56} />
          <h3 id={`panel-${product.slug}`} className="text-display-md">
            {product.name}
          </h3>
        </div>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted-foreground">{product.oneLiner}</p>
        <ul className="mt-8 max-w-[44ch] divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
          {product.bullets.map((b) => (
            <li key={b} className="py-3">
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-10">
          <ButtonLink href={product.url} external variant="product">
            Visit {product.name}
          </ButtonLink>
          <Link
            href={`/products#${product.slug}`}
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            More details
          </Link>
        </div>
      </div>
      <div className="relative mt-12 flex items-center justify-center lg:mt-0">
        <ProductVisual product={product} />
      </div>
    </article>
  );
}
