"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, FileText, Search, Brain, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Section, SectionHeader, Reveal } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { simulateRetrieval, sampleQuestions, KNOWLEDGE_BASE } from "@/lib/utils/rag";
import type { PlaygroundAnswer } from "@/lib/utils/rag";

export function RAGPlayground() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<PlaygroundAnswer | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRun = () => {
    if (!question.trim()) return;
    setIsSimulating(true);
    // Simulate a brief processing delay for UX
    setTimeout(() => {
      const answer = simulateRetrieval(question.trim());
      setResult(answer);
      setIsSimulating(false);
    }, 600);
  };

  const handleSample = (q: string) => {
    setQuestion(q);
    setIsSimulating(true);
    setTimeout(() => {
      const answer = simulateRetrieval(q);
      setResult(answer);
      setIsSimulating(false);
    }, 600);
  };

  const handleReset = () => {
    setQuestion("");
    setResult(null);
  };

  return (
    <Section id="playground" background="muted">
      <SectionHeader
        label="Interactive Demo"
        title="RAG Playground"
        description="A local simulation of a RAG retrieval pipeline. Enter a question and see how documents are retrieved and ranked — all in your browser, no API calls."
      />

      {/* Honest disclaimer */}
      <Reveal>
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-600/25 bg-amber-600/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">Simulation Notice</p>
            <p className="mt-1 text-sm text-body">
              This is a <strong>local simulation</strong> using keyword matching on sample documents.
              It does NOT use real embeddings, vector databases, or LLMs. It demonstrates the
              retrieval pipeline concept for educational purposes.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Input */}
        <Reveal>
          <Card className="h-full">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <Search className="h-4 w-4 text-accent" />
              Ask a Question
            </h3>

            <div className="mb-4">
              <label htmlFor="rag-question" className="sr-only">
                Enter your question
              </label>
              <textarea
                id="rag-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What is RAG and how does it work?"
                className="w-full resize-none rounded-lg border border-line bg-canvas/50 px-4 py-3 text-sm text-ink placeholder-muted transition-colors focus:border-accent/60 focus:outline-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleRun();
                  }
                }}
              />
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={handleRun}
                disabled={!question.trim() || isSimulating}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-medium text-canvas transition-all hover:bg-ink-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                {isSimulating ? "Retrieving..." : "Run Retrieval"}
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-paper px-4 py-2 text-sm font-medium text-body transition-colors hover:border-line-strong hover:bg-canvas-soft"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Sample questions */}
            <div>
              <p className="mb-2 text-xs font-medium text-muted">Try a sample question:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSample(q)}
                    className="rounded-md border border-line bg-paper px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Knowledge base info */}
            <div className="mt-6 rounded-lg border border-line bg-canvas/50 p-4">
              <p className="mb-2 text-xs font-medium text-muted">
                Local Knowledge Base ({KNOWLEDGE_BASE.length} documents)
              </p>
              <div className="space-y-1">
                {KNOWLEDGE_BASE.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2 text-xs text-muted">
                    <FileText className="h-3 w-3 text-line-strong" />
                    {doc.title}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Right: Results */}
        <Reveal delay={0.1}>
          <Card className="h-full">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
              <Brain className="h-4 w-4 text-accent" />
              Retrieval Results
            </h3>

            <AnimatePresence mode="wait">
              {isSimulating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-12"
                >
                  <div className="flex items-center gap-3 text-muted">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
                    <span className="text-sm">Retrieving relevant chunks...</span>
                  </div>
                </motion.div>
              )}

              {!isSimulating && !result && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Search className="mb-3 h-8 w-8 text-line-strong" />
                  <p className="text-sm text-muted">
                    Enter a question and click &quot;Run Retrieval&quot; to see results.
                  </p>
                </motion.div>
              )}

              {!isSimulating && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Retrieved chunks */}
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted">
                      Retrieved Chunks ({result.results.length})
                    </p>
                    <div className="space-y-2">
                      {result.results.map((r) => (
                        <div
                          key={r.document.id}
                          className="rounded-lg border border-line bg-canvas/50 p-3"
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs font-medium text-ink">
                              {r.document.title}
                            </span>
                            <Badge variant="accent">
                              Score: {r.score}
                            </Badge>
                          </div>
                          <p className="text-xs leading-relaxed text-body">
                            {r.chunk}
                          </p>
                          {r.matchedTerms.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {r.matchedTerms.map((term) => (
                                <span
                                  key={term}
                                  className="rounded bg-accent-soft px-1.5 py-0.5 text-xs text-accent"
                                >
                                  {term}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected context */}
                  <div>
                    <p className="mb-2 text-xs font-medium text-muted">
                      Selected Context (Top Chunks)
                    </p>
                    <div className="max-h-32 overflow-y-auto rounded-lg border border-line bg-canvas/50 p-3">
                      <p className="text-xs leading-relaxed whitespace-pre-wrap text-body">
                        {result.selectedContext}
                      </p>
                    </div>
                  </div>

                  {/* Generated answer */}
                  <div>
                    <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      Illustrative Answer
                    </p>
                    <div className="rounded-lg border border-emerald-600/25 bg-emerald-600/10 p-4">
                      <p className="text-sm leading-relaxed text-ink">
                        {result.answer}
                      </p>
                    </div>
                  </div>

                  {/* Production note */}
                  <div className="rounded-lg border border-line bg-canvas/50 p-3">
                    <p className="text-xs text-muted">
                      <strong className="text-muted">Production difference:</strong> In a real
                      RAG system, the selected context would be passed to an LLM (like GPT-4 or
                      Claude) along with the original question. The LLM would generate a
                      comprehensive answer using the retrieved context. This simulation uses
                      pre-written content from the knowledge base instead.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}