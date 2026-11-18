---
noteSlug: benito-arquitetura-rag-local
lang: pt
title: "Benito: RAG vetorial local em ~270MB de RAM e raciocínio desacoplado"
summary: "Como estruturei o pipeline de busca vetorial com LanceDB, EmbeddingGemma-2 e indexação incremental por SHA-256 sem sacrificar latência ou segurança de filesystem."
publishedAt: "2026-11-17"
tags: ["RAG", "LanceDB", "Node.js", "TypeScript", "Segurança"]
---

Ao projetar o **Benito**, meu objetivo foi manter um assistente pessoal autônomo rodando localmente com baixo consumo de memória e execução previsível de ferramentas.

## 1. Raciocínio desacoplado em streaming

Em vez de esperar toda a etapa de raciocínio terminar antes de iniciar a saída ou misturar tokens internos na resposta final, o loop cognitivo usa um **parser FSM (Finite State Machine) em streaming**. Isso separa o fluxo de decisão da resposta entregue ao usuário sem adicionar latência perceptível.

## 2. RAG local leve (~270MB RAM)

Para memória e recuperação de contexto local sem depender de serviços externos:

- **Banco vetorial embutido:** `LanceDB` rodando no processo Node.js.
- **Embeddings locais:** `EmbeddingGemma-2` (768 dimensões), mantendo a pegada de memória em torno de **270MB**.
- **Indexação incremental via SHA-256:** apenas arquivos novos ou modificados têm seus chunks reprocessados e reindexados, evitando re-embedding desnecessário a cada execução.

## 3. Sandbox de filesystem (`path-guard`) e whitelist

Agentes que executam comandos locais precisam de limites explícitos:

- O runner de orquestração aceita apenas comandos presentes em uma **whitelist** controlada.
- Todo acesso a arquivos passa por um **sandbox (`path-guard`)** com controle de timeout, impedindo leitura ou escrita fora dos diretórios autorizados.
- O comportamento é validado por **13+ suítes de testes automatizados** com Jest e Node.js Test Runner.
