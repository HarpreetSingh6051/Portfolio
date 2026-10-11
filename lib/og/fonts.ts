import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Fonts for the Open Graph / Twitter cards.
 *
 * Satori (next/og) parses fonts with opentype.js, which supports TTF/OTF but
 * NOT woff2 — and every real browser gets woff2 from Google Fonts. Rather
 * than depending on a network call (or a woff2→ttf conversion), the exact
 * weights the cards use are vendored in `assets/fonts/`.
 *
 * Buffers are signature-checked before use; if a file is missing the card
 * falls back to Satori's built-in font instead of failing.
 */

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal" | "italic";
}

interface FontSpec {
  file: string;
  name: string;
  weight: OgFont["weight"];
  style: OgFont["style"];
}

const FONTS: FontSpec[] = [
  { file: "Geist-Regular.ttf", name: "Geist", weight: 400, style: "normal" },
  { file: "Geist-Medium.ttf", name: "Geist", weight: 500, style: "normal" },
  { file: "Geist-SemiBold.ttf", name: "Geist", weight: 600, style: "normal" },
  { file: "Geist-Bold.ttf", name: "Geist", weight: 700, style: "normal" },
  { file: "Newsreader-Medium.ttf", name: "Newsreader", weight: 500, style: "normal" },
  { file: "Newsreader-MediumItalic.ttf", name: "Newsreader", weight: 500, style: "italic" },
];

/** Recognise TTF (0x00010000), OTF ("OTTO") and WOFF ("wOFF"). */
function isSupportedFont(bytes: ArrayBuffer): boolean {
  if (bytes.byteLength < 4) return false;
  const view = new Uint8Array(bytes);
  if (view[0] === 0x00 && view[1] === 0x01 && view[2] === 0x00 && view[3] === 0x00) return true;
  const tag = String.fromCharCode(view[0], view[1], view[2], view[3]);
  return tag === "OTTO" || tag === "wOFF";
}

let cached: OgFont[] | null = null;
let inflight: Promise<OgFont[]> | null = null;

/** Load (and memoise) the fonts used on the social cards. */
export function loadOgFonts(): Promise<OgFont[]> {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;

  inflight = (async () => {
    const fonts: OgFont[] = [];

    await Promise.all(
      FONTS.map(async (spec) => {
        try {
          const bytes = await readFile(
            join(process.cwd(), "assets", "fonts", spec.file)
          );
          const buffer = bytes.buffer.slice(
            bytes.byteOffset,
            bytes.byteOffset + bytes.byteLength
          ) as ArrayBuffer;

          if (isSupportedFont(buffer)) {
            fonts.push({
              name: spec.name,
              data: buffer,
              weight: spec.weight,
              style: spec.style,
            });
          }
        } catch {
          /* missing file — fall back to the built-in font */
        }
      })
    );

    cached = fonts;
    return fonts;
  })();

  return inflight;
}
