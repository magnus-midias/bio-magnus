# Design System — bio-magnus (Magnus Mídias)

Este documento é a **fonte única de verdade sobre a identidade visual da Magnus Mídias aplicada ao projeto `bio-magnus`**. A identidade Magnus é canônica e portátil entre projetos: o que varia de um projeto para outro é apenas a **implementação** (vanilla CSS aqui, React + Tailwind + shadcn na `biblioteca-cristian`, etc.).

Qualquer alteração com impacto visual deve ler este arquivo antes e atualizá-lo depois, se introduzir ou alterar um token.

> Fonte de referência canônica da marca: landing page da Magnus Mídias (`lp-magnus`) em `/Users/cristiandornelles/Documents/PROGRAMAÇÃO/COISAS MAGNUS/lp-magnus/` — `css/tokens.css`, `css/styles.css` e `index.html`.

---

## 1. Sobre a marca

**Magnus Mídias** — consultoria de Tecnologia com IA e Marketing Estratégico para empresas que querem crescer com inteligência, não com mais esforço manual.

- **Posicionamento:** estrutura operação, implementa tecnologia e aplica IA onde ela gera resultado real. Foco em diagnóstico real, implementação prática e acompanhamento contínuo.
- **Tom de voz:** direto, sóbrio, anti-hype. Sem jargão desnecessário, sem "complexidade performática". Frases curtas, afirmativas, com contraste (ex.: "Não vendemos ferramenta. Não entregamos relatório.").
- **Público-alvo:** empresas que já faturam e querem escalar com previsibilidade, crescer com margem, e substituir processo manual por operação estruturada.
- **Personalidade visual:** **navy profundo (quase preto) sobre off-white**, tipografia `Sora` em todos os pesos, layout amplo, alto contraste em neutros frios, cantos generosos, zero poluição gráfica. Premium minimalista.
- **Aplicação no `bio-magnus`:** tudo isso condensado em uma página única mobile-first — logo centralizada, eyebrow de três palavras (Tecnologia · IA · Marketing), três botões primários empilhados e três socials em pill.

## 2. Tipografia

- **Fonte principal (display + body):** `Sora` (sans-serif, Google Fonts). Pesos disponíveis e em uso no CSS: 300, 400, 500, 600, 700, 800.
- **Aplicação no projeto:** carregada no `<head>` de [index.html](../../index.html) via preconnect + `<link>` do Google Fonts (`display=swap`). Aplicada em `html, body` via [src/style.css](../../src/style.css) em `var(--font-body)` e `var(--font-display)` (ambas apontam para `Sora`, com fallback `system-ui, -apple-system, sans-serif`).

### Hierarquia canônica Magnus (para evolução e reuso em outros projetos)

| Uso | Tamanho | Peso | Letter-spacing | Line-height | Observação |
|---|---|---|---|---|---|
| H1 | `clamp(2.25rem, 5.5vw, 4.5rem)` | 800 | -0.02em | 1.1 | `max-width: 18ch` |
| H2 | `clamp(1.75rem, 3.4vw, 2.75rem)` | 700 | — | — | |
| H3 | `1.25rem` | 600 | — | — | |
| Eyebrow | `0.75rem` | 600 | 0.18em | — | `text-transform: uppercase`, `opacity: 0.7` |
| Body | `1rem` | 400 | — | — | |
| Prose (artigo) | `1.0625rem` | 400 | — | 1.65 | `opacity: 0.8` |

### Hierarquia em uso neste projeto (`bio-magnus`)

| Elemento | Regra |
|---|---|
| `.tagline` (eyebrow) | `0.75rem`, peso 600, `letter-spacing: 0.22em`, uppercase, `opacity: 0.6` — ligeiramente mais apertado que o canônico da landing (0.18em) para caber no container de 460px |
| `.link .label` | `0.95rem`, peso 600, `letter-spacing: -0.01em` |
| `.footer` | `0.9rem`, `opacity: 0.65`, `line-height: 1.55` |
| `.copy` | `0.8rem`, `opacity: 0.4`, `letter-spacing: 0.05em` |

