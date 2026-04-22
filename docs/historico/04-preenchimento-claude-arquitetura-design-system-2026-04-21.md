# Preenchimento de CLAUDE.md, arquitetura.md e design-system.md

- **Data:** 2026-04-21
- **Autor:** Claude
- **Escopo:** arquitetura / UI / config

## Contexto / Motivacao
Apos a criacao da estrutura padrao de docs (`02`) e da consolidacao do historico (`03`), o Cristian passou o contexto do projeto: o `bio-magnus` e o link-in-bio oficial da Magnus Midias (pagina unica que leva para Diagnostico, Site Oficial e WhatsApp, mais socials). Pediu que eu diagnosticasse o codigo, preenchesse `CLAUDE.md` e `arquitetura.md`, e adaptasse um design-system canonico da Magnus (baseado no documento usado em `biblioteca-cristian`) para este projeto — com cuidado, pois o documento sera reusado em outros projetos Magnus.

## O que mudou

### `CLAUDE.md` (raiz)
Preenchido com:
- Visao geral do projeto: link-in-bio Magnus, publico (seguidores do Instagram), objetivo (converter para Diagnostico, Site e WhatsApp), lista dos 3 CTAs e socials.
- Stack: Vite 5 + HTML5 + CSS puro + SVG inline, sem framework/React/Tailwind. Fonte Sora via Google Fonts. Deploy Vercel.
- Scripts (`dev`, `build`, `preview`).
- Marca (resumo + ponteiro para `design-system.md`).
- Estrutura de pastas atualizada (refletindo `index.html`, `src/style.css`, `assets/images/`).

### `docs/arquitetura/arquitetura.md`
Reescrito a partir do diagnostico do codigo real:
- Visao geral: landing single-page, estatica, sem backend/rotas/JS de aplicacao.
- Stack tecnica detalhada em tabela.
- Divisao do software (index.html / src/style.css / assets/images/) + blocos da pagina top-down.
- Ferramentas utilizadas (Vite, Google Fonts, Vercel, Git).
- BD / roteamento: "nao se aplica", com nota de seguranca sobre `rel="noopener"` (recomendacao de migrar para `noopener noreferrer` na fase final).
- Decisoes arquiteturais: vanilla CSS (nao Tailwind), SVG inline, sem JS, `assets/` na raiz, fonte via CDN, Vercel sem `vercel.json`.
- Lacunas conhecidas: acessibilidade, SEO/OG, `rel="noopener noreferrer"`, analytics, coexistencia `public/` vs `assets/`, favicon `.ico` de fallback, apple-touch-icon, testes.
- Fluxo de deploy (push main -> Vercel build -> `dist/`).
- Referencias cruzadas.

### `docs/design-system/design-system.md`
Reescrito como design-system canonico da Magnus adaptado ao stack do `bio-magnus`:
- Separacao explicita entre **identidade canonica Magnus** (reutilizavel) e **implementacao neste projeto** (vanilla CSS). Documento pensado para ser portatil para outros projetos Magnus com ajustes localizados.
- Sobre a marca: posicionamento, tom de voz, publico, personalidade visual + paragrafo especifico sobre a aplicacao no bio-magnus.
- Tipografia: Sora, hierarquia canonica da landing (H1 a prose) + hierarquia em uso neste projeto (tagline, link label, footer, copy).
- Paleta: cores canonicas (HEX), tokens efetivamente em uso em `src/style.css`, paleta Navy canonica (HSL) para projetos com necessidade de gradiente, bordas/transparencias (`rgba(0,0,42,0.08)` etc.), nota sobre nao-uso de gradientes neste projeto.
- Border radius: escala canonica 6/12/24px + uso real no projeto + regra de pill 999px.
- Componentes: documentado `.card-bio`, `.link`, `.socials a` com todas as propriedades + referencias canonicas (btn-primary, btn-ghost, btn-light, card landing) para reuso. Registrada a decisao de usar botao retangular (nao pill) por causa do layout em lista vertical.
- Animacoes: `--ease: cubic-bezier(0.16, 1, 0.3, 1)` como easing canonico, duracoes do projeto + biblioteca canonica de animacoes React/Tailwind (fade-in-up, float, shimmer, etc.) para outros projetos.
- Assets: logos (dark/light), favicon, icones (regras para proprios vs lucide/feather), relacao com `assets/images/` no app.
- Referencias cruzadas.

### `docs/design-system/logos/`
Importadas copias canonicas de `assets/images/`:
- `logo-dark.svg`
- `logo-light.svg`

### `docs/design-system/favicon/`
Importada copia canonica:
- `favicon.svg`

## Impacto
- Agente que entrar no projeto ja tem contexto completo a partir de `CLAUDE.md` (visao/stack/scripts/marca/ponteiros).
- `arquitetura.md` documenta decisoes tomadas (vanilla CSS, sem JS, assets na raiz) e explicita os debitos tecnicos que devem virar um plano de acao por fases.
- `design-system.md` passa a ser a fonte unica da identidade Magnus, portatil para outros projetos — basta trocar a secao de implementacao.
- Proximo passo sugerido: montar o plano de acao por fases em `docs/instrucoes/plano-de-acao-<nome>.md`, cobrindo os debitos listados na arquitetura (acessibilidade, SEO/OG, seguranca de links, convencao `public/`, favicon completo, analytics opcional) com uma fase intermediaria de testes e a fase final de testes de seguranca + funcionalidade antes do deploy.
- Nenhum codigo do projeto (`index.html`, `src/style.css`, `assets/`) foi alterado nesta rodada — foi apenas diagnostico e documentacao.
