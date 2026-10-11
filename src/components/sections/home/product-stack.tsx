"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { products, type Product } from "@/content/products";
import { ProductPanel } from "@/components/product/product-panel";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Sticky stacking cards: each product pins and the next one slides over it,
 * while the covered card shrinks and dims. Plain stacked list on small screens.
 */
export function ProductStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isLg = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const reduce = useReducedMotion();
  const animated = isLg && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative space-y-6 [@media(min-width:1024px)_and_(min-height:700px)]:space-y-0">
      {products.map((p, i) => (
        <StackItem key={p.slug} product={p} index={i} progress={scrollYProgress} animated={animated} />
      ))}
    </div>
  );
}

function StackItem({
  product,
  index,
  progress,
  animated,
}: {
  product: Product;
  index: number;
  progress: MotionValue<number>;
  animated: boolean;
}) {
  const n = products.length;
  const targetScale = 1 - (n - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / n, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / n, Math.min(1, (index + 1) / n)], [0, index === n - 1 ? 0 : 0.55]);

  return (
    <div className="[@media(min-width:1024px)_and_(min-height:700px)]:sticky [@media(min-width:1024px)_and_(min-height:700px)]:top-0 [@media(min-width:1024px)_and_(min-height:700px)]:flex [@media(min-width:1024px)_and_(min-height:700px)]:h-svh [@media(min-width:1024px)_and_(min-height:700px)]:items-center">
      <motion.div
        className="relative w-full origin-top"
        style={animated ? { scale, top: index * 28 } : undefined}
      >
        <ProductPanel product={product} />
        {animated && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] bg-background"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </div>
  );
}
