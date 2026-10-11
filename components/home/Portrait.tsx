"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { profile } from "@/lib/config/profile";

interface FloaterProps {
  label: string;
  x: string;
  y: string;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduceMotion: boolean;
}

/** A small technical label that parallaxes against the pointer. */
function Floater({ label, x, y, depth, px, py, reduceMotion }: FloaterProps) {
  const xTransform = useTransform(px, [-0.5, 0.5], [depth, -depth]);
  const yTransform = useTransform(py, [-0.5, 0.5], [depth * 0.7, -depth * 0.7]);

  return (
    <motion.span
      aria-hidden="true"
      style={
        reduceMotion ? { left: x, top: y } : { left: x, top: y, x: xTransform, y: yTransform }
      }
      className="animate-float-slow pointer-events-none absolute hidden rounded-full border border-line bg-paper/95 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase shadow-[var(--shadow-panel)] backdrop-blur-sm sm:block"
    >
      {label}
    </motion.span>
  );
}

const FLOATERS: Omit<FloaterProps, "px" | "py" | "reduceMotion">[] = [
  { label: "RAG", x: "-9%", y: "13%", depth: 26 },
  { label: "pgVector", x: "86%", y: "9%", depth: 38 },
  { label: "YOLOv8", x: "-12%", y: "66%", depth: 20 },
  { label: "FastAPI", x: "82%", y: "76%", depth: 32 },
];

/**
 * Portrait plate: the photograph treated as a designed object — a mat, a
 * hairline frame, technical corner marks, a caption bar, and small floating
 * labels that parallax against the pointer.
 */
export function Portrait() {
  const reduceMotion = useReducedMotion() ?? false;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 18, mass: 0.5 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [9, -9]), springConfig);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-7, 7]), springConfig);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="relative"
      style={{ perspective: 1100 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <motion.figure
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="panel relative mx-auto w-full max-w-[21rem] overflow-hidden rounded-2xl p-3 shadow-[var(--shadow-lift)] sm:max-w-sm"
      >
        {/* corner marks */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-l border-b",
          "right-3 bottom-3 border-r border-b",
        ].map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`pointer-events-none absolute z-20 h-5 w-5 rounded-[3px] border-accent/70 ${position}`}
          />
        ))}

        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/images/profile.jpg"
            alt={`${profile.name} — ${profile.title}`}
            width={400}
            height={400}
            priority
            className="h-full w-full object-cover"
          />

          {/* technical overlay: a faint measurement grid + scanline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(28,24,19,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,24,19,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse at 50% 40%, #000 30%, transparent 88%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 30%, transparent 88%)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-scan pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />

          <div className="absolute inset-0 ring-1 ring-ink/5 ring-inset" aria-hidden="true" />
        </div>

        <figcaption className="flex items-center justify-between gap-3 px-2 pt-3 pb-1">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">{profile.name}</span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            Applied AI Engineer
          </span>
        </figcaption>

        <div className="flex items-center justify-between border-t border-line px-2 pt-2.5 pb-1">
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
            Engineering + Intelligence
          </span>
          <span className="font-mono text-[10px] text-muted">01</span>
        </div>
      </motion.figure>

      {FLOATERS.map((floater) => (
        <Floater
          key={floater.label}
          {...floater}
          px={px}
          py={py}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
