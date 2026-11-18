export interface BilingualText {
  pt: string;
  en: string;
}

export interface ExperienceItem {
  company: string;
  role: BilingualText;
  location: string;
  period: BilingualText;
  highlights: {
    pt: string[];
    en: string[];
  };
}

export interface EducationItem {
  degree: BilingualText;
  institution: string;
  status: BilingualText;
  details: BilingualText;
}

export interface SkillGroup {
  category: BilingualText;
  items: string[];
}

export interface LanguageItem {
  name: BilingualText;
  level: BilingualText;
}

export const resumeMeta = {
  name: 'Luiz Ricardo Favaro',
  role: {
    pt: 'Desenvolvedor de Software | Backend & IA',
    en: 'Software Developer | Backend & AI',
  },
  location: 'Guarujá, SP — Brasil',
  pdfPath: '/cv-luiz-ricardo-favaro.pdf',
  summary: {
    pt: 'Engenheiro da Computação (UNISANTA) e pós-graduando no MBA em Engenharia de Software (USP/ESALQ), com atuação prática na construção de APIs REST escaláveis, integrações críticas de sistemas, microsserviços e soluções produtivas com IA Generativa (Anthropic Claude e modelos locais). Experiência em TypeScript, Node.js (ESM), PostgreSQL, Docker e Next.js, combinada com Clean Architecture, DDD e TDD.',
    en: 'Computer Engineer (UNISANTA) and Software Engineering MBA candidate (USP/ESALQ) with hands-on experience building scalable REST APIs, mission-critical system integrations, microservices, and production Generative AI solutions (Anthropic Claude and local models). Proficient in TypeScript, Node.js (ESM), PostgreSQL, Docker, and Next.js, grounded in Clean Architecture, DDD, and TDD.',
  },
};

export const experiences: ExperienceItem[] = [
  {
    company: 'Contele',
    role: {
      pt: 'Desenvolvedor de Integrações · Foco em IA e Automações',
      en: 'Integrations Developer · AI & Automation Focus',
    },
    location: 'Santos, SP',
    period: {
      pt: 'abr/2026 – atual',
      en: 'Apr 2026 – Present',
    },
    highlights: {
      pt: [
        'Integração ponta a ponta com APIs REST dos Correios: pré-postagem automática, emissão de etiquetas em PDF e comprovantes de logística reversa na troca de equipamentos.',
        'Dashboard de rastreamento integrado à API Rastro dos Correios com detecção automática de atrasos operacionais, filtros por status e busca por destinatário ou código.',
        'Pipelines corporativos com Node.js, TypeScript e N8N orquestrando Pipedrive (CRM), Asana e grupos de WhatsApp via webhooks e mensageria assíncrona.',
        'Fluxos em produção com Claude (Anthropic) para triagem operacional, abertura assistida de demandas e auditoria de predição de churn para Customer Success.',
        'Módulos fullstack no CONTELE-OS com Next.js (App Router), React, TypeScript e Supabase (PostgreSQL), migrações versionadas em SQL, validação Zod e testes com Jest.',
      ],
      en: [
        'End-to-end integration with Correios REST APIs: automated pre-posting, PDF shipping labels, and reverse logistics receipts for hardware swaps.',
        'Real-time tracking dashboard integrated with the Correios Rastro API, featuring automated delay detection, status filters, and recipient/tracking search.',
        'Corporate automation pipelines using Node.js, TypeScript, and N8N orchestrating Pipedrive (CRM), Asana, and WhatsApp groups via webhooks and async messaging.',
        'Production LLM workflows with Claude (Anthropic) for operational triage, assisted ticket creation, and churn prediction auditing for Customer Success.',
        'Fullstack modules on CONTELE-OS using Next.js (App Router), React, TypeScript, and Supabase (PostgreSQL), with versioned SQL migrations, Zod validation, and Jest tests.',
      ],
    },
  },
  {
    company: 'O Especialista',
    role: {
      pt: 'Suporte de TI & Infraestrutura',
      en: 'IT Support & Infrastructure',
    },
    location: 'Guarujá, SP',
    period: {
      pt: 'jun/2024 – dez/2024',
      en: 'Jun 2024 – Dec 2024',
    },
    highlights: {
      pt: [
        'Suporte técnico nível 1 e 2 presencial e remoto atendendo de 4 a 5 empresas clientes simultaneamente.',
        'Diagnóstico e reparo de hardware, configuração de redes locais (TCP/IP, roteamento, firewalls) e resolução de incidentes críticos com foco em SLA.',
      ],
      en: [
        'On-site and remote Tier 1 & Tier 2 technical support serving 4 to 5 client companies simultaneously.',
        'Hardware diagnostics and repair, local network configuration (TCP/IP, routing, firewalls), and critical incident resolution under SLA targets.',
      ],
    },
  },
];

