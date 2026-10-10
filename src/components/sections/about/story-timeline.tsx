import { Reveal } from "@/components/effects/reveal";

const events = [
  { when: "June 2026", title: "FAS FAS Labs is registered", text: "Registered as a proprietorship in Ahmedabad, Gujarat." },
  {
    when: "Today",
    title: "Three live products",
    text: "Jyotishly, PlacementQuest and ArrowTheGame are live, run by a team of seven.",
  },
];

export function StoryTimeline() {
  return (
    <ol className="mt-10 border-t">
      {events.map((e) => (
        <Reveal as="li" key={e.title} className="grid gap-2 border-b py-6 md:grid-cols-[200px_1fr] md:gap-10">
          <p className="text-muted-foreground">{e.when}</p>
          <div>
            <h3 className="text-xl font-semibold">{e.title}</h3>
            <p className="mt-1 text-muted-foreground">{e.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
