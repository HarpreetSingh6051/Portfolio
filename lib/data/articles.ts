import type { Article } from "@/lib/types";

/**
 * ENGINEERING NOTES & LEARNING JOURNAL
 * 
 * Add articles in two ways:
 * 1. Create a .md file in content/notes/ with frontmatter (title, date, tags)
 * 2. Or add entries directly to this array with content as markdown strings
 * 
 * Articles appear on the home page preview and at /notes/[slug]
 */
export const articles: Article[] = [
  {
    slug: "rag-retrieval-lessons",
    title: "Lessons from Building a Production RAG Pipeline",
    date: "2026-10-08",
    tags: ["RAG", "Retrieval", "Embeddings"],
    readingTime: 6,
    excerpt:
      "Key lessons from building an enterprise RAG system: chunking strategy matters more than model choice, evaluation with Recall@K and Precision@K is essential, and hybrid retrieval consistently outperforms pure vector search for exact-match queries.",
    content: `## Lessons from Building a Production RAG Pipeline

Building a Retrieval-Augmented Generation system for enterprise knowledge retrieval taught me several practical lessons that aren't obvious from tutorials.

### Chunking Strategy Matters Most

The biggest impact on retrieval quality came not from the embedding model, but from how documents were chunked. Structured data like Jira tickets needed small, precise chunks. Narrative content like Confluence pages needed larger chunks that preserved context.

### Evaluation Is Non-Negotiable

Without Recall@K and Precision@K measurements, pipeline changes are guesswork. We built an evaluation harness that tested retrieval quality before and after every change — chunking strategy, embedding model, reranking approach.

### Hybrid Retrieval Wins

Pure vector similarity search struggles with exact-match queries (ticket IDs, error codes, proper nouns). Combining vector search with keyword matching (BM25 or similar) consistently improved recall.

### What's Different in Production

Production RAG is not just "embed documents and search." It requires:
- Document ingestion pipelines that handle multiple formats
- Incremental updates when source documents change
- Rate limiting and cost management for embedding APIs
- Monitoring retrieval quality over time`,
  },
  {
    slug: "embedding-chunking-experiments",
    title: "Embedding and Chunking Experiments: What Worked",
    date: "2026-09-25",
    tags: ["Embeddings", "Chunking", "RAG"],
    readingTime: 4,
    excerpt:
      "A record of experiments with different chunk sizes, overlap strategies, and embedding models. Spoiler: smaller chunks with overlap won for precision, but required more careful reranking.",
    content: `## Embedding and Chunking Experiments

I ran a series of experiments to find the right chunking strategy for different document types.

### Experiment 1: Fixed vs Semantic Chunking

Fixed-size chunks (512 tokens) were fast but often split mid-sentence. Semantic chunking (splitting on paragraph boundaries) preserved context better but produced variable-size chunks.

### Experiment 2: Chunk Overlap

Adding 10-15% overlap between chunks reduced the problem of relevant information being split across boundaries. The cost was more embeddings to store and search.

### Experiment 3: Document-Specific Strategies

The best results came from using different strategies per document type:
- **Jira tickets**: Small chunks (256 tokens), no overlap
- **Confluence pages**: Large chunks (1024 tokens) with paragraph preservation
- **Slack messages**: Thread-level grouping before chunking
- **Code files**: Function-level splitting

### Results

No single strategy won everywhere. The investment in a flexible ingestion pipeline that could apply different strategies per document type paid off significantly.`,
  },
  {
    slug: "python-patterns-for-ai",
    title: "Python Patterns for AI Pipeline Code",
    date: "2026-09-15",
    tags: ["Python", "Patterns", "Engineering"],
    readingTime: 5,
    excerpt:
      "Python patterns I use consistently in AI pipeline code: typed data classes for pipeline stages, structured logging, graceful degradation when external APIs fail, and configuration-driven behavior.",
    content: `## Python Patterns for AI Pipeline Code

After building several AI pipelines, I've settled on a set of patterns that make the code maintainable and debuggable.

### Typed Pipeline Stages

Using Pydantic models for each stage's input and output catches errors early and makes the pipeline self-documenting.

\`\`\`python
from pydantic import BaseModel

class Document(BaseModel):
    id: str
    content: str
    source: str
    metadata: dict

class Chunk(BaseModel):
    document_id: str
    content: str
    index: int
    token_count: int
\`\`\`

### Structured Logging

Every pipeline stage logs its input/output sizes, timing, and any anomalies. This makes it possible to debug production issues without reproducing them locally.

### Graceful Degradation

External APIs (Google Drive, Slack, etc.) fail. The pipeline should log the failure, skip the affected documents, and continue processing. Failed documents go to a retry queue.

### Configuration-Driven Behavior

Chunk sizes, embedding models, retry counts — all configurable via environment variables or config files. No hardcoded magic numbers.`,
  },
];
