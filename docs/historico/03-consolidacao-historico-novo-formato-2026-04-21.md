# Consolidacao do historico antigo no novo formato

- **Data:** 2026-04-21
- **Autor:** Claude
- **Escopo:** config / outro

## Contexto / Motivacao
Apos a criacao da estrutura padrao de documentacao (registro `02`), restavam artefatos da estrutura antiga (`docs/README.md`, `docs/CHANGELOG.md`, `docs/changes/`) duplicando a funcao do novo `docs/historico/` e do `CLAUDE.md`. A pedido do Cristian, consolidei tudo no novo formato e removi o que sobrava.

## O que mudou
- Migrados os 2 registros antigos de `docs/changes/` para `docs/historico/` no novo formato `NN-descricao-curta-AAAA-MM-DD.md`:
  - `00-criacao-pasta-docs-2026-04-19.md` (antes: `changes/2026-04-19-criacao-pasta-docs.md`).
  - `01-publicacao-github-e-preparo-vercel-2026-04-20.md` (antes: `changes/2026-04-20-publicacao-github-e-preparo-vercel.md`).
- Renumerado o registro da criacao da estrutura padrao de `00` para `02` para manter a ordem cronologica (`00` = 2026-04-19 -> `01` = 2026-04-20 -> `02` = 2026-04-21).
- Excluidos:
  - `docs/README.md` (substituido por `CLAUDE.md` na raiz + `docs/instrucoes/instrucoes.md`).
  - `docs/CHANGELOG.md` (substituido pelo proprio `docs/historico/`).
  - `docs/changes/` e seu conteudo (migrado para `docs/historico/`).

## Impacto
- O projeto passa a ter **apenas uma** fonte de historico: `docs/historico/`, seguindo o padrao do Cristian.
- O frontmatter YAML dos registros antigos foi convertido para o cabecalho em bullets do novo formato (Data / Autor / Escopo).
- Proximos registros devem seguir a numeracao sequencial a partir de `04-...`.
- Nenhum codigo do projeto foi alterado nesta consolidacao.
