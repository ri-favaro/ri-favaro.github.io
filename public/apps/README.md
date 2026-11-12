# Sub-aplicações e Demos Interativos (`/apps/`)

Este diretório é destinado a hospedar mini-projetos, simuladores e demonstrações interativas estáticas que você queira servir diretamente no seu domínio (`https://ri-favaro.github.io/apps/<nome-do-app>/`).

## Como adicionar um novo mini-projeto estático:

1. Crie uma subpasta aqui, por exemplo: `public/apps/widrow-hoff/`
2. Coloque seus arquivos estáticos dentro dela: `index.html`, `style.css`, `script.js` (ou o build de um app Vite/WASM).
3. Certifique-se de que caminhos para assets usem caminhos relativos (`./style.css`) ou prefixados com `/apps/<nome-do-app>/`.
4. Ao rodar `npm run build`, o Astro copia todo o conteúdo de `public/` diretamente para a raiz do build `dist/`, disponibilizando a aplicação automaticamente em `https://ri-favaro.github.io/apps/<nome-do-app>/`.
5. No arquivo `src/data/projects.ts`, aponte o card para `/apps/<nome-do-app>/` com a flag `isInternal: true`.
