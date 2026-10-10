"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element drifts toward the cursor (0–1). */
  strength?: number;
}

/**
 * Gently pulls its child toward the pointer. Mouse-only by nature, and a
 * no-op for keyboard and touch users as well as reduced-motion preferences.
 */
export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  function handleMouseMove(event: React.MouseEvent<HTMLSpanElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  }

  function reset() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
      className={className}
      style={{ display: "inline-flex" }}
    >
      {children}
    </motion.span>
  );
}
