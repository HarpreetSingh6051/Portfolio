import type { Experience } from "@/lib/types";

/**
 * EXPERIENCE TIMELINE DATA
 * 
 * Currently contains only verified information.
 * Add real roles, companies, and dates as you confirm them.
 * 
 * IMPORTANT: Do not invent employers or dates.
 * Leave entries as placeholders until verified.
 */
export const experiences: Experience[] = [
  {
    id: "summary",
    period: "2017 — Present",
    title: "Software Engineer → Applied AI Engineer",
    company: "Multiple organizations (details on request)",
    description:
      "Over 8 years of software engineering experience, with approximately the last 3 years focused on applied AI. Career evolved from full-stack development toward AI engineering, combining backend, frontend, and AI integration skills.",
    highlights: [
      "8+ years building production software systems",
      "~3 years focused on applied AI: RAG pipelines, embeddings, and computer vision",
      "Led frontend teams of up to 15 people",
      "Built enterprise RAG platform connecting Google Drive, Dropbox, Slack, Confluence, and Jira",
      "Built computer vision pipeline processing 20 concurrent camera streams with YOLOv8 and InsightFace",
      "Strong backend skills: Python, FastAPI, PostgreSQL, pgVector",
      "Frontend experience with Angular and Vue.js",
    ],
    current: true,
  },
];
