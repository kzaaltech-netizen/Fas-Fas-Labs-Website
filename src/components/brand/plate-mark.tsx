import { useId } from "react";
import { cn } from "@/lib/utils";

/** Vector version of the two copper logo plates. */
export function PlateMark({ className, title = "FAS FAS Labs" }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={cn("size-8", className)} role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-u`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8B27F" />
          <stop offset="1" stopColor="#A8622F" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B87444" />
          <stop offset="1" stopColor="#6E3D20" />
        </linearGradient>
      </defs>
      <path d={PLATE_UPPER} fill={`url(#${id}-u)`} />
      <path d={PLATE_LOWER} fill={`url(#${id}-l)`} />
    </svg>
  );
}

export const PLATE_UPPER = "M10 64 L10 40 L30 14 Q32.5 11 36.5 11 L94 11 L80 25 L46 25 Q41 25 38.5 28.5 Z";
export const PLATE_LOWER = "M10 94 L10 72 L28 49 Q30.5 46 34.5 46 L78 46 L64 60 L43 60 Q38 60 35.5 63.5 Z";
