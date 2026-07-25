# Framework: Link de Bio

## 1. Objetivo e quando usar

Link de bio é uma página única, mobile-first, que centraliza os links de um perfil: substitui o campo "link na bio" das redes sociais por uma página própria com identidade e rastreamento de cliques.

**Usar quando:**
- O objetivo é centralizar links de CTA vindos de Instagram, TikTok ou YouTube
- O projeto precisa de identidade visual própria (não um Linktree genérico)
- É necessário rastrear quais links geram mais cliques
- O cliente quer domínio próprio (`@vitoriakauer.com.br/links` ou `links.vitoriakauer.com.br`)

**Não usar quando:**
- O objetivo é conversão de um produto específico com copy longa → `framework-landing-page`
- O projeto precisa de múltiplas páginas e navegação → `framework-site-institucional`

**Relação com landing page:**
A link de bio é o elo entre a rede social e a landing page. O fluxo típico: post no Instagram → link na bio → página de links → landing page → lead/venda.

---

## 2. Stack recomendada

### Opção A: Ultra-lean (padrão para link de bio)

| Camada | Uso |
|---|---|
| Markup | HTML semântico puro |
| Estilo | CSS puro |
| Interatividade | Vanilla JS (apenas para analytics de clique) |
| Deploy | Vercel, Netlify, GitHub Pages, Cloudflare Pages |
| Analytics | GTM + GA4, Plausible ou Fathom |

> **Ponytail:** link de bio raramente precisa de framework. Uma página estática carrega em < 500ms, não tem dependências e é trivial de manter. Escolha Opção B apenas se houver requisito explícito de servidor.

### Opção B: Com framework (quando há requisito de servidor)

| Camada | Uso |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Estilo | Tailwind CSS |
| Deploy | Vercel |
| Analytics | GTM + GA4 |

Casos em que Opção B faz sentido:
- Links dinâmicos: editáveis sem redeploy (via CMS ou Supabase)
- A/B testing de ordem dos links com dados reais
- Rastreamento server-side de cliques para privacidade (sem cookies)
- A página é parte de um projeto Next.js maior

---

## 3. PRD: Produto e Requisitos

### 3.1 Objetivo do produto
_(Em 1–2 frases: quem é o perfil, de onde vêm os visitantes, qual ação primária esperada)_

### 3.2 Público-alvo
_(Seguidores do Instagram. Dispositivo primário: smartphone. Tempo de decisão: < 10 segundos)_

### 3.3 Estrutura de seções (v1)

| # | Bloco | Objetivo |
|---|---|---|
| 1 | Header, avatar + nome + bio | Confirmação de identidade, "estou no lugar certo" |
| 2 | Links principais | CTAs ordenados por prioridade de negócio |
| 3 | Redes sociais | Ícones secundários: acesso às plataformas |
| 4 | Footer | Branding mínimo: logotipo ou nome da marca |

### 3.4 Funcionalidades obrigatórias (v1)

- [ ] Avatar com foto de perfil
- [ ] Nome, título e bio curta (1–2 linhas)
- [ ] Lista de botões de link ordenados por prioridade
- [ ] Cada link rastreado individualmente (GTM ou data attributes)
- [ ] Open Graph configurado (para quando a URL é compartilhada no WhatsApp/iMessage)
- [ ] Favicon e ícone de atalho iOS (`apple-touch-icon`)
- [ ] `robots.txt` e `sitemap.xml`
- [ ] `llms.txt`
- [ ] Responsivo: 320px a 480px como foco principal

### 3.5 Funcionalidades opcionais: avaliar no Specify

| Funcionalidade | Quando faz sentido |
|---|---|
| Links dinâmicos (sem redeploy) | Cliente precisa alterar links com frequência sem depender de dev |
| Contador de cliques visível | Prova social de acessos: ex: "3.2k acessos este mês" |
| Modal de confirmação de saída | Conteúdo adulto, avisos legais, confirmação de faixa etária |
| Tema escuro / claro | Quando o design system da marca exige ou o usuário tem preferência |
| Multi-idioma | Perfis com público internacional |
| Botão de WhatsApp com mensagem pré-preenchida | Fluxo de vendas que começa no chat |
| Feed do Instagram embarcado | Linha adicional de tráfego: evitar se comprometer performance |

