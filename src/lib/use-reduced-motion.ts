"use client";

import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Hydration-safe "prefers reduced motion". Returns false during server render and
 * hydration, then the real value, so server and client HTML always match.
 * (motion's useReducedMotion reads the media query on the first client render,
 * which caused React hydration error #418 for reduced-motion users.)
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
