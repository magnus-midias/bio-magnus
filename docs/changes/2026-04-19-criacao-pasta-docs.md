---
data: 2026-04-19
titulo: Criação da pasta de documentação
tipo: docs
---

# Criação da pasta de documentação

## Contexto / Motivação
O projeto `bio-magnus` pode vir a ser trabalhado por diferentes LLMs e/ou colaboradores ao longo do tempo. Sem um histórico estruturado, cada novo agente precisaria reconstruir o contexto do zero lendo o código — o que é lento, propenso a erros e perde a intenção por trás das decisões.

A pasta `docs/` nasce como **fonte única de contexto histórico** do projeto: o que é, por que existe, e tudo que já foi feito nele.

## O que foi feito
- Criada a pasta [docs/](../) na raiz do projeto.
- Criado o [docs/README.md](../README.md) com:
  - Descrição do propósito da pasta.
  - Visão geral da stack técnica atual (Vite 5, HTML estático).
  - Instruções de uso para leitores e para quem faz alterações.
  - Critérios do que conta como "alteração relevante".
  - Template padrão para novos arquivos de alteração.
- Criado o [docs/CHANGELOG.md](../CHANGELOG.md) como linha do tempo resumida, apontando para cada arquivo detalhado.
- Criada a subpasta [docs/changes/](./) para abrigar um Markdown por alteração relevante.
- Criado este primeiro registro como exemplo concreto do padrão.

## Arquivos afetados
- [docs/README.md](../README.md) — novo arquivo, guia e índice da documentação.
- [docs/CHANGELOG.md](../CHANGELOG.md) — novo arquivo, linha do tempo das alterações.
- [docs/changes/2026-04-19-criacao-pasta-docs.md](./2026-04-19-criacao-pasta-docs.md) — este arquivo.

## Decisões tomadas
- **Um arquivo por alteração, não um changelog único gigante.** Facilita leitura pontual, linkagem e evita conflitos ao trabalhar em paralelo.
- **Nome dos arquivos com prefixo de data (`YYYY-MM-DD-*`).** Ordena cronologicamente no filesystem e deixa o contexto temporal explícito.
- **Frontmatter YAML nos arquivos de alteração.** Permite parsing futuro (ex.: gerar um índice automático) sem custo hoje.
- **CHANGELOG.md separado do README.md.** O README ensina *como* usar; o CHANGELOG é só a linha do tempo — responsabilidades diferentes.
- **Documentação em português.** Alinhado com o idioma de trabalho do projeto.

## Impacto / Consequências
- A partir de agora, toda alteração relevante no código **deve** ser acompanhada de um novo arquivo em `docs/changes/` e de uma entrada no `CHANGELOG.md`.
- LLMs futuras que atuarem no projeto devem **ler `docs/README.md` primeiro** para se orientar.
- Próximo passo sugerido: preencher a seção "Sobre o Projeto" do `README.md` com uma descrição real do propósito do `bio-magnus` (hoje está como placeholder).
