---
noteSlug: benito-arquitetura-rag-local
lang: en
title: "Benito: Local Vector RAG in ~270MB RAM and Decoupled Reasoning"
summary: "How I structured the local vector search pipeline with LanceDB, EmbeddingGemma-2, and SHA-256 incremental indexing without sacrificing latency or filesystem safety."
publishedAt: "2026-11-17"
tags: ["RAG", "LanceDB", "Node.js", "TypeScript", "Security"]
---

When designing **Benito**, my goal was to run an autonomous personal assistant locally with a small memory footprint and predictable tool execution.

## 1. Streaming Decoupled Reasoning

Instead of blocking user output until reasoning completes or leaking internal tokens into the final answer, the cognitive loop uses a **streaming FSM (Finite State Machine) parser**. This cleanly separates decision steps from user-facing output with zero extra latency.

## 2. Lightweight Local RAG (~270MB RAM)

For local context retrieval without external vector database services:

- **Embedded vector store:** `LanceDB` running directly inside the Node.js process.
- **Local embeddings:** `EmbeddingGemma-2` (768 dimensions), keeping memory usage around **270MB**.
- **SHA-256 incremental indexing:** only new or modified files are chunked and re-embedded, avoiding redundant work across runs.

## 3. Filesystem Sandbox (`path-guard`) & Command Whitelist

Local agents executing tools need explicit boundaries:

- The orchestration runner only allows commands defined in an explicit **whitelist**.
- File operations pass through a strict **filesystem sandbox (`path-guard`)** with timeout enforcement.
- Core behavior is covered by **13+ automated test suites** using Jest and the Node.js Test Runner.
