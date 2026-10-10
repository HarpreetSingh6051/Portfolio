"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so Framer Motion automatically respects the user's
 * "reduce motion" system preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
