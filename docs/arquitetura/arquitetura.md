# Arquitetura — bio-magnus

Documento técnico de referência do projeto. Deve ser atualizado sempre que a arquitetura mudar.

---

## 1. Visão geral

`bio-magnus` é uma **landing de página única** (link-in-bio) da Magnus Mídias. Servida como site estático, sem backend, sem rotas, sem JavaScript de aplicação. Toda a interação é limitada a hover nos botões e navegação externa via `<a target="_blank">`.

Arquitetura em uma frase: **HTML semântico + CSS com design tokens + SVGs inline, empacotado pelo Vite, servido pela Vercel.**

## 2. Stack técnica

| Camada | Tecnologia | Observações |
|---|---|---|
| Build tool | **Vite 5** (`^5.4.0`) | único dev dependency; sem plugins |
| Linguagem | HTML5 + CSS3 puro | sem pré-processador (nem Sass/PostCSS customizado) |
| JS | — | não há script de aplicação. `type: "module"` no `package.json` é só requisito do Vite |
| Tipografia | **Sora** (Google Fonts) | preconnect + `<link>` no `<head>` de `index.html` |
| Ícones | SVGs inline no HTML | sem biblioteca (Feather-style, `stroke: currentColor`) |
| Package manager | npm | lockfile: `package-lock.json` |
| Hosting | **Vercel** | repo: `github.com/magnus-midias/bio-magnus`, branch `main` |

## 3. Divisão do software

```
index.html          -> estrutura semântica + SVGs inline + carregamento de fonte e CSS
src/style.css       -> tokens da marca (CSS vars) + estilos de todos os blocos da página
assets/images/      -> logos SVG e favicon (servidos pela raiz em produção via Vite)
```

### Blocos da página (top-down em [index.html](../../index.html))
1. `<main class="card-bio">` — container central (`max-width: 460px`, flex column, centralizado).
2. `.logo-wrap` + `.logo-mark` — logo dark (72px, reduz para 60px em < 420px).
3. `.tagline` — "Tecnologia · IA · Marketing" em eyebrow (uppercase, tracking alto, opacity 0.6).
4. `<nav class="links">` — três `<a class="link">` em grid 3 colunas (`ícone | label | ícone externo`):
   - Diagnóstico Gratuito → `diagnostico.magnusmidias.com`
   - Site Oficial → `magnusmidias.com`
   - WhatsApp → `wa.me/5555999062078` (mensagem pré-preenchida)
5. `.socials` — 3 ícones circulares (pill): Instagram, LinkedIn, YouTube.
6. `.footer` + `.copy` — tagline secundária + copyright.

## 4. Ferramentas utilizadas

- **Vite 5**: dev server + bundler de produção. Configuração padrão (sem `vite.config.*`).
- **Google Fonts**: CDN para `Sora` (300–800).
- **Vercel**: deploy automático no push para `main`. Build Command `npm run build`, Output `dist/`.
- **Git/GitHub**: versionamento.

## 5. Banco de dados / modelo de dados

**Não se aplica.** Projeto 100% estático, sem persistência, sem estado de usuário.

## 6. Roteamento

**Não se aplica.** Página única em `/`. Todos os CTAs apontam para URLs externas com `target="_blank"` e `rel="noopener noreferrer"`.

## 7. Decisões arquiteturais

- **Vanilla CSS, sem Tailwind/shadcn.** A página tem uma única view e poucos componentes — introduzir framework adicionaria peso sem retorno. Os tokens da Magnus ficam diretamente em CSS custom properties no `:root` de `src/style.css`. Esta decisão diverge do design-system da `biblioteca-cristian` (que é React + Tailwind + shadcn), mas é proposital: **o design system Magnus é portátil entre stacks**; o que muda é a implementação, não os tokens.
- **SVGs inline no HTML**, não via `<img>` nem lib de ícones. Permite `stroke: currentColor` nos states de hover e elimina requisição HTTP adicional.
- **Sem JavaScript de aplicação.** Toda interatividade necessária é coberta por CSS (hover, media queries). Mantém `Total Blocking Time = 0` e bundle mínimo.
- **`assets/` na raiz (não em `public/`)**, `public/` não existe. Vite serve `assets/images/*` corretamente em dev e build.
- **Fonte via CDN (Google Fonts), não self-hosted.** Simplicidade vence performance de ms aqui. Self-hosting entra como item opcional de polimento (LCP/privacidade).
- **`vercel.json`** com headers de segurança (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) e `Cache-Control: immutable` para assets com hash do Vite.

## 8. Lacunas conhecidas / débitos técnicos

- **favicon.ico:** `assets/images/favicon.svg` cobre browsers modernos e `apple-touch-icon`. Falta `.ico` de fallback para browsers legados — requer ferramenta de conversão (imagemagick ou similar).
- **OG image PNG:** `og:image` aponta para o SVG do logo. Plataformas como Facebook não renderizam SVG em previews; ideal seria um PNG `1200×630` criado no design system.
- **Analytics:** nenhum tracking instalado. Avaliar Plausible/Umami se houver necessidade de medir CTR dos botões (fora de escopo por ora).
- **Sem testes** (unitários ou E2E). Para esta escala, smoke test manual cobre.
- **Sem `vite.config.*`:** funciona; necessário apenas se precisar customizar base path ou plugins.

## 9. Fluxo de deploy

1. Commit em `main` no repositório `magnus-midias/bio-magnus`.
2. Vercel detecta push e roda `npm run build`.
3. Serve `dist/` no domínio configurado.

## 10. Referências cruzadas

- Código de entrada: [index.html](../../index.html)
- Estilos e tokens: [src/style.css](../../src/style.css)
- Assets de marca servidos: [assets/images/](../../assets/images/)
- Design system canônico: [docs/design-system/design-system.md](../design-system/design-system.md)
- CLAUDE.md (contexto geral): [CLAUDE.md](../../CLAUDE.md)
