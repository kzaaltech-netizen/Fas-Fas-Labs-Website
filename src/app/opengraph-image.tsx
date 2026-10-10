import { ImageResponse } from "next/og";
import { PLATE_LOWER, PLATE_UPPER } from "@/components/brand/plate-mark";

export const alt = "FAS FAS Labs — Fast to ship. Built to stay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 80% at 90% 10%, #5a3219 0%, #0b0a09 60%)",
          color: "#f4eee6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 100 100">
            <path d={PLATE_UPPER} fill="#D18D58" />
            <path d={PLATE_LOWER} fill="#94532A" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>FAS FAS Labs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <div>Fast to ship.</div>
          <div style={{ color: "#E2A574" }}>Built to stay.</div>
        </div>
        <div style={{ fontSize: 28, color: "#a39a8f" }}>Jyotishly · PlacementQuest · ArrowTheGame — Ahmedabad, India</div>
      </div>
    ),
    size,
  );
}
