'use client';
import React, { useState, useEffect } from 'react';
import { LogoAnimation, StaticLogo } from '@/components/ui/logo-animation';
import {
  MenuIcon, HeartHandshake, Shield, Sparkles, BrainCircuit,
  Bot, Wrench, Factory, Newspaper, Building2, UserPlus,
  Link, Video, Camera, MessageSquare
} from 'lucide-react';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { Timeline } from '@/components/ui/timeline';
import { Footer } from '@/components/ui/footer-section';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavGridCard,
  NavItemMobile,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// --- DATA ---

const productLinks = [
  { title: 'SaaS Suite', href: '/saas', description: 'Comprehensive digital solutions for modern businesses.', icon: Bot },
  { title: 'AI Tools', href: '/ai', description: 'Redwood AI - The intelligent core of our product ecosystem.', icon: BrainCircuit },
  { title: 'Enterprise', href: '/enterprise', description: 'Scalable platforms for enterprise-grade automation.', icon: Factory },
];

const companyLinks = [
  { title: 'Stories', href: '/discover', description: 'Latest news and updates from FAS FAS Labs.', icon: Newspaper },
  { title: 'Careers', href: '/careers', description: '65 Open roles. Join our mission.', icon: UserPlus },
  { title: 'About', href: '/about', description: 'Building a world of digital abundance.', icon: Building2 },
];

const featuresTimelineData = [
  {
    id: 1,
    title: "Innovation",
    date: "Core",
    content: "Pioneering the Future. We build forward-thinking digital products designed to scale with your business and solve complex challenges.",
    category: "Features",
    icon: Wrench,
    relatedIds: [2, 3, 4],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Safe",
    content: "User-Centric and Secure. Interfaces crafted around real users and real tasks, ensuring a seamless and accessible experience.",
    category: "Hardware",
    icon: Shield,
    relatedIds: [1],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Performance",
    date: "Social",
    content: "Fast and Reliable. Our architecture is engineered for speed, delivering exceptional performance under high load.",
    category: "Social",
    icon: HeartHandshake,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Intelligence",
    date: "AI",
    content: "Grows With You. Powered by advanced AI, our product ecosystem learns and adapts over time via continued use.",
    category: "Software",
    icon: Sparkles,
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 95,
  },
];

const companyHistory = [
  {
    title: "2014",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Beginnings. Originally founded as a small tech agency, focused on delivering quality software.
        </p>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          First Product Launch. Developed our first major digital solution, built for high performance.
        </p>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Enterprise Solutions deployed globally, establishing our robust software stack in real-world commercial environments.
        </p>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          FAS FAS Labs pivots. We focused our vision toward becoming a dedicated product-based company.
        </p>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Introduced our core platform publicly, showcasing advanced architecture and seamless interaction.
        </p>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Ecosystem Expansion. Our private early access program begins welcoming the general public into the future.
        </p>
      </div>
    ),
  },
  {
    title: "2026",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Transform Your Business. Our newest product line launches as enterprise integrations officially begin.
        </p>
      </div>
    ),
  },
  {
    title: "2027+",
    content: (
      <div>
        <p className="text-muted-foreground text-sm font-normal mb-8">
          Abilities Keeps Growing. Through continuous iteration and AI, our product capabilities expand exponentially.
        </p>
      </div>
    ),
  },
];