export const education: EducationItem[] = [
  {
    degree: {
      pt: 'MBA em Engenharia de Software',
      en: 'MBA in Software Engineering',
    },
    institution: 'Universidade de São Paulo (USP / ESALQ)',
    status: {
      pt: 'Em andamento',
      en: 'In progress',
    },
    details: {
      pt: 'Clean Architecture, Domain-Driven Design (DDD), Mensageria Assíncrona (RabbitMQ/Kafka), Microsserviços e Test-Driven Development (TDD).',
      en: 'Clean Architecture, Domain-Driven Design (DDD), Asynchronous Messaging (RabbitMQ/Kafka), Microservices, and Test-Driven Development (TDD).',
    },
  },
  {
    degree: {
      pt: 'Bacharelado em Engenharia da Computação',
      en: 'B.S. in Computer Engineering',
    },
    institution: 'Universidade Santa Cecília (UNISANTA)',
    status: {
      pt: 'Concluído em 2024',
      en: 'Graduated in 2024',
    },
    details: {
      pt: 'Autor de artigo publicado no congresso científico COBRICS 2024; nota máxima (10) no TCC de jogos lúdicos interativos com ESP32 e Firebase.',
      en: 'Published research paper at the COBRICS 2024 scientific conference; top grade (10/10) on capstone project combining ESP32, RFID, and Firebase.',
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: { pt: 'Linguagens', en: 'Languages' },
    items: [
      'TypeScript',
      'JavaScript (ES2023+ / Node.js)',
      'Python',
      'SQL (PostgreSQL, MySQL)',
      'Go',
      'C/C++',
    ],
  },
  {
    category: { pt: 'Backend & Integrações', en: 'Backend & Integrations' },
    items: [
      'APIs RESTful',
      'Node.js (v20+ / v22+)',
      'Express',
      'Zod',
      'N8N',
      'Microsserviços',
      'Webhooks',
    ],
  },
  {
    category: { pt: 'IA & Engenharia Cognitiva', en: 'AI & Cognitive Engineering' },
    items: [
      'Anthropic Claude',
      'OpenAI',
      'Vercel AI SDK',
      'Ollama',
      'LanceDB (RAG)',
      'EmbeddingGemma-2',
      'Tool Calling',
    ],
  },
  {
    category: { pt: 'Dados & Cloud', en: 'Data & Cloud' },
    items: [
      'PostgreSQL / Supabase',
      'MySQL',
      'SQLite',
      'Firebase',
      'Microsoft Azure (VMs)',
      'Docker',
      'Linux',
    ],
  },
  {
    category: { pt: 'Arquitetura & Qualidade', en: 'Architecture & Quality' },
    items: [
      'Clean Architecture',
      'DDD',
      'TDD',
      'GitHub Actions (CI/CD)',
      'Jest / Vitest',
      'Kanban',
    ],
  },
  {
    category: { pt: 'Frontend', en: 'Frontend' },
    items: ['Next.js (App Router)', 'React', 'Astro', 'Tailwind CSS'],
  },
];

export const languages: LanguageItem[] = [
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
  { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Avançado', en: 'Advanced' } },
  { name: { pt: 'Espanhol', en: 'Spanish' }, level: { pt: 'Intermediário', en: 'Intermediate' } },
];
