import Image from "next/image";
import type { Product } from "@/content/products";
import { BrowserFrame, PhoneFrame } from "@/components/product/device-frame";
import { JyotishlyScreen } from "@/components/product/jyotishly-screen";
import { cn } from "@/lib/utils";

/** The main device shot for a product: phone or browser, real screenshot or drawn screen. */
export function ProductVisual({ product, className, priority }: { product: Product; className?: string; priority?: boolean }) {
  const shot = product.screenshot;
  const alt = `${product.name} app screen`;

  if (product.frame === "browser" && shot) {
    const phoneShot = product.gallery.find((g) => g.frame === "phone");
    return (
      <>
        <BrowserFrame url={product.url} className={cn("w-full", phoneShot && "hidden md:block", className)}>
          <Image src={shot.src} alt={alt} fill sizes="(min-width: 1024px) 640px, 92vw" className="object-cover object-top" priority={priority} />
        </BrowserFrame>
        {phoneShot && (
          <PhoneFrame className={cn("w-[min(300px,72vw)] md:hidden", className)}>
            <div className="absolute inset-0" style={{ background: product.theme.panelLight }}>
              <div className="absolute inset-x-0 bottom-0 top-[34px]">
                <Image src={phoneShot.src} alt={phoneShot.alt} fill sizes="300px" className="object-cover object-top" />
              </div>
            </div>
          </PhoneFrame>
        )}
      </>
    );
  }

  return (
    <PhoneFrame className={cn("w-[min(300px,72vw,max(220px,calc((100svh-220px)*0.46)))]", className)}>
      {shot ? (
        // Leave room for the status bar so the notch never covers the app header
        <div className="absolute inset-0" style={{ background: product.theme.panelLight }}>
          <div className="absolute inset-x-0 bottom-0 top-[34px]">
            <Image src={shot.src} alt={alt} fill sizes="300px" className="object-cover object-top" priority={priority} />
          </div>
        </div>
      ) : (
        <>
          <JyotishlyScreen />
          <span className="sr-only">{alt}</span>
        </>
      )}
    </PhoneFrame>
  );
}
