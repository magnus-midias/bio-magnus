# CLAUDE.md — bio-magnus

> **Ordem de leitura obrigatoria antes de qualquer alteracao:**
> 1. `docs/constitution.md` : principios inviolaveis, seguranca, SEO, contas. Supersede este arquivo e qualquer outro.
> 2. `docs/prd-e-arquitetura/instrucoes.md` : regras de trabalho.
> 3. `docs/historico/` em ordem crescente.
> 4. Se houver impacto visual, `docs/design-system/MASTER.md` (fonte da marca; `design-system.md` e so o detalhamento de componentes).
>
> Depois de qualquer alteracao relevante: registro em `docs/historico/NN-descricao-AAAA-MM-DD.md` e commit em Conventional Commits.

Arquivo de contexto que o agente deve consultar **antes de qualquer alteração** no projeto.

---

## Visão geral do projeto

`bio-magnus` é o **link-in-bio oficial da Magnus Mídias** — a página de destino usada no link da bio do Instagram (`@magnusmidias`) e demais redes sociais. Função única: concentrar os CTAs principais da marca em um só lugar, mobile-first.

- **Público:** seguidores das redes sociais da Magnus que chegam pelo link da bio.
- **Objetivo de negócio:** converter tráfego social em conversa comercial (site institucional, WhatsApp ou e-mail).
- **Links ativos (em ordem):**
  1. **Site Oficial** — `https://magnusmidias.com`.
  2. **WhatsApp** — `https://wa.me/5555999062078` com mensagem pré-preenchida.
  3. **E-mail** — `mailto:contato@magnusmidias.com`.

  > O link de Diagnóstico Gratuito foi removido e substituído pelo de e-mail (ver `docs/historico/08-ajustes-visuais-links-footer-2026-05-29.md`). Se os links mudarem de novo, atualizar aqui **e** no `llms.txt`, que descreve os destinos para rastreadores de IA.
- **Social icons:** Instagram, LinkedIn, YouTube (`@magnusmidias` / `/company/magnusmidias` / `@magnusmidias`).
- **Restrições de escopo:** página única (sem rotas), sem backend, sem analytics embarcado no momento, sem formulário. Tudo estático.

Identidade visual: Magnus Mídias (navy profundo `#00002B` sobre off-white `#F4F4F9`, tipografia `Sora`). Detalhes completos em [docs/design-system/MASTER.md](docs/design-system/MASTER.md).

## Stack

- **Build tool:** nenhum. Site estático puro — sem Vite, sem bundler.
- **Dev server local:** `npx serve . --listen 3000` via `npm run dev`.
- **Linguagens:** HTML5 + CSS puro + JavaScript vanilla (script clássico, sem `type="module"`) + SVG inline.
- **Frameworks:** nenhum. **Sem** React, Tailwind, shadcn/ui ou bibliotecas de UI. Tokens declarados diretamente em CSS custom properties no `:root` de [src/style.css](src/style.css).
- **JS:** [js/main.js](js/main.js) (init i18n + lang-toggle) + [js/i18n.js](js/i18n.js) (engine PT/EN).
- **i18n:** [translations/pt.js](translations/pt.js) e [translations/en.js](translations/en.js) — `window.__i18n`; toggle salvo em `localStorage`.
- **Fonte:** `Sora` via Google Fonts (preconnect + `<link>` em [index.html](index.html)).
- **Deploy:** Vercel (conectada ao repositório `https://github.com/magnus-midias/bio-magnus.git`, branch `main`). Sem build — serve a raiz diretamente. `vercel.json` com `framework: null`, `buildCommand: null`, `outputDirectory: "."`.

## Scripts de desenvolvimento

- `npm run dev` — inicia servidor estático local na porta 3000 via `npx serve`.

## Marca / identidade visual

Magnus Mídias — consultoria de Tecnologia com IA e Marketing Estratégico.

- Tom de voz: direto, sóbrio, anti-hype. Frases curtas, afirmativas, com contraste.
- Estética: premium minimalista — navy profundo sobre off-white, `Sora` em todos os pesos, alto contraste em neutros frios, cantos generosos (`6 / 12 / 24 px`), zero poluição gráfica.
- Documento canônico: [docs/design-system/MASTER.md](docs/design-system/MASTER.md). Assets em [docs/design-system/logos/](docs/design-system/logos/), [docs/design-system/icones/](docs/design-system/icones/), [docs/design-system/favicon/](docs/design-system/favicon/).

---

## Estrutura de pastas relevante

```
bio-magnus/
├── index.html              # página única (estrutura + SVGs inline)
├── favicon.svg             # favicon set completo servido na raiz
├── favicon-*.png           #   (16/32/48/192/512), apple-touch-icon 180, favicon.ico
├── site.webmanifest
├── robots.txt              # descoberta
├── sitemap.xml
├── llms.txt                # descreve a página para rastreadores de IA
├── src/
│   └── style.css           # tokens da marca + estilos da página
├── assets/
│   └── images/             # logo-dark.svg, logo-light.svg, favicon.svg (servidos em produção)
├── dist/                   # build de produção (gerado, ignorado no git)
├── docs/
│   ├── constitution.md     # princípios invioláveis: ler primeiro
│   ├── prd-e-arquitetura/  # PRD, plano-de-acao, arquitetura, instrucoes
│   ├── historico/          # NN-descricao-curta-AAAA-MM-DD.md (um por alteração)
│   ├── design-system/      # MASTER.md (fonte) + design-system.md + logos/ icones/ favicon/
│   ├── framework/          # framework.md do tipo de projeto (do cofre)
│   ├── specs/              # especificações por feature (SDD)
│   └── prompt-inicial/     # prompt padrão de início de projeto (referência)
├── CLAUDE.md               # este arquivo
├── package.json
└── .gitignore
```

### Ponteiros
- Regras de trabalho e fluxo obrigatório: [docs/prd-e-arquitetura/instrucoes.md](docs/prd-e-arquitetura/instrucoes.md)
- Arquitetura técnica: [docs/prd-e-arquitetura/arquitetura.md](docs/prd-e-arquitetura/arquitetura.md)
- Histórico de alterações: [docs/historico/](docs/historico/)
- Design system e assets da marca: [docs/design-system/MASTER.md](docs/design-system/MASTER.md)

---

## Convenção de nomenclatura (obrigatória)

- Nomes de arquivos e pastas: ASCII puro, sem acentos, kebab-case.
- Conteúdo dos arquivos: pt-BR com acentos normalmente.

---

## Regra inegociável de histórico

Toda alteração relevante deve ser registrada em `docs/historico/` como um arquivo novo no formato:

```
NN-descricao-curta-AAAA-MM-DD.md
```

Onde `NN` é o próximo número sequencial disponível (2 dígitos), `descricao-curta` em kebab-case sem acentos, e `AAAA-MM-DD` a data da alteração.

### Antes de alterar
1. Ler TODO o histórico em `docs/historico/` em ordem numérica.
2. Ler `docs/prd-e-arquitetura/arquitetura.md`.
3. Se houver impacto visual, ler também `docs/design-system/MASTER.md`.

### Depois de alterar
1. Criar o arquivo de histórico correspondente.
2. Atualizar `docs/prd-e-arquitetura/arquitetura.md` se a arquitetura mudou.
3. Atualizar `docs/prd-e-arquitetura/instrucoes.md` se mudou fluxo de trabalho.
4. Atualizar `docs/design-system/` se mexeu em tokens, componentes, animações ou assets.

Detalhes completos em [docs/prd-e-arquitetura/instrucoes.md](docs/prd-e-arquitetura/instrucoes.md).