### 3.6 Links e ordem

| Prioridade | Destino | CTA sugerido |
|---|---|---|
| 1 | _(principal: cadastro, consultoria, produto)_ | _(verbo de ação direta)_ |
| 2 | _(secundário: conteúdo, lead magnet, produto 2)_ | _(verbo de ação)_ |
| 3+ | _(terciário: portfólio, press kit, canal YouTube)_ | _(descritivo)_ |

**Regra de ordem:** o link mais importante de negócio fica primeiro. Links de redes sociais ficam como ícones no rodapé: não como botões de destaque.

### 3.7 Fluxo principal

```
Seguidor clica no link da bio (Instagram, TikTok, YouTube)
  → Página carrega em < 1s em 4G
  → Reconhece o perfil pelo avatar + nome (< 2 segundos)
  → Escolhe o CTA de interesse
  → Clique registrado no GTM → evento `link_click` com label do destino
  → Redirecionado para o destino
```

### 3.8 Não-negociáveis de segurança

1. Links externos com `rel="noopener noreferrer"` em todos os `<a target="_blank">`
2. Sem formulários → sem validação de server obrigatória
3. Se houver formulário (ex: captura de email no próprio link de bio): aplicar as mesmas regras do `framework-landing-page`
4. Headers HTTP de segurança mesmo em página estática (configurar no `vercel.json` ou `_headers` do Netlify)

---

## 4. Estrutura de pastas

### 4.1 Opção A: estático

```
link-bio/
├── index.html              ← toda a página
├── styles.css              ← design system e layout
├── script.js               ← tracking de cliques (opcional se usar GTM)
├── public/ (ou raiz)
│   ├── avatar.jpg          ← foto de perfil (otimizada: 200x200 WebP)
│   ├── og-image.png        ← Open Graph (1200x630)
│   ├── favicon.ico
│   ├── apple-touch-icon.png (180x180)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
└── docs/                   ← ver seção 4.3
```

### 4.2 Opção B: Next.js

```
link-bio/
├── app/
│   ├── layout.tsx          ← fontes, GTM, meta tags globais
│   ├── page.tsx            ← composição da página
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── profile-header.tsx  ← avatar, nome, bio
│   ├── link-button.tsx     ← botão rastreável com data-label
│   └── social-links.tsx    ← ícones das redes
├── lib/
│   └── links.ts            ← lista de links como array de dados
├── public/
│   ├── avatar.jpg
│   ├── og-image.png
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── llms.txt
└── docs/                   ← ver seção 4.3
```

### 4.3 Docs/

```
docs/
├── constitution.md
├── prd-e-arquitetura/
│   ├── product-requirements-document.md
│   ├── instrucoes.md
│   └── plano-de-acao.md
├── specs/
│   └── 001-link-bio/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── design-system/
│   └── MASTER.md           ← tokens do cliente (cores, tipografia, radius, motion)
├── historico/
│   └── 00-criacao-AAAA-MM-DD.md
└── prompt-inicial/
    └── prompt-inicial.md
```

Se for projeto da Vitória Kauer, copiar `docs-base/` de `03-empresas/consultoria-vitoria/docs-base/`: já vem com o design system completo preenchido.

---

## 5. Fluxo de desenvolvimento

