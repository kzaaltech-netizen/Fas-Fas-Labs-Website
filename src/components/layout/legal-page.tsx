export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="container-page max-w-3xl pb-24 pt-40 md:pt-48">
      <h1 className="text-display-md">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_a]:text-accent-text [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
