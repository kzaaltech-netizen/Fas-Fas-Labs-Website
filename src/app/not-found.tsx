import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center pt-32 text-center">
      <div className="relative h-40 w-56" aria-hidden>
        <Image src="/brand/plate-upper.png" alt="" fill sizes="224px" className="-translate-x-8 -translate-y-4 rotate-[-14deg] object-contain" />
        <Image src="/brand/plate-lower.png" alt="" fill sizes="224px" className="translate-x-10 translate-y-8 rotate-[18deg] object-contain" />
      </div>
      <p className="mt-10 text-muted-foreground">Error 404</p>
      <h1 className="text-display-md mt-2">Page not found</h1>
      <p className="mt-4 max-w-[40ch] text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </section>
  );
}
