export interface NowItem {
  id: string;
  tag: {
    pt: string;
    en: string;
  };
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

export const nowMeta = {
  updatedAt: '2026-11',
  location: 'Guarujá, SP — Brasil',
  intro: {
    pt: 'Um resumo direto do que estou construindo, integrando e estudando neste momento.',
    en: 'A concise snapshot of what I am building, integrating, and studying right now.',
  },
};

export const nowItems: NowItem[] = [
  {
    id: 'contele',
    tag: {
      pt: 'TRABALHO',
      en: 'WORK',
    },
    title: {
      pt: 'Integrações Críticas & IA em Produção na Contele',
      en: 'Mission-Critical Integrations & Production AI at Contele',
    },
    description: {
      pt: 'Desenvolvendo integrações ponta a ponta com APIs REST dos Correios (pré-postagem, etiquetas e logística reversa), pipelines assíncronos em Node.js, TypeScript e N8N, fluxos com Claude para triagem operacional e módulos fullstack no CONTELE-OS com Next.js, Supabase e PostgreSQL.',
      en: 'Building end-to-end Correios REST integrations (pre-posting, shipping labels, and reverse logistics), async pipelines with Node.js, TypeScript, and N8N, Claude workflows for operational triage, and fullstack modules on CONTELE-OS using Next.js, Supabase, and PostgreSQL.',
    },
  },
  {
    id: 'mba-usp',
    tag: {
      pt: 'ESTUDOS',
      en: 'STUDY',
    },
    title: {
      pt: 'MBA em Engenharia de Software (USP / ESALQ)',
      en: 'MBA in Software Engineering (USP / ESALQ)',
    },
    description: {
      pt: 'Aprofundando arquitetura de sistemas distribuídos, Clean Architecture, Domain-Driven Design (DDD), mensageria assíncrona com RabbitMQ/Kafka e Test-Driven Development (TDD).',
      en: 'Deepening distributed systems architecture, Clean Architecture, Domain-Driven Design (DDD), asynchronous messaging with RabbitMQ/Kafka, and Test-Driven Development (TDD).',
    },
  },
  {
    id: 'benito',
    tag: {
      pt: 'PROJETO AUTORAL',
      en: 'SIDE PROJECT',
    },
    title: {
      pt: 'Benito — Engenharia Cognitiva & RAG Local',
      en: 'Benito — Cognitive Engineering & Local RAG',
    },
    description: {
      pt: 'Evoluindo o assistente pessoal autônomo em Node.js e TypeScript com raciocínio desacoplado (Decoupled Reasoning), pipeline de RAG vetorial local em LanceDB (~270MB RAM) e sandbox estrito de filesystem (path-guard).',
      en: 'Evolving my autonomous personal assistant in Node.js and TypeScript with Decoupled Reasoning, a local vector RAG pipeline on LanceDB (~270MB RAM), and a strict filesystem sandbox (path-guard).',
    },
  },
];
