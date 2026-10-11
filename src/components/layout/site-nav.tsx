"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { PlateMark } from "@/components/brand/plate-mark";
import { ProductIcon } from "@/components/product/product-icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navLinks, site } from "@/content/site";
import { products } from "@/content/products";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpenedAt = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(!menuOpen && y > 240 && y > prev);
    if (y > prev) setProductsOpen(false);
  });

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Hover opens the menu for mouse users only; touch and keyboard use the toggle button.
  const openProducts = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    if (!productsOpen) hoverOpenedAt.current = Date.now();
    setProductsOpen(true);
  };
  const closeProductsSoon = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <motion.header
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6"
        animate={{ y: hidden && !reduce ? -110 : 0 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
      >
        <nav
          aria-label="Main"
          className={cn(
            "relative mx-auto flex h-16 max-w-[1100px] items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,box-shadow,border-color] duration-300",
            scrolled || menuOpen
              ? "border-border bg-surface/75 shadow-[var(--shadow-float)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <PlateMark className="size-8" title="" />
            <span className="font-display text-[17px] font-bold tracking-tight">
              FAS FAS <span className="font-medium text-muted-foreground">Labs</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.href === "/products" ? (
                <li key={link.href} className="relative" onPointerEnter={openProducts} onPointerLeave={closeProductsSoon}>
                  <div className="flex items-center">
                    <NavLink href={link.href} active={isActive(link.href)}>
                      {link.title}
                    </NavLink>
                    <button
                      type="button"
                      aria-expanded={productsOpen}
                      aria-controls="products-menu"
                      aria-label="Show products"
                      onClick={() => {
                        // A click right after hover opened the menu should not close it again
                        if (Date.now() - hoverOpenedAt.current < 600) return;
                        setProductsOpen((o) => !o);
                      }}
                      className="-ml-2 grid size-7 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <ChevronDown className={cn("size-3.5 transition-transform", productsOpen && "rotate-180")} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        id="products-menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: easeOutExpo }}
                        className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
                      >
                        <div className="rounded-[var(--radius-lg)] border bg-surface p-2 shadow-[var(--shadow-float)]">
                          {products.map((p) => (
                            <a
                              key={p.slug}
                              href={p.url}
                              target="_blank"
                              rel="noopener"
                              className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-surface-2"
                            >
                              <ProductIcon product={p} size={44} />
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2 font-medium">
                                  {p.name}
                                  <span className="text-xs font-normal text-muted-foreground">{p.category}</span>
                                </span>
                                <span className="line-clamp-1 text-sm text-muted-foreground">{p.oneLiner}</span>
                              </span>
                              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          ))}
                          <Link
                            href="/products"
                            className="mt-1 flex items-center justify-between rounded-2xl border border-dashed px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            See all products in detail <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.href}>
                  <NavLink href={link.href} active={isActive(link.href)}>
                    {link.title}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/products"
              className="hidden h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:brightness-110 sm:inline-flex"
            >
              See our products
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-background px-6 pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="space-y-1">
              {[{ title: "Home", href: "/" }, ...navLinks].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: easeOutExpo }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display block py-2 text-5xl font-bold tracking-tight",
                      pathname === link.href ? "text-accent-text" : "text-foreground",
                    )}
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-10 space-y-2 border-t pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <p className="mb-3 text-sm font-semibold text-muted-foreground">Products</p>
              {products.map((p) => (
                <a key={p.slug} href={p.url} target="_blank" rel="noopener" className="flex items-center gap-3 py-2">
                  <ProductIcon product={p} size={36} />
                  <span className="font-medium">{p.name}</span>
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-4 py-2 text-[15px] transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-4 -bottom-0.5 h-px bg-primary"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