```
FASE 0: Constitution
  Princípios: mobile-first absoluto, < 1s LCP, sem framework se não necessário
  Stack definida (A ou B), plataforma de deploy, domínio
  Proibições: sem carrossel, sem scroll horizontal, sem fontes pesadas não subsetadas

FASE 1: Specify
  Lista final de links com CTA de cada um e ordem de prioridade
  Redes sociais a exibir como ícone
  Tem foto de perfil? Qual resolução? Quem entrega o asset?
  Qual domínio? (custom subdomain ou path de domínio existente?)

FASE 2: Clarify
  GTM já existe ou criar novo container?
  Qual evento de clique disparar? (`link_click` com `link_label` como parâmetro)
  O cliente precisa editar os links sem dev? → define Opção A ou B

FASE 3: Plan + Design System
  a. [Frontend Design] Brief estético: a página reflete a identidade do Instagram da pessoa?
     Qual é a direção? Minimalista clean? Editorial? Vibrante? Escura?
  b. [UI UX Pro Max] Ativar com o prompt padrão para gerar os tokens do design system
     Foco em: fundo, card de botão, tipografia, motion dos botões ao toque
  c. Salvar output em docs/design-system/MASTER.md
  d. Plan: estrutura de arquivos, contratos de dados dos links, configuração de tracking

FASE 4: Tasks
  Phase 1: Setup (repo, gitignore, estrutura de pastas, docs/)
  Phase 2: Design System (globals.css ou Tailwind tokens, fontes carregadas)
  Phase 3: Estrutura HTML semântica (profile header + lista de links + rodapé)
  Phase 4: Visual: aplicar design system, motion dos botões
  Phase 5: Tracking: GTM instalado, eventos de clique configurados por link
  Phase 6: Open Graph, favicon, apple-touch-icon
  Phase 7: robots.txt, sitemap.xml, llms.txt
  Phase 8: Polish: mobile pass dedicado, animações de entrada, toque háptico

FASE 5: Implement [Ponytail ativo]
  PRÉ-REQUISITO: ativar Auto mode no Claude Code antes de começar

  Subir a escada antes de cada bloco (Ponytail)
  O botão de link é o componente mais importante: deve ter hover e active state impecáveis
  Testar no iOS Safari e Chrome Android antes de qualquer outra coisa

  ── GRADING CHECKPOINT ─────────────────────────────────────────────────────────
  Colar o $10K Checklist adaptado para link bio (seção 6) e pedir:
  "Where does this page land against each criterion? Be honest."

  ── MOBILE DEDICATED PASS ──────────────────────────────────────────────────────
  "Do a dedicated pass on the mobile version. Think about thumb reach zones,
   button tap targets (min 44px), and what feels native vs. what feels like
   a desktop page squeezed into a phone."

  ── VERIFICAÇÃO DE FONTES ───────────────────────────────────────────────────────
  Se Inter aparecer → substituir antes de entregar
  Link bio que usa Inter grita "template Linktree"
```

---

## 6. Design System: Barra de Qualidade ($10K Checklist para Link de Bio)

| # | Critério | O que verificar |
|---|---|---|
| 01 | **Identidade reconhecível** | Quem abre sabe em < 2s quem é o perfil: cor, fonte e foto casam com o Instagram |
| 02 | **Um botão, uma ação** | Cada link tem CTA claro e distinto: não "Clique aqui" em todos |
| 03 | **Hierarquia visual de prioridade** | O link mais importante chama mais atenção: tamanho, cor ou posição |
| 04 | **Botão com área de toque generosa** | Mínimo 44px de altura: dedo gordo não erra |
| 05 | **Feedback tátil ao toque** | Active state visível: escurece, move ou pulsa ao pressionar |
| 06 | **Fundo intencional** | Não é `#ffffff` sem motivo: reflete a paleta da marca |
| 07 | **Foto de perfil carregada rápido** | WebP, 200x200 máximo, `loading=eager` (está acima do fold) |
| 08 | **Tudo invisível funcionando** | < 1s LCP, WCAG AA, Open Graph real, favicon, apple-touch-icon |

---

## 7. Segurança

| Área | Implementação |
|---|---|
| Links externos | `rel="noopener noreferrer"` em todos os `<a target="_blank">` |
| Headers HTTP | CSP, X-Frame-Options, X-Content-Type-Options (via `vercel.json` ou `_headers`) |
| Formulário (se houver) | Aplicar seção 7 do `framework-landing-page` integralmente |
| Assets de imagem | Não expor caminhos internos do servidor; usar CDN ou `/public` |

---

## 8. Performance e Core Web Vitals

Meta mais rigorosa que landing page: visitante veio do celular em 4G ou menos.

| Métrica | Meta |
|---|---|
| LCP | < 1s (ideal) / < 1.8s (mínimo) |
| CLS | 0: sem layout shift |
| INP | < 200ms |

