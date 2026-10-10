/** Shared TypeScript types used across the portfolio */

export interface Project {
  slug: string;
  name: string;
  category: "Professional" | "Personal" | "Open Source";
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  decisions: string[];
  challenges: string[];
  results?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  pipelineStages?: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  label: string;
  description: string;
  icon?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: "professional" | "learning";
}

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "Frontend"
  | "Databases"
  | "Applied AI"
  | "Computer Vision"
  | "Engineering";

export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
  current?: boolean;
}

export interface DSARecord {
  id: string;
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  date: string;
  solved: boolean;
  notes?: string;
}

export interface DSAStats {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  weeklyGoal: number;
}

export interface WeeklyActivity {
  week: string;
  count: number;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readingTime: number;
  excerpt: string;
  content?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
}
