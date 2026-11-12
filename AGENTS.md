# AGENTS.md — Diretrizes de Desenvolvimento e Automação com Agentes LLM

Este documento define a arquitetura, convenções, limites de hospedagem e fluxos de trabalho para qualquer agente de IA ou desenvolvedor atuando no repositório **`ri-favaro.github.io`**.

---

## 1. Visão Geral do Repositório

- **Propósito**: Portfólio profissional e vitrine de projetos técnicos de **Luiz Ricardo Favaro**.
- **URL de Produção**: [https://ri-favaro.github.io/](https://ri-favaro.github.io/)
- **Hospedagem**: **GitHub Pages** (repositório de usuário/organização raiz).
- **Modelo de Conteúdo**: Híbrido:
  1. **Página Principal**: Perfil, biografia, stack técnica, histórico e vitrine de projetos.
  2. **Sub-projetos / Demos Interativos**: Mini-aplicações estáticas servidas em subpastas ou rotas (ex.: `/apps/widrow-hoff/` ou `/demos/<nome-do-projeto>/`).
  3. **Projetos Externos**: Cards com links para repositórios externos, artigos e deploys em nuvem (Vercel, Render, Azure, etc.).

---

## 2. Limites Técnicos da Hospedagem (GitHub Pages)

O GitHub Pages é uma hospedagem de **arquivos estáticos**. Agentes devem respeitar estritamente estas fronteiras:

### O que É Suportado:
- **Linguagens & Runtimes no Navegador**: HTML5, CSS3, JavaScript (ESNext), TypeScript (compilado para JS), WebAssembly (WASM).
- **Frameworks & Bundlers (SSG / SPA)**:
  - Astro, Vite (React / Vue / Svelte / Vanilla), Next.js (`output: 'export'`), SvelteKit (`adapter-static`), Hugo, 11ty.
  - Builds automatizados via **GitHub Actions** gerando o bundle para a branch de deploy ou artefato de Pages.
- **Bancos de Dados & Armazenamento Local**:
  - `localStorage`, `sessionStorage`, `IndexedDB`, OPFS (*Origin Private File System*).
  - SQLite no navegador via WASM (ex.: `sql.js` ou `wa-sqlite`).
- **Machine Learning & IA Client-Side**:
  - Transformers.js (ONNX Runtime Web), WebLLM, TensorFlow.js.
- **Integração com Backends e BaaS (Externos)**:
  - Consumo de APIs REST / GraphQL públicas ou autenticadas via token de cliente (com CORS habilitado).
  - BaaS serverless: Supabase (PostgreSQL + Auth + Realtime), Firebase, Cloudflare Workers, Vercel Serverless Functions.

### O que NÃO É Suportado Diretamente no GitHub Pages:
- ❌ **Sem Servidor Backend Residente**: Não há runtime contínuo de Node.js, Python/Django, Go, Java ou PHP executando dentro da infraestrutura do GitHub Pages.
- ❌ **Sem SSR Dinâmico em Tempo de Requisição**: Next.js Server Components dinâmicos ou `getServerSideProps` não funcionam sem export estático.
- ❌ **Sem Chaves Secretas no Frontend**: Chaves de API privadas (ex.: OpenAI API Key paga, credenciais master de banco) jamais devem ser embutidas no código ou enviadas ao client. Devem ficar em proxies serverless externos (ex.: Cloudflare Workers com secrets).
- ❌ **Sem Banco de Dados Nativo**: Não há serviço de MySQL/Postgres hospedado pelo GitHub Pages.
- ❌ **Limites do GitHub Pages**:
  - Limite suave de tráfego: 100 GB/mês.
  - Tamanho máximo de arquivo individual: 100 MB.
  - Repositório recomendado: < 1 GB.

---

## 3. Arquitetura e Organização de Código

### 3.1. Estado Atual
- **Framework SSG**: **Astro v5** com integração **React** (`@astrojs/react`) e TypeScript.
- **Deploy**: GitHub Actions automatizado via `.github/workflows/deploy.yml`.
- **Estrutura de Pastas**:
  - `src/pages/index.astro`: Página principal estática.
  - `src/components/`: Componentes reutilizáveis (`Controls.astro`, `ProjectCard.astro`, etc.).
  - `src/data/`: Fontes de dados tipadas (`projects.ts`, `translations.ts`).
  - `src/styles/global.css`: CSS global, temas Dark/Light e variáveis.
  - `public/`: Assets estáticos (`avatar.jpg`) e mini-apps em `public/apps/<nome>/`.
- **Internacionalização**: Suporte bilíngue nativo e instantâneo via CSS e `html[lang="pt|en"]`.
- **Temas**: Alternância de tema Dark/Light com persistência em `localStorage` e script anti-FOUC no `<head>`.

### 3.2. Estratégia de Evolução (Evolução Gradual para SSG Moderno)
Quando o projeto migrar para bundler/SSG (Astro ou Vite + React):
1. **Página Principal**: Componentes reativos, renderizados estaticamente no build para pontuação máxima em Core Web Vitals (LCP, CLS, INP).
2. **Sub-projetos e Demonstrações**:
   - Manter diretório dedicado para mini-aplicações (ex.: `apps/` ou `projects/`).
   - Cada sub-aplicação estática deve ter seus assets com caminhos relativos ou configurados com `base: './'` ou `base: '/apps/<nome>/'` para não quebrar rotas.
3. **Fallback para Roteamento SPA (se aplicável)**:
   - Em caso de roteamento client-side (React Router / Vue Router modo History), configurar cópia de `index.html` para `404.html` no build para suportar refresh de URL no GitHub Pages.

---

## 4. Convenções de Código e Boas Práticas

- **Semântica & Acessibilidade (a11y)**:
  - Tags HTML semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Imagens com atributo `alt` descritivo.
  - Contraste de cores adequado em temas claro e escuro (WCAG AA).
  - Foco visível e navegação por teclado nos elementos interativos.
- **CSS & Design**:
  - Variáveis CSS (Custom Properties) para temas de cores, espaçamentos e tipografia.
  - Design *Mobile-First* e totalmente responsivo.
  - Evitar frameworks CSS pesados desnecessários; priorizar CSS moderno e performático.
- **JavaScript & TypeScript**:
  - Código modular, limpo e legível.
  - Manipulação de DOM segura, evitando `innerHTML` com entradas de usuário não sanitizadas.
  - Manter consistência do sistema bilíngue (Português / Inglês) em novos textos e cards.

---

## 5. Fluxo Git e Convenções de Commit

- **Branch Principal**: `main`.
- **Idioma dos Commits**: Português brasileiro (`pt-br`).
- **Padrão de Mensagens**: **Conventional Commits**:
  - `feat: adiciona card e demo do novo projeto X`
  - `fix: corrige alinhamento de botoes no tema escuro`
  - `docs: atualiza documentacao do AGENTS.md`
  - `style: ajusta espacamento e tipografia da secao sobre`
  - `refactor: modulariza funcoes de traducao em script.js`
  - `chore: atualiza dependencias e configuracao de build`

---

## 6. Checklist de Qualidade para Agentes

Antes de concluir qualquer alteração no código:

1. [ ] **Verificação de Links e Caminhos**: Garantir que caminhos de imagens, scripts e links relativos funcionem na raiz e em subpastas.
2. [ ] **Responsividade**: Validar visualização em resoluções mobile (320px–480px) e desktop (1024px+).
3. [ ] **Suporte a Temas**: Testar aparência tanto no modo escuro (*Dark Mode*) quanto no claro (*Light Mode*).
4. [ ] **Internacionalização**: Se novos textos forem inseridos na interface, adicionar chaves e traduções nos dicionários PT e EN correspondentes.
5. [ ] **Validação Estática**: Validar que não há erros de sintaxe ou referências quebradas no console do navegador.