const footerLinks = [
  {
    label: 'Company',
    links: [
      { title: 'Products', href: '/products' },
      { title: 'AI Solutions', href: '/ai' },
      { title: 'Enterprise', href: '/enterprise' },
      { title: 'About', href: '/about' },
      { title: 'Careers', href: '/careers' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Stories', href: '/discover' },
      { title: 'Robot Fleet', href: '/robot-fleet' },
      { title: 'Logs', href: '/logs' },
      { title: 'Investor Relations', href: '/investor-relations' },
    ],
  },
  {
    label: 'Legal & Support',
    links: [
      { title: 'Terms of Use', href: '/terms' },
      { title: 'Privacy & Cookies', href: '/privacy' },
      { title: 'Press', href: '/press' },
      { title: 'Support', href: '/support' },
    ],
  },
  {
    label: 'Social',
    links: [
      { title: 'LinkedIn', href: '#', icon: Link },
      { title: 'YouTube', href: '#', icon: Video },
      { title: 'Instagram', href: '#', icon: Camera },
      { title: 'X (Twitter)', href: '#', icon: MessageSquare },
    ],
  },
];

// --- COMPONENTS ---

function Nav({ isAnimating }: { isAnimating?: boolean }) {
  const sections = [
    { id: 'product', name: 'Product', list: productLinks },
    { id: 'company', name: 'Company', list: companyLinks },
  ];

  return (
    <div className="fixed top-4 left-0 w-full z-50 px-4 md:px-8">
      <div className="bg-background/80 backdrop-blur-md mx-auto h-20 w-full max-w-[1200px] border border-border/50 px-6 rounded-2xl shadow-sm">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-1">
            <StaticLogo isAnimating={isAnimating || false} />
            <span className={`font-mono text-2xl font-bold tracking-tighter text-foreground transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>FAS FAS Labs</span>
          </div>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg px-6 py-2.5 font-semibold">Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-full md:w-[500px] md:grid-cols-2 p-4 gap-4 bg-background rounded-xl shadow-lg border border-border/50">
                    {productLinks.map((link) => (
                      <NavGridCard key={link.href} link={link} className="min-h-[120px]" />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg px-6 py-2.5 font-semibold">Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-full md:w-[500px] md:grid-cols-2 p-4 gap-4 bg-background rounded-xl shadow-lg border border-border/50">
                    {companyLinks.map((link) => (
                      <NavGridCard key={link.href} link={link} className="min-h-[120px]" />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Button className="rounded-full px-6 font-semibold">Explore Our Products</Button>
            </div>
            <Sheet>
              <SheetTrigger render={
                <Button size="icon" variant="ghost" className="rounded-full lg:hidden">
                  <MenuIcon className="size-5" />
                </Button>
              }>
                <span className="sr-only">Menu</span>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-lg" showCloseButton={true}>
                <div className="container grid gap-y-2 overflow-y-auto px-4 pt-12 pb-12">
                  <Accordion>
                    {sections.map((section) => (
                      <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger className="capitalize hover:no-underline font-semibold">
                          {section.name}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-1">
                          <ul className="grid gap-1">
                            {section.list.map((link) => (
                              <li key={link.href}>
                                <SheetClose render={<NavItemMobile item={link} href={link.href} />}>
                                  <span className="sr-only">Close</span>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="mt-8">
                    <Button className="w-full rounded-full">Explore Our Products</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default function Home() {
  const [isLogoAnimating, setIsLogoAnimating] = useState(true);

  useEffect(() => {
    if (isLogoAnimating) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLogoAnimating]);

  return (
    <main className="relative min-h-screen w-full text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
      {isLogoAnimating && <LogoAnimation onComplete={() => setIsLogoAnimating(false)} />}

      {/* Background Shader */}
      <DottedSurface className="z-0 opacity-50" />

      {/* Navigation */}
      <Nav isAnimating={isLogoAnimating} />

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-[95vh] flex items-center justify-center pt-28 px-4 md:px-8">
        <div className="max-w-[1200px] w-full h-[620px] md:h-[750px] xl:h-[800px] bg-background rounded-[2.5rem] border border-border overflow-hidden relative shadow-2xl flex mx-auto">

          <Spotlight size={500} />

          {/* Left Content */}
          <div className="flex-1 p-8 md:p-20 relative z-10 flex flex-col justify-center pointer-events-none md:max-w-3xl w-full">
            <div className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-semibold mb-8 w-fit text-muted-foreground pointer-events-auto">
              Welcome to the Future
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.05]">
              FAS FAS Labs <br />
              <span className="text-neutral-500">A Product Based Company</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg text-lg leading-relaxed">
              Transforming Ideas into Reality. FAS FAS Labs builds scalable, modern digital solutions that solve real-world problems so you can focus on what matters.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 items-center pointer-events-auto">
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
                Explore Our Products
              </Button>
              <span className="text-sm font-medium text-muted-foreground">Start your journey with us today</span>
            </div>
          </div>

          {/* Right Spline Container - Absolute to prevent clipping hands */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[550px] lg:w-[650px] xl:w-[750px] z-0 pointer-events-auto bg-transparent">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Features Orbital Timeline */}
      <section className="relative z-10 w-full py-24 px-4 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Capabilities</h2>
          <p className="mt-4 text-lg text-neutral-600">Explore what makes FAS FAS Labs the ultimate digital partner.</p>
        </div>
        <div className="w-full max-w-[1200px] mx-auto h-[900px] bg-background rounded-[2.5rem] border border-border shadow-xl overflow-hidden relative">
          <RadialOrbitalTimeline timelineData={featuresTimelineData} />
        </div>
      </section>

      {/* About Timeline */}
      <section className="relative z-10 w-full py-24 px-4 overflow-hidden">
        <div className="w-full max-w-[1200px] mx-auto bg-background rounded-[2.5rem] border border-border shadow-xl relative py-10">
          <Timeline data={companyHistory} />
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 w-full pb-12 px-4 overflow-hidden mb-12">
        <div className="w-full max-w-[1200px] mx-auto bg-transparent rounded-[2.5rem] border border-border relative">
          <Footer links={footerLinks} />
        </div>
      </section>

    </main>
  );
}
