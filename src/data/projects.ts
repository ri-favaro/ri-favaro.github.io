export interface ProjectCaseStudy {
  period: string;
  role: {
    pt: string;
    en: string;
  };
  context: {
    pt: string;
    en: string;
  };
  architecture: {
    pt: string[];
    en: string[];
  };
  highlights: {
    pt: string[];
    en: string[];
  };
}

export interface Project {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  tags: string[];
  link?: string;
  linkText?: {
    pt: string;
    en: string;
  };
  isInternal?: boolean;
  caseStudy: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    id: 'benito',
    title: {
      pt: 'Benito — Assistente Autônomo & IA Local',
      en: 'Benito — Autonomous Personal Assistant & Local AI',
    },
    description: {
      pt: 'Arquitetura cognitiva com raciocínio desacoplado (Decoupled Reasoning) e parser FSM em streaming. Pipeline local de RAG vetorial com LanceDB e EmbeddingGemma-2 (~270MB RAM), runner de comandos com sandbox de filesystem (path-guard) e 13+ suítes de testes automatizados com Jest.',
      en: 'Cognitive architecture with decoupled reasoning and streaming FSM parser. Features a local vector RAG pipeline using LanceDB and EmbeddingGemma-2 (~270MB RAM), execution runner with filesystem path-guard sandbox, and 13+ automated test suites with Jest.',
    },
    tags: ['Node.js', 'TypeScript', 'Vercel AI SDK', 'LanceDB', 'Ollama', 'Jest'],
    link: 'https://github.com/ri-favaro/BenitoAgentePessoal',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
    caseStudy: {
      period: '2026',
      role: {
        pt: 'Criador & Engenheiro Principal',
        en: 'Creator & Lead Engineer',
      },
      context: {
        pt: 'Projetado para operar como assistente pessoal autônomo em máquina local, mantendo baixo consumo de memória e isolamento estrito na execução de ferramentas e acesso ao sistema de arquivos.',
        en: 'Designed to run as an autonomous personal assistant on local hardware, keeping memory footprint low while enforcing strict isolation on tool execution and filesystem access.',
      },
      architecture: {
        pt: [
          'Raciocínio desacoplado (Decoupled Reasoning) com parser FSM em streaming sem latência adicional na resposta ao usuário.',
          'Pipeline de RAG vetorial local com LanceDB e embeddings EmbeddingGemma-2 (768 dimensões) consumindo ~270MB de RAM e indexação incremental por SHA-256.',
          'Runner de orquestração técnica com whitelist explícita de comandos, controle de timeout e sandbox de filesystem (path-guard).',
        ],
        en: [
          'Decoupled Reasoning cognitive loop with a streaming FSM parser adding zero extra latency to user-facing responses.',
          'Local vector RAG pipeline built on LanceDB and 768d EmbeddingGemma-2 (~270MB RAM) with SHA-256 incremental indexing.',
          'Technical orchestration runner enforcing command whitelisting, timeout limits, and strict filesystem sandboxing (path-guard).',
        ],
      },
      highlights: {
        pt: [
          '13+ suítes de testes automatizados com Jest e Node.js Test Runner.',
          'Stack em Node.js 22+, TypeScript 5.8+, Vercel AI SDK, Ollama, grammY e Zod.',
        ],
        en: [
          '13+ automated test suites powered by Jest and Node.js Test Runner.',
          'Built with Node.js 22+, TypeScript 5.8+, Vercel AI SDK, Ollama, grammY, and Zod.',
        ],
      },
    },
  },
  {
    id: 'quicknote-crm',
    title: {
      pt: 'QuickNote CRM — Dock Desktop Offline-First (Tauri v2)',
      en: 'QuickNote CRM — Offline-First Desktop Dock (Tauri v2)',
    },
    description: {
      pt: 'Dock desktop leve em Tauri v2 (Rust) e React/TypeScript para equipes de Customer Success registrarem notas e tarefas durante reuniões. Persistência local offline-first em SQLite, integração sob demanda com Pipedrive, atalhos globais, fronteira IPC isolada e instaladores multi-OS (v0.1.0).',
      en: 'Lightweight Tauri v2 (Rust) and React/TypeScript desktop dock built for Customer Success teams to capture notes and tasks during meetings. Features offline-first SQLite persistence, on-demand Pipedrive sync, global shortcuts, an isolated IPC boundary, and multi-OS installers (v0.1.0).',
    },
    tags: ['Tauri v2', 'Rust', 'React', 'TypeScript', 'SQLite', 'Pipedrive'],
    link: 'https://github.com/ri-favaro/quicknote-crm',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
    caseStudy: {
      period: '2026',
      role: {
        pt: 'Criador & Engenheiro Principal',
        en: 'Creator & Lead Engineer',
      },
      context: {
        pt: 'Desenvolvido como ferramenta residente de baixo consumo para equipes de Customer Success capturarem notas e tarefas durante reuniões sem sair da chamada, com envio sob demanda ao CRM e funcionamento 100% offline.',
        en: 'Built as a low-footprint resident desktop tool for Customer Success teams to capture meeting notes and tasks without leaving a call, supporting on-demand CRM sync and 100% offline operation.',
      },
      architecture: {
        pt: [
          'Dock frameless (always-on-top e skipTaskbar) retrátil nas bordas da tela com system tray e atalhos globais (Alt+Space, Ctrl+Shift+N e Esc).',
          'Persistência local offline-first em SQLite para notas, tarefas e perfil CS, com fronteira IPC isolada (bridge.ts) mantendo tokens e credenciais apenas no backend Rust.',
          'Integração sob demanda com Pipedrive (busca de deals e envio de notas/atividades) e configurações prontas para webhooks n8n e backup/auditoria no Supabase.',
        ],
        en: [
          'Frameless retractable edge dock (always-on-top, skipTaskbar) with system tray controls and global shortcuts (Alt+Space, Ctrl+Shift+N, and Esc).',
          'Offline-first SQLite persistence for notes, tasks, and CS profile metadata behind an isolated IPC boundary (bridge.ts) keeping credentials strictly in the Rust backend.',
          'On-demand Pipedrive integration (deal lookup and note/activity publishing) alongside persisted configuration for n8n webhooks and Supabase audit backups.',
        ],
      },
      highlights: {
        pt: [
          'Release v0.1.0 publicada com instaladores nativos para Windows (.msi/.exe), macOS (.dmg Apple Silicon e Intel) e Linux (.AppImage/.deb).',
          'Stack enxuta em Tauri v2 (Rust), React, TypeScript, Tailwind CSS e SQLite com zero dependência de nuvem para captura local.',
        ],
        en: [
          'v0.1.0 release published with native installers for Windows (.msi/.exe), macOS (.dmg Apple Silicon and Intel), and Linux (.AppImage/.deb).',
          'Lean stack built with Tauri v2 (Rust), React, TypeScript, Tailwind CSS, and SQLite with zero cloud dependency for local capture.',
        ],
      },
    },
  },
  {
    id: 'tcc',
    title: {
      pt: 'TCC — Jogos Lúdico-Musicais Interativos (COBRICS)',
      en: 'Capstone — Interactive Musical Learning (COBRICS)',
    },
    description: {
      pt: 'Sistema interativo para ensino musical infantil (4 a 8 anos) unindo hardware embarcado e aplicativo móvel Android. Validado em campo com pedagogos, nota máxima (10) na banca avaliadora de Engenharia da Computação e artigo publicado no congresso COBRICS 2024.',
      en: "Interactive system for children's musical learning (ages 4-8) combining embedded hardware and an Android mobile app. Field-tested with educators, awarded top honors (10/10) by the evaluation committee, and published at the COBRICS 2024 conference.",
    },
    tags: ['ESP32', 'RFID', 'Firebase', 'Android', 'C/C++'],
    caseStudy: {
      period: '2024',
      role: {
        pt: 'Autor & Engenheiro de Hardware/Software',
        en: 'Author & Hardware/Software Engineer',
      },
      context: {
        pt: 'Trabalho de Conclusão de Curso em Engenharia da Computação (UNISANTA) voltado ao ensino lúdico-musical para crianças de 4 a 8 anos com feedback físico imediato.',
        en: 'Computer Engineering Capstone Project (UNISANTA) designed for playful musical education for children aged 4–8 with immediate physical feedback.',
      },
      architecture: {
        pt: [
          'Leitura de peças musicais físicas via tags RFID conectadas a microcontrolador ESP32 em C/C++.',
          'Sincronização de eventos em tempo real via Firebase Realtime Database entre o hardware embarcado e o aplicativo móvel Android.',
        ],
        en: [
          'Physical musical token detection using RFID tags wired to an ESP32 microcontroller programmed in C/C++.',
          'Real-time state synchronization via Firebase Realtime Database bridging embedded hardware and the Android app.',
        ],
      },
      highlights: {
        pt: [
          'Nota máxima (10/10) na banca avaliadora de Engenharia da Computação (UNISANTA).',
          'Artigo científico publicado nos anais do congresso COBRICS 2024 após validação em campo com pedagogos.',
        ],
        en: [
          'Awarded maximum grade (10/10) by the UNISANTA Computer Engineering evaluation committee.',
          'Scientific paper published in the COBRICS 2024 conference proceedings following field validation with educators.',
        ],
      },
    },
  },
  {
    id: 'rmda',
    title: {
      pt: 'RMDA — Robô de Monitoramento Ambiental',
      en: 'RMDA — Environmental Monitoring Robot',
    },
    description: {
      pt: 'Prova de conceito de robô IoT para monitoramento ambiental, transmitindo telemetria via rede LPWAN (LoRaWAN/TTN) para processamento em nuvem em VM Azure com dashboard em tempo real.',
      en: 'IoT robot proof-of-concept for environmental sensing, transmitting telemetry via LPWAN (LoRaWAN/TTN) for processing on an Azure VM with a real-time dashboard.',
    },
    tags: ['LoRaWAN', 'TTN', 'Azure', 'Python', 'IoT'],
    link: 'https://github.com/ri-favaro/Projeto-IOT-23',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
    caseStudy: {
      period: '2023',
      role: {
        pt: 'Desenvolvedor IoT & Cloud',
        en: 'IoT & Cloud Developer',
      },
      context: {
        pt: 'Prova de conceito de telemetria remota para ambientes sem cobertura Wi-Fi tradicional, utilizando comunicação de longo alcance e baixo consumo energético.',
        en: 'Remote telemetry proof-of-concept for environments without traditional Wi-Fi coverage, leveraging long-range, low-power radio communication.',
      },
      architecture: {
        pt: [
          'Coleta de sensores embarcados e transmissão de pacotes via rede LPWAN (LoRaWAN) roteados pela The Things Network (TTN).',
          'Ingestão, processamento e exibição dos dados em tempo real em VM hospedada no Microsoft Azure com dashboard gráfico.',
        ],
        en: [
          'Embedded sensor sampling and telemetry packet transmission over LPWAN (LoRaWAN) routed through The Things Network (TTN).',
          'Real-time data ingestion, processing, and visualization on a Microsoft Azure VM with a live graphical dashboard.',
        ],
      },
      highlights: {
        pt: [
          'Comunicação ponta a ponta entre camada física IoT e infraestrutura em nuvem.',
          'Código-fonte e documentação disponíveis no GitHub.',
        ],
        en: [
          'End-to-end telemetry pipeline bridging physical IoT hardware and cloud infrastructure.',
          'Source code and documentation available on GitHub.',
        ],
      },
    },
  },
  {
    id: 'widrow-hoff',
    title: {
      pt: 'Algoritmo Widrow-Hoff (Adaline)',
      en: 'Widrow-Hoff Algorithm (Adaline)',
    },
    description: {
      pt: 'Implementação interativa do algoritmo de aprendizado supervisionado Widrow-Hoff (Adaline) no navegador, demonstrando a convergência dos pesos e ajuste da reta de separação em tempo real.',
      en: 'Interactive browser-based implementation of the Widrow-Hoff supervised learning algorithm (Adaline), demonstrating weight convergence and real-time decision boundary separation.',
    },
    tags: ['JavaScript', 'HTML5 Canvas', 'Machine Learning'],
    link: 'https://github.com/ri-favaro/Algoritmo-baseado-no-m-todo-WidrowHoff---HTML',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
    caseStudy: {
      period: '2023',
      role: {
        pt: 'Autor',
        en: 'Author',
      },
      context: {
        pt: 'Ferramenta visual didática para observar passo a passo a regra delta (LMS) ajustando os pesos sinápticos de um neurônio Adaline diretamente no navegador, sem dependências externas.',
        en: 'Visual educational tool to observe the delta rule (LMS) step by step as it adjusts an Adaline neuron’s synaptic weights directly in the browser without external dependencies.',
      },
      architecture: {
        pt: [
          'Renderização em HTML5 Canvas com plotagem interativa de pontos de treino e atualização contínua da reta de separação linear.',
          'Cálculo iterativo do erro quadrático e atualização de pesos em JavaScript puro.',
        ],
        en: [
          'HTML5 Canvas rendering with interactive training point plotting and live linear decision boundary updates.',
          'Iterative squared-error computation and weight updates implemented in vanilla JavaScript.',
        ],
      },
      highlights: {
        pt: [
          'Execução 100% client-side sem necessidade de backend ou bibliotecas externas.',
          'Visualização em tempo real da convergência dos pesos.',
        ],
        en: [
          '100% client-side execution with zero backend or external library dependencies.',
          'Real-time visualization of weight convergence.',
        ],
      },
    },
  },
];
