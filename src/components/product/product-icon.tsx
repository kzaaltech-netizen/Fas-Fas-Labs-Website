import Image from "next/image";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductIcon({ product, className, size = 40 }: { product: Product; className?: string; size?: number }) {
  return (
    <Image
      src={product.icon}
      alt=""
      width={size}
      height={size}
      unoptimized={product.icon.endsWith(".svg")}
      className={cn("shrink-0 rounded-[22%] ring-1 ring-black/5", className)}
    />
  );
}
