"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  initThemeStore,
  subscribe,
  type ThemeSnapshot,
} from "@/lib/theme";

/**
 * Appearance context: the initial theme is applied by the inline boot script
 * in <head>, so there is no flash. This provider only wires up listeners.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initThemeStore();
  }, []);

  return <>{children}</>;
}

/**
 * Hydration-safe appearance state. The server render uses the default
 * snapshot; the client sees the stored preference immediately and React
 * re-renders after hydration — no mismatch warning, no flash.
 */
export function useThemeValue(): ThemeSnapshot {
  return useSyncExternalStore(subscribe, getThemeSnapshot, getThemeServerSnapshot);
}
