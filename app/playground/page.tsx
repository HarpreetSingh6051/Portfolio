import type { Metadata } from "next";
import { RAGPlayground } from "@/components/playground/RAGPlayground";

export const metadata: Metadata = {
  title: "RAG Playground",
  description:
    "An in-browser simulation of a retrieval-augmented generation pipeline. See how documents are scored, ranked, and assembled into context.",
};

export default function PlaygroundPage() {
  return (
    <div className="pt-16">
      <RAGPlayground />
    </div>
  );
}
