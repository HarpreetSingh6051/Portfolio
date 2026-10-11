import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/config/profile";
import { loadOgFonts } from "@/lib/og/fonts";

/**
 * Twitter/X card. Next's file convention also picks up `opengraph-image`, but
 * X requests the twitter image explicitly, so we generate a matching 1200×600
 * large-summary card (darker, so it stands apart from the light OG card).
 */
export const alt = `${profile.name} — Full-Stack Engineer · Applied AI`;
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

const INK = "#f5f0e6";
const BODY = "#cec6b7";
const MUTED = "#a39a8a";
const LINE = "#2e2a24";
const ACCENT = "#8fb0ff";
const VIOLET = "#c4a6ff";

export default async function TwitterImage() {
  const [fonts, photo] = await Promise.all([
    loadOgFonts(),
    readFile(join(process.cwd(), "public", "images", "profile.jpg"))
      .then((bytes) => `data:image/jpeg;base64,${bytes.toString("base64")}`)
      .catch(() => null),
  ]);

  const sans = fonts.length > 0 ? "Geist" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#100e0c",
          padding: 72,
          fontFamily: sans,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* atmosphere */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 640,
            background: "radial-gradient(circle, rgba(143,176,255,0.16) 0%, rgba(143,176,255,0) 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: 560,
            background: "radial-gradient(circle, rgba(196,166,255,0.14) 0%, rgba(196,166,255,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
              background: ACCENT,
              color: "#100e0c",
              fontWeight: 700,
              fontSize: 19,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontFamily: sans,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, color: INK, fontFamily: sans }}>
            {profile.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: 3.2,
              color: ACCENT,
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: sans,
            }}
          >
            Full-Stack Engineer / Applied AI
          </div>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.06,
              color: INK,
              fontWeight: 500,
              letterSpacing: -1.3,
              fontFamily: sans,
              maxWidth: 900,
            }}
          >
            I build software that thinks, sees, and scales.
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: BODY, maxWidth: 780, fontFamily: sans }}>
            Full-stack engineer turned Applied AI engineer — retrieval systems, computer-vision
            pipelines, and interfaces that hold up in production.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 22, position: "relative" }}>
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img
              src={photo}
              width={64}
              height={64}
              style={{ borderRadius: 32, objectFit: "cover", display: "flex", border: `1px solid ${LINE}` }}
            />
          )}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["RAG", "pgVector", "YOLOv8", "FastAPI", "Angular"].map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${LINE}`,
                  fontSize: 15,
                  color: MUTED,
                  fontWeight: 500,
                  fontFamily: sans,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 260,
            height: 6,
            background: `linear-gradient(90deg, ${ACCENT}, ${VIOLET})`,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}
