/**
 * RAG PLAYGROUND — Local Simulation Logic
 * 
 * This is a deterministic, client-side simulation of RAG retrieval.
 * It does NOT use real embeddings, vector databases, or LLMs.
 * It uses keyword matching and TF-IDF-like scoring to demonstrate
 * the retrieval pipeline concept.
 */

export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface RetrievalResult {
  document: KnowledgeDocument;
  score: number;
  matchedTerms: string[];
  chunk: string;
}

export interface PlaygroundAnswer {
  question: string;
  results: RetrievalResult[];
  selectedContext: string;
  answer: string;
  isSimulated: true;
}

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: "doc-1",
    title: "RAG Architecture Overview",
    category: "AI/ML",
    content: `Retrieval-Augmented Generation (RAG) is a technique that combines information retrieval with text generation. The core idea is to retrieve relevant documents from a knowledge base and use them as context for generating answers.

A typical RAG pipeline has two main phases:
1. Ingestion: Documents are processed, chunked, converted to embeddings, and stored in a vector database.
2. Retrieval: A user query is converted to an embedding, similar documents are retrieved, and the results are used to generate an answer.

Key components include:
- Document loaders that connect to various sources
- Text splitters that break documents into chunks
- Embedding models that convert text to vectors
- Vector stores like pgVector, Pinecone, or Weaviate
- Reranking models that improve retrieval quality
- LLMs that generate the final answer

RAG is widely used in enterprise search, customer support, and question-answering systems.`,
  },
  {
    id: "doc-2",
    title: "Chunking Strategies",
    category: "AI/ML",
    content: `Chunking is the process of splitting documents into smaller pieces before embedding. The choice of chunking strategy significantly impacts retrieval quality.

Common strategies:
- Fixed-size chunks: Split by character or token count. Simple but may break context.
- Recursive splitting: Split by paragraphs, then sentences, then words. Preserves structure.
- Semantic splitting: Group sentences by semantic similarity. More expensive but higher quality.
- Document-specific: Use different strategies for different document types.

Key parameters:
- Chunk size: Typically 256-1024 tokens depending on use case
- Overlap: 10-20% overlap between chunks to avoid splitting context
- Metadata: Preserve source, page number, and other metadata with each chunk

The best strategy depends on your document types and query patterns. Evaluation with Recall@K and Precision@K helps validate choices.`,
  },
  {
    id: "doc-3",
    title: "Vector Databases and pgVector",
    category: "Databases",
    content: `Vector databases store and search high-dimensional vectors efficiently. They are essential for RAG systems.

pgVector is a PostgreSQL extension that adds vector similarity search to PostgreSQL. Benefits:
- No separate database to manage
- Full SQL capabilities alongside vector search
- Supports exact and approximate nearest neighbor search
- Works with existing PostgreSQL tooling and backups

Other popular vector databases:
- Pinecone: Managed vector database with simple API
- Weavense: Open-source with hybrid search
- Chroma: Lightweight, good for prototyping
- Milvus: High-performance, distributed

When choosing a vector database, consider: scale, latency requirements, hosting preferences, and whether you need hybrid search (vector + keyword).`,
  },
  {
    id: "doc-4",
    title: "FastAPI for AI Services",
    category: "Backend",
    content: `FastAPI is a modern Python web framework well-suited for AI and ML services.

Why FastAPI works well for AI applications:
- Async support for handling concurrent requests efficiently
- Automatic OpenAPI documentation for API endpoints
- Pydantic models for request/response validation
- Easy integration with ML models and pipelines
- Type hints throughout for better code quality

Common patterns in AI FastAPI services:
- Background tasks for long-running inference
- Streaming responses for real-time generation
- Dependency injection for model loading
- Middleware for rate limiting and authentication

FastAPI is widely used in production AI systems for serving embeddings, running inference, and orchestrating pipelines.`,
  },
  {
    id: "doc-5",
    title: "Computer Vision with YOLOv8",
    category: "AI/ML",
    content: `YOLOv8 is the latest version of the YOLO (You Only Look Once) object detection family. It is widely used for real-time object detection tasks.

Key features of YOLOv8:
- Single-pass detection: predicts bounding boxes and class labels in one forward pass
- High speed: suitable for real-time video processing
- Good accuracy: competitive with other state-of-the-art detectors
- Easy to use: simple Python API with training and inference support

Common use cases:
- Face detection in surveillance systems
- Object counting in retail analytics
- Defect detection in manufacturing
- Vehicle detection in traffic monitoring

For face detection specifically, YOLOv8 can detect faces in video frames. The detected face regions can then be passed to face recognition models like InsightFace for identity-related matching.`,
  },
  {
    id: "doc-6",
    title: "InsightFace for Face Embeddings",
    category: "AI/ML",
    content: `InsightFace is a deep learning toolkit for face analysis. It provides face detection, face recognition, and face alignment capabilities.

Face embeddings are numerical representations of facial features. Key points:
- Embeddings capture identity-related information in a compact vector form
- Similar faces have similar embeddings (measured by cosine similarity)
- Embeddings can be compared for identity-related matching
- InsightFace provides pre-trained models for generating embeddings

Important distinction:
- Face detection: Finding faces in an image (YOLOv8 does this)
- Face recognition/identification: Determining whose face it is (InsightFace embeddings enable this)

A typical pipeline:
1. Detect faces in video frames using YOLOv8
2. Extract face regions
3. Generate embeddings using InsightFace
4. Compare embeddings against a database of known faces
5. Output matches based on similarity threshold

This pipeline can process multiple camera streams concurrently with proper resource management.`,
  },
];

