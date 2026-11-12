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
    id: 'tcc',
    title: {
      pt: 'TCC — Aprendizado e Diversão',
      en: 'TCC — Learning and Fun',
    },
    description: {
      pt: 'Jogo educativo interativo para ensino musical infantil (4 a 8 anos), unindo hardware embarcado e aplicativo móvel. Validado com crianças e pedagogos, publicado na COBRICS.',
      en: "Interactive educational game for children's musical learning (ages 4-8), combining embedded hardware and a mobile app. Validated with children and educators, published at COBRICS.",
    },
    tags: ['ESP32', 'RFID', 'Firebase', 'Android'],
  },
  {
    id: 'rmda',
    title: {
      pt: 'RMDA — Robô de Monitoramento de Ambientes',
      en: 'RMDA — Environment Monitoring Robot',
    },
    description: {
      pt: 'Robô IoT como prova de conceito para monitoramento de ambientes, transmitindo dados via LoRaWAN para servidor local e VM Azure com dashboard gráfico.',
      en: 'IoT robot proof-of-concept for environment monitoring, transmitting data via LoRaWAN to a local server and an Azure VM with a graphical dashboard.',
    },
    tags: ['LoRaWAN', 'TTN', 'Azure', 'IoT'],
    link: 'https://github.com/ri-favaro/Projeto-IOT-23',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
  },
  {
    id: 'widrow-hoff',
    title: {
      pt: 'Algoritmo Widrow-Hoff',
      en: 'Widrow-Hoff Algorithm',
    },
    description: {
      pt: 'Implementação interativa do algoritmo de aprendizado supervisionado Widrow-Hoff, com visualização em tempo real no navegador.',
      en: 'Interactive implementation of the Widrow-Hoff supervised learning algorithm, with real-time visualization in the browser.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Machine Learning'],
    link: 'https://github.com/ri-favaro/Algoritmo-baseado-no-m-todo-WidrowHoff---HTML',
    linkText: {
      pt: 'Ver no GitHub',
      en: 'View on GitHub',
    },
  },
];
