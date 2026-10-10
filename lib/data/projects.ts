import type { Project } from "@/lib/types";

/**
 * FEATURED PROJECTS DATA
 * 
 * Edit this file to add or modify project case studies.
 * Each project gets a dedicated page at /projects/[slug]
 */
export const projects: Project[] = [
  {
    slug: "wizdom-ai",
    name: "Wizdom AI",
    category: "Professional",
    summary:
      "Enterprise knowledge retrieval platform using RAG architecture. Connects to Google Drive, Dropbox, Slack, Confluence, and Jira to build a unified search experience across organizational knowledge sources.",
    problem:
      "Enterprise knowledge was scattered across multiple platforms — Google Drive, Dropbox, Slack, Confluence, and Jira. Employees struggled to find relevant information quickly, leading to duplicated work and slow onboarding.",
    role:
      "Designed and implemented the core retrieval pipeline: document ingestion, chunking strategies, embedding generation, vector storage with pgVector, query processing with reranking, and evaluation using Recall@K and Precision@K.",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgVector",
      "Google Drive API",
      "Dropbox API",
      "Slack API",
      "Confluence API",
      "Jira API",
    ],
    decisions: [
      "Selected chunking strategies based on document type — smaller chunks for structured data like Jira tickets, larger narrative chunks for Confluence pages.",
      "Used PostgreSQL with pgVector as the primary vector store to avoid introducing a separate database, keeping the architecture simpler.",
      "Implemented hybrid retrieval combining vector similarity search with keyword matching to improve recall for exact-match queries.",
      "Built evaluation harness using Recall@K and Precision@K to measure retrieval quality before and after pipeline changes.",
    ],
    challenges: [
      "Handling different document formats and structures from five distinct source connectors required a flexible ingestion pipeline.",
      "Balancing chunk size — smaller chunks improved precision but sometimes broke context needed for meaningful answers.",
      "Managing API rate limits and token costs when embedding large document sets.",
    ],
    results:
      "Delivered a working retrieval pipeline that connected all five source systems and provided unified search with measurable retrieval quality.",
    featured: true,
    pipelineStages: [
      {
        id: "connectors",
        label: "Source Connectors",
        description:
          "Connects to Google Drive, Dropbox, Slack, Confluence, and Jira to fetch documents and content.",
      },
      {
        id: "processing",
        label: "Document Processing",
        description:
          "Parses different file formats, extracts text, and normalizes content for further processing.",
      },
      {
        id: "chunking",
        label: "Chunking",
        description:
          "Splits documents into smaller pieces. Strategy varies by document type — structured data uses smaller chunks, narrative content uses larger ones.",
      },
      {
        id: "embeddings",
        label: "Embeddings",
        description:
          "Converts text chunks into numerical vector representations that capture semantic meaning.",
      },
      {
        id: "pgvector",
        label: "pgVector Storage",
        description:
          "Stores embedding vectors in PostgreSQL using pgVector extension for efficient similarity search.",
      },
    ],
  },
  {
    slug: "vision-ai",
    name: "Vision AI",
    category: "Professional",
    summary:
      "Intelligent surveillance system processing 20 concurrent camera streams. Uses YOLOv8 for face detection and InsightFace for face embeddings and identity-related matching.",
    problem:
      "Security operations centers needed to process video feeds from 20+ cameras simultaneously. Manual monitoring was error-prone and could not scale. The system needed to detect faces in real-time video and support identity-related matching workflows.",
    role:
      "Built the computer vision pipeline: frame extraction from concurrent camera streams, YOLOv8-based face detection, InsightFace embedding generation, and configured matching/output logic.",
    stack: [
      "Python",
      "YOLOv8",
      "InsightFace",
      "OpenCV",
      "FastAPI",
      "PostgreSQL",
    ],
    decisions: [
      "Used YOLOv8 for face detection due to its accuracy/speed tradeoff suitable for real-time video processing.",
      "Used InsightFace for generating face embeddings that could be compared for identity-related matching.",
      "Implemented frame processing pipeline that could handle 20 concurrent streams without dropping frames.",
      "Separated face detection from identity recognition — YOLOv8 detects faces, InsightFace handles embedding generation.",
    ],
    challenges: [
      "Processing 20 concurrent camera streams required careful resource management and efficient frame handling.",
      "Different camera resolutions and lighting conditions affected detection quality.",
      "Balancing detection accuracy with processing speed for real-time use.",
    ],
    results:
      "Delivered a pipeline that could process 20 concurrent camera streams with face detection and embedding generation, supporting downstream identity-related matching workflows.",
    featured: true,
    pipelineStages: [
      {
        id: "cameras",
        label: "Camera Streams",
        description:
          "Ingests video frames from 20 concurrent camera streams in real-time.",
      },
      {
        id: "frames",
        label: "Frame Processing",
        description:
          "Extracts and preprocesses frames — resizing, normalization, and format conversion.",
      },
      {
        id: "detection",
        label: "YOLOv8 Detection",
        description:
          "Detects faces in each frame using YOLOv8 object detection model.",
      },
      {
        id: "embeddings",
        label: "InsightFace Embeddings",
        description:
          "Generates numerical face embeddings using InsightFace for identity-related matching.",
      },
      {
        id: "matching",
        label: "Matching / Output",
        description:
          "Compares embeddings against configured references and outputs results to downstream systems.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────
  // Configurable slot: replace this entry with your latest public
  // project. It renders as the "personal project" card on the homepage
  // and gets its own case study page at /projects/<slug>.
  // ──────────────────────────────────────────────────────────────────
  {
    slug: "personal-project",
    name: "Latest personal project",
    category: "Personal",
    summary:
      "Independent work where I explore applied AI and full-stack ideas end to end — from retrieval experiments to small tools I build and ship on my own.",
    problem:
      "Independent projects are how I test ideas quickly and keep learning, without the constraints of a larger team or product roadmap.",
    role:
      "Designed, built, and deployed these projects independently — from first sketch to working software.",
    stack: ["Python", "TypeScript", "Next.js"],
    decisions: [
      "Prioritised finishing and shipping small, complete projects over endless prototypes.",
      "Chose tools that balance speed of iteration with something genuinely worth keeping.",
    ],
    challenges: [
      "Scoping work so a project can realistically be finished and maintained solo.",
      "Making architectural decisions without a team to review them.",
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
