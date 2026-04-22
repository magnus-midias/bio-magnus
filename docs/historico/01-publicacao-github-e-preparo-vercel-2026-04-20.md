# Publicacao no GitHub e preparo para deploy na Vercel

- **Data:** 2026-04-20
- **Autor:** Cristian
- **Escopo:** infra / config

## Contexto / Motivacao
O projeto `bio-magnus` precisava entrar no fluxo oficial de versionamento da Magnus Midias no GitHub para habilitar deploy continuo na Vercel e facilitar manutencao por multiplos colaboradores e LLMs.

## O que mudou
- Definido o repositorio remoto alvo: `https://github.com/magnus-midias/bio-magnus.git`.
- Adicionado `.gitignore` com regras basicas para projeto Vite (`node_modules`, `dist`, `.vercel`, `.DS_Store`).
- Projeto organizado para publicacao com branch principal `main`.
- Validado o build de producao (`npm run build`) para confirmar compatibilidade com deploy na Vercel.

### Decisoes da epoca
- Manter configuracao de deploy simples usando o padrao do Vite, sem `vercel.json` customizado.
- Registrar a publicacao como `chore`, pois o foco e operacao de repositorio/deploy, nao mudanca funcional de produto.

## Impacto
- Projeto passa a ter trilha de historico remoto no GitHub.
- Pronto para conexao direta com a Vercel:
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Referencia: repositorio alvo `https://github.com/magnus-midias/bio-magnus.git`.
