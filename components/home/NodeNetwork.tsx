"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";

interface GraphNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  kind: "hub" | "satellite" | "secret";
}

const nodes: GraphNode[] = [
  {
    id: "applications",
    label: "Applications",
    description:
      "Products people actually use — interfaces, workflows, and delivery from idea to production.",
    x: 250,
    y: 78,
    kind: "hub",
  },
  {
    id: "backend",
    label: "Backend",
    description:
      "Python, FastAPI, and REST APIs designed to stay reliable under real production load.",
    x: 92,
    y: 248,
    kind: "hub",
  },
  {
    id: "data",
    label: "Data",
    description:
      "PostgreSQL and pgVector — durable storage plus semantic search over your own content.",
    x: 408,
    y: 248,
    kind: "hub",
  },
  {
    id: "ai",
    label: "AI",
    description:
      "RAG, retrieval, and computer vision woven into the product instead of bolted on.",
    x: 250,
    y: 386,
    kind: "hub",
  },
  { id: "angular", label: "Angular", description: "Structured front-end applications.", x: 150, y: 30, kind: "satellite" },
  { id: "rest", label: "REST APIs", description: "Clear contracts between services and clients.", x: 30, y: 150, kind: "satellite" },
  { id: "fastapi", label: "FastAPI", description: "Typed, async Python services.", x: 34, y: 352, kind: "satellite" },
  { id: "postgres", label: "PostgreSQL", description: "Relational storage as the source of truth.", x: 470, y: 150, kind: "satellite" },
  { id: "pgvector", label: "pgVector", description: "Vector similarity search inside Postgres.", x: 466, y: 352, kind: "satellite" },
  { id: "embeddings", label: "Embeddings", description: "Text turned into vectors that carry meaning.", x: 372, y: 428, kind: "satellite" },
  { id: "yolo", label: "YOLOv8", description: "Real-time detection with InsightFace embeddings.", x: 128, y: 428, kind: "satellite" },
  { id: "rag", label: "RAG", description: "Retrieval, reranking, and grounded LLM answers.", x: 250, y: 476, kind: "satellite" },
  {
    id: "secret",
    label: "Spare node",
    description: "You found the spare node. Curiosity is most of the job — the rest is just shipping.",
    x: 160,
    y: 158,
    kind: "secret",
  },
];

const edges: [string, string][] = [
  ["applications", "backend"],
  ["applications", "data"],
  ["applications", "ai"],
  ["backend", "data"],
  ["backend", "ai"],
  ["data", "ai"],
  ["angular", "applications"],
  ["rest", "backend"],
  ["fastapi", "backend"],
  ["postgres", "data"],
  ["pgvector", "data"],
  ["embeddings", "ai"],
  ["yolo", "ai"],
  ["rag", "ai"],
];

const order = nodes.map((node) => node.id);
const nodeById = (id: string) => nodes.find((node) => node.id === id)!;

const ACCENT = "#1d4ed8";
const VIOLET = "#6d28d9";

export function NodeNetwork() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeId = order[activeIndex];
  const activeNode = nodeById(activeId);

  const connected = new Set<string>([activeId]);
  edges.forEach(([a, b]) => {
    if (a === activeId) connected.add(b);
    if (b === activeId) connected.add(a);
  });

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % order.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + order.length) % order.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(order.length - 1);
    }
  }

  return (
    <figure className="relative">
      <div
        className="relative rounded-3xl p-3 shadow-[0_2px_14px_-8px_rgba(28,24,19,0.18)]"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(29,78,216,0.05), transparent 60%), #ffffff",
          border: "1px solid #e8e2d8",
        }}
      >
        <svg
          viewBox="0 0 500 520"
          className="h-auto w-full touch-manipulation"
          role="group"
          aria-label="Interactive map of the systems I build. Use the arrow keys to move between nodes."
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* orbit rings for depth */}
          <circle cx="250" cy="248" r="196" fill="none" stroke="rgba(28,24,19,0.07)" strokeWidth="1" />
          <circle cx="250" cy="248" r="140" fill="none" stroke="rgba(28,24,19,0.05)" strokeWidth="1" />

          {/* edges */}
          {edges.map(([a, b]) => {
            const from = nodeById(a);
            const to = nodeById(b);
            const isActive = a === activeId || b === activeId;
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? ACCENT : "rgba(28,24,19,0.16)"}
                strokeWidth={isActive ? 1.6 : 1}
                strokeDasharray="2 7"
                className={reduceMotion ? undefined : "animate-network-dash"}
                style={{ opacity: isActive ? 0.85 : 0.55, transition: "stroke 0.3s, opacity 0.3s" }}
              />
            );
          })}

          {/* nodes */}
          {nodes.map((node) => {
            const isActive = node.id === activeId;
            const isConnected = connected.has(node.id);
            const dim = !isConnected;
            const isHub = node.kind === "hub";
            const isSecret = node.kind === "secret";
            const r = isHub ? 42 : isSecret ? 13 : 18;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                onMouseEnter={() => setActiveIndex(order.indexOf(node.id))}
                onClick={() => setActiveIndex(order.indexOf(node.id))}
                style={{ cursor: "pointer", opacity: dim ? 0.38 : 1, transition: "opacity 0.3s" }}
                aria-hidden="true"
              >
                {isActive && <circle r={isHub ? 62 : 30} fill="url(#node-glow)" />}

                <circle
                  r={r}
                  fill={isActive ? "rgba(29,78,216,0.12)" : "rgba(28,24,19,0.04)"}
                  stroke={
                    isActive
                      ? ACCENT
                      : isSecret
                        ? "rgba(109,40,217,0.45)"
                        : isHub
                          ? "rgba(28,24,19,0.3)"
                          : "rgba(28,24,19,0.22)"
                  }
                  strokeWidth={isActive ? 1.8 : 1}
                  style={{ transition: "fill 0.3s, stroke 0.3s" }}
                />

                {isHub && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    letterSpacing="0.3"
                    fill={isActive ? ACCENT : "#57504a"}
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    {node.label}
                  </text>
                )}

                {!isHub && !isSecret && (
                  <circle r="3" fill={isActive ? ACCENT : "rgba(28,24,19,0.45)"} className={isActive && !reduceMotion ? "animate-pulse-soft" : undefined} />
                )}

                {isSecret && (
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="13"
                    fill={VIOLET}
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    ?
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute right-4 bottom-3 font-mono text-[10px] tracking-widest text-muted uppercase">
          <span className="hidden sm:inline">← → to explore</span>
        </div>
      </div>

      <figcaption
        aria-live="polite"
        className="mt-4 flex min-h-[3.5rem] items-start gap-3 rounded-xl border border-line bg-canvas-soft/70 px-4 py-3"
      >
        <span
          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
            activeNode.kind === "secret" ? "bg-violet" : "bg-accent"
          }`}
          aria-hidden="true"
        />
        <span>
          <span className="block font-mono text-[11px] tracking-widest text-muted uppercase">
            {activeNode.label}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-body">
            {activeNode.description}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}