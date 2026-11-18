# Arquitetura do Portfólio (`ri-favaro.github.io`)

Este documento descreve a stack tecnológica, a estratégia de geração estática (SSG), o pipeline de deploy e a organização de diretórios do portfólio de **Luiz Ricardo Favaro**.

---

## 1. Stack e Dependências Principais

As versões declaradas em [`package.json`](../package.json) compõem a base do projeto:

| Camada | Tecnologia | Versão (package.json) | Papel |
| :--- | :--- | :--- | :--- |
| **Framework SSG** | Astro | `^7.4.11` | Geração de páginas estáticas com zero JS por padrão |
| **UI / Ilhas** | React (`@astrojs/react`, `react`, `react-dom`) | `^7.1.8` / `^19.0.0` | Suporte a componentes interativos quando necessário |
| **Linguagem** | TypeScript | `^5.7.3` | Tipagem estática (`astro/tsconfigs/strict`) |
| **Type Check** | `@astrojs/check` | `^0.9.12` | Verificação de tipos em arquivos `.astro` e `.ts` |
| **Lint & Formatação** | Biome (`@biomejs/biome`) | `^2.6.7` | Linter e formatter unificado (`biome.json`) |
| **Testes Unitários** | Vitest | `^5.1.0` | Suíte de testes de dados e traduções |

### Configuração de Tooling
- **TypeScript (`tsconfig.json`)**: estende `astro/tsconfigs/strict` com `jsx: "react-jsx"` e `jsxImportSource: "react"`.
- **Biome (`biome.json`)**: escopo em `src/**/*.ts`, `src/**/*.tsx`, `src/**/*.js` e `tests/**/*.ts`, com indentação de 2 espaços, largura de linha 100, aspas simples e ponto e vírgula obrigatório.

---

## 2. Estratégia de Geração Estática (SSG) e GitHub Pages

O projeto é configurado em [`astro.config.mjs`](../astro.config.mjs) para gerar um bundle 100% estático em `./dist`:

- `site: 'https://ri-favaro.github.io'`
- `base: '/'`
- `integrations: [react()]`

### Limites de Hospedagem (GitHub Pages)
Por ser servido estaticamente no GitHub Pages:
- **Permitido**: HTML5, CSS3, JS/TS compilado, WASM, armazenamento local (`localStorage`, `IndexedDB`), consumo de APIs externas com CORS.
- **Proibido**: servidores backend residentes (Node/Python/Go), SSR em tempo de requisição e chaves secretas ou credenciais no código frontend.

### Pipelines de CI/CD
- **Validação em PR (`.github/workflows/ci.yml`)**: roda em toda Pull Request para `main` (Node 22, `npm ci`, `npm run check`, `npm run lint`, `npm run test`, `npm run build`).
- **Deploy em Produção (`.github/workflows/deploy.yml`)**: roda em push na `main`, executa `npm run build`, empacota `./dist` com `actions/upload-pages-artifact@v3` e publica via `actions/deploy-pages@v4`.

---

## 3. Estrutura de Diretórios

```text
ri-favaro.github.io/
├── .github/workflows/       # Pipelines CI (ci.yml) e Deploy (deploy.yml)
├── docs/                    # Documentação técnica e diretrizes para humanos e agentes
├── public/                  # Assets estáticos servidos na raiz (avatar.jpg, apps/)
├── src/
│   ├── components/          # Componentes Astro reutilizáveis (Controls.astro, ProjectCard.astro)
│   ├── data/                # Fontes de dados tipadas e dicionários i18n (projects.ts, skillsData.ts, translations.ts)
│   ├── layouts/             # Layout base com meta tags, Open Graph e script anti-FOUC (Layout.astro)
│   ├── pages/               # Rotas estáticas (index.astro, skills.astro)
│   ├── scripts/             # Scripts client-side para interatividade (skillsExplorer.js)
│   └── styles/              # Tokens CSS globais, temas Dark/Light e utilitários (global.css)
├── tests/                   # Testes unitários Vitest (projects.test.ts, skills.test.ts, translations.test.ts)
├── AGENTS.md                # Diretrizes operacionais gerais para agentes
├── MERGE_RULES.md           # Matriz de risco e autonomia de merge
└── README.md                # Guia de início rápido e índice documental
```