# Diretrizes de Merge e Governança de PRs (ri-favaro.github.io)

Este documento define as regras operacionais para abertura e merge de Pull Requests no repositório **`ri-favaro.github.io`**, estabelecendo a fronteira entre tarefas que possuem autonomia de **Auto-Merge** e tarefas que exigem **Aprovação Manual Obrigatória do Ricardo**.

---

## 1. Princípios Gerais

1. **Nunca Commit Direto na `main`**: Toda e qualquer alteração no repositório deve ser realizada via branch em worktree isolada (`G:\orca-workspaces\ri-favaro.github.io\<slug>`) e submetida via Pull Request.
2. **Autoria Obrigatória do Ricardo**: Toda PR deve ser aberta via CLI `gh` logada na conta `ri-favaro`. Nunca use integrações ou tokens que gerem autoria por bots (como `openbotgit`).
3. **Validação Prévia do @Gate**: Nenhuma PR deve ser aberta ou mergeada sem a auditoria e sinal verde explícito do agente `@Gate`.
4. **Build e Tipos Verificados**: O código deve compilar perfeitamente (`npx astro check` com 0 erros e `npm run build` com exit code 0).

---

## 2. Matriz de Decisão de Merge

| Categoria | Tipo de Mudança | Exigência | Ação do Agente |
| :--- | :--- | :--- | :--- |
| **Baixo Risco** | Correção de typos, ortografia ou gramática em textos | Auto-Merge Liberado | Pode mergear após aprovação do @Gate |
| **Baixo Risco** | Atualização de links ou metadados de cards já existentes | Auto-Merge Liberado | Pode mergear após aprovação do @Gate |
| **Baixo Risco** | Ajustes pontuais de documentação técnica interna | Auto-Merge Liberado | Pode mergear após aprovação do @Gate |
| **Médio Risco** | Adição de novos projetos ou remoção de projetos da vitrine | Aprovação Manual | Aguarda OK do Ricardo no chat |
| **Médio Risco** | Mudança estrutural de biografia, cargo ou resumo | Aprovação Manual | Aguarda OK do Ricardo no chat |
| **Alto Risco** | Alterações de layout, CSS global, temas Dark/Light ou UI | Aprovação Manual | Aguarda OK do Ricardo no chat |
| **Alto Risco** | Adição/remoção de dependências npm ou troca de versões | Aprovação Manual | Aguarda OK do Ricardo no chat |
| **Alto Risco** | Modificações de CI/CD (`.github/workflows/deploy.yml`) | Aprovação Manual | Aguarda OK do Ricardo no chat |
| **Alto Risco** | Alterações em `AGENTS.md` ou diretrizes do time de agentes | Aprovação Manual | Aguarda OK do Ricardo no chat |

---

## 3. Critérios Obrigatórios para Auto-Merge (Baixo Risco)

Mesmo para alterações classificadas como Baixo Risco, o agente só poderá executar `gh pr merge --squash` se **todos** os critérios abaixo forem atendidos:

1. **Auditoria Local Aprovada**: Sinal verde do `@Gate` registrado com evidências.
2. **Verificação de Tipos**: `npx astro check` com 0 erros.
3. **Build de Produção**: `npm run build` gerando os artefatos estáticos sem avisos impeditivos.
4. **Integridade de Links**: Links externos novos ou modificados validados com status HTTP 200.
5. **Conventional Commits em PT-BR**: Título e mensagens de commit em conformidade com o padrão do projeto.

---

## 4. Fluxo para Mudanças de Médio e Alto Risco

Para qualquer tarefa fora da categoria de Baixo Risco:
1. Concluir a implementação e build na worktree isolada.
2. Acionar o `@Gate` para auditoria local.
3. Fazer push da branch e abrir a PR via `gh pr create` (como `ri-favaro`).
4. **PARAR e notificar o Ricardo**, apresentando o resumo das mudanças, links das evidências e a URL da PR aberta.
5. **Aguardar a confirmação explícita do Ricardo** no chat antes de realizar o merge.
