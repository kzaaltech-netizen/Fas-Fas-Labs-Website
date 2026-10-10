import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { BackToTop } from "@/components/layout/back-to-top";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ProductIcon } from "@/components/product/product-icon";
import { products } from "@/content/products";
import { site } from "@/content/site";

const company = [
  { title: "Products", href: "/products" },
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" },
];

const legal = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t">
      <div className="container-page relative pt-20 md:pt-28">
        {/* Closing CTA */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="text-display-lg max-w-[14ch]">Get in touch</h2>
          <div className="lg:justify-self-end">
            <p className="max-w-[38ch] text-muted-foreground">
              For partnerships, press, jobs or feedback on our products, write to us.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Contact us</ButtonLink>
              <ButtonLink href="/products" variant="ghost">
                See products
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="mt-20 grid gap-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_0.7fr_0.6fr]">
          <div>
            <p className="text-sm font-semibold">FAS FAS Labs</p>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              A product studio in {site.city}, {site.country}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-accent-text underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold">Products</p>
            <ul className="mt-4 space-y-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-surface-2"
                  >
                    <ProductIcon product={p} size={28} />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.category}</span>
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterLinks title="Company" links={company} />
          <FooterLinks title="Legal" links={legal} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Made in {site.city}, {site.country}.
          </p>
          <div className="flex items-center gap-2">
            <BackToTop />
            <ThemeToggle className="size-9" />
          </div>
        </div>
      </div>
      <FooterWordmark />
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="relative text-sm transition-colors hover:text-accent-text">
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
