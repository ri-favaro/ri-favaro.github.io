# Design System e Diretrizes Anti-Slop

Este documento estabelece os padrões visuais, tokens CSS, regras de acessibilidade e critérios **anti-slop** adotados no portfólio para manter estética de produto real e alta legibilidade.

---

## 1. Tokens CSS e Sistema de Cores (`src/styles/global.css`)

Toda estilização deve consumir as Custom Properties definidas em `:root` (Dark Mode padrão) e `:root[data-theme="light"]` (Light Mode), evitando cores hexadecimais soltas:

| Token | Dark Mode (`:root`) | Light Mode (`[data-theme="light"]`) | Uso |
| :--- | :--- | :--- | :--- |
| `--bg` | `#054434` | `#FAFAF8` | Fundo principal da página |
| `--bg-gradient` | `radial-gradient(...)` sutil em `#5FBFB0` | `radial-gradient(...)` sutil em `#054434` | Profundidade sutil no topo |
| `--text` | `#F5F5F0` | `#172422` | Texto principal |
| `--text-muted` | `#B8C7C4` | `#566864` | Subtítulos, metadados e legendas |
| `--accent` | `#5FBFB0` | `#054434` | Links, destaques e ações primárias |
| `--accent-hover` | `#7BD1C4` | `#08664E` | Estado `:hover` de elementos interativos |
| `--accent-subtle` | `rgba(95, 191, 176, 0.12)` | `rgba(5, 68, 52, 0.08)` | Fundo de badges e tags |
| `--card-bg` | `rgba(255, 255, 255, 0.05)` | `rgba(5, 68, 52, 0.03)` | Superfície de cards e controles |
| `--card-bg-hover` | `rgba(255, 255, 255, 0.08)` | `rgba(5, 68, 52, 0.06)` | Superfície em `:hover` |
| `--border` | `rgba(255, 255, 255, 0.14)` | `rgba(5, 68, 52, 0.14)` | Bordas finas de separação |
| `--border-focus` | `#5FBFB0` | `#054434` | Contorno de foco acessível |
| `--shadow-sm` / `--shadow-md` | Sombras escuras sutis | Sombras esverdeadas leves | Elevação de cards e controles |

---

## 2. Diretrizes Anti-Slop

Para evitar estética genérica de templates gerados por IA:

1. **Transições Explícitas (Proibido `transition: all`)**:
   - Declare sempre as propriedades animadas de forma explícita (ex.: `transition: background-color 0.25s ease, color 0.25s ease` ou `transition: transform 0.15s ease, border-color 0.2s ease`).
   - Isso evita repaints acidentais, *layout shift* e flickering na troca de tema.
2. **Raio Concêntrico**:
   - Mantenha proporção geométrica entre o `border-radius` de containers externos e os elementos internos (badges, botões, inputs). Ex.: controles em cápsula (`9999px`) com botões internos igualmente arredondados; cards com raio externo maior que o raio das tags internas.
3. **Resposta Tátil (`:active`)**:
   - Botões, links de ação e cards clicáveis devem oferecer feedback imediato ao clique/toque (ex.: ajuste sutil de `transform: translateY(1px)` ou `scale(0.98)` em `:active`).
4. **Zero Emojis Decorativos**:
   - Não utilize emojis como ícones de seção, bullets ou enfeites de botões na interface. Prefira tipografia limpa, badges semânticas ou ícones SVG inline minimalistas.
5. **Tipografia e Ritmo**:
   - Stack de fontes nativas do sistema (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ...`) com `-webkit-font-smoothing: antialiased` e `line-height: 1.65`.
   - Container principal centrado com `max-width: 740px` para leitura confortável.

---

## 3. Suporte Nativo a Dark/Light Mode e Acessibilidade

- **Anti-FOUC**: [`src/layouts/Layout.astro`](../src/layouts/Layout.astro) executa um script inline síncrono no `<head>` que lê `localStorage.getItem('theme')` ou `window.matchMedia('(prefers-color-scheme: light)')`, aplicando `data-theme` em `<html>` antes da renderização.
- **Contraste (WCAG AA)**: todas as combinações `--text` / `--text-muted` sobre `--bg` e `--card-bg` devem preservar contraste legível em ambos os temas.
- **Navegação por Teclado**: foco visível obrigatório via `:focus-visible` com `outline: 2px solid var(--border-focus); outline-offset: 3px;`.