"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * HERO NETWORK — "software · data · intelligence"
 *
 * A canvas field of labelled nodes that reacts to the pointer: nearby nodes
 * wake up, edges light, a signal snaps a line to the cursor, and small data
 * pulses travel between connected nodes.
 *
 * Engineering notes:
 *  - Theme colours are read from CSS custom properties, so the canvas follows
 *    the active theme (and updates when it changes).
 *  - devicePixelRatio-aware, ResizeObserver-driven, and paused through
 *    IntersectionObserver while off screen.
 *  - Honours prefers-reduced-motion (single static frame) and the "ambient
 *    motion" switch (no drift / no signals; the pointer field still works).
 */

type Kind = "hub" | "node";

interface Spec {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: Kind;
  radius: number;
}

interface Edge {
  a: string;
  b: string;
}

const SPECS: Spec[] = [
  // hubs — the four places the work lives
  { id: "applications", label: "Applications", x: 0.5, y: 0.24, kind: "hub", radius: 30 },
  { id: "backend", label: "Backend", x: 0.14, y: 0.52, kind: "hub", radius: 30 },
  { id: "data", label: "Data", x: 0.86, y: 0.52, kind: "hub", radius: 30 },
  { id: "ai", label: "AI", x: 0.36, y: 0.8, kind: "hub", radius: 30 },
  { id: "vision", label: "Vision", x: 0.66, y: 0.8, kind: "hub", radius: 30 },
  // satellites — the tools actually used
  { id: "typescript", label: "TypeScript", x: 0.32, y: 0.05, kind: "node", radius: 5 },
  { id: "angular", label: "Angular", x: 0.68, y: 0.05, kind: "node", radius: 5 },
  { id: "vue", label: "Vue.js", x: 0.95, y: 0.24, kind: "node", radius: 5 },
  { id: "rest", label: "REST APIs", x: 0.03, y: 0.28, kind: "node", radius: 5 },
  { id: "python", label: "Python", x: 0.02, y: 0.76, kind: "node", radius: 6 },
  { id: "fastapi", label: "FastAPI", x: 0.27, y: 0.63, kind: "node", radius: 6 },
  { id: "drive", label: "Drive", x: 0.63, y: 0.34, kind: "node", radius: 5 },
  { id: "slack", label: "Slack", x: 0.52, y: 0.09, kind: "node", radius: 5 },
  { id: "confluence", label: "Confluence", x: 0.99, y: 0.4, kind: "node", radius: 5 },
  { id: "jira", label: "Jira", x: 0.8, y: 0.15, kind: "node", radius: 5 },
  { id: "postgres", label: "PostgreSQL", x: 0.97, y: 0.7, kind: "node", radius: 6 },
  { id: "pgvector", label: "pgVector", x: 0.9, y: 0.93, kind: "node", radius: 6 },
  { id: "rag", label: "RAG", x: 0.47, y: 0.58, kind: "node", radius: 6 },
  { id: "embeddings", label: "Embeddings", x: 0.16, y: 0.95, kind: "node", radius: 5 },
  { id: "yolov8", label: "YOLOv8", x: 0.5, y: 0.96, kind: "node", radius: 6 },
  { id: "insightface", label: "InsightFace", x: 0.79, y: 0.99, kind: "node", radius: 6 },
];

const EDGES: Edge[] = [
  { a: "applications", b: "backend" },
  { a: "applications", b: "data" },
  { a: "applications", b: "ai" },
  { a: "backend", b: "ai" },
  { a: "data", b: "ai" },
  { a: "ai", b: "vision" },
  { a: "typescript", b: "applications" },
  { a: "angular", b: "applications" },
  { a: "vue", b: "applications" },
  { a: "rest", b: "backend" },
  { a: "python", b: "backend" },
  { a: "fastapi", b: "backend" },
  { a: "fastapi", b: "ai" },
  { a: "drive", b: "data" },
  { a: "slack", b: "data" },
  { a: "confluence", b: "data" },
  { a: "jira", b: "data" },
  { a: "postgres", b: "data" },
  { a: "pgvector", b: "data" },
  { a: "rag", b: "ai" },
  { a: "embeddings", b: "ai" },
  { a: "yolov8", b: "vision" },
  { a: "insightface", b: "vision" },
  { a: "fastapi", b: "python" },
  { a: "pgvector", b: "postgres" },
  { a: "yolov8", b: "insightface" },
];

