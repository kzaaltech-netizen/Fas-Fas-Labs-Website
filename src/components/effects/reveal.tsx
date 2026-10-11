"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "p";
};

/** Fade + rise + unblur once when scrolled into view. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={
        reduce
          ? { opacity: { duration: 0.3 }, y: { duration: 0 }, filter: { duration: 0 } }
          : { duration: 0.7, ease: easeOutExpo, delay }
      }
    >
      {children}
    </Tag>
  );
}
