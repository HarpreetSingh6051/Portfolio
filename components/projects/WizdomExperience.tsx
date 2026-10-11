"use client";

import { FileText } from "lucide-react";
import { PipelinePlayer } from "@/components/projects/PipelinePlayer";
import type { PlayerStage } from "@/components/projects/PipelinePlayer";

const stages: PlayerStage[] = [
  {
    id: "documents",
    label: "Documents",
    description:
      "Connectors pull documents in from Google Drive, Dropbox, Slack, Confluence, and Jira.",
  },
  {
    id: "chunking",
    label: "Chunking",
    description: "Documents are split into chunks, with the strategy tuned to the document type.",
  },
  {
    id: "embeddings",
    label: "Embeddings",
    description: "Each chunk becomes a vector that captures its meaning.",
  },
  {
    id: "pgvector",
    label: "pgVector",
    description: "Vectors land in PostgreSQL with pgVector, ready for similarity search.",
  },
  {
    id: "retrieval",
    label: "Retrieval",
    description: "A query is matched against the stored vectors to find relevant chunks.",
  },
  {
    id: "reranking",
    label: "Reranking",
    description: "Results are reordered so the most relevant context rises to the top.",
  },
  {
    id: "llm",
    label: "LLM response",
    description: "The selected context is passed to the model to produce a grounded answer.",
  },
];

export function WizdomExperience() {
  return (
    <div className="rounded-2xl p-5 sm:p-6">
      <PipelinePlayer
        stages={stages}
        idleHint="Press Play to follow a document from ingestion to a grounded answer."
        doneHint="Context delivered. The answer is built only from what was retrieved."
        token={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
        renderResult={() => (
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/[0.06] px-3 py-2.5">
            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-300 uppercase">
              Selected context → answer
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-300">
              The strongest chunks become the context. The model answers from them, so the
              response stays grounded in retrieved material.
            </p>
          </div>
        )}
      />
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-400">
        Illustrative only. The production system is proprietary — no client data or internal
        detail is shown.
      </p>
    </div>
  );
}
