export type ProductSlug = "jyotishly" | "placementquest" | "arrowthegame";

export type Product = {
  slug: ProductSlug;
  name: string;
  url: string;
  category: string;
  oneLiner: string;
  bullets: string[];
  features: { title: string; text: string }[];
  platforms: string[];
  stats: { value: string; label: string }[];
  icon: string;
  frame: "phone" | "browser";
  screenshot?: { src: string; width: number; height: number };
  gallery: { src: string; width: number; height: number; frame: "phone" | "browser"; alt: string }[];
  /** Colors used only inside this product's own panels. */
  theme: {
    accent: string;
    accentText: string;
    panelLight: string;
    panelDark: string;
  };
};

export const products: Product[] = [
  {
    slug: "jyotishly",
    name: "Jyotishly",
    url: "https://www.jyotishly.com/",
    icon: "/products/jyotishly/icon.svg",
    category: "Astrology",
    oneLiner:
      "A Vedic astrology app with your kundli, daily horoscope and panchang.",
    bullets: [
      "Free kundli from your birth details",
      "Daily horoscope for your moon sign",
      "Panchang, muhurat and festival dates",
    ],
    features: [
      { title: "Kundli", text: "Enter your date, time and place of birth to get your birth chart." },
      { title: "Daily horoscope", text: "A short, useful reading for your moon sign every morning." },
      { title: "Panchang", text: "Tithi, nakshatra, yoga and karana for your city, every day." },
      { title: "Muhurat", text: "Find good times for the things that matter to you." },
    ],
    platforms: ["Web"],
    stats: [],
    frame: "phone",
    gallery: [],
    theme: {
      accent: "#E8A33D",
      accentText: "#B8761A",
      panelLight: "#F4EFFA",
      panelDark: "#15132B",
    },
  },
  {
    slug: "placementquest",
    name: "PlacementQuest",
    url: "https://www.placementquest.com/",
    icon: "/products/placementquest/icon.png",
    category: "Careers",
    oneLiner:
      "Placement test practice by company, with worked answers and an honest readiness score.",
    bullets: [
      "Company-wise aptitude questions with worked answers",
      "Timed mock tests that feel like the real thing",
      "A readiness estimate that tells you how sure it is",
    ],
    features: [
      { title: "Six companies", text: "Accenture, Cognizant GenC, Infosys, McKinsey, TCS NQT and Wipro NLTH." },
      { title: "Worked answers", text: "Every question comes with a step-by-step solution, not just the right option." },
      { title: "Timed mocks", text: "Practise under the same time pressure as the real test." },
      { title: "Readiness estimate", text: "An honest score of how ready you are, with how confident it is." },
      { title: "Quests and streaks", text: "Earn XP for every question, keep a daily streak and clear weekly quests." },
      { title: "Free account", text: "Sign up in under a minute. Progress and streaks follow you across devices." },
    ],
    platforms: ["Web"],
    stats: [
      { value: "3,059", label: "practice questions" },
      { value: "6", label: "companies covered" },
    ],
    frame: "browser",
    screenshot: { src: "/products/placementquest/desktop.png", width: 2880, height: 1800 },
    gallery: [
      { src: "/products/placementquest/desktop.png", width: 2880, height: 1800, frame: "browser", alt: "PlacementQuest home page on desktop" },
      { src: "/products/placementquest/mobile.png", width: 780, height: 1688, frame: "phone", alt: "PlacementQuest home page on a phone" },
    ],
    theme: {
      accent: "#3A7A5C",
      accentText: "#2F6B4F",
      panelLight: "#E8EFE9",
      panelDark: "#1A2029",
    },
  },
  {
    slug: "arrowthegame",
    name: "ArrowTheGame",
    url: "https://www.arrowthegame.com/",
    icon: "/products/arrowthegame/icon.png",
    category: "Games",
    oneLiner:
      "A puzzle game where you clear the board by tapping arrows that can escape, with daily puzzles and live 1v1 matches.",
    bullets: [
      "96 handcrafted levels with stars to earn",
      "Daily Puzzle and Arrow Rush against the clock",
      "Live 1v1 battles in the Arena",
    ],
    features: [
      { title: "96 handcrafted levels", text: "Tap the arrows that can escape. Clear the board. Earn up to three stars." },
      { title: "Daily Puzzle", text: "One new board every day, with coins and trophies for solving it." },
      { title: "Arrow Rush", text: "Solve as many boards as you can in three minutes." },
      { title: "1v1 Arena", text: "Two players, one shared board. Clear more arrows than your rival." },
      { title: "Play a friend", text: "Create a room, share the code. Works across web and the mobile app." },
      { title: "Leaderboards", text: "Global rankings for stars and trophies." },
    ],
    platforms: ["Web", "Mobile app"],
    stats: [
      { value: "96", label: "handcrafted levels" },
      { value: "1v1", label: "live battles" },
    ],
    frame: "phone",
    screenshot: { src: "/products/arrowthegame/mobile.png", width: 780, height: 1688 },
    gallery: [
      { src: "/products/arrowthegame/mobile.png", width: 780, height: 1688, frame: "phone", alt: "ArrowTheGame level select on a phone" },
      { src: "/products/arrowthegame/desktop.png", width: 2880, height: 1800, frame: "browser", alt: "ArrowTheGame home dashboard on desktop" },
    ],
    theme: {
      accent: "#E07B39",
      accentText: "#B55A1F",
      panelLight: "#F3ECE2",
      panelDark: "#1E1B18",
    },
  },
];

export const getProduct = (slug: ProductSlug) =>
  products.find((p) => p.slug === slug)!;
