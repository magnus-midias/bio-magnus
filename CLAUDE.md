# CLAUDE.md — bio-magnus

Arquivo de contexto que o agente deve consultar **antes de qualquer alteração** no projeto.

---

## Visão geral do projeto

`bio-magnus` é o **link-in-bio oficial da Magnus Mídias** — a página de destino usada no link da bio do Instagram (`@magnusmidias`) e demais redes sociais. Função única: concentrar os CTAs principais da marca em um só lugar, mobile-first.

- **Público:** seguidores das redes sociais da Magnus que chegam pelo link da bio.
- **Objetivo de negócio:** converter tráfego social em diagnóstico gratuito, site institucional e WhatsApp.
- **Links ativos (em ordem):**
  1. **Diagnóstico Gratuito** — `https://diagnostico.magnusmidias.com`.
  2. **Site Oficial** — `https://magnusmidias.com`.
  3. **WhatsApp** — `https://wa.me/5555999062078` com mensagem pré-preenchida.
- **Social icons:** Instagram, LinkedIn, YouTube (`@magnusmidias` / `/company/magnusmidias` / `@magnusmidias`).
- **Restrições de escopo:** página única (sem rotas), sem backend, sem analytics embarcado no momento, sem formulário. Tudo estático.

Identidade visual: Magnus Mídias (navy profundo `#00002B` sobre off-white `#F4F4F9`, tipografia `Sora`). Detalhes completos em [docs/design-system/design-system.md](docs/design-system/design-system.md).

## Stack

- **Build tool:** Vite 5 (`vite` v5.4.0 em devDependencies).
- **Linguagens:** HTML5 + CSS puro + SVG inline. Sem JavaScript de aplicação (apenas o módulo de estilos carregado via Vite).
- **Frameworks:** nenhum. **Sem** React, Tailwind, shadcn/ui ou bibliotecas de UI. Tokens declarados diretamente em CSS custom properties no `:root` de [src/style.css](src/style.css).
- **Fonte:** `Sora` via Google Fonts (preconnect + `<link>` em [index.html](index.html)).
- **Deploy:** Vercel (conectada ao repositório `https://github.com/magnus-midias/bio-magnus.git`, branch `main`). Build: `npm run build`. Output: `dist/`. Sem `vercel.json` customizado.

## Scripts de desenvolvimento

- `npm run dev` — servidor de desenvolvimento do Vite.
- `npm run build` — gera o build de produção em `dist/`.
- `npm run preview` — pré-visualiza localmente o build.

## Marca / identidade visual

Magnus Mídias — consultoria de Tecnologia com IA e Marketing Estratégico.

- Tom de voz: direto, sóbrio, anti-hype. Frases curtas, afirmativas, com contraste.
- Estética: premium minimalista — navy profundo sobre off-white, `Sora` em todos os pesos, alto contraste em neutros frios, cantos generosos (`6 / 12 / 24 px`), zero poluição gráfica.
- Documento canônico: [docs/design-system/design-system.md](docs/design-system/design-system.md). Assets em [docs/design-system/logos/](docs/design-system/logos/), [docs/design-system/icones/](docs/design-system/icones/), [docs/design-system/favicon/](docs/design-system/favicon/).

---

## Estrutura de pastas relevante

```
bio-magnus/
├── index.html              # página única (estrutura + SVGs inline)
├── src/
│   └── style.css           # tokens da marca + estilos da página
├── assets/
│   └── images/             # logo-dark.svg, logo-light.svg, favicon.svg (servidos em produção)
├── public/                 # (não usado no momento)
├── dist/                   # build de produção (gerado, ignorado no git)
├── docs/
│   ├── arquitetura/        # arquitetura.md e documentos técnicos
│   ├── instrucoes/         # instrucoes.md + planos de ação por fases
│   ├── historico/          # NN-descricao-curta-AAAA-MM-DD.md (um por alteração)
│   ├── design-system/      # design-system.md + logos/ icones/ favicon/
│   └── prompt-inicial/     # prompt padrão de início de projeto (referência)
├── CLAUDE.md               # este arquivo
├── package.json
└── .gitignore
```

### Ponteiros
- Regras de trabalho e fluxo obrigatório: [docs/instrucoes/instrucoes.md](docs/instrucoes/instrucoes.md)
- Arquitetura técnica: [docs/arquitetura/arquitetura.md](docs/arquitetura/arquitetura.md)
- Histórico de alterações: [docs/historico/](docs/historico/)
- Design system e assets da marca: [docs/design-system/design-system.md](docs/design-system/design-system.md)

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
2. Ler `docs/arquitetura/arquitetura.md`.
3. Se houver impacto visual, ler também `docs/design-system/design-system.md`.

### Depois de alterar
1. Criar o arquivo de histórico correspondente.
2. Atualizar `docs/arquitetura/arquitetura.md` se a arquitetura mudou.
3. Atualizar `docs/instrucoes/instrucoes.md` se mudou fluxo de trabalho.
4. Atualizar `docs/design-system/` se mexeu em tokens, componentes, animações ou assets.

Detalhes completos em [docs/instrucoes/instrucoes.md](docs/instrucoes/instrucoes.md).