Práticas:
- Avatar em WebP, 200×200px, `loading="eager"` (está acima do fold: não usar `lazy`)
- Fontes com `display: swap` e subset Latin apenas
- CSS inline ou um único arquivo < 15kb
- Sem JavaScript de terceiros além do GTM (carregar async)
- Sem carousel, sem embed de feed do Instagram por padrão
- `<link rel="preconnect">` para Google Fonts se usadas
- Imagem OG pré-gerada (não gerar em runtime)

---

## 9. SEO, Descoberta e Rastreabilidade

### Open Graph (essencial: a URL é compartilhada no WhatsApp)

```html
<meta property="og:title" content="[Nome do perfil]" />
<meta property="og:description" content="[Bio em 1–2 frases]" />
<meta property="og:image" content="https://dominio.com/og-image.png" />
<meta property="og:url" content="https://dominio.com" />
<meta property="og:type" content="profile" />
<meta name="twitter:card" content="summary_large_image" />
```

### Arquivos de descoberta

**`robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://dominio.com/sitemap.xml
```

**`sitemap.xml`**: uma única URL (a raiz):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dominio.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**`llms.txt`:**
```markdown
# [Nome do perfil]

> [Bio em 1–2 frases: quem é, para quem, qual o CTA principal]

## Links disponíveis
- [CTA 1]: [URL]
- [CTA 2]: [URL]
- [CTA 3]: [URL]

## Redes sociais
- Instagram: [handle]
- [outras redes]
```

### GTM e rastreamento de cliques

Instalar o GTM. Dentro dele, configurar:

- [ ] Tag GA4 com Measurement ID
- [ ] Trigger de pageview
- [ ] Trigger de clique nos botões de link: usar `data-label` como parâmetro

```html
<!-- cada botão de link recebe um data-label único -->
<a href="https://..." target="_blank" rel="noopener noreferrer"
   data-label="consultoria-online">
  Consultoria Online
</a>
```

Evento no GA4:
```
event_name: link_click
parameter: link_label (valor do data-label)
parameter: link_url (href do elemento clicado)
```

Resultado: relatório de cliques por link: sabe exatamente qual botão converte mais.

---

## 10. Acessibilidade (WCAG AA)

- [ ] Contraste mínimo 4.5:1 em todos os textos dos botões
- [ ] Botões com `aria-label` descritivo quando o texto visível for curto ("↗" não basta)
- [ ] Tab order lógico: avatar → bio → links em ordem → redes sociais
- [ ] Focus ring visível em todos os links (especialmente para usuários de teclado/leitor de tela)
- [ ] Avatar com `alt="Foto de [nome do perfil]"`
- [ ] Ícones de redes sociais com `aria-label="[Nome da rede]"` e `aria-hidden="true"` no SVG interno
- [ ] `@media (prefers-reduced-motion: reduce)` nas animações de entrada dos botões
- [ ] Área de toque mínima de 44×44px em todos os botões (crítico no mobile)

---

## 11. Logs e Monitoramento

### Analytics de cliques (o principal KPI)

O sucesso de uma link de bio é medido pelos cliques por link. Verificar semanalmente:
- Qual link tem mais cliques (prioridade de negócio confirma a ordem?)
- Taxa de clique geral (visitantes vs. clicadores)
- Origem do tráfego (Instagram direct, WhatsApp, busca orgânica)

### Monitoramento de disponibilidade

Configurar uptime monitor (UptimeRobot ou equivalente): link de bio no ar é crítico pois é o único link do Instagram.

### Erros client-side

Para Opção B (Next.js): Sentry ou Highlight para capturar erros JS.
Para Opção A (estático): não necessário: sem lógica client complexa.

---

## 12. Testes (antes do deploy)

### Smoke tests

- [ ] Página carrega no Chrome (desktop e Android) e Safari (iOS)
- [ ] Todos os links abrem o destino correto
- [ ] Links externos abrem em nova aba
- [ ] Avatar carrega corretamente

### Mobile específico

- [ ] Testar em iPhone SE (375px): o menor viewport relevante
- [ ] Botões têm área de toque mínima de 44px (verificar no DevTools > Mobile)
- [ ] Não há scroll horizontal
- [ ] Fontes legíveis sem zoom: mínimo 16px no corpo
- [ ] Testar no iOS Safari 16+ e Chrome Android

