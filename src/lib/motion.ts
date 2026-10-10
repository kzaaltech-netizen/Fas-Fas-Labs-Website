export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const springSoft = { type: "spring", stiffness: 220, damping: 30 } as const;

export const dur = { fast: 0.2, base: 0.5, slow: 0.9 } as const;

export const viewportOnce = { once: true, margin: "-10% 0px" } as const;
