# Design System: bio-magnus (Magnus)
Versao: 1.0 | Data: 2026-07-25

> **Snapshot** dos tokens reais da Magnus. Fonte de verdade (atualizar daqui se a marca mudar): `~/Documents/cofre-principal/03-empresas/magnus/branding/`. Tokens: `design-system/tokens/`. Voz: `branding/voice/voice.md`.
>
> A base abaixo NAO se inventa e NAO se altera por projeto. O que e especifico deste projeto esta na secao final, **Neste projeto**.
>
> Implementacao real dos tokens: `src/style.css`. Assets versionados em `docs/design-system/logos/` e `docs/design-system/favicon/`.

## Sobre a marca
Regra de uma linha: navy `#00002B` sobre off-white `#F4F4F9`, so **Sora**, botoes **pill**, radius 6/12/24, motion `cubic-bezier(0.16,1,0.3,1)`, **sem gradientes**, **sem cinza puro**, **sem emoji**, **sem travessao**. Unica cor fora da paleta: verde do WhatsApp. Proporcao de uso: navy ~55% · off-white ~33% · alt ~8% · verde ~4%. Respiro (whitespace) generoso faz parte da identidade.

## Tipografia
Familia unica: **Sora** (display + body + UI), pesos 300/400/500/600/700/800. `--font-body: "Sora", system-ui, -apple-system, sans-serif`. Sem secundaria, sem mono.

| token | valor |
|---|---|
| `--text-display` / `--text-h1` | `clamp(2.25rem, 5.5vw, 4.5rem)` |
| `--text-h2` | `clamp(1.75rem, 3.4vw, 2.75rem)` |
| `--text-h3` | `1.25rem` |
| `--text-subtitle` | `clamp(1.25rem, 2.4vw, 1.75rem)` |
| `--text-lead` | `clamp(1.05rem, 1.6vw, 1.25rem)` |
| `--text-prose` | `1.0625rem` |
| `--text-body` | `1rem` |
| `--text-small` | `0.875rem` |
| `--text-eyebrow` / `--text-label` | `0.75rem` |
| `--text-metric` | `clamp(2.25rem, 4vw, 3.25rem)` |

Pesos: light 300 · regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800. Tracking: tight `-0.02em` · tighter `-0.03em` (metrics) · eyebrow `0.18em` · label `0.05em`. Line-height: tight 1.1 (headings) · body 1.5 · prose 1.65. **Sentence case** em headings/body; uppercase so no eyebrow (opacity 0.7).

## Paleta
```css
:root {
  --color-navy: #00002B;          /* primario: texto, bordas, superficies escuras, CTAs */
  --color-navy-hover: #000014;
  --color-off-white: #F4F4F9;     /* fundo, texto inverso sobre navy */
  --color-off-white-alt: #EAEAF2; /* secao alternada */
  --color-black: #000000;         /* footer, contraste maximo */
  --color-whatsapp: #0E7A3F;      /* SO CTA WhatsApp (escurecido p/ WCAG AA) */
  --color-whatsapp-hover: #0A6233;
  /* bordas e fills navy (nunca cinza puro) */
  --border-default: rgba(0,0,42,0.08);
  --border-hover: rgba(0,0,42,0.15);
  --border-strong: rgba(0,0,42,0.30);
  --border-on-navy: rgba(244,244,249,0.12);
  --fill-navy-06: rgba(0,0,42,0.06);
  --fill-navy-10: rgba(0,0,42,0.10);
  --shadow-card: 0 20px 40px -20px rgba(0,0,42,0.15);
}
```
Aliases: `--color-bg`->off-white, `--color-bg-alt`->off-white-alt, `--color-primary`/`--color-text`->navy, `--surface-dark`->navy.
Temas v2 opt-in (`data-theme` no `<html>`): `azul #12296B`; `offwhite` (inversao, tinta off-white sobre canvas navy). Sora e verde WhatsApp nao mudam.

**Sem gradiente em superficie.** O ritmo vertical vem da alternancia de secoes solidas (off-white -> off-white alt -> navy), nunca de degrade dentro de uma secao. A unica excecao prevista na fonte e profundidade em **tema escuro**, e so ai usando a escala navy estendida abaixo, que existe no cofre exatamente para isso e e de uso raro (`branding/design-system/tokens/colors.css`). Nao vale para superficie clara e nao vale para botao. Gradiente em `mask-image` nao conta: e recorte, nao superficie.

| token (escala navy estendida) | valor |
|---|---|
| `--navy-dark` | `hsl(240 100% 6%)` |
| `--navy-base` | `hsl(240 100% 8%)` (≈ `#00002B`) |
| `--navy-mid` | `hsl(240 100% 10%)` |
| `--navy-light` | `hsl(240 100% 12%)` |
| `--navy-lighter` | `hsl(240 100% 14%)` |
| `--silver` | `hsl(240 20% 93%)` |


## Border radius e espacamentos
```css
:root {
  --radius-sm: 6px;    /* chips, badges, inputs */
  --radius-md: 12px;   /* cards, botoes retangulares */
  --radius-lg: 24px;   /* blocos amplos, service cards, hero */
  --radius-pill: 999px;
  /* espacamento: base 4px */
  --space-1:.25rem; --space-2:.5rem; --space-3:.75rem; --space-4:1rem;
  --space-6:1.5rem; --space-8:2rem; --space-12:3rem; --space-16:4rem; --space-20:5rem;
  --container-max: 1200px; --container-narrow: 860px;
  --section-py: clamp(4rem, 8vw, 8rem); --frame-padding: clamp(1rem, 4vw, 2rem);
}
```

