"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

export type Segment = { text: string; em?: boolean };

type Props = {
  /** Lines of segments. Segments with `em` render in the italic serif accent. */
  lines: Segment[][];
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
};

/** Word-by-word masked rise, in the spirit of React Bits SplitText. */
export function SplitText({ lines, className, delay = 0, stagger = 0.06, onMount = false }: Props) {
  const reduce = useReducedMotion();
  let i = 0;
  const label = lines.map((l) => l.map((s) => s.text).join("")).join(" ");

  return (
    <span className={className} aria-label={label} role="text">
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.flatMap((seg, si) =>
            seg.text
              .split(/(\s+)/)
              .filter(Boolean)
              .map((word, wi) => {
                if (/^\s+$/.test(word)) return <span key={`${si}-${wi}`}> </span>;
                const d = delay + i++ * stagger;
                const anim = reduce
                  ? { initial: { opacity: 0 }, to: { opacity: 1 } }
                  : { initial: { y: "105%", rotate: 4 }, to: { y: "0%", rotate: 0 } };
                return (
                  <span key={`${si}-${wi}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                    <motion.span
                      className={seg.em ? "em-serif inline-block pr-[0.06em]" : "inline-block"}
                      initial={anim.initial}
                      {...(onMount
                        ? { animate: anim.to }
                        : { whileInView: anim.to, viewport: { once: true, margin: "-10% 0px" } })}
                      transition={{ duration: 0.9, ease: easeOutExpo, delay: d }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              }),
          )}
        </span>
      ))}
    </span>
  );
}
