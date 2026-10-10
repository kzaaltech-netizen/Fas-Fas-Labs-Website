/**
 * Illustrative Jyotishly screen drawn in code. The live site is blocked on the studio
 * network, so this stands in until a real screenshot is added to /public/products/jyotishly.
 */
export function JyotishlyScreen() {
  const houses = ["Lg", "Su", "", "Mo", "", "Ma", "", "Ju", "", "Ve", "Sa", ""];
  // Label anchor points for the 12 houses of a North Indian chart (100x100 box)
  const pts = [
    [50, 26], [26, 12], [12, 26], [26, 50], [12, 74], [26, 88],
    [50, 74], [74, 88], [88, 74], [74, 50], [88, 26], [74, 12],
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-[#15132b] px-4 pb-4 pt-10 text-[#f1ecff]" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="font-display text-[15px] font-bold">
          Jyotish<span className="text-[#E8A33D]">ly</span>
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px]">EN · हि</span>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-white/50">Your kundli</p>
      <div className="mt-2 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
        <svg viewBox="0 0 100 100" className="w-full">
          <g fill="none" stroke="#E8A33D" strokeOpacity="0.7" strokeWidth="0.6">
            <rect x="1" y="1" width="98" height="98" />
            <path d="M1 1 L99 99 M99 1 L1 99 M50 1 L99 50 L50 99 L1 50 Z" />
          </g>
          {pts.map(([x, y], i) => (
            <g key={i}>
              <text x={x} y={y - 3} textAnchor="middle" fontSize="4" fill="#ffffff" opacity="0.35">
                {i + 1}
              </text>
              <text x={x} y={y + 3} textAnchor="middle" fontSize="5.5" fill="#E8A33D" fontWeight="600">
                {houses[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-3 rounded-2xl bg-gradient-to-br from-[#E8A33D] to-[#c97a1f] p-3 text-[#1a1530]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] opacity-70">Today · Moon in Rohini</p>
        <p className="font-display mt-1 text-[13px] font-bold leading-snug">A calm day for money talks. Start new work after noon.</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["Tithi", "Saptami"],
          ["Nakshatra", "Rohini"],
          ["Rahu kaal", "1:30 pm"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white/[0.06] px-1 py-2 ring-1 ring-white/10">
            <p className="text-[8px] uppercase tracking-wider text-white/50">{k}</p>
            <p className="mt-0.5 text-[10px] font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around border-t border-white/10 pt-3 text-[9px] text-white/50">
        <span className="text-[#E8A33D]">Home</span>
        <span>Kundli</span>
        <span>Panchang</span>
        <span>Match</span>
      </div>
    </div>
  );
}
