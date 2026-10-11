import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, socialLinks } from "@/lib/config/profile";
import { loadOgFonts } from "@/lib/og/fonts";

/**
 * Social card — Open Graph (1200×630).
 *
 * Note on the markup: Satori requires every text run to live inside its own
 * element (it cannot treat a text node that sits beside an element child), so
 * all copy below is wrapped in explicit flex divs.
 */
export const alt = `${profile.name} — Full-Stack Engineer · Applied AI. ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CANVAS = "#faf8f4";
const INK = "#1c1813";
const BODY = "#565046";
const MUTED = "#706a5c";
const LINE = "#e8e2d8";
const ACCENT = "#1d4ed8";
const VIOLET = "#6d28d9";

const CHIPS = ["RAG", "pgVector", "FastAPI", "Python", "YOLOv8", "Angular", "TypeScript"];

async function getPhotoDataUrl(): Promise<string | null> {
  try {
    const bytes = await readFile(join(process.cwd(), "public", "images", "profile.jpg"));
    return `data:image/jpeg;base64,${bytes.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [fonts, photo] = await Promise.all([loadOgFonts(), getPhotoDataUrl()]);

  const serif = fonts.some((font) => font.name === "Newsreader") ? "Newsreader" : undefined;
  const sans = fonts.length > 0 ? "Geist" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CANVAS,
          padding: 68,
          fontFamily: sans,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* atmosphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(28,24,19,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,24,19,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 70% 80% at 30% 20%, #000 30%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -170,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, rgba(29,78,216,0) 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -240,
            left: 140,
            width: 560,
            height: 560,
            borderRadius: 560,
            background: "radial-gradient(circle, rgba(109,40,217,0.10) 0%, rgba(109,40,217,0) 70%)",
            display: "flex",
          }}
        />

        {/* left column — always width-constrained so Satori can measure */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 11,
                background: ACCENT,
                color: CANVAS,
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
            <div style={{ display: "flex", fontSize: 21, fontWeight: 600, color: INK, fontFamily: sans }}>
              {profile.name}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 2, background: ACCENT, display: "flex" }} />
              <div
                style={{
                  display: "flex",
                  fontSize: 15,
                  letterSpacing: 3.2,
                  color: ACCENT,
                  fontWeight: 600,
                  fontFamily: sans,
                  textTransform: "uppercase",
                }}
              >
                Full-Stack Engineer / Applied AI
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: serif,
                fontWeight: 500,
                fontSize: 64,
                lineHeight: 1.08,
                letterSpacing: -1.4,
                color: INK,
              }}
            >
              <div style={{ display: "flex" }}>I build software that</div>
              <div style={{ display: "flex", fontStyle: "italic", color: ACCENT }}>
                thinks, sees,
              </div>
              <div style={{ display: "flex" }}>and scales.</div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 23,
                lineHeight: 1.4,
                color: BODY,
                maxWidth: 640,
                fontFamily: sans,
              }}
            >
              {profile.tagline}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CHIPS.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "7px 16px",
                    borderRadius: 999,
                    border: `1px solid ${LINE}`,
                    background: "#ffffff",
                    fontSize: 16,
                    fontWeight: 500,
                    color: MUTED,
                    fontFamily: sans,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{ width: 8, height: 8, borderRadius: 8, background: ACCENT, display: "flex" }}
              />
              <div style={{ display: "flex", fontSize: 17, color: MUTED, fontWeight: 500, fontFamily: sans }}>
                {`${socialLinks.github.replace("https://", "")} · Open to opportunities`}
              </div>
            </div>
          </div>
        </div>

        {/* right column — portrait plate */}
        {photo && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: 14,
                borderRadius: 30,
                background: "#ffffff",
                border: `1px solid ${LINE}`,
              }}
            >
              {/* Satori requires a raw <img>; next/image is a client component
                  and cannot be used inside an ImageResponse. */}
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={photo}
                width={330}
                height={330}
                style={{ borderRadius: 20, objectFit: "cover", display: "flex" }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 4px 4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 9,
                      background: ACCENT,
                      display: "flex",
                    }}
                  />
                  <div style={{ display: "flex", fontSize: 18, fontWeight: 600, color: INK, fontFamily: sans }}>
                    {`${profile.firstName} ${profile.lastName}`}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 13,
                    letterSpacing: 2.2,
                    color: MUTED,
                    textTransform: "uppercase",
                    fontWeight: 500,
                    fontFamily: sans,
                  }}
                >
                  Applied AI Engineer
                </div>
              </div>
            </div>
          </div>
        )}

        {/* top accent rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 300,
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
