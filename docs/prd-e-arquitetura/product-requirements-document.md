# bio-magnus: Product Requirements Document

Versao 1.0 | 2026-07-25 | Documentacao retroativa de um projeto ja em producao.

## Problema

A Magnus distribui conteudo em varias redes, e cada rede permite um link so na bio. Sem um destino unico, cada mudanca de prioridade comercial obrigaria a trocar o link em todas as redes, e o seguidor perderia o caminho para o contato certo.

## Solucao

Pagina unica, mobile-first, que concentra os pontos de contato da marca e pode ser reordenada sem tocar em nenhuma rede social.

## Publico

Seguidores das redes da Magnus, principalmente do Instagram `@magnusmidias`. Chegam por celular, com intencao ja formada e paciencia curta. Uma parte e internacional, dai o PT e EN.

## Objetivo de negocio

Converter trafego social em conversa comercial. Sucesso e o clique que sai daqui para o site oficial, o WhatsApp ou o e-mail.

## Escopo

### Dentro
- Pagina unica, sem rotas.
- Cards de link: site oficial, WhatsApp com mensagem pre-preenchida, e-mail.
- Icones sociais: Instagram, LinkedIn, YouTube.
- Alternancia PT e EN, com preferencia salva em `localStorage`.
- Logo, tagline e footer.

### Fora
- Formulario, backend, banco de dados.
- Conteudo editorial, blog, secoes longas.
- Analytics embarcado direto no codigo (quando houver medicao, entra por GTM).

## Requisitos funcionais

| ID | Requisito |
|---|---|
| RF1 | A pagina exibe os cards de link na ordem definida, cada um abrindo em nova aba com `rel="noopener noreferrer"`. |
| RF2 | O link de WhatsApp abre `wa.me` com mensagem pre-preenchida. |
| RF3 | O seletor de idioma alterna PT e EN sem recarregar, e a escolha persiste entre visitas. |
| RF4 | Os icones sociais levam aos perfis oficiais da Magnus. |
| RF5 | Reordenar, adicionar ou remover um card e alteracao de HTML mais traducao, sem tocar em estrutura. |

## Requisitos nao funcionais

| ID | Requisito |
|---|---|
| RNF1 | Carregamento percebido praticamente imediato em 4G. Sem imagem pesada, sem script de terceiro bloqueante. |
| RNF2 | WCAG AA: contraste, foco visivel, alvo de toque confortavel, `skip link`. |
| RNF3 | Headers de seguranca no deploy, com CSP estrita. |
| RNF4 | Descoberta: `robots.txt`, `sitemap.xml`, `llms.txt`, favicon set completo e `site.webmanifest`. |
| RNF5 | PT e EN em paridade total de conteudo. |

## Arquitetura

Detalhe em `arquitetura.md`, nesta pasta. Em uma linha: HTML estatico servido pela Vercel, CSS com custom properties em `src/style.css`, JavaScript vanilla em `js/main.js` e `js/i18n.js`, traducoes em `translations/pt.js` e `translations/en.js`.

## Metricas de sucesso

Ainda nao mensuraveis: nao ha analytics. Quando o GTM entrar, medir cliques por card, distribuicao PT e EN, e taxa de saida sem clique. Ate la, o unico sinal e indireto, pelo volume de conversa no WhatsApp.

## Riscos

| Risco | Mitigacao |
|---|---|
| Link desatualizado (destino que mudou de endereco) | conferir os destinos a cada alteracao; o `llms.txt` lista os destinos e serve de checklist |
| Escopo inflando ("ja que tem a pagina...") | principio I da constitution: recusa por padrao |
| Divergencia visual com a `lp-magnus` | `MASTER.md` como base, `lp-magnus` como desempate pratico |
