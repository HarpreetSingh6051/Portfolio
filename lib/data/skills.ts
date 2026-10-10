import type { Skill } from "@/lib/types";

/**
 * SKILLS DATA
 * 
 * level: "professional" = used in professional work
 * level: "learning"    = currently learning, not yet professional
 */
export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: "professional" },
  { name: "TypeScript", category: "Languages", level: "professional" },
  { name: "JavaScript", category: "Languages", level: "professional" },
  { name: "SQL", category: "Languages", level: "professional" },

  // Backend
  { name: "FastAPI", category: "Backend", level: "professional" },
  { name: "REST APIs", category: "Backend", level: "professional" },

  // Frontend
  { name: "Angular", category: "Frontend", level: "professional" },
  { name: "Vue.js", category: "Frontend", level: "professional" },
  { name: "React/Next.js", category: "Frontend", level: "learning" },

  // Databases
  { name: "PostgreSQL", category: "Databases", level: "professional" },
  { name: "pgVector", category: "Databases", level: "professional" },

  // Applied AI
  { name: "RAG", category: "Applied AI", level: "professional" },
  { name: "Embeddings", category: "Applied AI", level: "professional" },
  { name: "Retrieval", category: "Applied AI", level: "professional" },
  { name: "Reranking", category: "Applied AI", level: "professional" },
  { name: "LLM Integration", category: "Applied AI", level: "professional" },

  // Computer Vision
  { name: "YOLOv8", category: "Computer Vision", level: "professional" },
  { name: "InsightFace", category: "Computer Vision", level: "professional" },

  // Engineering
  { name: "Git", category: "Engineering", level: "professional" },
  { name: "GitHub", category: "Engineering", level: "professional" },
  { name: "Testing", category: "Engineering", level: "professional" },
  { name: "API Integration", category: "Engineering", level: "professional" },
  { name: "Deployment", category: "Engineering", level: "professional" },
];

export const skillCategories = [
  "All",
  "Languages",
  "Backend",
  "Frontend",
  "Databases",
  "Applied AI",
  "Computer Vision",
  "Engineering",
] as const;