### Rastreamento de cliques

- [ ] Evento `link_click` disparando no GTM Preview ao clicar em cada botão
- [ ] Parâmetro `link_label` correto por botão
- [ ] Evento chegando no GA4 Debug View

### Open Graph

- [ ] Usar [opengraph.xyz](https://opengraph.xyz) ou WhatsApp para verificar preview da URL
- [ ] Imagem OG exibida corretamente (1200×630)
- [ ] Título e descrição aparecem na prévia

### Performance

- [ ] Lighthouse mobile ≥ 95 em performance
- [ ] LCP < 1.8s no throttle de 4G (Lighthouse mobile simula)
- [ ] CLS = 0

### Segurança

- [ ] Headers HTTP verificados (SecurityHeaders.com)
- [ ] `rel="noopener noreferrer"` em todos os links externos

### Cross-browser

- [ ] Chrome Android
- [ ] iOS Safari
- [ ] Firefox mobile
- [ ] Samsung Internet (relevante para Android popular no Brasil)

---

## 13. Checklist de entrega

### Design ($10K: link de bio)

- [ ] Identidade visual reconhecível: casa com o Instagram do perfil
- [ ] CTA claro em cada link: sem "Clique aqui" genérico
- [ ] Hierarquia de prioridade visual entre os links
- [ ] Botões com área de toque ≥ 44px
- [ ] Active state implementado
- [ ] Foto de perfil WebP < 50kb

### Funcionalidade

- [ ] Todos os links corretos e abrindo em nova aba
- [ ] GTM instalado e evento de clique funcionando por link
- [ ] Open Graph configurado e testado

### Todos os testes da seção 12 passaram

- [ ] Smoke tests
- [ ] Mobile (375px, iOS Safari, Chrome Android)
- [ ] Rastreamento de cliques
- [ ] Open Graph
- [ ] Lighthouse ≥ 95 mobile
- [ ] CLS = 0
- [ ] Segurança

### Monitoramento

- [ ] Uptime monitor ativo

---

## 14. Deploy

| Opção | Quando usar |
|---|---|
| Vercel, Netlify, Cloudflare Pages | Padrão: gratuito para sites estáticos |
| GitHub Pages | Opção A sem domínio custom |
| Hospedagem do cliente | Cliente já tem CDN ou servidor configurado |

**Domínio recomendado:**
- `links.dominio.com.br` (subdomínio dedicado), mais clean
- `dominio.com.br/links` (path): se a landing page já existir no domínio raiz

**Passos:**
```
1. Configurar variáveis de ambiente (se Opção B)
2. Build sem erros
3. Deploy para URL de preview
4. Executar checklist de testes na preview
5. Configurar domínio custom + SSL
6. Deploy para produção
7. Verificar GTM funcionando em produção (modo preview)
8. Ativar uptime monitor
9. Compartilhar URL com o cliente para colocar no Instagram
```

**Pós-deploy:**
- Atualizar o link na bio do Instagram para a nova URL
- Verificar no GTM Preview que o pageview e os cliques estão sendo registrados em produção

---

## 15. Referências e skills

| Skill / Doc | Uso neste framework |
|---|---|
| `[[sdd-spec-driven-development/SKILL.md]]` | Fluxo completo Fases 0–5 |
| `[[frontend-design/SKILL.md]]` | Fase 3: brief estético e direção visual |
| `[[ui-ux-pro-max/SKILL.md]]` | Fase 3: tokens do design system |
| `[[ponytail/SKILL.md]]` | Fase 5: disciplina de código mínimo: link bio é o caso clássico de over-engineering |
| `[[framework-landing-page]]` | Destino primário dos links: manter consistência visual |
| `instrucoes-gerais/guia/git-e-github.md` | Git workflow, Conventional Commits |
| `instrucoes-gerais/docs-exemplo/` | Exemplo completo de docs/ preenchido |
| `03-empresas/consultoria-vitoria/docs-base/` | Docs base pré-preenchida para projetos da Vitória |
| `03-empresas/consultoria-vitoria/design-e-prototipos/links-bio.dc.html` | Protótipo Claude Design da Vitória: referência visual de link de bio |
