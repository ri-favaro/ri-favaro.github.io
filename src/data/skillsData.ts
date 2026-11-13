export interface SkillRelation {
  uses?: string[];
  usedBy?: string[];
  pairsWith?: string[];
}

export interface SkillItem {
  id: string;
  kind: 'skill' | 'principle';
  category:
    | 'Orquestracao'
    | 'Investigacao'
    | 'Arquitetura'
    | 'Qualidade'
    | 'Verificacao'
    | 'Comunicacao'
    | 'Meta'
    | 'Core'
    | 'Delegacao';
  command: string;
  manualOnly: boolean;
  summary: {
    pt: string;
    en: string;
  };
  example: string;
  relations: SkillRelation;
}

export interface WorkflowItem {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  tag: {
    pt: string;
    en: string;
  };
  desc: {
    pt: string;
    en: string;
  };
  steps: Array<{
    skillId: string;
    role: {
      pt: string;
      en: string;
    };
  }>;
}

export interface DailyPractice {
  step: string;
  title: {
    pt: string;
    en: string;
  };
  skills: string[];
  summary: {
    pt: string;
    en: string;
  };
  principle: string;
}

export interface GraphNode {
  id: string;
  label: string;
  cluster: SkillItem['category'];
  x: number;
  y: number;
  r: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export const authorAttribution = {
  name: 'Lauren Tan',
  handle: '@poteto',
  github: 'https://github.com/poteto',
  repo: 'https://github.com/cursor/plugins/tree/main/pstack/skills',
};

export const dailyPractices: DailyPractice[] = [
  {
    step: '01',
    title: {
      pt: 'Alinhamento Cirúrgico de Intenção',
      en: 'Surgical Intent Alignment',
    },
    skills: ['twq', 'in-your-own-words', 'sharpen'],
    summary: {
      pt: 'Antes de tocar em qualquer arquivo, o agente reformula o problema com as próprias palavras e faz perguntas estruturadas de alinhamento com opções concretas. Zero adivinhação de escopo.',
      en: 'Before touching any file, the agent restates the problem in its own words and asks structured alignment questions with real options. Zero scope guesswork.',
    },
    principle: 'Não assuma premissas não ditas. Pergunte antes de codar.',
  },
  {
    step: '02',
    title: {
      pt: 'Arquitetura & Competição de Abordagens',
      en: 'Architecture & Approach Arena',
    },
    skills: ['architect', 'arena', 'principle-foundational-thinking'],
    summary: {
      pt: 'Modelagem rigorosa de tipos, interfaces e fronteiras com corpos vazios primeiro. Para decisões sem precedente, dispara modelos concorrentes em worktrees isoladas para escolher a base mais limpa.',
      en: 'Rigorous modeling of types, interfaces, and module boundaries with empty bodies first. For unprecedented decisions, runs competing models in isolated worktrees to pick the cleanest baseline.',
    },
    principle: 'Modele o domínio nos tipos antes de escrever a lógica.',
  },
  {
    step: '03',
    title: {
      pt: 'Execução Limpa & Subtração de Ruído',
      en: 'Clean Execution & Noise Subtraction',
    },
    skills: ['principle-subtract-before-you-add', 'no-comments', 'unslop'],
    summary: {
      pt: 'Subtração ativa antes de adição: código morto, flags legadas e abstrações prematuras são deletados. Subagentes revisores removem comentários óbvios que justificam gambiarras e limpam a prosa.',
      en: 'Active subtraction before addition: dead code, legacy flags, and premature abstractions are purged. Dedicated review agents strip useless comments and unslop copy.',
    },
    principle: 'Subtraia antes de somar. Menos linhas, mais alavancagem.',
  },
  {
    step: '04',
    title: {
      pt: 'Verificação Real com Provas Executáveis',
      en: 'Real Verification with Executable Proofs',
    },
    skills: ['principle-prove-it-works', 'tdd', 'blast-radius'],
    summary: {
      pt: 'Auto-relato do agente ou "compilou sem erro" não é prova. Cada alteração é validada executando testes locais, verificando o raio de impacto fora do diff e inspecionando o resultado no navegador ou terminal.',
      en: 'Agent self-reporting or "it compiled" is never proof. Every change is verified by executing local tests, checking the blast radius outside the diff, and inspecting output in the browser or terminal.',
    },
    principle: 'Se não foi testado com comando real, não está pronto.',
  },
  {
    step: '05',
    title: {
      pt: 'Auditoria de Engenharia & Portões de Qualidade',
      en: 'Engineering Audit & Quality Gates',
    },
    skills: ['anti-slop-web-polish', 'Gate', 'security-audit'],
    summary: {
      pt: 'Revisão independente de design, acessibilidade e segurança antes de abrir qualquer Pull Request. Push e abertura de PR só acontecem após validação completa da suíte de CI local.',
      en: 'Independent review of design, accessibility, and security before opening any Pull Request. Push and PR creation only occur after complete local CI suite validation.',
    },
    principle: 'Revisão adversarial e commits em Conventional Commits.',
  },
];

export const skillsListRaw: SkillItem[] = [
  {
    id: 'poteto-mode',
    kind: 'skill',
    category: 'Orquestracao',
    command: '/poteto-mode',
    manualOnly: true,
    summary: {
      pt: 'Orquestrador central do pstack. Mapeia qualquer tarefa para um dos 23 playbooks internos (Feature, Bug fix, Investigation, Refactoring, Babysit, Shipping, etc.), aplica os 24 princípios, gerencia subagentes e impõe respostas curtas, diretas e verificadas.',
      en: 'Central orchestrator of pstack. Maps any task to one of 23 internal playbooks (Feature, Bug fix, Investigation, Refactoring, Babysit, Shipping, etc.), applies all 24 principles, manages subagents, and enforces concise, proven outputs.',
    },
    example:
      '/poteto-mode Adicione validação de schema na API de webhooks e prove com testes reais que payloads inválidos retornam 400.',
    relations: {
      uses: [
        'how',
        'architect',
        'arena',
        'swarm',
        'interrogate',
        'unslop',
        'technical-writing',
        'no-comments',
        'benchmark-checklist',
        'show-me-your-work',
        'figure-it-out',
      ],
      pairsWith: ['poteto-help', 'setup-pstack'],
    },
  },
  {
    id: 'poteto-help',
    kind: 'skill',
    category: 'Orquestracao',
    command: '/poteto-help',
    manualOnly: true,
    summary: {
      pt: 'Guia interativo do ecossistema pstack. Responde dúvidas sobre instalação, configuração de modelos, escolha de skills, playbooks e diagnóstico de execuções que falharam, entregando um prompt pronto sem iniciar a tarefa.',
      en: 'Interactive pstack guide. Answers questions on setup, model configuration, skill selection, playbooks, and failed run diagnosis, generating a ready-to-run prompt without executing.',
    },
    example:
      '/poteto-help Qual skill devo usar para revisar um diff pequeno que pode quebrar outro serviço?',
    relations: {
      uses: ['setup-pstack', 'poteto-mode'],
      pairsWith: ['automate-me', 'reflect'],
    },
  },
  {
    id: 'setup-pstack',
    kind: 'skill',
    category: 'Orquestracao',
    command: '/setup-pstack',
    manualOnly: false,
    summary: {
      pt: 'Detecta os modelos disponíveis na sessão, pergunta o orçamento de raciocínio (unlimited, large, medium, small) e grava ~/.cursor/rules/pstack-models.mdc com o modelo ideal de cada papel.',
      en: 'Detects available session models, asks for reasoning budget (unlimited, large, medium, small), and writes role model assignments to config.',
    },
    example:
      '/setup-pstack Quero configurar o pstack com orçamento medium e revisar os modelos de arena e interrogate.',
    relations: {
      uses: ['create-verification-skill', 'create-formal-verification-skill'],
      usedBy: ['poteto-help', 'poteto-mode'],
    },
  },
  {
    id: 'in-your-own-words',
    kind: 'skill',
    category: 'Investigacao',
    command: '/in-your-own-words',
    manualOnly: true,
    summary: {
      pt: 'Reformula com as próprias palavras o objetivo do usuário e o problema que ele está tentando resolver antes de qualquer alteração, evitando desalinhamento de escopo.',
      en: 'Restates user objective and root problem in own words before any edits, preventing scope divergence.',
    },
    example:
      '/in-your-own-words Antes de mexer no cache de sessão, confirme o que você entendeu que precisa mudar.',
    relations: {
      usedBy: ['interrogate'],
      pairsWith: ['sharpen', 'poteto-mode'],
    },
  },
  {
    id: 'sharpen',
    kind: 'skill',
    category: 'Investigacao',
    command: '/sharpen',
    manualOnly: true,
    summary: {
      pt: 'Torna uma tarefa mais profunda (não maior) antes de executá-la. Lista o que um especialista faria, a matéria-prima mais bruta, métodos específicos e critérios externos de validação.',
      en: 'Deepens a task (without bloating scope) before execution. Outlines expert actions, raw materials, domain methods, and external validation criteria.',
    },
    example: '/sharpen Preciso investigar por que o checkout está lento no mobile.',
    relations: {
      pairsWith: ['in-your-own-words', 'figure-it-out', 'how', 'why'],
    },
  },
  {
    id: 'how',
    kind: 'skill',
    category: 'Investigacao',
    command: '/how',
    manualOnly: true,
    summary: {
      pt: 'Explora a codebase com subagentes exploradores paralelos e entrega um modelo mental claro da arquitetura, fluxo de execução, localização de módulos e gotchas.',
      en: 'Explores codebase with parallel explorer subagents, delivering a clear mental model of architecture, execution flow, component locations, and gotchas.',
    },
    example: '/how Como funciona o pipeline de filas de webhook e onde deve morar um novo retry?',
    relations: {
      usedBy: ['architect', 'teach', 'poteto-mode', 'no-comments'],
      pairsWith: ['why', 'blast-radius'],
    },
  },
  {
    id: 'why',
    kind: 'skill',
    category: 'Investigacao',
    command: '/why',
    manualOnly: true,
    summary: {
      pt: 'Investiga a motivação e o histórico de uma decisão de código consultando MCPs disponíveis em paralelo (git/gh, issue tracker, docs, chat, observabilidade) com níveis explícitos de confiança.',
      en: 'Investigates motivation and history of code decisions via parallel MCP queries (git/gh, issues, docs, chat, telemetry) synthesized with explicit confidence ratings.',
    },
    example:
      '/why Por que o timeout de sincronização foi fixado em 8 segundos em vez de usar backoff exponencial?',
    relations: {
      usedBy: ['architect', 'teach', 'recall', 'blast-radius', 'no-comments'],
      pairsWith: ['how'],
    },
  },
  {
    id: 'teach',
    kind: 'skill',
    category: 'Investigacao',
    command: '/teach',
    manualOnly: true,
    summary: {
      pt: 'Explica um subsistema ou mudança de forma humana e progressiva. Orquestra /how e /why em paralelo, constrói diagramas passo a passo e passa o texto pelo /unslop.',
      en: 'Explains complex systems progressively. Runs /how and /why in parallel, builds step-by-step diagrams, and refines prose with /unslop.',
    },
    example:
      '/teach Me explique como funciona a virtualização da lista de mensagens e por que ela foi feita assim.',
    relations: {
      uses: ['how', 'why', 'unslop'],
      pairsWith: ['bro'],
    },
  },
  {
    id: 'recall',
    kind: 'skill',
    category: 'Investigacao',
    command: '/recall',
    manualOnly: true,
    summary: {
      pt: 'Reconstrói o contexto de trabalho recente minerando transcripts locais de chat e varrendo o histórico com git e gh para entregar um resumo enxuto e o próximo passo imediato.',
      en: 'Reconstructs recent context from local transcripts, git logs, and PRs to deliver a concise summary and next actionable step.',
    },
    example: '/recall O que eu fiz nos últimos 7 dias na migração de autenticação e onde parei?',
    relations: {
      uses: ['why', 'unslop'],
      pairsWith: ['ketchup', 'automate-me'],
    },
  },
  {
    id: 'architect',
    kind: 'skill',
    category: 'Arquitetura',
    command: '/architect',
    manualOnly: true,
    summary: {
      pt: 'Desenha tipos, assinaturas e fronteiras de módulos com corpos "not implemented" antes de codificar. Explora candidatos distintos na /arena e descarta designs que gerem atrito recorrente.',
      en: 'Drafts types, signatures, and boundaries with empty bodies prior to coding. Explores candidates in /arena and discards friction-heavy designs.',
    },
    example:
      '/architect with checkpoint Desenhe o novo sistema de plugins de exportação antes de escrever a implementação.',
    relations: {
      uses: ['how', 'why', 'arena', 'interrogate'],
      usedBy: ['poteto-mode', 'figure-it-out', 'no-comments'],
    },
  },
  {
    id: 'arena',
    kind: 'skill',
    category: 'Arquitetura',
    command: '/arena',
    manualOnly: true,
    summary: {
      pt: 'Dispara N modelos de famílias distintas em paralelo em worktrees isoladas com a mesma tarefa e rubrica. Um juiz neutro escolhe a melhor base e enxerta as melhores ideias dos concorrentes.',
      en: 'Runs N distinct model families in isolated worktrees with identical rubric. A cross-judge ranks outputs and blends optimal approaches.',
    },
    example:
      '/arena Crie a melhor implementação para o parser de filtros de busca com suporte a operadores booleanos.',
    relations: {
      usedBy: ['architect', 'blast-radius', 'interrogate', 'poteto-mode'],
    },
  },
  {
    id: 'swarm',
    kind: 'skill',
    category: 'Arquitetura',
    command: '/swarm',
    manualOnly: true,
    summary: {
      pt: 'Coordena N workers paralelos divididos em fatias de cobertura ou corrida (first pass, rank all, best-of) e consolida tudo em um relatório único com status PASS, ISSUES ou BLOCKED.',
      en: 'Coordinates N parallel workers across sliced coverage or competitive runs, consolidating findings into an actionable report.',
    },
    example:
      '/swarm Verifique todos os 12 endpoints da API v2 em paralelo para confirmar se validam tenantId.',
    relations: {
      usedBy: ['poteto-mode'],
      pairsWith: ['arena'],
    },
  },
  {
    id: 'figure-it-out',
    kind: 'skill',
    category: 'Arquitetura',
    command: '/figure-it-out',
    manualOnly: true,
    summary: {
      pt: 'Para migrações grandes ou tarefas atípicas sem playbook pronto: projeta um plano sob medida com método científico, verificação por unidade e trilha de decisão em decisões auditáveis.',
      en: 'Custom playbook designer for large migrations and novel problems: scientific method, unit verification, and append-only decision trail.',
    },
    example:
      '/figure-it-out Migre os 40 componentes de tabela do legado para o novo design system sem quebrar a acessibilidade.',
    relations: {
      uses: ['architect', 'show-me-your-work'],
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'tdd',
    kind: 'skill',
    category: 'Qualidade',
    command: '/tdd',
    manualOnly: true,
    summary: {
      pt: 'Correção de bugs guiada por testes: reproduz o bug em um teste local barato que falha pelo motivo exato antes de tocar no código, aplica a menor correção e valida o teste passando.',
      en: 'Test-driven bug fixing: reproduces the defect in a failing test for the exact reason, applies minimal surgical fix, and validates green test.',
    },
    example: '/tdd O cálculo de desconto aplica cupom expirado quando o carrinho tem frete grátis.',
    relations: {
      pairsWith: ['blast-radius', 'typescript-best-practices'],
    },
  },
  {
    id: 'typescript-best-practices',
    kind: 'skill',
    category: 'Qualidade',
    command: '/typescript-best-practices',
    manualOnly: true,
    summary: {
      pt: 'Guia prático de TypeScript moderno: uniões discriminadas, branded types, unknown na fronteira, narrowing sem "as", exaustividade com never e satisfaz testes sem mocks desnecessários.',
      en: 'Modern TypeScript discipline: discriminated unions, branded types, unknown boundaries, narrowing without "as", and exhaustiveness checks.',
    },
    example:
      '/typescript-best-practices Revise src/webhooks/parser.ts eliminando casts "as" e modelando os estados com uniões discriminadas.',
    relations: {
      pairsWith: ['tdd', 'no-comments'],
    },
  },
  {
    id: 'no-comments',
    kind: 'skill',
    category: 'Qualidade',
    command: '/no-comments',
    manualOnly: true,
    summary: {
      pt: 'Subagente especializado sobre o diff para remover comentários inúteis, corrigir causas-raiz em vez de justificar workarounds e codificar restrições em tipos, testes ou lints.',
      en: 'Diff cleaner subagent: removes redundant comments, fixes root causes instead of documenting workarounds, and encodes rules in types/lints.',
    },
    example:
      '/no-comments Limpe comentários redundantes da minha branch atual antes de abrir a PR.',
    relations: {
      uses: ['how', 'why', 'architect'],
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'interrogate',
    kind: 'skill',
    category: 'Qualidade',
    command: '/interrogate',
    manualOnly: true,
    summary: {
      pt: 'Revisão adversarial multi-modelo: agentes em worktrees isoladas tentam ativamente quebrar uma mudança ou design. Só sobrevivem achados provados por reprodução real executada contra o código.',
      en: 'Multi-model adversarial review: rival agents attempt to break design in isolated worktrees. Only findings backed by executed repro survive.',
    },
    example:
      '/interrogate Tente quebrar a nova lógica de renovação de token JWT na branch feat/refresh-lock.',
    relations: {
      uses: ['in-your-own-words', 'arena'],
      usedBy: ['architect', 'poteto-mode'],
      pairsWith: ['blast-radius'],
    },
  },
  {
    id: 'blast-radius',
    kind: 'skill',
    category: 'Qualidade',
    command: '/blast-radius',
    manualOnly: true,
    summary: {
      pt: 'Analisa o que uma mudança pode quebrar fora do diff (onde grep não chega: formatos de rede, hooks de ciclo de vida, colunas de BD, contratos). Identifica o fato que garante segurança e o prova executando código.',
      en: 'Analyzes out-of-diff breakage risks (wire formats, lifecycle hooks, DB schemas, libraries). Identifies invariant guarantees and proves them via code execution.',
    },
    example:
      '/blast-radius Qual o raio de impacto de alterar a serialização de datas no endpoint /api/events?',
    relations: {
      uses: ['why', 'arena', 'unslop'],
      pairsWith: ['how', 'interrogate'],
    },
  },
  {
    id: 'benchmark-checklist',
    kind: 'skill',
    category: 'Qualidade',
    command: '/benchmark-checklist',
    manualOnly: true,
    summary: {
      pt: 'Checklist obrigatório de 7 perguntas antes de reportar qualquer número de performance (limitador/profiler, tuning de produção, limites físicos, erros, repetições alternadas e trabalho real executado).',
      en: 'Mandatory 7-point performance checklist before citing numbers: profiling limits, production tuning, physical boundaries, interleaved repeats, and real execution.',
    },
    example:
      '/benchmark-checklist Valide minha medição de que o novo serializador JSON está 35% mais rápido.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'create-verification-skill',
    kind: 'skill',
    category: 'Verificacao',
    command: '/create-verification-skill',
    manualOnly: true,
    summary: {
      pt: 'Inspeciona o repositório e gera uma skill local de verificação (.cursor/skills/verify-<app>/) com Launch, Doctor, Drive, Evidence e mapa de features para dirigir a aplicação como usuário real.',
      en: 'Inspects repo and scaffolds an executable verification skill (Launch, Doctor, Drive, Evidence) to pilot the app like a real human user.',
    },
    example:
      '/create-verification-skill Crie uma skill de verificação com Playwright para testar os fluxos críticos do nosso dashboard.',
    relations: {
      usedBy: ['setup-pstack'],
      pairsWith: ['maintain-verification-skill'],
    },
  },
  {
    id: 'maintain-verification-skill',
    kind: 'skill',
    category: 'Verificacao',
    command: '/maintain-verification-skill',
    manualOnly: true,
    summary: {
      pt: 'Mantém a skill de verificação e o mapa de features sincronizados com a evolução do app: lança leitores paralelos por feature e executa passagens ponta a ponta ao vivo.',
      en: 'Keeps verification skills and feature maps aligned with app evolution through parallel auditors and end-to-end live runs.',
    },
    example:
      '/maintain-verification-skill Audite nossa skill verify-web e atualize o mapa de features após o redesign do menu.',
    relations: {
      uses: ['create-verification-skill'],
    },
  },
  {
    id: 'create-formal-verification-skill',
    kind: 'skill',
    category: 'Verificacao',
    command: '/create-formal-verification-skill',
    manualOnly: true,
    summary: {
      pt: 'Isola a parte mais crítica do código (concorrência, retries, máquinas de estado, parsers) e gera uma skill de verificação formal (ex: TLA+ ou SMT), provando que ela detecta falhas injetadas.',
      en: 'Formal verification generator for critical subsystems (concurrency, distributed locks, state machines) via TLA+ or SMT solvers.',
    },
    example:
      '/create-formal-verification-skill Modele em TLA+ a aquisição e renovação de leases distribuídos no worker.',
    relations: {
      uses: ['statechart'],
      usedBy: ['setup-pstack'],
      pairsWith: ['maintain-formal-verification-skill'],
    },
  },
  {
    id: 'maintain-formal-verification-skill',
    kind: 'skill',
    category: 'Verificacao',
    command: '/maintain-formal-verification-skill',
    manualOnly: true,
    summary: {
      pt: 'Sincroniza uma skill de verificação formal após commits que alteraram código coberto sem rechecagem, distinguindo se uma falha é drift do modelo ou bug real.',
      en: 'Maintains formal models after code changes, differentiating between model drift and actual runtime regressions.',
    },
    example:
      '/maintain-formal-verification-skill Verifique se o modelo TLA+ do lock distribuído ainda descreve o código atual.',
    relations: {
      uses: ['create-formal-verification-skill'],
      pairsWith: ['statechart'],
    },
  },
  {
    id: 'statechart',
    kind: 'skill',
    category: 'Verificacao',
    command: '/statechart',
    manualOnly: true,
    summary: {
      pt: 'Executa modelos TLA+ com TLC e gera diagramas de estado Mermaid legíveis para humanos, destacando o menor caminho até cada violação de invariante.',
      en: 'Executes TLA+ specifications and renders clean Mermaid statecharts highlighting invariant violation paths for humans.',
    },
    example:
      '/statechart Gere o statechart do fluxo de pagamento mostrando os estados que violam a regra de cobrança única.',
    relations: {
      usedBy: ['create-formal-verification-skill'],
      pairsWith: ['maintain-formal-verification-skill'],
    },
  },
  {
    id: 'unslop',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/unslop',
    manualOnly: true,
    summary: {
      pt: 'Catálogo numerado de limpeza de texto contra vícios de IA: remove vocabulário clichê, travessões excessivos, frases de enchimento, metáforas abstratas e voz passiva.',
      en: 'Exhaustive text polisher against LLM habits: eliminates buzzwords, em-dash crutches, filler phrases, abstract metaphors, and passive voice.',
    },
    example:
      '/unslop Reescreva esta proposta de RFC removendo jargão de IA e tornando cada frase direta.',
    relations: {
      usedBy: [
        'poteto-mode',
        'technical-writing',
        'teach',
        'recall',
        'blast-radius',
        'automate-me',
        'show-me-your-work',
      ],
    },
  },
  {
    id: 'technical-writing',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/technical-writing',
    manualOnly: true,
    summary: {
      pt: 'Padrão de documentação técnica em 4 camadas: Diataxis (tutorial, how-to, reference, explanation), Google Developer Style, Simplified Technical English e Global English, sempre combinado com /unslop.',
      en: '4-layer technical writing standard: Diataxis framework, Google Style Guide, Simplified Technical English, and Global English.',
    },
    example:
      '/technical-writing Escreva a documentação how-to para configurar SSO SAML e revise a descrição da PR.',
    relations: {
      uses: ['unslop'],
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'bro',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/bro',
    manualOnly: true,
    summary: {
      pt: 'Reformula a última mensagem em linguagem humana direta, enxuta e sem jargão técnico, como uma conversa entre desenvolvedores seniores.',
      en: 'Translates technical output into plain, candid human language without fluff or corporate jargon.',
    },
    example:
      '/bro Traduz essa explicação de arquitetura para algo simples que eu entenda em 10 segundos.',
    relations: {
      usedBy: ['ketchup'],
      pairsWith: ['teach'],
    },
  },
  {
    id: 'ketchup',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/ketchup',
    manualOnly: true,
    summary: {
      pt: 'Atualização rápida em linguagem direta sobre tudo que mudou no chat ou nos subagentes desde a última interação, com visual sintético e lista de decisões pendentes.',
      en: 'Quick read-only catch-up on everything changed since last turn: plain language, visual bullets, and pending decision checklist.',
    },
    example:
      '/ketchup Me atualize sobre o que os subagentes descobriram e o que precisa da minha aprovação.',
    relations: {
      uses: ['bro'],
      usedBy: ['ketchup-video'],
      pairsWith: ['recall'],
    },
  },
  {
    id: 'ketchup-video',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/ketchup-video',
    manualOnly: true,
    summary: {
      pt: 'Apresenta o resumo das tarefas concluídas em um vídeo curto gerado programmaticamente com slides e legendas sincronizadas, mantendo os itens de decisão abaixo.',
      en: 'Generates short animated video summary with synchronized captions, highlighting pending decisions below.',
    },
    example:
      '/ketchup-video Gere um vídeo curto resumindo o progresso da refatoração e os itens aguardando decisão.',
    relations: {
      uses: ['ketchup'],
    },
  },
  {
    id: 'show-me-your-work',
    kind: 'skill',
    category: 'Comunicacao',
    command: '/show-me-your-work',
    manualOnly: true,
    summary: {
      pt: 'Mantém uma trilha append-only de decisões em TSV (timestamp, fase, decisão, motivo, evidência e resultado), auditada contra o transcript real da sessão.',
      en: 'Append-only decision log in TSV format (timestamp, phase, decision, rationale, evidence, outcome) audited against session transcripts.',
    },
    example:
      '/show-me-your-work Inicie o log de decisões para esta migração noturna e revise ao final.',
    relations: {
      uses: ['unslop'],
      usedBy: ['poteto-mode', 'figure-it-out'],
    },
  },
  {
    id: 'automate-me',
    kind: 'skill',
    category: 'Meta',
    command: '/automate-me',
    manualOnly: true,
    summary: {
      pt: 'Minera transcripts recentes de desenvolvimento, entrevista o desenvolvedor e constrói uma skill pessoal sob medida com suas preferências e atalhos recorrentes.',
      en: 'Mines recent development transcripts, interviews the developer, and synthesizes a personalized agent workflow skill.',
    },
    example:
      '/automate-me Analise minhas últimas conversas neste projeto e crie minha skill pessoal de trabalho.',
    relations: {
      uses: ['unslop', 'poteto-mode'],
      pairsWith: ['reflect', 'recall'],
    },
  },
  {
    id: 'reflect',
    kind: 'skill',
    category: 'Meta',
    command: '/reflect',
    manualOnly: true,
    summary: {
      pt: 'Audita a conversa atual com 3 revisores paralelos (Judgment, Tooling, Divergent) e sintetiza lições duráveis em melhorias de regras ou skills.',
      en: 'Analyzes session transcript with 3 parallel reviewers to turn durable lessons into concrete skill improvements or backlog items.',
    },
    example: '/reflect Revise esta sessão e proponha melhorias nas skills que usamos hoje.',
    relations: {
      pairsWith: ['correct', 'automate-me'],
    },
  },
  {
    id: 'correct',
    kind: 'skill',
    category: 'Meta',
    command: '/correct',
    manualOnly: true,
    summary: {
      pt: 'Encontra erros repetidos por agentes e os torna impossíveis na camada mais alta: 1. Arquitetura, 2. Tipos, 3. Lint/CI, 4. Testes e 5. Docs por último, provando que o check pega a falha.',
      en: 'Finds recurring agent mistakes and makes them structurally impossible: Architecture > Types > Linter/CI > Tests > Docs.',
    },
    example:
      '/correct Agentes vivem importando o cliente de banco antigo direto nas rotas. Bloqueie isso de vez.',
    relations: {
      pairsWith: ['reflect', 'no-comments'],
    },
  },
  {
    id: 'make-bot-ui',
    kind: 'skill',
    category: 'Meta',
    command: '/make-bot-ui',
    manualOnly: true,
    summary: {
      pt: 'Constrói uma interface web local segura para acordar rotinas de webhook de bots via botões de controle, mantendo chaves de autenticação protegidas.',
      en: 'Creates a clean local control UI with action triggers for webhook bot routines, keeping tokens isolated.',
    },
    example:
      '/make-bot-ui Crie um painel com botões de deploy e rollback que disparam meu bot via webhook.',
    relations: {
      pairsWith: ['principle-boundary-discipline'],
    },
  },
  // Principios (24)
  {
    id: 'principle-laziness-protocol',
    kind: 'principle',
    category: 'Core',
    command: '/principle-laziness-protocol',
    manualOnly: true,
    summary: {
      pt: 'Viés para deleção e menor diff possível. Consolide decisões em uma única fonte de verdade e evite camadas, abstrações ou boilerplate "elegante" sem necessidade.',
      en: 'Bias for deletion and smallest possible diff. Consolidate decisions into a single source of truth; avoid speculative abstractions.',
    },
    example:
      'Aplique o Laziness Protocol: em vez de criar uma fábrica de adaptadores, simplifique a função direta.',
    relations: {
      usedBy: ['poteto-mode', 'arena', 'figure-it-out'],
    },
  },
  {
    id: 'principle-foundational-thinking',
    kind: 'principle',
    category: 'Core',
    command: '/principle-foundational-thinking',
    manualOnly: true,
    summary: {
      pt: 'Defina estruturas de dados e tipos centrais antes da lógica. Isole estado compartilhado entre atores concorrentes e construa o scaffold (CI, lint, tipos, testes) antes das features.',
      en: 'Define foundational data structures and core types before logic. Scaffold CI, types, and tests before writing features.',
    },
    example:
      'Antes de codar os handlers, modele os tipos principais seguindo Foundational Thinking.',
    relations: {
      usedBy: ['poteto-mode', 'architect', 'figure-it-out'],
    },
  },
  {
    id: 'principle-redesign-from-first-principles',
    kind: 'principle',
    category: 'Core',
    command: '/principle-redesign-from-first-principles',
    manualOnly: true,
    summary: {
      pt: 'Ao integrar um novo requisito, não faça remendos sobre o desenho atual. Redesenhe como se o requisito fosse premissa desde o dia zero e propague por tipos, testes e docs.',
      en: 'When incorporating a new requirement, do not patch on top. Redesign as if it were a day-zero requirement and propagate cleanly.',
    },
    example:
      'Aplique Redesign from First Principles para incorporar suporte a multi-moeda sem gambiarras.',
    relations: {
      usedBy: ['poteto-mode', 'architect', 'arena', 'no-comments'],
    },
  },
  {
    id: 'principle-attack-the-premise',
    kind: 'principle',
    category: 'Core',
    command: '/principle-attack-the-premise',
    manualOnly: true,
    summary: {
      pt: 'Quando 2 ou mais correções baseadas na mesma premissa falharem no mesmo teste ou gate, pare. Escreva a premissa e teste-a diretamente antes de tentar um terceiro fix.',
      en: 'When 2+ fixes based on the same premise fail the same check, stop. State the premise and test it directly before a 3rd attempt.',
    },
    example:
      'Dois fixes de timeout falharam. Aplique Attack the Premise e prove se o gargalo é realmente rede.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-subtract-before-you-add',
    kind: 'principle',
    category: 'Core',
    command: '/principle-subtract-before-you-add',
    manualOnly: true,
    summary: {
      pt: 'Remova código morto, validadores redundantes, referências stub e complexidade antes de construir em cima. Corte primeiro, depois refine.',
      en: 'Delete dead code, redundant validations, stub references, and complexity before building on top. Subtract first, refine later.',
    },
    example: 'Use Subtract Before You Add: apague os flags legados antes de adicionar o novo modo.',
    relations: {
      usedBy: ['poteto-mode', 'architect'],
    },
  },
  {
    id: 'principle-minimize-reader-load',
    kind: 'principle',
    category: 'Core',
    command: '/principle-minimize-reader-load',
    manualOnly: true,
    summary: {
      pt: 'Reduza as duas cargas cognitivas do leitor: camadas até a resposta e estado mutável/oculto na cabeça. Colapse wrappers de 1 chamador e prefira funções puras.',
      en: 'Minimize reader cognitive overhead: layers to the answer and hidden mutable state. Collapse single-caller wrappers and use pure functions.',
    },
    example:
      'Aplique Minimize Reader Load: um leitor novo consegue rastrear de onde vem esse valor em 30s?',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-outcome-oriented-execution',
    kind: 'principle',
    category: 'Core',
    command: '/principle-outcome-oriented-execution',
    manualOnly: true,
    summary: {
      pt: 'Em reescritas e migrações com fases claras, otimize para a arquitetura final em vez de manter camadas temporárias de compatibilidade.',
      en: 'In rewrites with clear phases, optimize for the target architecture instead of maintaining perpetual compatibility shims.',
    },
    example:
      'Siga Outcome-Oriented Execution: converja direto para a nova API sem manter shims intermediários.',
    relations: {
      usedBy: ['poteto-mode', 'architect'],
    },
  },
  {
    id: 'principle-experience-first',
    kind: 'principle',
    category: 'Core',
    command: '/principle-experience-first',
    manualOnly: true,
    summary: {
      pt: 'Quando conveniência de implementação conflitar com a experiência do consumidor (usuário final ou desenvolvedor usando a API), escolha a experiência. Entregue menos features, porém polidas.',
      en: 'When implementation convenience conflicts with consumer experience, always prioritize consumer experience. Deliver fewer, polished features.',
    },
    example:
      'Aplique Experience First: prototipe 3 opções de fluxo antes de escolher a mais fácil de codar.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-exhaust-the-design-space',
    kind: 'principle',
    category: 'Core',
    command: '/principle-exhaust-the-design-space',
    manualOnly: true,
    summary: {
      pt: 'Diante de uma interação de interface inédita ou decisão arquitetural sem precedente, construa 2 a 3 protótipos concorrentes e compare lado a lado antes de se comprometer.',
      en: 'When facing novel UX interactions or architecture decisions, build 2-3 competing prototypes and compare side-by-side.',
    },
    example: 'Aplique Exhaust the Design Space criando duas abordagens distintas na /arena.',
    relations: {
      usedBy: ['poteto-mode', 'architect'],
    },
  },
  {
    id: 'principle-build-the-lever',
    kind: 'principle',
    category: 'Core',
    command: '/principle-build-the-lever',
    manualOnly: true,
    summary: {
      pt: 'Para qualquer tarefa não trivial, construa a ferramenta determinística (codemod, script, gerador ou skill de contrato) que faz ou prova o trabalho, tornando-o reexecutável pelo revisor.',
      en: 'For non-trivial tasks, build the deterministic lever (codemod, script, generator) that does or proves the work reproducibly.',
    },
    example:
      'Aplique Build the Lever: escreva um script de codemod para atualizar os 30 arquivos e rode o diff.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-model-the-domain',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-model-the-domain',
    manualOnly: true,
    summary: {
      pt: 'Codifique o domínio real em uma estrutura explícita (máquina de estados, modelo tipado, tabela de decisão) em vez de espalhar booleanos e if/else por vários arquivos.',
      en: 'Encode domain reality into explicit state machines and typed models instead of scattering boolean flags across files.',
    },
    example:
      'Aplique Model the Domain substituindo as flags isLoading/isError/isDone por uma máquina de estados finitos.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-boundary-discipline',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-boundary-discipline',
    manualOnly: true,
    summary: {
      pt: 'Concentre validação, narrowing e tratamento de erro nas fronteiras do sistema (CLI, config, APIs, rede). Confie incondicionalmente nos tipos internos e mantenha a lógica de negócio pura.',
      en: 'Enforce validation, narrowing, and error handling strictly at system boundaries. Trust internal types unconditionally.',
    },
    example:
      'Aplique Boundary Discipline: valide o JSON na entrada da rota e remova checks nulos das funções internas.',
    relations: {
      usedBy: ['poteto-mode', 'typescript-best-practices'],
    },
  },
  {
    id: 'principle-type-system-discipline',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-type-system-discipline',
    manualOnly: true,
    summary: {
      pt: 'Torne estados ilegais irrepresentáveis pelo compilador. Use branded types para primitivos semânticos, parseie dados externos na fronteira e derive tipos de schemas autoritativos.',
      en: 'Make illegal states unrepresentable. Use branded types for IDs, parse external data at edges, and derive types from schemas.',
    },
    example: 'Aplique Type System Discipline criando branded types para UserId e TenantId.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-make-operations-idempotent',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-make-operations-idempotent',
    manualOnly: true,
    summary: {
      pt: 'Projete comandos, ciclos de vida e loops para convergir sempre ao mesmo estado final, mesmo após crashes ou retries. Derive passos do estado atual.',
      en: 'Design operations, lifecycles, and loops to converge idempotently on the target state, surviving mid-run interruptions.',
    },
    example:
      'Aplique Make Operations Idempotent para que o script de setup possa ser reexecutado após falha parcial.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-migrate-callers-then-delete-legacy-apis',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-migrate-callers-then-delete-legacy-apis',
    manualOnly: true,
    summary: {
      pt: 'Ao introduzir uma nova API interna sem dependentes externos, migre todos os chamadores, atualize os testes para o novo contrato e delete a API antiga no mesmo commit.',
      en: 'When introducing internal APIs, migrate all call sites, update tests, and delete deprecated signatures in the same wave.',
    },
    example: 'Aplique Migrate Callers Then Delete Legacy APIs na refatoração do client interno.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-separate-before-serializing-shared-state',
    kind: 'principle',
    category: 'Arquitetura',
    command: '/principle-separate-before-serializing-shared-state',
    manualOnly: true,
    summary: {
      pt: 'Quando atores concorrentes podem escrever no mesmo arquivo, branch ou chave, elimine o compartilhamento primeiro (ex: worktrees ou arquivos por worker). Só serialize quando o alvo for invariante real.',
      en: 'When concurrent agents write to shared state, eliminate sharing first (isolated worktrees/shards) before falling back to locks.',
    },
    example:
      'Aplique Separate Before Serializing Shared State dando um diretório próprio para cada worker.',
    relations: {
      usedBy: ['poteto-mode', 'arena', 'figure-it-out'],
    },
  },
  {
    id: 'principle-prove-it-works',
    kind: 'principle',
    category: 'Verificacao',
    command: '/principle-prove-it-works',
    manualOnly: true,
    summary: {
      pt: 'Verifique toda entrega contra o artefato real (execute o fluxo, leia o valor salvo, inspecione o diff), nunca por proxy, auto-relato ou "compilou". Prefira scripts determinísticos.',
      en: 'Verify every delivery against the real runtime artifact (execute flow, assert value, inspect diff), never via proxy or self-report.',
    },
    example:
      'Aplique Prove It Works: rode a requisição contra o servidor local e mostre a resposta real.',
    relations: {
      usedBy: ['poteto-mode', 'arena', 'figure-it-out'],
    },
  },
  {
    id: 'principle-fix-root-causes',
    kind: 'principle',
    category: 'Verificacao',
    command: '/principle-fix-root-causes',
    manualOnly: true,
    summary: {
      pt: 'Ao debugar, rastreie o sintoma até o primeiro ponto onde o sistema errou. Um guard só é correção quando o estado é legítimo; caso contrário, corrigir no ponto de falha apenas esconde o bug.',
      en: 'Trace bugs to where the system first diverged. A guard is only a fix if state is legitimate; otherwise it just masks the root cause.',
    },
    example:
      'Aplique Fix Root Causes: não coloque apenas "if (!user) return", descubra por que user chegou nulo.',
    relations: {
      usedBy: ['poteto-mode', 'architect', 'no-comments'],
    },
  },
  {
    id: 'principle-sequence-verifiable-units',
    kind: 'principle',
    category: 'Verificacao',
    command: '/principle-sequence-verifiable-units',
    manualOnly: true,
    summary: {
      pt: 'Quebre trabalhos multi-etapa em unidades pequenas que terminam em um estado verificável, cheque cada uma antes da próxima e empilhe commits/PRs na ordem que prova o trabalho.',
      en: 'Break multi-step work into small units ending in verifiable states. Verify each before proceeding and stack commits logically.',
    },
    example:
      'Aplique Sequence Work into Verifiable Units ao dividir esta migração em 4 PRs empilhadas.',
    relations: {
      usedBy: ['poteto-mode', 'figure-it-out'],
    },
  },
  {
    id: 'principle-test-behavior-not-implementation',
    kind: 'principle',
    category: 'Verificacao',
    command: '/principle-test-behavior-not-implementation',
    manualOnly: true,
    summary: {
      pt: 'Asserte apenas o que os usuários do código observam (retornos, erros, estado persistido, chamadas externas). Um bom teste falha se o comportamento quebrar e passa se os internos mudarem.',
      en: 'Assert observable behaviors (returns, side effects, persisted state), not private implementation details.',
    },
    example:
      'Aplique Test Behavior, Not Implementation reescrevendo os testes que espionavam funções privadas.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-explain-the-number',
    kind: 'principle',
    category: 'Verificacao',
    command: '/principle-explain-the-number',
    manualOnly: true,
    summary: {
      pt: 'Antes de reportar qualquer métrica (speedup, latência, throughput), defina qual resultado muda a decisão, identifique o limitador via profiler e descarte trabalho pulado ou cache.',
      en: 'Before citing performance numbers, define which outcome affects decisions, profile constraints, and rule out cache hits.',
    },
    example: 'Aplique Explain the Number antes de reportar o ganho de throughput deste worker.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-guard-the-context-window',
    kind: 'principle',
    category: 'Delegacao',
    command: '/principle-guard-the-context-window',
    manualOnly: true,
    summary: {
      pt: 'Proteja a janela de contexto contra degradação: roteie leituras longas, outputs volumosos e planejamentos em leque para subagentes, mantendo apenas resumos enxutos na thread principal.',
      en: 'Shield context window from degradation: offload verbose logs and broad fan-out exploration to subagents, returning crisp summaries.',
    },
    example:
      'Aplique Guard the Context Window delegando a varredura dos 50 logs para subagentes paralelos.',
    relations: {
      usedBy: ['poteto-mode'],
    },
  },
  {
    id: 'principle-never-block-on-the-human',
    kind: 'principle',
    category: 'Delegacao',
    command: '/principle-never-block-on-the-human',
    manualOnly: true,
    summary: {
      pt: 'Em trabalho reversível e revisável, tome decisões razoáveis, execute e apresente o resultado para correção de rota se necessário. Pause apenas em ações irreversíveis (force-push, deploy, deleção de dados).',
      en: 'On reversible, reviewable work, make reasonable decisions and present results. Only block for irreversible operations.',
    },
    example:
      'Aplique Never Block on the Human: escolha o nome interno do módulo, implemente e mostre o diff.',
    relations: {
      usedBy: ['poteto-mode', 'figure-it-out'],
    },
  },
  {
    id: 'principle-encode-lessons-in-structure',
    kind: 'principle',
    category: 'Meta',
    command: '/principle-encode-lessons-in-structure',
    manualOnly: true,
    summary: {
      pt: 'Quando você se pegar escrevendo a mesma instrução pela segunda vez, codifique a regra em um lint, flag, tipo, check de runtime ou script em vez de adicionar mais texto de documentação.',
      en: 'When writing the same instruction a second time, encode the rule in types, lints, or runtime checks instead of prose.',
    },
    example:
      'Aplique Encode Lessons in Structure criando uma regra no Biome/ESLint em vez de mais um aviso no README.',
    relations: {
      usedBy: ['poteto-mode', 'figure-it-out', 'reflect', 'show-me-your-work'],
    },
  },
];

export const workflowsList: WorkflowItem[] = [
  {
    id: 'feature-full',
    title: {
      pt: '1. Feature ou Mudança Não-Trivial',
      en: '1. Non-Trivial Feature Flow',
    },
    tag: {
      pt: 'Fluxo Completo',
      en: 'End-to-End',
    },
    desc: {
      pt: 'Do alinhamento de intenção até a revisão adversarial e limpeza de diff antes da Pull Request.',
      en: 'From intent alignment to adversarial stress testing and diff cleanup before PR.',
    },
    steps: [
      { skillId: 'in-your-own-words', role: { pt: 'Alinha objetivo', en: 'Align objective' } },
      { skillId: 'how', role: { pt: 'Mapeia arquitetura', en: 'Map architecture' } },
      { skillId: 'why', role: { pt: 'Entende restrições', en: 'Context & history' } },
      { skillId: 'architect', role: { pt: 'Esboça tipos', en: 'Draft types' } },
      { skillId: 'arena', role: { pt: 'Compete designs', en: 'Compete designs' } },
      { skillId: 'interrogate', role: { pt: 'Tenta quebrar', en: 'Stress test' } },
      { skillId: 'typescript-best-practices', role: { pt: 'Implementa', en: 'Implement' } },
      { skillId: 'no-comments', role: { pt: 'Limpa comentários', en: 'Clean diff' } },
      { skillId: 'blast-radius', role: { pt: 'Prova segurança', en: 'Safety proof' } },
      { skillId: 'technical-writing', role: { pt: 'Documenta e abre PR', en: 'Write PR' } },
    ],
  },
  {
    id: 'onboarding-read-only',
    title: {
      pt: '2. Entendimento em Subsistema Desconhecido',
      en: '2. Unfamiliar Subsystem Deep Dive',
    },
    tag: {
      pt: 'Somente Leitura',
      en: 'Read-Only',
    },
    desc: {
      pt: 'Reconstrói contexto histórico e explica a lógica de código em camadas sem jargão.',
      en: 'Reconstructs historical context and explains subsystem logic without jargon.',
    },
    steps: [
      { skillId: 'recall', role: { pt: 'Contexto recente', en: 'Recent context' } },
      { skillId: 'how', role: { pt: 'Como funciona', en: 'How it works' } },
      { skillId: 'why', role: { pt: 'Por que é assim', en: 'Why it was built' } },
      { skillId: 'teach', role: { pt: 'Explica em camadas', en: 'Progressive explanation' } },
      { skillId: 'bro', role: { pt: 'Versão direta', en: 'Candid summary' } },
    ],
  },
  {
    id: 'bugfix-proof',
    title: {
      pt: '3. Correção de Bug com Prova Real',
      en: '3. Bug Fix with Concrete Proof',
    },
    tag: {
      pt: 'Debug & Fix',
      en: 'Debug & Fix',
    },
    desc: {
      pt: 'Rastreia a causa-raiz, reproduz em teste antes da correção e garante ausência de efeitos colaterais.',
      en: 'Tracks root cause, writes failing repro test, and guarantees zero unintended breakage.',
    },
    steps: [
      { skillId: 'principle-fix-root-causes', role: { pt: 'Acha causa raiz', en: 'Root cause' } },
      { skillId: 'tdd', role: { pt: 'Teste que falha', en: 'Failing test' } },
      {
        skillId: 'principle-test-behavior-not-implementation',
        role: { pt: 'Testa contrato', en: 'Contract test' },
      },
      { skillId: 'blast-radius', role: { pt: 'Checa impacto', en: 'Impact scan' } },
      { skillId: 'principle-prove-it-works', role: { pt: 'Prova no real', en: 'Runtime proof' } },
    ],
  },
  {
    id: 'continuous-verification',
    title: {
      pt: '4. Verificação Contínua & Formal',
      en: '4. Continuous & Formal Verification',
    },
    tag: {
      pt: 'Confiabilidade',
      en: 'Reliability',
    },
    desc: {
      pt: 'Cria e mantém harnesses executáveis e modelos formais para concorrência e máquinas de estado.',
      en: 'Scaffolds executable test harnesses and formal models for state machines and concurrency.',
    },
    steps: [
      { skillId: 'setup-pstack', role: { pt: 'Configura modelos', en: 'Configure models' } },
      {
        skillId: 'create-verification-skill',
        role: { pt: 'Gera verify-<app>', en: 'Generate verifier' },
      },
      {
        skillId: 'maintain-verification-skill',
        role: { pt: 'Mantém mapa vivo', en: 'Keep map live' },
      },
      {
        skillId: 'create-formal-verification-skill',
        role: { pt: 'Modela invariantes', en: 'Formal model' },
      },
      { skillId: 'statechart', role: { pt: 'Desenha Mermaid', en: 'Render statechart' } },
      {
        skillId: 'maintain-formal-verification-skill',
        role: { pt: 'Sincroniza modelo', en: 'Sync model' },
      },
    ],
  },
  {
    id: 'autonomous-overnight',
    title: {
      pt: '5. Trabalho Autônomo & Longa Duração',
      en: '5. Autonomous & Long-Running Runs',
    },
    tag: {
      pt: 'Longa Duração',
      en: 'Long Runs',
    },
    desc: {
      pt: 'Aprofunda o prompt, executa com trilha auditável e resume decisões para o humano.',
      en: 'Sharpens prompt, executes with append-only audit log, and summarizes for human sign-off.',
    },
    steps: [
      { skillId: 'sharpen', role: { pt: 'Aprofunda prompt', en: 'Sharpen prompt' } },
      { skillId: 'figure-it-out', role: { pt: 'Desenha playbook', en: 'Custom playbook' } },
      { skillId: 'swarm', role: { pt: 'Paraleliza fatias', en: 'Parallel shards' } },
      { skillId: 'show-me-your-work', role: { pt: 'Loga decisões', en: 'Decision trail' } },
      { skillId: 'ketchup', role: { pt: 'Resume pendentes', en: 'Pending summary' } },
      { skillId: 'ketchup-video', role: { pt: 'Gera vídeo resumo', en: 'Video recap' } },
    ],
  },
  {
    id: 'repo-evolution',
    title: {
      pt: '6. Evolução Contínua do Repositório',
      en: '6. Continuous Repository Evolution',
    },
    tag: {
      pt: 'Melhoria Contínua',
      en: 'Self-Improvement',
    },
    desc: {
      pt: 'Transforma hábitos e correções repetidas em skills e travas estruturais de compilação.',
      en: 'Turns repeated corrections and patterns into automated structural checks and skills.',
    },
    steps: [
      { skillId: 'automate-me', role: { pt: 'Cria personal mode', en: 'Synthesize mode' } },
      { skillId: 'unslop', role: { pt: 'Limpa prosa', en: 'Unslop text' } },
      { skillId: 'reflect', role: { pt: 'Extrai lições', en: 'Extract lessons' } },
      { skillId: 'correct', role: { pt: 'Bloqueia erros', en: 'Structural barrier' } },
      {
        skillId: 'principle-encode-lessons-in-structure',
        role: { pt: 'Codifica regra', en: 'Encode in linter' },
      },
    ],
  },
];

export const graphNodes: GraphNode[] = [
  { id: 'poteto-mode', label: 'poteto-mode', cluster: 'Orquestracao', x: 480, y: 270, r: 28 },
  { id: 'poteto-help', label: 'poteto-help', cluster: 'Orquestracao', x: 340, y: 140, r: 18 },
  { id: 'setup-pstack', label: 'setup-pstack', cluster: 'Orquestracao', x: 210, y: 95, r: 18 },
  { id: 'how', label: 'how', cluster: 'Investigacao', x: 270, y: 260, r: 22 },
  { id: 'why', label: 'why', cluster: 'Investigacao', x: 270, y: 380, r: 22 },
  { id: 'teach', label: 'teach', cluster: 'Investigacao', x: 130, y: 315, r: 18 },
  { id: 'recall', label: 'recall', cluster: 'Investigacao', x: 135, y: 430, r: 18 },
  {
    id: 'in-your-own-words',
    label: 'in-your-own-words',
    cluster: 'Investigacao',
    x: 450,
    y: 95,
    r: 16,
  },
  { id: 'sharpen', label: 'sharpen', cluster: 'Investigacao', x: 580, y: 75, r: 15 },
  { id: 'architect', label: 'architect', cluster: 'Arquitetura', x: 450, y: 410, r: 22 },
  { id: 'arena', label: 'arena', cluster: 'Arquitetura', x: 600, y: 420, r: 21 },
  { id: 'swarm', label: 'swarm', cluster: 'Arquitetura', x: 670, y: 295, r: 20 },
  { id: 'figure-it-out', label: 'figure-it-out', cluster: 'Arquitetura', x: 640, y: 170, r: 20 },
  { id: 'interrogate', label: 'interrogate', cluster: 'Qualidade', x: 585, y: 530, r: 20 },
  { id: 'blast-radius', label: 'blast-radius', cluster: 'Qualidade', x: 380, y: 530, r: 20 },
  { id: 'no-comments', label: 'no-comments', cluster: 'Qualidade', x: 495, y: 490, r: 18 },
  { id: 'tdd', label: 'tdd', cluster: 'Qualidade', x: 250, y: 510, r: 17 },
  {
    id: 'typescript-best-practices',
    label: 'ts-best-practices',
    cluster: 'Qualidade',
    x: 130,
    y: 525,
    r: 16,
  },
  {
    id: 'benchmark-checklist',
    label: 'benchmark-checklist',
    cluster: 'Qualidade',
    x: 690,
    y: 485,
    r: 16,
  },
  {
    id: 'create-verification-skill',
    label: 'create-verify',
    cluster: 'Verificacao',
    x: 85,
    y: 135,
    r: 17,
  },
  {
    id: 'maintain-verification-skill',
    label: 'maintain-verify',
    cluster: 'Verificacao',
    x: 80,
    y: 225,
    r: 16,
  },
  {
    id: 'create-formal-verification-skill',
    label: 'create-formal',
    cluster: 'Verificacao',
    x: 210,
    y: 180,
    r: 17,
  },
  { id: 'statechart', label: 'statechart', cluster: 'Verificacao', x: 345, y: 215, r: 17 },
  {
    id: 'maintain-formal-verification-skill',
    label: 'maintain-formal',
    cluster: 'Verificacao',
    x: 195,
    y: 265,
    r: 16,
  },
  { id: 'unslop', label: 'unslop', cluster: 'Comunicacao', x: 775, y: 235, r: 21 },
  {
    id: 'technical-writing',
    label: 'technical-writing',
    cluster: 'Comunicacao',
    x: 860,
    y: 330,
    r: 18,
  },
  {
    id: 'show-me-your-work',
    label: 'show-me-your-work',
    cluster: 'Comunicacao',
    x: 790,
    y: 135,
    r: 19,
  },
  { id: 'ketchup', label: 'ketchup', cluster: 'Comunicacao', x: 885, y: 420, r: 18 },
  { id: 'ketchup-video', label: 'ketchup-video', cluster: 'Comunicacao', x: 885, y: 515, r: 16 },
  { id: 'bro', label: 'bro', cluster: 'Comunicacao', x: 780, y: 460, r: 16 },
  { id: 'automate-me', label: 'automate-me', cluster: 'Meta', x: 760, y: 55, r: 17 },
  { id: 'reflect', label: 'reflect', cluster: 'Meta', x: 885, y: 80, r: 17 },
  { id: 'correct', label: 'correct', cluster: 'Meta', x: 890, y: 175, r: 17 },
];

export const graphEdges: GraphEdge[] = [
  { from: 'poteto-mode', to: 'how', label: 'usa' },
  { from: 'poteto-mode', to: 'architect', label: 'usa' },
  { from: 'poteto-mode', to: 'arena', label: 'usa' },
  { from: 'poteto-mode', to: 'swarm', label: 'usa' },
  { from: 'poteto-mode', to: 'interrogate', label: 'usa' },
  { from: 'poteto-mode', to: 'unslop', label: 'usa' },
  { from: 'poteto-mode', to: 'technical-writing', label: 'usa' },
  { from: 'poteto-mode', to: 'no-comments', label: 'usa' },
  { from: 'poteto-mode', to: 'benchmark-checklist', label: 'usa' },
  { from: 'poteto-mode', to: 'show-me-your-work', label: 'usa' },
  { from: 'poteto-mode', to: 'figure-it-out', label: 'usa' },
  { from: 'poteto-help', to: 'poteto-mode', label: 'roteia' },
  { from: 'poteto-help', to: 'setup-pstack', label: 'orienta' },
  { from: 'setup-pstack', to: 'create-verification-skill', label: 'oferece' },
  { from: 'setup-pstack', to: 'create-formal-verification-skill', label: 'oferece' },
  { from: 'create-verification-skill', to: 'maintain-verification-skill', label: 'mantem' },
  { from: 'create-formal-verification-skill', to: 'statechart', label: 'visualiza' },
  {
    from: 'create-formal-verification-skill',
    to: 'maintain-formal-verification-skill',
    label: 'mantem',
  },
  { from: 'maintain-formal-verification-skill', to: 'statechart', label: 'combina' },
  { from: 'architect', to: 'how', label: 'grounding' },
  { from: 'architect', to: 'why', label: 'grounding' },
  { from: 'architect', to: 'arena', label: 'explora' },
  { from: 'architect', to: 'interrogate', label: 'pressiona' },
  { from: 'teach', to: 'how', label: 'executa' },
  { from: 'teach', to: 'why', label: 'executa' },
  { from: 'teach', to: 'unslop', label: 'limpa' },
  { from: 'recall', to: 'why', label: 'varre' },
  { from: 'recall', to: 'unslop', label: 'limpa' },
  { from: 'interrogate', to: 'in-your-own-words', label: 'alinha' },
  { from: 'interrogate', to: 'arena', label: 'padrao' },
  { from: 'blast-radius', to: 'why', label: 'historico' },
  { from: 'blast-radius', to: 'arena', label: 'escala' },
  { from: 'blast-radius', to: 'unslop', label: 'limpa' },
  { from: 'no-comments', to: 'how', label: 'checa' },
  { from: 'no-comments', to: 'why', label: 'checa' },
  { from: 'no-comments', to: 'architect', label: 'remodela' },
  { from: 'figure-it-out', to: 'architect', label: 'desenha' },
  { from: 'figure-it-out', to: 'show-me-your-work', label: 'loga' },
  { from: 'technical-writing', to: 'unslop', label: 'aplica' },
  { from: 'show-me-your-work', to: 'unslop', label: 'aplica' },
  { from: 'ketchup', to: 'bro', label: 'voz' },
  { from: 'ketchup-video', to: 'ketchup', label: 'estende' },
  { from: 'automate-me', to: 'unslop', label: 'aplica' },
  { from: 'automate-me', to: 'poteto-mode', label: 'referencia' },
  { from: 'reflect', to: 'correct', label: 'complementa' },
  { from: 'sharpen', to: 'figure-it-out', label: 'prepara' },
  { from: 'tdd', to: 'blast-radius', label: 'combina' },
  { from: 'tdd', to: 'typescript-best-practices', label: 'combina' },
];

export const categoryColors: Record<
  SkillItem['category'],
  { bg: string; text: string; border: string; dot: string }
> = {
  Orquestracao: {
    bg: 'rgba(251, 191, 36, 0.14)',
    text: '#fbbf24',
    border: 'rgba(251, 191, 36, 0.35)',
    dot: '#fbbf24',
  },
  Investigacao: {
    bg: 'rgba(56, 189, 248, 0.14)',
    text: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.35)',
    dot: '#38bdf8',
  },
  Arquitetura: {
    bg: 'rgba(129, 140, 248, 0.16)',
    text: '#a5b4fc',
    border: 'rgba(129, 140, 248, 0.4)',
    dot: '#818cf8',
  },
  Qualidade: {
    bg: 'rgba(251, 113, 133, 0.14)',
    text: '#fda4af',
    border: 'rgba(251, 113, 133, 0.35)',
    dot: '#fb7185',
  },
  Verificacao: {
    bg: 'rgba(52, 211, 153, 0.14)',
    text: '#34d399',
    border: 'rgba(52, 211, 153, 0.35)',
    dot: '#34d399',
  },
  Comunicacao: {
    bg: 'rgba(192, 132, 252, 0.14)',
    text: '#d8b4fe',
    border: 'rgba(192, 132, 252, 0.35)',
    dot: '#c084fc',
  },
  Meta: {
    bg: 'rgba(251, 146, 60, 0.14)',
    text: '#fdba74',
    border: 'rgba(251, 146, 60, 0.35)',
    dot: '#fb923c',
  },
  Core: {
    bg: 'rgba(56, 189, 248, 0.14)',
    text: '#7dd3fc',
    border: 'rgba(56, 189, 248, 0.35)',
    dot: '#38bdf8',
  },
  Delegacao: {
    bg: 'rgba(192, 132, 252, 0.14)',
    text: '#d8b4fe',
    border: 'rgba(192, 132, 252, 0.35)',
    dot: '#c084fc',
  },
};
