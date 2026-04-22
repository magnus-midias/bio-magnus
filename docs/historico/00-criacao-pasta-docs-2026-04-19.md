# Criacao da pasta de documentacao

- **Data:** 2026-04-19
- **Autor:** Cristian
- **Escopo:** config / outro

## Contexto / Motivacao
O projeto `bio-magnus` pode vir a ser trabalhado por diferentes LLMs e/ou colaboradores ao longo do tempo. Sem um historico estruturado, cada novo agente precisaria reconstruir o contexto do zero lendo o codigo — o que e lento, propenso a erros e perde a intencao por tras das decisoes. A pasta `docs/` nasce como fonte unica de contexto historico do projeto.

## O que mudou
- Criada a pasta `docs/` na raiz do projeto.
- Criado `docs/README.md` com descricao do proposito da pasta, visao geral da stack (Vite 5, HTML estatico), instrucoes de uso, criterios de "alteracao relevante" e template de novos registros.
- Criado `docs/CHANGELOG.md` como linha do tempo resumida, apontando para cada arquivo detalhado.
- Criada a subpasta `docs/changes/` para abrigar um Markdown por alteracao relevante.
- Criado primeiro registro (`2026-04-19-criacao-pasta-docs.md`) como exemplo do padrao.

### Decisoes da epoca
- Um arquivo por alteracao, nao um changelog unico gigante.
- Prefixo de data `YYYY-MM-DD-*` para ordenacao cronologica no filesystem.
- Frontmatter YAML nos registros para eventual parsing futuro.
- `CHANGELOG.md` separado do `README.md` (responsabilidades diferentes).

## Impacto
- A partir desta data, toda alteracao relevante deveria gerar um registro em `docs/changes/` + entrada no `CHANGELOG.md`.
- Este formato foi **substituido em 2026-04-21** pela estrutura padrao do Cristian (ver registro `02-criacao-estrutura-docs-2026-04-21.md` e `03-consolidacao-historico-novo-formato-2026-04-21.md`). O fluxo atual e registrar em `docs/historico/` com nome `NN-descricao-curta-AAAA-MM-DD.md`.