## Componentes
- **Container:** `max-width 1200px`, padding `clamp(1rem,4vw,2rem)`; narrow 860px.
- **Header:** sticky; scrolled -> `rgba(244,244,249,0.95)` + `blur(12px)` + `box-shadow 0 1px 0 rgba(0,0,42,0.08)`; troca logo-dark/logo-light por contraste.
- **Botoes (todos pill 999px, `padding 1rem 1.875rem`, peso 600):** primario navy -> hover `#000014` + `translateY(-1px)`; ghost (borda `1.5px rgba(0,0,42,0.3)`); ghost-light (sobre navy); light (`rgba(0,0,43,0.06)`); whatsapp (verde).
- **Card:** `#F4F4F9`, borda `rgba(0,0,42,0.08)`, `radius 12px`, `padding 1.75rem`; hover `translateY(-4px)` + `--shadow-card`. Icone topo 2x2rem, fundo `rgba(0,0,42,0.06)`, radius 8px.
- **Service card:** `radius 24px`, `padding clamp(2rem,4vw,3rem)`.
- **Metricas:** `clamp(2.25rem,4vw,3.25rem)`, peso 800, `letter-spacing -0.03em`, line-height 1.
- **Footer:** fundo `#000000`, logo-light, links off-white `opacity 0.6` -> hover 1.
- **Icones:** Lucide inline (`currentColor`, `stroke-width 1.5`, `viewBox 0 0 24 24`). Unico simbolo proprio: monograma "M". Marcadores: `->`, checks, etapas `// 01`.

## Animacoes
- **Easing:** `--ease: cubic-bezier(0.16, 1, 0.3, 1)`.
- **Duracoes:** hover 200ms (transform/background/color) · card 300ms (transform/box-shadow).
- **Keyframe:** `magnus-fade-up` (opacity 0->1, translateY 16px->0). Hover: `translateY(-1px)` botoes, `-4px` cards + sombra. **Nunca bounce, spring nem loop em UI.** Respeita `prefers-reduced-motion`.

## Assets
- Logos SVG no cofre: `branding/design-system/assets/` (`logo-dark.svg` sobre claro, `logo-light.svg` sobre navy/preto, `favicon.svg`). Escolha por contraste, nao estetica. Altura minima 28px (header) / 40px (footer). Nao deformar/recolorir/somar sombra.
- App icons/PWA (16-512 + maskable), `site.webmanifest`, kit social: no workspace do Claude Design.

## Voz e tom (essencia)
Fonte completa: `branding/voice/voice.md`.
- Tom: **direto, sobrio, anti-hype**; frases curtas e afirmativas; contraste mercado vs. Magnus. Promessa: **crescer com inteligencia, nao com mais esforco manual**.
- **Nunca:** revolucionario, disruptivo, ecossistema, solucao completa, transformacao digital, potencializar/alavancar em excesso, urgencia artificial.
- Usa: estrutura, operacao, diagnostico, implementacao, resultado real, previsibilidade, escala, inteligencia aplicada, acompanhamento.
- Marca sempre **"Magnus"** com M maiusculo (nome completo "Magnus Midias"). "Nos" institucional; cliente e "voce/sua empresa".
- **Nunca emoji. Nunca travessao (—).** pt-BR por padrao; ingles nas pecas internacionais.
- Verbatim: "Nao vendemos ferramenta. Nao entregamos relatorio." · "Diagnostico real. Implementacao pratica. Acompanhamento continuo."

---

## Neste projeto

Pagina unica, mobile-first, sem secoes longas: o subconjunto de tokens usado e propositalmente pequeno.

**Declarados em `src/style.css`:** `--color-bg`, `--color-primary`, `--color-black`, `--color-text`, `--color-text-inverse`, `--font-display`, `--font-body`, `--radius-sm/md/lg`, `--ease`.

**Da base canonica que este projeto ainda nao declara:** `--color-off-white-alt` (nao ha secao alternada), `--radius-pill`, escala de `--space-*`, `--container-max`, `--color-whatsapp`. Se o CTA de WhatsApp virar botao verde, declarar `--color-whatsapp: #0E7A3F` e o hover, nunca o verde puro do app.

**Componentes em uso:** cards de link navy sobre off-white, icones sociais navy, toggle de idioma, footer. Hover dos botoes e dos icones: branco com borda navy.

**Assets servidos:** `assets/images/logo-dark.svg`, `assets/images/logo-light.svg` e o favicon set completo na raiz (`/favicon.svg`, `/favicon-16x16.png`, `/favicon-32x32.png`, `/favicon-48x48.png`, `/favicon-192x192.png`, `/favicon-512x512.png`, `/apple-touch-icon.png`, `/favicon.ico`, `/site.webmanifest`).

**Historico visual:** ver `docs/historico/05-centralizacao-texto-botoes-2026-04-23.md` e `docs/historico/08-ajustes-visuais-links-footer-2026-05-29.md`.
