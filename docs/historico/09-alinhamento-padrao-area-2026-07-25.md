# 09: Alinhamento ao padrao da area

**Data:** 2026-07-25
**Tipo:** docs, chore, feat
**Motivacao:** auditoria de conformidade dos cinco projetos de `int-infra` contra o esqueleto de `agente-desenvolvedor-magnus/modelos/projeto-modelo/`. O projeto nasceu antes desse molde e estava sem constitution, sem MASTER de design system, sem arquivos de descoberta e com favicon incompleto.

## O que mudou

### Documentacao
- Criado `docs/constitution.md`: cinco principios (uma funcao so, mobile primeiro, zero dependencia, marca nao se inventa, carregamento instantaneo), stack permitida e proibida, seguranca, SEO, monitoramento, tabela de responsabilidade de contas e fluxo de trabalho.
- Criado `docs/prd-e-arquitetura/product-requirements-document.md`: PRD retroativo, com escopo dentro e fora, RF e RNF, metricas e riscos.
- Criado `docs/prd-e-arquitetura/plano-de-acao.md`: fila de pendencias (GTM, monitoramento, higiene).
- Criado `docs/design-system/MASTER.md`: snapshot dos tokens reais da Magnus mais a secao **Neste projeto** com o subconjunto que o `src/style.css` realmente declara e o que ainda falta.
- `docs/design-system/design-system.md` mantido, agora subordinado ao MASTER por um aviso no topo: ele fica sendo o detalhamento de componentes, nao a fonte da marca.
- `docs/arquitetura/arquitetura.md` movido para `docs/prd-e-arquitetura/arquitetura.md` (via `git mv`, historico preservado).
- `docs/instrucoes/instrucoes.md` movido para `docs/prd-e-arquitetura/instrucoes.md` (via `git mv`).
- Criado `docs/framework/framework.md`, copia do `framework-link-bio.md` do cofre.
- Criado `docs/specs/README.md`.
- Criado `README.md` na raiz, que nao existia.
- `CLAUDE.md`: bloco de ordem de leitura no topo, comecando pela constitution, e caminhos corrigidos para a nova estrutura.

### Marca
- Favicon set completo na raiz: `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-192x192.png`, `favicon-512x512.png`, `apple-touch-icon.png`, `favicon.ico` e `site.webmanifest`. Antes so existia o SVG.
- O `<head>` passou a declarar o set inteiro. O `apple-touch-icon` apontava para o SVG, que iOS nao usa: agora aponta para o PNG 180x180.
- Espelho dos assets versionado em `docs/design-system/favicon/` e `docs/design-system/logos/`.

Os SVG existentes do projeto foram conferidos contra os do modelo: mesmo desenho, diferenca so de serializacao. Nenhum asset em uso foi substituido.

### Descoberta
- Criados `robots.txt`, `sitemap.xml` e `llms.txt`. O projeto nao tinha nenhum dos tres.
- O `llms.txt` descreve os destinos reais da pagina hoje: site oficial, WhatsApp e e-mail, mais as redes. O `CLAUDE.md` ainda citava um link de diagnostico que saiu no historico 08.

### Seguranca
- CSP ganhou `manifest-src 'self'` (sem isso, `default-src 'none'` bloquearia o `site.webmanifest` recem-adicionado) e `frame-ancestors 'none'`.

## O que nao mudou

Nenhuma linha de HTML de conteudo, CSS ou logica. As unicas alteracoes fora de `docs/` foram o bloco de favicon no `<head>`, os arquivos novos na raiz e duas diretivas na CSP.

## Pendencias que ficam abertas

- GTM: o container unico da Magnus ainda nao existe. Sem ID, o snippet nao entra. Bloqueio de decisao, nao de execucao.
- Monitoramento: Uptime Robot e Dependabot ainda nao configurados.
- Higiene: `favicon.svg`, `logo-dark.svg` e `logo-light.svg` duplicados na raiz do projeto, herdados de antes. Remover exige conferir que nada os referencia.
- Branches: o projeto ainda commita direto na `main`.

Detalhe em `docs/prd-e-arquitetura/plano-de-acao.md`.
