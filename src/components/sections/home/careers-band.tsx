import { Reveal } from "@/components/effects/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export function CareersBand() {
  return (
    <section className="py-12 md:py-20" aria-labelledby="careers-band-title">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[#1c120b] px-6 py-14 text-[#f4eee6] md:px-14 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(60% 80% at 100% 0%, rgb(200 129 74 / 0.35), transparent 60%)" }}
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <h2 id="careers-band-title" className="text-display-md">
                Want to work with us?
              </h2>
              <div>
                <p className="text-lg text-[#d9cfc4]">
                  We are not hiring right now, but we are always happy to hear from people who like building products.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${site.email}?subject=Working%20at%20FAS%20FAS%20Labs`} className="bg-copper-500 text-[#0b0a09]">
                    Email us
                  </ButtonLink>
                  <ButtonLink href="/careers" variant="ghost" className="border-white/20 text-[#f4eee6] hover:bg-white/10">
                    Careers
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
