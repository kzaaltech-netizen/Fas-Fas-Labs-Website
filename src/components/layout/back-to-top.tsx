"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm text-foreground transition-colors hover:bg-surface-2"
    >
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
      Back to top
    </button>
  );
}