interface Point {
  spec: Spec;
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  wake: number;
}

interface Signal {
  edge: Edge;
  t: number;
  speed: number;
}

interface Palette {
  accent: string;
  violet: string;
  body: string;
  ink: string;
  line: string;
  scale: "light" | "dark";
}

const POINTER_RADIUS = 132;
const MAX_SIGNALS = 7;

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const v = (name: string) => style.getPropertyValue(name).trim() || "#888888";
  const dark = document.documentElement.dataset.theme === "dark";
  return {
    accent: v("--c-accent"),
    violet: v("--c-violet"),
    body: v("--c-body"),
    ink: v("--c-ink"),
    line: dark ? "rgba(245,240,230,0.13)" : "rgba(28,24,19,0.12)",
    scale: dark ? "dark" : "light",
  };
}

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const full = hex.length === 3 ? hex.replace(/./g, (c) => c + c) : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return color;
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    // Non-null assertion + runtime guard: the canvas must exist before the
    // effect body wires anything up.
    const canvas = canvasRef.current as HTMLCanvasElement;
    const wrap = wrapRef.current as HTMLDivElement;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let palette = readPalette();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;
    let visible = true;
    const ambient = document.documentElement.dataset.effects !== "off";
    let pointer: { x: number; y: number } | null = null;
    let pointerParallax = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };
    const byId = new Map<string, Spec>();
    SPECS.forEach((spec) => byId.set(spec.id, spec));

    const points: Point[] = SPECS.map((spec, index) => ({
      spec,
      bx: 0,
      by: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: index * 1.7,
      wake: 0,
    }));

    const signals: Signal[] = [];
    let signalCooldown = 0;

    function resize() {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      points.forEach((point) => {
        point.bx = point.spec.x * width;
        point.by = point.spec.y * height;
        point.x = point.bx;
        point.y = point.by;
      });
      draw(0);
    }

    function ambientAllowed() {
      return ambient && !reduceMotion;
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // ---- pointer field -------------------------------------------------
      const drift = ambientAllowed() ? 1 : 0;
      const px = pointer?.x ?? -999;
      const py = pointer?.y ?? -999;

      // ---- edges ---------------------------------------------------------
      for (const edge of EDGES) {
        const a = points.find((p) => p.spec.id === edge.a)!;
        const b = points.find((p) => p.spec.id === edge.b)!;
        const awake = Math.max(a.wake, b.wake);
        const dx = px - (a.x + b.x) / 2;
        const dy = py - (a.y + b.y) / 2;
        const distanceToPointer = Math.hypot(dx, dy);
        const nearPointer = Math.max(0, 1 - distanceToPointer / POINTER_RADIUS);

        const strength = Math.max(awake * 0.85, nearPointer * 0.7);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle =
          strength > 0.02
            ? withAlpha(strength > 0.6 ? palette.violet : palette.accent, 0.16 + strength * 0.5)
            : palette.line;
        ctx!.lineWidth = strength > 0.02 ? 1 + strength * 1.3 : 1;
        ctx!.stroke();
      }

      // ---- nodes ---------------------------------------------------------
      for (const point of points) {
        const driftX = drift ? Math.sin(time * 0.00035 + point.phase) * 5 : 0;
        const driftY = drift ? Math.cos(time * 0.00028 + point.phase) * 4.5 : 0;
        const isHub = point.spec.kind === "hub";

        const targetX = point.bx + driftX;
        const targetY = point.by + driftY;
        // gentle spring back to the drifting home position
        point.x += (targetX - point.x) * 0.08;
        point.y += (targetY - point.y) * 0.08;

        const distanceToPointer = pointer
          ? Math.hypot(px - point.x, py - point.y)
          : Number.POSITIVE_INFINITY;
        const proximity = pointer ? Math.max(0, 1 - distanceToPointer / POINTER_RADIUS) : 0;
        point.wake += (proximity - point.wake) * 0.12;
        const wake = point.wake;

        const radius = point.spec.radius * (1 + wake * 0.22);

        // glow
        if (wake > 0.05 || isHub) {
          const glow = ctx!.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 3.4);
          glow.addColorStop(0, withAlpha(isHub ? palette.accent : palette.violet, 0.13 + wake * 0.3));
          glow.addColorStop(1, withAlpha(palette.accent, 0));
          ctx!.fillStyle = glow;
          ctx!.beginPath();
          ctx!.arc(point.x, point.y, radius * 3.4, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = palette.scale === "dark" ? "#1b1815" : "#ffffff";
        ctx!.fill();
        ctx!.lineWidth = isHub ? 1.4 : 1;
        ctx!.strokeStyle = withAlpha(palette.accent, isHub ? 0.45 + wake * 0.55 : 0.22 + wake * 0.6);
        ctx!.stroke();

        if (isHub) {
          ctx!.fillStyle = wake > 0.35 ? palette.accent : palette.body;
          ctx!.font = `500 ${wake > 0.35 ? "11.5" : "11"}px var(--font-geist-mono), ui-monospace, monospace`;
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.fillText(point.spec.label.toUpperCase(), point.x, point.y);
        } else {
          ctx!.beginPath();
          ctx!.arc(point.x, point.y, 2.4 + wake * 1.6, 0, Math.PI * 2);
          ctx!.fillStyle = withAlpha(palette.violet, 0.5 + wake * 0.5);
          ctx!.fill();

          if (wake > 0.12) {
            ctx!.fillStyle = withAlpha(palette.body, Math.min(0.95, 0.35 + wake));
            ctx!.font = "10px var(--font-geist-mono), ui-monospace, monospace";
            ctx!.textAlign = "center";
            ctx!.textBaseline = "top";
            ctx!.fillText(point.spec.label, point.x, point.y + radius + 6);
          }
        }
      }

      // ---- snap line to the cursor --------------------------------------
      if (pointer) {
        let nearest: Point | null = null;
        let best = Number.POSITIVE_INFINITY;
        for (const point of points) {
          const d = Math.hypot(point.x - px, point.y - py);
          if (d < best) {
            best = d;
            nearest = point;
          }
        }
        if (nearest && best < POINTER_RADIUS * 1.6) {
          ctx!.beginPath();
          ctx!.moveTo(nearest.x, nearest.y);
          ctx!.lineTo(px, py);
          ctx!.strokeStyle = withAlpha(palette.accent, 0.4 * (1 - best / (POINTER_RADIUS * 1.6)));
          ctx!.setLineDash([2, 5]);
          ctx!.stroke();
          ctx!.setLineDash([]);

          ctx!.beginPath();
          ctx!.arc(px, py, 3.4, 0, Math.PI * 2);
          ctx!.fillStyle = withAlpha(palette.accent, 0.75);
          ctx!.fill();
        }
      }

      // ---- travelling signals -------------------------------------------
      if (ambientAllowed()) {
        for (const signal of signals) {
          const a = points.find((p) => p.spec.id === signal.edge.a)!;
          const b = points.find((p) => p.spec.id === signal.edge.b)!;
          const x = a.x + (b.x - a.x) * signal.t;
          const y = a.y + (b.y - a.y) * signal.t;
          ctx!.beginPath();
          ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx!.fillStyle = withAlpha(palette.accent, 0.9 * Math.sin(Math.PI * signal.t));
          ctx!.fill();
        }
      }

      // parallax sheen over the whole field
      parallax.x += (pointerParallax.x - parallax.x) * 0.04;
      parallax.y += (pointerParallax.y - parallax.y) * 0.04;
    }

    function tick(time: number) {
      if (!running) return;

      // signals
      signalCooldown -= 1;
      if (ambientAllowed() && signalCooldown <= 0 && signals.length < MAX_SIGNALS) {
        const edge = EDGES[Math.floor(Math.random() * EDGES.length)];
        signals.push({ edge, t: 0, speed: 0.004 + Math.random() * 0.006 });
        signalCooldown = 26;
      }
      for (let i = signals.length - 1; i >= 0; i--) {
        signals[i].t += signals[i].speed;
        if (signals[i].t > 1) signals.splice(i, 1);
      }

      draw(time);
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      pointerParallax = {
        x: (pointer.x / width - 0.5) * 14,
        y: (pointer.y / height - 0.5) * 14,
      };
      if (!running) draw(performance.now());
    }

    function onPointerLeave() {
      pointer = null;
      pointerParallax = { x: 0, y: 0 };
      if (!running) draw(performance.now());
    }

    const onThemeChange = () => {
      palette = readPalette();
      draw(performance.now());
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(wrap);

    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reduceMotion) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    intersection.observe(wrap);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-effects"],
    });

    wrap.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);

    if (reduceMotion) {
      draw(performance.now());
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion]);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
