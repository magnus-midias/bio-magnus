# Documentação do Projeto — bio-magnus

Esta pasta serve como **histórico vivo** do projeto `bio-magnus`. O objetivo é permitir que qualquer pessoa (ou qualquer LLM) que passe a atuar neste projeto consiga entender rapidamente:

1. **O que é o projeto** — seu propósito e contexto.
2. **Por que ele existe** — a motivação por trás dele.
3. **Como ele evoluiu** — todas as alterações relevantes feitas ao longo do tempo.

---

## Sobre o Projeto

> _Esta seção deve ser preenchida com uma descrição clara do que é o `bio-magnus`, seu objetivo de negócio e seu público-alvo. Atualize conforme o projeto amadurecer._

**Stack técnica atual:**
- **Build tool:** Vite 5
- **Tipo:** Aplicação web estática (HTML + JS + assets)
- **Entrada:** [index.html](../index.html)
- **Código-fonte:** [src/](../src/)

**Scripts disponíveis:**
- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera o build de produção
- `npm run preview` — pré-visualiza o build

---

## Como usar esta pasta

### Para quem está lendo (humano ou LLM)

1. Comece por este `README.md` para entender o projeto.
2. Consulte o [CHANGELOG.md](./CHANGELOG.md) para ver a linha do tempo resumida de todas as alterações.
3. Para entender uma alteração específica em profundidade, abra o arquivo Markdown correspondente na pasta [changes/](./changes/).

### Para quem está fazendo alterações no projeto

**Toda alteração relevante no código deve gerar um arquivo Markdown nesta pasta.**

Siga o fluxo abaixo ao final de cada alteração:

1. Crie um novo arquivo em [changes/](./changes/) seguindo o padrão de nome:
   ```
   YYYY-MM-DD-nome-curto-da-alteracao.md
   ```
   Exemplo: `2026-04-19-adicao-secao-contato.md`

2. Use o [template abaixo](#template-de-arquivo-de-alteração) como base para o conteúdo.

3. Adicione uma linha no topo do [CHANGELOG.md](./CHANGELOG.md) apontando para o novo arquivo.

### O que conta como "alteração relevante"?

- Novas features, seções ou páginas.
- Mudanças de estrutura de arquivos ou de stack.
- Correções de bugs não-triviais.
- Ajustes importantes de design, conteúdo ou copy.
- Integrações novas (analytics, APIs, etc.).
- Decisões de arquitetura.

**Não precisa documentar:** ajustes triviais (typos, formatação), experimentos revertidos, commits de WIP.

---

## Template de arquivo de alteração

```markdown
---
data: YYYY-MM-DD
titulo: Título curto da alteração
tipo: feature | fix | refactor | docs | chore | design | content
---

# Título da alteração

## Contexto / Motivação
Por que essa alteração foi feita? Qual problema ela resolve ou que oportunidade ela aproveita?

## O que foi feito
Descrição objetiva do que mudou no código/projeto.

## Arquivos afetados
- [caminho/do/arquivo.ext](../../caminho/do/arquivo.ext) — o que mudou nele
- ...

## Decisões tomadas
Escolhas de design/arquitetura que valem a pena registrar (e o porquê).

## Impacto / Consequências
O que essa alteração destrava, quebra ou exige como próximo passo.

## Referências (opcional)
Links, issues, conversas ou materiais consultados.
```

---

## Estrutura da pasta

```
docs/
├── README.md          ← este arquivo (guia e índice)
├── CHANGELOG.md       ← linha do tempo resumida
└── changes/           ← um arquivo .md por alteração
    └── YYYY-MM-DD-*.md
```
