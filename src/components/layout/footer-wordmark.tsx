/** Large "FAS FAS" wordmark at the very bottom of the page. */
export function FooterWordmark() {
  return (
    <div className="relative mt-4 select-none overflow-hidden" aria-hidden>
      <p
        className="font-display translate-y-[14%] whitespace-nowrap text-center font-extrabold leading-[0.82] tracking-[-0.06em]"
        style={{
          fontSize: "clamp(4.5rem, 22vw, 22rem)",
          backgroundImage: "linear-gradient(to bottom, rgb(200 129 74 / 0.22), var(--border) 70%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        FAS FAS
      </p>
    </div>
  );
}