## 3. Paleta de cores

### 3.1 Cores de marca — referência canônica Magnus

| Nome | HEX | Uso |
|---|---|---|
| Navy profundo | `#00002B` | cor primária, texto principal, fundo escuro, focus ring |
| Off-white | `#F4F4F9` | fundo geral, texto inverso sobre navy |
| Preto | `#000000` | footer e pontos de contraste máximo |
| Navy hover | `#000014` | estado hover do botão primário (landing) |
| Alt surface | `#EAEAF2` | fundo de seção alternativa (landing) |

### 3.2 Tokens em uso neste projeto — [src/style.css](../../src/style.css)

Definidos como CSS custom properties no `:root`:

| Token | Valor | Significado |
|---|---|---|
| `--color-bg` | `#F4F4F9` | fundo da página (off-white Magnus) |
| `--color-primary` | `#00002B` | texto, bordas de pill, hover de fundo (navy profundo Magnus) |
| `--color-black` | `#000000` | reserva para pontos de contraste máximo (não aplicado no momento) |
| `--color-text` | `#00002B` | texto padrão (= primary) |
| `--color-text-inverse` | `#F4F4F9` | texto sobre fundo navy (hover dos botões) |

Escolha intencional: no `bio-magnus` não usamos `--navy-mid/light/lighter/silver` nem paleta HSL/shadcn porque (a) o projeto é vanilla CSS e (b) a página não tem gradientes nem variações de superfície — apenas dois níveis (off-white + navy).

### 3.3 Paleta Navy (escala canônica, para projetos com necessidade de gradiente/profundidade)

Mantida aqui como referência para projetos que **precisem** de variações (ex.: gradientes, estados de profundidade, superfícies alternativas):

| Token | Valor (HSL) | Uso |
|---|---|---|
| `--navy-dark` | `hsl(240 100% 6%)` | pontos mais escuros / preto de marca |
| `--navy-base` | `hsl(240 100% 8%)` | navy base (≈ `#00002B`) |
| `--navy-mid` | `hsl(240 100% 10%)` | — |
| `--navy-light` | `hsl(240 100% 12%)` | — |
| `--navy-lighter` | `hsl(240 100% 14%)` | — |
| `--silver` | `hsl(240 20% 93%)` | acento claro |

### 3.4 Bordas e transparências

Padrão Magnus para bordas sobre off-white: `rgba(0, 0, 42, 0.08)` (praticamente navy com 8% de opacidade). Variações em uso no `bio-magnus`:

- `.link` (estado normal): `1px solid rgba(0, 0, 42, 0.08)`.
- `.socials a` (estado normal): `1px solid rgba(0, 0, 42, 0.15)`.
- `.link:hover` box-shadow: `0 20px 40px -20px rgba(0, 0, 42, 0.35)`.

### 3.5 Gradientes

**Não utilizados neste projeto.** A Magnus canônica usa:
- Background global da landing: linear vertical branco → off-white navy.
- Background radial em páginas de detalhe (biblioteca-cristian): `radial-gradient(ellipse at center, white 0%, hsl(220 10% 95%) 50%, hsl(220 8% 90%) 100%)`.
- Botões gradientes: `linear` do accent ao primary.

## 4. Border radius

Escala canônica Magnus: **`6 / 12 / 24 px`**.

Em [src/style.css](../../src/style.css):

| Token | Valor | Uso no bio-magnus |
|---|---|---|
| `--radius-sm` | `6px` | reservado para micro-componentes |
| `--radius-md` | `12px` | `.link` (botões principais) |
| `--radius-lg` | `24px` | reservado para blocos amplos (hero/CTA em outros projetos) |
| Pill | `999px` | `.socials a` (círculos perfeitos de 44×44) |

**Regra de uso:** cards/botões retangulares → `--radius-md`. Ícones sociais circulares e botões pill canônicos da Magnus → `999px`. Blocos grandes de serviço/hero → `--radius-lg`.

## 5. Componentes (UX / UI)

