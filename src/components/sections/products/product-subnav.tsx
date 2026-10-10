"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { products } from "@/content/products";
import { ProductIcon } from "@/components/product/product-icon";
import { cn } from "@/lib/utils";

/** Sticky pill bar; the active pill follows the section in view. */
export function ProductSubnav() {
  const [active, setActive] = useState<string>(products[0].slug);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    products.forEach((p) => {
      const el = document.getElementById(p.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Products on this page" className="sticky top-24 z-30 flex justify-center">
      <ul className="flex gap-1 overflow-x-auto rounded-full border bg-surface/80 p-1 shadow-[var(--shadow-float)] backdrop-blur-xl">
        {products.map((p) => (
          <li key={p.slug} className="relative">
            {active === p.slug && (
              <motion.span layoutId="subnav-pill" className="absolute inset-0 rounded-full bg-surface-2" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <a
              href={`#${p.slug}`}
              aria-current={active === p.slug ? "true" : undefined}
              className={cn(
                "relative flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-sm transition-colors",
                active === p.slug ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ProductIcon product={p} size={24} className="rounded-full" />
              {p.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
