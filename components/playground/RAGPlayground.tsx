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
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-medium text-amber-400">Simulation Notice</p>
            <p className="mt-1 text-sm text-zinc-400">
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
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <Search className="h-4 w-4 text-cyan-400" />
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
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 transition-colors focus:border-cyan-500/50 focus:outline-none"
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
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play className="h-4 w-4" />
                {isSimulating ? "Retrieving..." : "Run Retrieval"}
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {/* Sample questions */}
            <div>
              <p className="mb-2 text-xs font-medium text-zinc-500">Try a sample question:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSample(q)}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Knowledge base info */}
            <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="mb-2 text-xs font-medium text-zinc-500">
                Local Knowledge Base ({KNOWLEDGE_BASE.length} documents)
              </p>
              <div className="space-y-1">
                {KNOWLEDGE_BASE.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2 text-xs text-zinc-400">
                    <FileText className="h-3 w-3 text-zinc-600" />
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
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-200">
              <Brain className="h-4 w-4 text-cyan-400" />
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
                  <div className="flex items-center gap-3 text-zinc-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-500" />
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
                  <Search className="mb-3 h-8 w-8 text-zinc-700" />
                  <p className="text-sm text-zinc-500">
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
                    <p className="mb-2 text-xs font-medium text-zinc-500">
                      Retrieved Chunks ({result.results.length})
                    </p>
                    <div className="space-y-2">
                      {result.results.map((r) => (
                        <div
                          key={r.document.id}
                          className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                        >
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-300">
                              {r.document.title}
                            </span>
                            <Badge variant="cyan">
                              Score: {r.score}
                            </Badge>
                          </div>
                          <p className="text-xs leading-relaxed text-zinc-500">
                            {r.chunk}
                          </p>
                          {r.matchedTerms.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {r.matchedTerms.map((term) => (
                                <span
                                  key={term}
                                  className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-xs text-cyan-400"
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
                    <p className="mb-2 text-xs font-medium text-zinc-500">
                      Selected Context (Top Chunks)
                    </p>
                    <div className="max-h-32 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                      <p className="text-xs leading-relaxed whitespace-pre-wrap text-zinc-400">
                        {result.selectedContext}
                      </p>
                    </div>
                  </div>

                  {/* Generated answer */}
                  <div>
                    <p className="mb-2 flex items-center gap-1 text-xs font-medium text-zinc-500">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                      Illustrative Answer
                    </p>
                    <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {result.answer}
                      </p>
                    </div>
                  </div>

                  {/* Production note */}
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
                    <p className="text-xs text-zinc-500">
                      <strong className="text-zinc-400">Production difference:</strong> In a real
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