No `bio-magnus` não há biblioteca de componentes — cada bloco é HTML direto estilizado em [src/style.css](../../src/style.css). As regras abaixo descrevem os padrões **para este projeto** e, em paralelo, registram os padrões canônicos da marca (para quando o bio ganhar blocos adicionais ou ao portar para outros projetos).

### 5.1 Container

- `.card-bio`: `max-width: 460px`, centralizado, flex column. Padding externo do `<body>`: `56px 20px 48px` (top generoso para respirar acima da logo).
- Breakpoint único: `max-width: 420px` ajusta logo (72px → 60px) e `.link` (padding 18/20 → 16, fonte 0.95rem → 0.9rem).

### 5.2 Botão principal (`.link`)

Grid `44px | 1fr | 24px` (ícone-label-ícone externo). Referência Magnus canônica: botão pill com `border-radius: 999px` e `padding: 1rem 1.875rem`. **Aqui o botão é retangular com `--radius-md` (12px)** — decisão consciente porque o formato pill canônico não cabe bem em lista vertical empilhada de 3 CTAs; a versão de card de link é visualmente mais legível.

Propriedades em uso:

| Propriedade | Valor |
|---|---|
| Background (normal) | `#fff` |
| Border (normal) | `1px solid rgba(0, 0, 42, 0.08)` |
| Border radius | `var(--radius-md)` (12px) |
| Padding | `18px 20px` (≥421px) / `16px` (≤420px) |
| Color | `var(--color-primary)` |
| Font | `Sora` 600, 0.95rem, `letter-spacing: -0.01em` |
| Hover | `translateY(-3px)`, background → navy, color → off-white, box-shadow `0 20px 40px -20px rgba(0,0,42,0.35)` |
| Transition | `0.25s var(--ease)` para transform, border-color, box-shadow, background, color |

### 5.3 Social pill (`.socials a`)

| Propriedade | Valor |
|---|---|
| Tamanho | `44×44px` |
| Border radius | `999px` |
| Border | `1px solid rgba(0, 0, 42, 0.15)` |
| Ícone | SVG 18×18, `stroke: currentColor` |
| Hover | background → navy, color → off-white, `translateY(-2px)` |
| Transition | `0.2s var(--ease)` |

### 5.4 Referências canônicas (landing Magnus — para reuso em outros projetos)

- **`btn-primary`:** fundo `--color-primary` (navy), texto off-white, `border-radius: 999px`, `padding: 1rem 1.875rem`, hover `translateY(-1px)` + fundo `#000014`.
- **`btn-ghost`:** fundo transparente, borda navy, texto navy.
- **`btn-light`:** fundo off-white, texto navy.
- **Card canônico (landing):** fundo `--color-bg`, borda `rgba(0,0,42,0.08)`, `border-radius: var(--radius-md)`, `padding: 1.75rem`, hover `translateY(-4px)` + `box-shadow: 0 20px 40px -20px rgba(0,0,42,0.15)`.

## 6. Animações

- **Curva de easing padrão da marca:** `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out acentuado, sensação "premium" em transições curtas. Exposta como `var(--ease)` em [src/style.css](../../src/style.css) e aplicada em todas as transições.
- **Durações em uso no projeto:**
  - `.link`: `0.25s` em transform/border/box-shadow/background/color.
  - `.socials a`: `0.2s` nas mesmas propriedades.
- **Padrão de hover:** translação vertical pequena (`-2px` a `-4px`) + sombra projetada abaixo (`0 20px 40px -20px rgba(0,0,42,0.X)`). Nunca bounce, nunca spring — só ease-out limpo.

### Biblioteca canônica (para projetos com React/Tailwind)

| Classe | Duração | Uso típico |
|---|---|---|
| `animate-fade-in-up` | 0.6s | entrada de seções com `animationDelay` escalonado |
| `animate-slide-in-right` | 0.6s | entradas laterais |
| `animate-float` | 3s loop | decorativo |
| `animate-glow-pulse` | 2s loop | destaque chamativo |
| `animate-shimmer` | 2s loop | carregamento |
| `animate-accordion-down` / `-up` | 0.2s | accordions (Radix) |

**Boa prática canônica:** `animationDelay` inline para stagger (ex.: 0.1s, 0.2s, 0.3s entre blocos). Aplicável se o `bio-magnus` ganhar entrada animada no futuro.

## 7. Assets (arquivos de imagem)

### 7.1 Logos — [docs/design-system/logos/](./logos/)

- `logo-dark.svg` — logo em navy `#00002B` para uso sobre fundos claros (off-white, branco).
- `logo-light.svg` — logo em off-white `#F4F4F9` para uso sobre fundos escuros (navy, preto).

