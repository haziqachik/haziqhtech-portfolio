import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const profile = getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a, #1e40af)",
          color: "white",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "960px",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700 }}>{profile.name}</div>
          <div style={{ fontSize: 32, lineHeight: 1.3, opacity: 0.85 }}>{profile.tagline}</div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>haziqhtech.sg</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}