/**
 * Simple TF-IDF-like scoring for demonstration purposes.
 * In production, this would be replaced by actual embedding similarity.
 */
function computeScore(query: string, document: KnowledgeDocument): RetrievalResult | null {
  const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const contentLower = document.content.toLowerCase();
  const titleLower = document.title.toLowerCase();

  const matchedTerms: string[] = [];
  let score = 0;

  for (const term of queryTerms) {
    const inTitle = titleLower.includes(term);
    const inContent = contentLower.includes(term);
    if (inTitle) {
      score += 3;
      matchedTerms.push(term);
    } else if (inContent) {
      score += 1;
      matchedTerms.push(term);
    }
  }

  if (score === 0) return null;

  // Normalize by document length to avoid bias toward long documents
  const normalizedScore = score / Math.sqrt(document.content.length / 100);

  // Extract a relevant chunk (first matching paragraph)
  const paragraphs = document.content.split("\n\n");
  const chunk =
    paragraphs.find((p) =>
      queryTerms.some((t) => p.toLowerCase().includes(t))
    ) || paragraphs[0];

  return {
    document,
    score: Math.round(normalizedScore * 100) / 100,
    matchedTerms,
    chunk: chunk.slice(0, 300) + (chunk.length > 300 ? "..." : ""),
  };
}

/**
 * Simulate the RAG retrieval pipeline.
 * Returns ranked results and a generated answer from the local knowledge base.
 */
export function simulateRetrieval(question: string): PlaygroundAnswer {
  const results: RetrievalResult[] = [];

  for (const doc of KNOWLEDGE_BASE) {
    const result = computeScore(question, doc);
    if (result) {
      results.push(result);
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Take top 3
  const topResults = results.slice(0, 3);

  // Build context from top results
  const selectedContext = topResults
    .map((r) => `[${r.document.title}]\n${r.chunk}`)
    .join("\n\n---\n\n");

  // Generate a simple answer from the context
  const answer = generateAnswer(question, topResults);

  return {
    question,
    results: topResults,
    selectedContext,
    answer,
    isSimulated: true,
  };
}

function generateAnswer(
  question: string,
  results: RetrievalResult[]
): string {
  if (results.length === 0) {
    return "No relevant documents found in the local knowledge base. Try a different question about RAG, chunking, vector databases, FastAPI, YOLOv8, or InsightFace.";
  }

  const topDoc = results[0].document;
  const relatedDocs = results.slice(1).map((r) => r.document.title);

  let answer = `Based on the retrieved context from "${topDoc.title}"`;

  if (relatedDocs.length > 0) {
    answer += ` (with additional context from ${relatedDocs.join(", ")})`;
  }

  answer += `:\n\n`;

  // Extract the most relevant paragraph
  const paragraphs = topDoc.content.split("\n\n");
  const questionTerms = question.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  const bestParagraph =
    paragraphs.find((p) =>
      questionTerms.some((t) => p.toLowerCase().includes(t))
    ) || paragraphs[0];

  answer += bestParagraph;

  if (results.length > 1) {
    answer += `\n\nThis answer was generated from ${results.length} retrieved document chunks. In a production RAG system, these chunks would be passed to an LLM along with the original question to generate a more comprehensive response.`;
  }

  return answer;
}

export const sampleQuestions = [
  "What is RAG and how does it work?",
  "How do chunking strategies affect retrieval?",
  "What is pgVector used for?",
  "How does FastAPI support AI applications?",
  "What is the difference between face detection and face recognition?",
  "How does YOLOv8 work for object detection?",
];
