import { site } from "@/content/site";

// Answers lead with the direct answer so search and AI assistants can quote them. Keep them in line with the rest of the site.
export const faq: { q: string; a: string }[] = [
  {
    q: `What is ${site.name}?`,
    a: `${site.name} is an independent product studio in ${site.city}, ${site.country}. A team of ${site.teamSize} designs, builds and runs its own consumer products: Jyotishly, PlacementQuest and ArrowTheGame.`,
  },
  {
    q: `What products does ${site.name} make?`,
    a: "Jyotishly is a Vedic astrology app with kundli, daily horoscope and panchang. PlacementQuest is placement test practice for six companies, including TCS NQT, Infosys and Wipro NLTH, with 3,059 questions and worked answers. ArrowTheGame is a puzzle game with 96 levels, a daily puzzle and live 1v1 matches, on the web and as a mobile app.",
  },
  {
    q: `Where is ${site.name} based?`,
    a: `${site.name} is based in ${site.city}, Gujarat, ${site.country}. It was registered there in June ${site.founded}.`,
  },
  {
    q: `Is ${site.name} hiring?`,
    a: `There are no open roles at the moment. You can still send your CV or portfolio to ${site.email}, and we will get in touch when a role that fits opens up.`,
  },
  {
    q: `How do I contact ${site.name}?`,
    a: `Email ${site.email} or use the form on the contact page. We read every message, whether it is about partnerships, press, careers or product feedback.`,
  },
];
