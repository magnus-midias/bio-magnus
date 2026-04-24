# Resolução dos débitos técnicos listados na arquitetura

- **Data:** 2026-04-23
- **Autor:** Claude
- **Escopo:** segurança / SEO / acessibilidade / infra

## Contexto / Motivacao

Resolução de todos os débitos técnicos listados na seção 8 de `docs/arquitetura/arquitetura.md` que estavam dentro do escopo do projeto (estático, sem backend, sem analytics).

## O que mudou

### `index.html`

- **`rel="noopener noreferrer"`**: todos os 6 links externos (3 botões CTA + 3 ícones sociais) atualizados de `rel="noopener"` para `rel="noopener noreferrer"`, eliminando vazamento de `Referer` header para destinos externos.
- **Open Graph**: adicionadas as tags `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name` para compartilhamento correto em redes sociais.
- **Twitter Card**: adicionadas `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- **`<meta name="theme-color">`**: cor `#00002B` (navy Magnus) para colorir a barra do browser em mobile.
- **`<link rel="canonical">`**: aponta para `https://bio.magnusmidias.com`.
- **`<link rel="apple-touch-icon">`**: aponta para `favicon.svg` (browsers modernos aceitam SVG; fallback `.ico` é débito remanescente — requer ferramenta de conversão de imagem).
- **Font preload**: adicionado `<link rel="preload" as="style">` para a URL do Google Fonts antes do `<link rel="stylesheet">`, reduzindo FOUT.
- **Skip link de acessibilidade**: adicionado `<a class="skip-link" href="#main-content">` antes do `<main>`, e `id="main-content"` na `<main>`. Permite navegação por teclado/leitor de tela pular direto para o conteúdo.
- **`aria-label` na `<nav>`**: adicionado `aria-label="Links principais"` no elemento `<nav class="links">`.

### `src/style.css`

- **`.skip-link`**: estilos para o skip link — visualmente oculto (`top: -100%`) até receber foco, quando desliza para `top: 1rem` com `background: var(--color-primary)`.

### `vercel.json` (novo)

Headers HTTP de segurança aplicados em todas as rotas:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy`: restringe recursos apenas a `'self'`, Google Fonts (style + font) e bloqueia scripts inline, frames, connect-src e form-action.

Cache de assets: `Cache-Control: public, max-age=31536000, immutable` para `/assets/(.*)` (assets de Vite são content-hashed, seguro usar immutable).

## Débitos remanescentes (fora de escopo)

- **favicon.ico**: requer `imagemagick` ou ferramenta equivalente para converter o SVG em `.ico`. Sem impacto funcional em browsers modernos.
- **OG image PNG**: o `og:image` aponta para o SVG do logo. Plataformas como Facebook não renderizam SVG como preview — uma imagem PNG `1200×630` seria ideal. Item para quando houver um arquivo de imagem social criado no design system.
- **Analytics**: fora de escopo per CLAUDE.md ("sem analytics embarcado no momento").
- **Testes E2E**: smoke test manual cobre para esta escala.

## Impacto

- Segurança: CSP bloqueia XSS e injeção de scripts/frames; HSTS garante HTTPS; `noreferrer` evita vazamento de referrer.
- SEO: tags OG e Twitter Card permitem preview rico ao compartilhar o link.
- Acessibilidade: skip link permite usuários de teclado/leitor de tela navegar sem passar pelos links do header a cada visita.
- Performance: preload da fonte reduz FOUT.
- Cache: assets com hash imutável são cacheados por 1 ano no browser.
