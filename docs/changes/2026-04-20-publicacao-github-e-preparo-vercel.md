---
data: 2026-04-20
titulo: Publicacao no GitHub e preparo para deploy na Vercel
tipo: chore
---

# Publicacao no GitHub e preparo para deploy na Vercel

## Contexto / Motivacao
O projeto `bio-magnus` precisava entrar no fluxo oficial de versionamento da Magnus Midias no GitHub para habilitar deploy continuo na Vercel e facilitar manutencao por multiplos colaboradores e LLMs.

## O que foi feito
- Definido o repositorio remoto alvo: `https://github.com/magnus-midias/bio-magnus.git`.
- Adicionado `.gitignore` com regras basicas para projeto Vite (`node_modules`, `dist`, `.vercel` e `.DS_Store`).
- Organizado o projeto para publicacao com branch principal `main`.
- Validado o build de producao (`npm run build`) para confirmar compatibilidade com deploy na Vercel.

## Arquivos afetados
- [/.gitignore](../../.gitignore) — regras para evitar envio de artefatos locais e build.
- [/docs/CHANGELOG.md](../CHANGELOG.md) — nova entrada desta alteracao.
- [/docs/changes/2026-04-20-publicacao-github-e-preparo-vercel.md](./2026-04-20-publicacao-github-e-preparo-vercel.md) — este registro detalhado.

## Decisoes tomadas
- Manter configuracao de deploy simples usando o padrao do Vite, sem `vercel.json` customizado neste momento.
- Registrar a publicacao como `chore`, pois o foco e operacao de repositorio/deploy, nao mudanca funcional de produto.

## Impacto / Consequencias
- O projeto passa a ter trilha de historico remoto no GitHub.
- Fica pronto para conexao direta com a Vercel usando:
  - Build Command: `npm run build`
  - Output Directory: `dist`

## Referencias (opcional)
- Repositorio alvo: `https://github.com/magnus-midias/bio-magnus.git`
