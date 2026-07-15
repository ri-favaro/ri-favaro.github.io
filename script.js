const translations = {
  pt: {
    'hero.role': 'Desenvolvedor de Software',
    'hero.bio': 'Profissional em início de carreira com experiência em desenvolvimento web, integração de APIs e projetos embarcados/IoT. Buscando oportunidades para crescer como desenvolvedor, contribuindo com times ágeis e soluções orientadas a produto.',
    'about.heading': 'Sobre',
    'about.role': 'Atualmente Desenvolvedor de Integrações Jr. na Contele (foco em IA e Automações): integrações e automações com Node.js, TypeScript e N8N, consumo de APIs REST e aplicação de LLMs (incluindo Claude da Anthropic) em fluxos inteligentes.',
    'about.education': 'Engenharia da Computação pela Universidade Santa Cecília (completo); cursando MBA em Engenharia de Software pela USP/ESALQ.',
    'about.languages': 'Idiomas: Português (nativo), Inglês (avançado), Espanhol (intermediário).',
    'projects.heading': 'Projetos',
    'project.tcc.title': 'TCC — Aprendizado e Diversão',
    'project.tcc.description': 'Jogo educativo interativo para ensino musical infantil (4 a 8 anos), unindo hardware embarcado e aplicativo móvel. Validado com crianças e pedagogos, publicado na COBRICS.',
    'project.rmda.title': 'RMDA — Robô de Monitoramento de Ambientes',
    'project.rmda.description': 'Robô IoT como prova de conceito para monitoramento de ambientes, transmitindo dados via LoRaWAN para servidor local e VM Azure com dashboard gráfico.',
    'project.widrow.title': 'Algoritmo Widrow-Hoff',
    'project.widrow.description': 'Implementação interativa do algoritmo de aprendizado supervisionado Widrow-Hoff, com visualização em tempo real no navegador.',
    'project.link': 'Ver no GitHub',
    'footer.heading': 'Contato'
  },
  en: {
    'hero.role': 'Software Developer',
    'hero.bio': 'Early-career professional with experience in web development, API integration, and embedded/IoT projects. Looking for opportunities to grow as a developer, contributing to agile teams and product-driven solutions.',
    'about.heading': 'About',
    'about.role': "Currently Junior Integrations Developer at Contele (focus on AI and Automation): integrations and process automation with Node.js, TypeScript and N8N, REST API consumption, and applying LLMs (including Anthropic's Claude) in intelligent automation flows.",
    'about.education': 'Computer Engineering from Universidade Santa Cecília (completed); currently pursuing an MBA in Software Engineering from USP/ESALQ.',
    'about.languages': 'Languages: Portuguese (native), English (advanced), Spanish (intermediate).',
    'projects.heading': 'Projects',
    'project.tcc.title': 'TCC — Learning and Fun',
    'project.tcc.description': "Interactive educational game for children's musical learning (ages 4-8), combining embedded hardware and a mobile app. Validated with children and educators, published at COBRICS.",
    'project.rmda.title': 'RMDA — Environment Monitoring Robot',
    'project.rmda.description': 'IoT robot proof-of-concept for environment monitoring, transmitting data via LoRaWAN to a local server and an Azure VM with a graphical dashboard.',
    'project.widrow.title': 'Widrow-Hoff Algorithm',
    'project.widrow.description': 'Interactive implementation of the Widrow-Hoff supervised learning algorithm, with real-time visualization in the browser.',
    'project.link': 'View on GitHub',
    'footer.heading': 'Contact'
  }
};

function applyLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.getElementById('lang-toggle').textContent = lang === 'pt' ? 'EN' : 'PT';
  localStorage.setItem('lang', lang);
}

function initLanguage() {
  const saved = localStorage.getItem('lang');
  const browserLang = navigator.language && navigator.language.startsWith('en') ? 'en' : 'pt';
  applyLanguage(saved || browserLang);
}

function toggleLanguage() {
  const current = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'pt';
  applyLanguage(current === 'pt' ? 'en' : 'pt');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', function() {
  const initialTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(initialTheme);
  initLanguage();
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);
});
