# 07 — i18n PT/EN e migração de stack

**Data:** 2026-05-29

## O que mudou

- **Stack migrada de Vite para `npx serve`** — removido `vite` de devDependencies, removido `"type": "module"`, scripts simplificados para `npx serve . --listen 3000 --no-clipboard` (alinhado com `lp-magnus` e `site-portfolio`).
- **Sistema de i18n PT/EN adicionado:**
  - `translations/pt.js` — dicionário em português (tagline, labels dos links, footer, aria-labels).
  - `translations/en.js` — dicionário em inglês.
  - `js/i18n.js` — engine de tradução: lê `data-i18n` / `data-i18n-aria`, salva preferência em `localStorage`.
  - `js/main.js` — inicializa i18n e conecta os botões de toggle.
- **`index.html` atualizado:**
  - `data-i18n` adicionado em: tagline, labels dos links, footer, skip-link.
  - `data-i18n-aria` adicionado nos ícones sociais.
  - Lang-toggle (PT/EN) inserido entre logo e tagline.
  - Tagline atualizada para "Marketing · Tecnologia · IA" (ordem alinhada com LP e portfolio).
  - Scripts de tradução e JS adicionados ao final do `<body>` (sem módulo ES).
- **`src/style.css` atualizado:** estilos do `.lang-toggle` e `.lang-toggle__btn` adicionados.
- **`vercel.json` atualizado:** adicionada regra de cache `no-cache` para `/translations/(.*)`, `$schema` inserido.

## Por que

Alinhamento com os demais projetos Magnus (`lp-magnus`, `site-portfolio`): mesma identidade de copy, mesma stack estática, mesma funcionalidade de tradução PT/EN.

## Arquivos alterados

- `index.html`
- `src/style.css`
- `package.json`
- `vercel.json`
- `translations/pt.js` (novo)
- `translations/en.js` (novo)
- `js/i18n.js` (novo)
- `js/main.js` (novo)
