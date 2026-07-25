# bio-magnus: Constitution

Este arquivo supersede qualquer outra diretriz do projeto. Ler antes de qualquer alteracao, sempre.

Contexto da area: `../../CLAUDE.md` e `../../agente-desenvolvedor-magnus/`. Padroes transversais: `agente-desenvolvedor-magnus/padroes-de-projeto.md`.

## Principios Fundamentais

### I. Uma funcao so
E o link na bio: concentrar os pontos de contato da Magnus em um lugar. Nao vira landing page, nao ganha secoes de conteudo, nao ganha formulario. Todo pedido de "aproveitar que ja tem a pagina" e recusado por padrao.

### II. Mobile primeiro, e de verdade
O trafego vem do Instagram, quase todo por celular. O mobile e projetado, nao adaptado do desktop. Se um ajuste melhora o desktop e piora o toque no celular, o celular vence.

### III. Zero dependencia
Sem framework, sem bundler, sem biblioteca de UI. HTML, CSS e JavaScript vanilla. Cada dependencia nova precisa de justificativa escrita e alteracao desta constitution. O projeto ja saiu do Vite uma vez de proposito (ver `docs/historico/07-i18n-pt-en-migracao-stack-2026-05-29.md`), nao voltar sem motivo forte.

### IV. Marca nao se inventa
Cores, tipografia, espacamento e voz vem de `docs/design-system/MASTER.md`, que e snapshot do cofre. Nunca criar cor, fonte ou componente novo aqui. Sem emoji. Sem travessao.

### V. Carregamento instantaneo
E a primeira coisa que o seguidor ve depois de clicar. Nada de imagem pesada, nada de script de terceiro bloqueante, nada de fonte extra. Se um recurso nao cabe no orcamento de performance, ele nao entra.

## Stack e Tecnologias

**Permitidas:** HTML5, CSS puro com custom properties, JavaScript vanilla (script classico, sem modulo), SVG inline, Sora via Google Fonts, `npx serve` em dev, Vercel em producao.

**Proibidas ou requerem aprovacao:** qualquer framework de UI, qualquer bundler, qualquer biblioteca de terceiro, qualquer chamada de rede em runtime, qualquer backend.

## Padroes de Qualidade

- $10K Checklist antes de qualquer entrega de UI (`metodologia-10k-checklist.md` no cofre).
- Acessibilidade: WCAG AA e o piso. Alvos de toque confortaveis, foco visivel, contraste conferido.
- Todo link externo com `target="_blank"` leva `rel="noopener noreferrer"`. Hoje: 5 de 5 conformes.
- i18n PT e EN sempre em paridade: texto novo entra nos dois arquivos de traducao no mesmo commit.

## Seguranca

- Sem backend, sem formulario, sem segredo: nao ha variavel de ambiente neste projeto e nao deve haver.
- Headers no `vercel.json`: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- A CSP e estrita (`default-src 'none'`) e deve continuar assim. Qualquer recurso novo entra na CSP explicitamente, nunca via `'unsafe-inline'`.

## SEO e descoberta

- `robots.txt`, `sitemap.xml` e `llms.txt` na raiz. Atualizar o `llms.txt` sempre que os links da pagina mudarem: ele descreve os destinos, e destino errado ali e pior que nao ter o arquivo.
- Canonical e Open Graph apontando para `https://bio.magnusmidias.com`.
- Favicon set completo na raiz mais `site.webmanifest`.
- **GTM como container unico.** Quando o container da Magnus existir, ele entra aqui e e o unico jeito de adicionar qualquer tag. GA4 direto no codigo e proibido. Pendencia aberta: o container ainda nao foi criado.

## Monitoramento pos-deploy

Baseline da area: Uptime Robot, Sentry e Dependabot. Projeto sem backend e sem erro de runtime relevante: Uptime Robot e Dependabot bastam, Sentry e opcional. Pendencia aberta: nenhum dos tres esta configurado.

## Responsabilidade de contas

Diretriz geral da Magnus em `08-programacao-e-desenvolvimento/instrucoes-gerais/guia/infraestrutura-e-responsabilidades.md`. **Este projeto e propriedade da propria Magnus: nao ha cliente externo, entao tudo fica na Magnus.**

| Servico | Conta | Observacao |
|---|---|---|
| Dominio `bio.magnusmidias.com` | Magnus | subdominio de `magnusmidias.com` |
| Vercel | Magnus | projeto `bio-magnus`, deploy automatico da `main` |
| GitHub | Magnus | `magnus-midias/bio-magnus` |
| GA4 / GTM | Magnus | a criar |
| Uptime Robot | Magnus | a criar |
| Sentry | Magnus | opcional neste projeto |

## Fluxo de Trabalho

- Conventional Commits obrigatorio: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore` | `perf` | `ci`.
- `main` sempre deployavel. Feature em `feat/nome`, correcao em `fix/nome`, kebab-case, branch deletada apos o merge.
- Um commit, uma responsabilidade. Nunca commitar build quebrado.
- Toda alteracao relevante gera registro em `docs/historico/NN-descricao-AAAA-MM-DD.md`.
- Ordem de leitura antes de alterar: esta constitution, depois `docs/prd-e-arquitetura/instrucoes.md`, depois `docs/historico/` em ordem crescente.

## Governanca

Mudar esta constitution exige justificativa escrita, revisao do impacto nas specs existentes e incremento de versao. Nenhum principio muda no meio de uma implementacao ativa.

**Versao:** 1.0 | **Criada:** 2026-07-25 | **Ultima alteracao:** 2026-07-25
