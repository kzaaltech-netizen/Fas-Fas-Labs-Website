import { site } from "@/content/site";
import { products } from "@/content/products";
import { faq } from "@/content/faq";

export const dynamic = "force-static";

// Plain-text summary for AI assistants (llmstxt.org). Built from the same content as the pages.
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Products",
    "",
    ...products.map((p) => `- [${p.name}](${p.url}): ${p.oneLiner}`),
    "",
    "## Pages",
    "",
    `- [Products](${site.url}/products): what each product does and who it is for`,
    `- [About](${site.url}/about): who we are and where we are based`,
    `- [Careers](${site.url}/careers): open roles and how hiring works`,
    `- [Contact](${site.url}/contact): email and contact form`,
    "",
    "## FAQ",
    "",
    ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
