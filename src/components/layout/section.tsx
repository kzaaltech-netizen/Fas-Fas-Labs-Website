import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  ...rest
}: React.ComponentProps<"section">) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)} {...rest}>
      <div className="container-page">{children}</div>
    </section>
  );
}
