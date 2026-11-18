# Fluxo de Trabalho para Agentes (`AGENT_WORKFLOW.md`)

Este documento define o fluxo operacional obrigatório para agentes autônomos atuando no repositório `ri-favaro.github.io`, garantindo isolamento de workspace, qualidade verificável e governança de PRs.

---

## 1. Regra de Ouro da Worktree

**Nunca edite, instale dependências ou faça build diretamente no checkout raiz** (`G:\ProjetosAleatorios\ProjetosProGithub\ri-favaro.github.io`).

Toda tarefa deve iniciar criando uma worktree isolada a partir de `origin/main`:

```powershell
git -C "G:\ProjetosAleatorios\ProjetosProGithub\ri-favaro.github.io" fetch origin
git -C "G:\ProjetosAleatorios\ProjetosProGithub\ri-favaro.github.io" worktree add "G:\orca-workspaces\ri-favaro.github.io\<slug>" -b <tipo>/<slug> origin/main
```

- Todo desenvolvimento, validação e commit acontece exclusivamente dentro de `G:\orca-workspaces\ri-favaro.github.io\<slug>`.
- Ao final do ciclo (após o merge da PR), a worktree pode ser removida com `git worktree remove`.

---

## 2. Validação e Testes Obrigatórios

Antes de acionar o `@Gate` ou abrir qualquer Pull Request, execute os quatro comandos abaixo na worktree (espelhando [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)):

```bash
npm run check   # Typecheck Astro + TypeScript (astro check)
npm run lint    # Lint e formatação com Biome (biome check .)
npm test        # Testes unitários com Vitest (vitest run)
npm run build   # Build de produção estático (astro build)
```

- Nenhum comando pode falhar ou ser ignorado.
- Se houver falha de formatação, `npm run lint:fix` aplica as correções do Biome antes de revalidar.

---

## 3. Papéis do Time de Agentes

| Agente | Responsabilidade Principal |
| :--- | :--- |
| **@Pages** | Implementação de código, UI, documentação e refatorações em worktree isolada; execução das validações locais; abertura da PR via `gh` após sinal verde do `@Gate` e monitoramento do CI (*Babysit*) até o merge. |
| **@Gate** | Auditoria técnica independente antes do push/PR: verifica `check`, `lint`, `test`, `build`, acessibilidade, responsividade, Dark/Light mode e aderência às diretrizes anti-slop. |
| **@Octo** | Governança geral do perfil GitHub (`ri-favaro`), coordenação de issues/repositórios e ponte com o `@Tailor` (currículos). |

---

## 4. Política de Commits, PRs e Regras de Merge

- **Idioma**: mensagens de commit, títulos e descrições de PR devem ser escritos em **português brasileiro (`pt-br`)**.
- **Conventional Commits**: mantenha o prefixo em inglês (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`, `test:`).
  - Exemplo: `docs: estrutura base documental em docs/ e README.md`
- **Autoria da PR**: sempre crie Pull Requests via CLI `gh` autenticada na conta `ri-favaro` (`gh pr create`), nunca via tokens/integrações de bot.
- **Matriz de Decisão (`MERGE_RULES.md`)**:
  - **Baixo Risco** (typos, metadados menores, ajustes pontuais de docs): auto-merge liberado somente após aprovação do `@Gate` e todos os checks verdes.
  - **Médio / Alto Risco** (novos projetos, mudanças de layout/CSS, UI, dependências, CI/CD, `AGENTS.md`): **aprovação manual explícita do Ricardo** obrigatória antes do merge.

Consulte [`MERGE_RULES.md`](../MERGE_RULES.md) para a tabela completa de classificação.