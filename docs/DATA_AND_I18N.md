# Dados Tipados, Internacionalização (i18n) e Scripts Client-Side

Este documento detalha a modelagem de dados em TypeScript, a arquitetura bilíngue (`pt` / `en`) e o padrão de hidratação/injeção de dados para scripts no navegador.

---

## 1. Organização dos Dados Tipados (`src/data/`)

Todos os conteúdos estruturados residem em `src/data/` e são validados por testes unitários em `tests/`:

### `src/data/projects.ts`
Exporta a interface `Project` e o array `projects`:
- `id`: identificador único do projeto.
- `title` e `description`: objetos bilíngues `{ pt: string; en: string }`.
- `tags`: lista de tecnologias (`string[]`).
- `link`, `linkText` (`{ pt: string; en: string }`) e `isInternal` (opcional, para rotas internas como `/skills` ou `/apps/...`).

### `src/data/skillsData.ts`
Alimenta o explorador interativo de skills e playbooks em `/skills`:
- `SkillItem`: `id`, `kind` (`'skill' | 'principle'`), `category`, `command`, `manualOnly`, `summary` (`{ pt, en }`), `example`, e `relations` (`uses`, `usedBy`, `pairsWith`).
- `WorkflowItem`: fluxos compostos com `title`, `tag`, `desc` bilíngues e `steps` referenciando `skillId`.
- `DailyPractice`: práticas diárias ordenadas (`step`, `title`, `skills`, `summary`).
- Estruturas auxiliares de grafo e cores por categoria (`GRAPH_NODES`, `GRAPH_EDGES`, `CAT_COLORS`).

### `src/data/translations.ts`
Centraliza os textos institucionais da página principal (`content.pt` e `content.en`) — cobrindo `hero`, `about`, `projects` e `footer` — além da lista `skillsList`.

---

## 2. Arquitetura de Internacionalização (PT-BR / EN)

O portfólio adota **troca instantânea de idioma no cliente sem recarregamento de página** e sem duplicação de rotas:

1. **Detecção e Anti-FOUC (`src/layouts/Layout.astro`)**:
   - Um `<script is:inline>` no `<head>` lê `localStorage.getItem('lang')`.
   - Caso não exista preferência salva, verifica `navigator.language` (usa `'en'` se começar com `'en'`, caso contrário `'pt'`).
   - Define `document.documentElement.setAttribute('lang', lang)` antes da primeira pintura.
2. **Alternância via CSS (`src/styles/global.css`)**:
   - Elementos estáticos bilíngues recebem `data-lang="pt"` ou `data-lang="en"`.
   - O CSS oculta o idioma inativo instantaneamente:
     ```css
     html[lang="pt"] [data-lang="en"] { display: none !important; }
     html[lang="en"] [data-lang="pt"] { display: none !important; }
     ```
3. **Controle de Usuário (`src/components/Controls.astro`)**:
   - O botão de idioma alterna `lang` entre `'pt'` e `'en'`, atualiza o atributo em `<html>` e persiste em `localStorage`.

### Regras ao Adicionar Novos Textos
- Sempre forneça versões equivalentes em `pt` e `en` nas interfaces de dados ou em `src/data/translations.ts`.
- Rode `npm test` para garantir que [`tests/translations.test.ts`](../tests/translations.test.ts) e [`tests/projects.test.ts`](../tests/projects.test.ts) continuem aprovados.

---

## 3. Injeção Reativa de Dados no Client (`src/scripts/`)

Como páginas Astro são geradas em tempo de build (SSG), dados complexos que exigem filtragem, busca ou visualização dinâmica no navegador seguem o padrão usado em [`src/pages/skills.astro`](../src/pages/skills.astro) + [`src/scripts/skillsExplorer.js`](../src/scripts/skillsExplorer.js):

1. **Serialização segura no build**:
   - A página `.astro` importa os dados tipados de `src/data/` no frontmatter e os expõe ao escopo global via `<script is:inline define:vars={{ ... }}>`, atribuindo a um namespace dedicado (ex.: `window.__SKILLS_DATA__`).
2. **Inicialização modular**:
   - O script cliente em `src/scripts/` é importado via `<script>` padrão do Astro, lê `window.__SKILLS_DATA__` e encerra silenciosamente (`if (!data) return;`) se o container não existir.
3. **Idioma reativo e segurança de DOM**:
   - O script consulta `document.documentElement.getAttribute('lang') || 'pt'` no momento da renderização e re-renderiza quando o idioma muda.
   - **Sanitização obrigatória**: qualquer string interpolada em HTML deve passar por `escapeHtml()` antes de ser inserida no DOM.