import { cn } from "@/lib/utils";

/** Phone shell. Children fill the screen area. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] bg-[#1a1714] p-[9px] shadow-[0_40px_80px_-20px_rgba(20,12,6,0.45),inset_0_0_0_1px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[2.1rem] bg-black">
        {children}
        <div className="absolute left-1/2 top-2 h-[22px] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      </div>
    </div>
  );
}

/** Browser window shell with traffic lights and a URL pill. */
export function BrowserFrame({
  children,
  url,
  className,
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ec] shadow-[0_40px_80px_-20px_rgba(20,12,6,0.4)] dark:border-white/10 dark:bg-[#22201d]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-3 px-3.5" aria-hidden>
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-1/2 truncate rounded-md bg-black/5 px-3 py-1 text-center font-mono text-[10px] text-black/50 dark:bg-white/10 dark:text-white/50">
          {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative aspect-[1440/900] overflow-hidden">{children}</div>
    </div>
  );
}
