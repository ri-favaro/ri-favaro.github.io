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
  },
];
