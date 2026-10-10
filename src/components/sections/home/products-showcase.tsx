import { Reveal } from "@/components/effects/reveal";
import { ProductStack } from "@/components/sections/home/product-stack";

export function ProductsShowcase() {
  return (
    <section id="products" className="relative py-16 md:py-24" aria-labelledby="products-title">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="products-title" className="text-display-lg">
            Our products
          </h2>
          <p className="max-w-[40ch] text-muted-foreground">Each one is built and run by our own team.</p>
        </Reveal>
        <div className="mt-12 lg:mt-4">
          <ProductStack />
        </div>
      </div>
    </section>
  );
}
