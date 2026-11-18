# Luiz Ricardo Favaro — Portfólio (`ri-favaro.github.io`)

Portfólio profissional e vitrine de projetos técnicos de **Luiz Ricardo Favaro**, construído com **Astro**, **TypeScript** e hospedado estaticamente no **GitHub Pages**.

- **Produção**: [https://ri-favaro.github.io/](https://ri-favaro.github.io/)

---

## Índice da Documentação

| Documento | Conteúdo |
| :--- | :--- |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Stack, dependências, estratégia SSG/GitHub Pages, CI/CD e estrutura de diretórios |
| [docs/DATA_AND_I18N.md](./docs/DATA_AND_I18N.md) | Modelos de dados tipados, arquitetura bilíngue (`pt`/`en`) e injeção de dados no client |
| [docs/DESIGN_SYSTEM_AND_ANTI_SLOP.md](./docs/DESIGN_SYSTEM_AND_ANTI_SLOP.md) | Tokens CSS, Dark/Light mode, acessibilidade e diretrizes anti-slop |
| [docs/AGENT_WORKFLOW.md](./docs/AGENT_WORKFLOW.md) | Regra de worktree isolada, validações obrigatórias, papéis dos agentes e fluxo de PR |
| [AGENTS.md](./AGENTS.md) | Diretrizes gerais de desenvolvimento, limites do GitHub Pages e checklist de qualidade |
| [MERGE_RULES.md](./MERGE_RULES.md) | Matriz de risco e critérios de auto-merge vs. aprovação manual |

---

## Início Rápido

### Pré-requisitos
- **Node.js 22+** (mesma versão usada nos workflows do GitHub Actions)
- **npm**

### Setup e Desenvolvimento Local

```bash
# Instalar dependências
npm ci

# Iniciar servidor de desenvolvimento Astro
npm run dev
```

### Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento local |
| `npm run check` | Executa checagem de tipos (`astro check`) |
| `npm run lint` | Verifica lint e formatação com Biome (`biome check .`) |
| `npm run lint:fix` | Corrige formatação e lint automaticamente com Biome |
| `npm test` | Executa a suíte de testes unitários (`vitest run`) |
| `npm run build` | Gera o site estático de produção em `./dist` |
| `npm run preview` | Visualiza localmente o build gerado em `./dist` |