**Regra de uso:** escolher a variante pelo **contraste com o fundo**, não pela preferência estética. Fundo claro → `logo-dark.svg`. Fundo navy/preto → `logo-light.svg`.

**Uso no projeto:** [index.html](../../index.html) carrega `logo-dark.svg` via `/assets/images/logo-dark.svg` (fundo off-white). A variante light existe para evoluções futuras (ex.: seção escura no rodapé, modo dark).

### 7.2 Favicon — [docs/design-system/favicon/](./favicon/)

- `favicon.svg` — favicon vetorial (letterform da logo em proporção quadrada).

**Uso no projeto:** já promovido para `assets/images/favicon.svg` e referenciado em [index.html](../../index.html) via `<link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />`.

**Débito conhecido (ver arquitetura):** falta `.ico` de fallback para browsers legados e `apple-touch-icon.png`. Sair da lista na fase de polimento/SEO.

### 7.3 Ícones — [docs/design-system/icones/](./icones/)

Ícones **próprios da marca** (quando houver). A Magnus ainda não tem iconografia proprietária além da letterform da logo — pasta existe como reserva estrutural.

**Iconografia funcional em uso:** SVGs inline no HTML em estilo Feather (viewBox `0 0 24 24`, `stroke: currentColor`, `stroke-width: 2`, `stroke-linecap/linejoin: round`). Ícones usados:
- Link 1 (Diagnóstico): checkmark em círculo + ícone de "link externo".
- Link 2 (Site Oficial): globo + "link externo".
- Link 3 (WhatsApp): balão de conversa + "link externo".
- Socials: Instagram (rect + círculo interno), LinkedIn (silhueta), YouTube (retângulo + play).

Ao adicionar novos links, reutilizar o mesmo estilo (Feather 24×24, `stroke-width: 2`) para consistência.

### 7.4 Relação com a pasta do app

- Assets **servidos em produção** vivem em [assets/images/](../../assets/images/) (Vite serve a partir da raiz). As cópias em `docs/design-system/` são a **versão canônica/documentada** da marca; as em `assets/images/` são a **versão de entrega**.
- Ao promover um novo asset de `docs/design-system/` para o app: copiar para `assets/images/`, referenciar em `index.html` ou `src/style.css`, e registrar o caminho aqui na seção correspondente.
- Discussão aberta (ver arquitetura): migrar assets para `public/` como convenção Vite — decisão de polimento.

## 8. Referências cruzadas

- Implementação dos tokens e estilos: [src/style.css](../../src/style.css).
- Tipografia: carregada em [index.html](../../index.html); aplicada em [src/style.css](../../src/style.css).
- Estrutura da página: [index.html](../../index.html).
- Assets servidos: [assets/images/](../../assets/images/).
- Identidade de marca canônica (para consulta profunda): projeto `lp-magnus` em `/Users/cristiandornelles/Documents/PROGRAMAÇÃO/COISAS MAGNUS/lp-magnus/` — `css/tokens.css`, `css/styles.css`, `index.html`.
- Outro projeto que usa esta identidade: `biblioteca-cristian` (React + Tailwind + shadcn/ui), com o mesmo conjunto de tokens traduzidos para HSL e componentizados.
- Guia de fonte única do agente: [CLAUDE.md](../../CLAUDE.md) aponta para este documento em toda alteração visual.
