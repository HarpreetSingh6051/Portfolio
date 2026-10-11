/**
 * THEME + AMBIENT-MOTION STORE
 *
 * Client-side appearance state:
 *   mode    — "light" | "dark" | "system" (persisted)
 *   effects — ambient motion on/off (persisted)
 *
 * The store is read at module scope when a window exists, so the value the
 * user picked is available during the very first client render. It is
 * consumed through `useSyncExternalStore` with an explicit
 * `getServerSnapshot`, which is the supported way to read client-only
 * state without producing a hydration mismatch warning.
 */

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_KEY = "hp-theme";
export const EFFECTS_KEY = "hp-effects";

export interface ThemeSnapshot {
  mode: ThemeMode;
  effects: boolean;
  resolved: ResolvedTheme;
}

const SERVER_SNAPSHOT: ThemeSnapshot = {
  mode: "system",
  effects: true,
  resolved: "light",
};

const MODES: ThemeMode[] = ["light", "dark", "system"];
const MEDIA = "(prefers-color-scheme: dark)";

function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === "string" && (MODES as string[]).includes(value);
}

function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(MEDIA).matches;
}

function resolve(mode: ThemeMode, systemDark: boolean): ResolvedTheme {
  if (mode === "system") return systemDark ? "dark" : "light";
  return mode;
}

function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    if (isThemeMode(raw)) return raw;
  } catch {
    /* storage can be unavailable (private mode) — fall through */
  }
  return "system";
}

function readStoredEffects(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(EFFECTS_KEY);
    if (raw === "off") return false;
    if (raw === "on") return true;
  } catch {
    /* ignore */
  }
  return true;
}

/** Mirror state onto <html>. Also called by the inline boot script. */
export function applyToDocument(mode: ThemeMode, effects: boolean, systemDark: boolean): ResolvedTheme {
  const resolved = resolve(mode, systemDark);
  if (typeof document === "undefined") return resolved;

  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.dataset.effects = effects ? "on" : "off";
  root.style.colorScheme = resolved;
  return resolved;
}

function initialSnapshot(): ThemeSnapshot {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  const mode = readStoredMode();
  return {
    mode,
    effects: readStoredEffects(),
    resolved: resolve(mode, systemPrefersDark()),
  };
}

let snapshot: ThemeSnapshot = initialSnapshot();

const listeners = new Set<() => void>();
let mediaBound = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function write(next: { mode?: ThemeMode; effects?: boolean }): ThemeSnapshot {
  const mode = next.mode ?? snapshot.mode;
  const effects = next.effects ?? snapshot.effects;
  const systemDark = systemPrefersDark();
  const resolved = applyToDocument(mode, effects, systemDark);

  snapshot = { mode, effects, resolved };
  try {
    window.localStorage.setItem(THEME_KEY, mode);
    window.localStorage.setItem(EFFECTS_KEY, effects ? "on" : "off");
  } catch {
    /* ignore */
  }
  emit();
  return snapshot;
}

/** Follow the OS preference when the mode is "system". */
function bindMedia() {
  if (mediaBound || typeof window === "undefined" || !window.matchMedia) return;
  mediaBound = true;
  window.matchMedia(MEDIA).addEventListener("change", () => {
    if (snapshot.mode === "system") write({});
  });
}

/** Called once from the provider so system changes and storage sync happen. */
export function initThemeStore() {
  bindMedia();
  applyToDocument(snapshot.mode, snapshot.effects, systemPrefersDark());
}

export function setMode(mode: ThemeMode): ThemeSnapshot {
  return write({ mode });
}

export function toggleResolved(): ThemeSnapshot {
  return write({ mode: snapshot.resolved === "dark" ? "light" : "dark" });
}

export function setEffects(effects: boolean): ThemeSnapshot {
  return write({ effects });
}

export function cycleMode(): ThemeSnapshot {
  const index = MODES.indexOf(snapshot.mode);
  return write({ mode: MODES[(index + 1) % MODES.length] });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getThemeSnapshot(): ThemeSnapshot {
  return snapshot;
}

export function getThemeServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

export { subscribe };
export const MODE_ORDER = MODES;
