"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero brand moment: the two copper plates fly in from opposite corners, lock together,
 * then follow the mouse with a gentle parallax. About 1 s, never blocks scrolling.
 */
export function PlateAssembly({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  const upperX = useTransform(sx, (v) => v * 14);
  const upperY = useTransform(sy, (v) => v * 14);
  const lowerX = useTransform(sx, (v) => v * -8);
  const lowerY = useTransform(sy, (v) => v * -8);
  const rotY = useTransform(sx, (v) => v * 8);
  const rotX = useTransform(sy, (v) => v * -8);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      className={cn("relative aspect-square [perspective:900px]", className)}
      style={{ rotateX: rotX, rotateY: rotY }}
      aria-hidden
    >
      <div className="absolute inset-[12%] rounded-full bg-copper-500/25 blur-[70px] dark:bg-copper-600/25" />
      <motion.div className="absolute inset-0" style={{ x: upperX, y: upperY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: "38%", y: "-42%", rotate: 14 }}
          animate={{ opacity: 1, x: "-2%", y: "-4%", rotate: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
        >
          <Image
            src="/brand/plate-upper.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 520px, 70vw"
            className="object-contain drop-shadow-[0_30px_40px_rgba(58,33,18,0.35)]"
          />
        </motion.div>
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: lowerX, y: lowerY }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: "-40%", y: "40%", rotate: -12 }}
          animate={{ opacity: 1, x: "2%", y: "4%", rotate: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
        >
          <Image
            src="/brand/plate-lower.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 520px, 70vw"
            className="object-contain drop-shadow-[0_30px_40px_rgba(58,33,18,0.35)]"
          />
        </motion.div>
      </motion.div>
      {/* lock "click" flash */}
      {!reduce && (
        <motion.div
          className="absolute left-[30%] top-[44%] size-24 rounded-full bg-copper-200/60 blur-2xl"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.4, 1.8] }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
