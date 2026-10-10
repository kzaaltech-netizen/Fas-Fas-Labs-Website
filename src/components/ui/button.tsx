import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "product";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const base =
  "group/btn inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  ghost: "border border-border-strong text-foreground hover:bg-surface-2",
  product: "bg-[var(--product-accent)] text-white hover:brightness-110",
};

/** Link styled as a button. External links open in a new tab and say so to screen readers. */
export function ButtonLink({ href, children, variant = "primary", external, className, style }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      <Icon
        className={cn(
          "size-4 transition-transform duration-300 ease-[var(--ease-out-expo)]",
          external ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" : "group-hover/btn:translate-x-1",
        )}
        strokeWidth={1.75}
        aria-hidden
      />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cn(base, variants[variant], className)} style={style}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], className)} style={style}>
      {content}
    </Link>
  );
}
