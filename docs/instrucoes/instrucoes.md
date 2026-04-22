# Instrucoes de trabalho no projeto

Este documento define o fluxo obrigatorio de trabalho no projeto, a finalidade de cada pasta de `docs/`, a regra inegociavel de historico e as diretrizes de planos de acao por fases.

---

## 1. Finalidade de cada pasta de `docs/`

### `docs/arquitetura/`
Informacoes tecnicas do projeto: stack, divisoes do software, ferramentas utilizadas, banco de dados (quando houver), modelo de dados, roteamento, decisoes arquiteturais, lacunas conhecidas. Arquivo principal: `arquitetura.md`. Deve ser atualizado sempre que a arquitetura do projeto mudar.

### `docs/instrucoes/`
Regras de trabalho no projeto e planos de acao por fases. Contem pelo menos:
- `instrucoes.md` (este arquivo).
- Um ou mais `plano-de-acao-*.md` quando o projeto (ou iniciativa dentro dele) for dividido em fases.

### `docs/historico/`
Registro sequencial de toda alteracao relevante feita no projeto, cada uma em seu proprio arquivo `.md`. Formato obrigatorio do nome:

```
NN-descricao-curta-AAAA-MM-DD.md
```

Onde:
- `NN` = numero sequencial com 2 digitos, comecando em `00` e incrementando (`00`, `01`, ... `10`, `11`, ...). Use o proximo numero disponivel olhando os arquivos existentes na pasta.
- `descricao-curta` = resumo em kebab-case, sem acentos.
- `AAAA-MM-DD` = data da alteracao.

Exemplo: `00-criacao-estrutura-docs-2026-04-21.md`.

### `docs/design-system/`
Identidade visual e design system do projeto. Arquivo principal: `design-system.md`, cobrindo:
- Sobre a marca (posicionamento, tom de voz).
- Tipografia (fontes, hierarquia).
- Paleta de cores (tokens semanticos + cores de marca + gradientes).
- Border radius / espacamentos padrao.
- Componentes e padroes de UX/UI.
- Animacoes.
- Assets (logos, icones, favicon) — armazenados nas subpastas `logos/`, `icones/`, `favicon/`.

Regra: qualquer alteracao com impacto visual deve ler este arquivo antes e atualiza-lo depois, se introduzir ou alterar um token.

### `docs/prompt-inicial/`
Contem o arquivo `prompt-inicial.md` (prompt padrao de inicio de projeto do Cristian), apenas para referencia.

---

## 2. Convencao de nomenclatura (obrigatoria)

- Nenhum arquivo ou pasta pode ter acentos ou caracteres especiais (c-cedilha, til, crase, etc.). Use ASCII puro e kebab-case em nomes compostos.
- Textos dentro dos arquivos podem ser em pt-BR com acentos normalmente. A restricao e so para **nomes** de arquivos e pastas.

---

## 3. Regra inegociavel de historico

Toda e qualquer alteracao relevante no projeto deve ser registrada em `docs/historico/` como um arquivo `.md` novo, no formato `NN-descricao-curta-AAAA-MM-DD.md`.

"Relevante" inclui, mas nao se limita a:
- Criacao, remocao ou renomeacao de arquivos/pastas.
- Alteracao de dependencias.
- Mudanca de estrutura de rotas, componentes ou logica de negocio.
- Alteracao de conteudo (se for um projeto de conteudo).
- Mudanca de estilo/design global.
- Alteracoes de configuracao (build, lint, tipagem, etc.).
- Decisoes de arquitetura (mesmo sem codigo alterado).

### Antes de fazer uma alteracao relevante
1. Ler todo o historico em `docs/historico/` em ordem numerica crescente.
2. Ler a arquitetura em `docs/arquitetura/`.
3. Se a alteracao tem impacto visual: ler tambem `docs/design-system/design-system.md`.
4. So entao propor/aplicar a alteracao.

### Depois de fazer uma alteracao relevante
1. Criar um arquivo novo em `docs/historico/` seguindo o formato do nome.
2. Se a alteracao impactou arquitetura, atualizar `docs/arquitetura/`.
3. Se a alteracao mudou regras/fluxo de trabalho, atualizar este `instrucoes.md`.
4. Se a alteracao tocou em tokens visuais, componentes, animacoes ou assets de marca, atualizar `docs/design-system/`.

### Formato de cada arquivo de historico

```markdown
# <Titulo da alteracao>

- **Data:** AAAA-MM-DD
- **Autor:** <Cristian | Claude>
- **Escopo:** <arquitetura | conteudo | UI | config | infra | outro>

## Contexto / Motivacao
Por que essa alteracao foi feita.

## O que mudou
Lista objetiva dos arquivos/areas afetadas.

## Impacto
O que pode quebrar, o que precisa ser revisado, proximos passos.
```

---

## 4. Planos de acao por fases

Projetos (ou iniciativas grandes dentro de projetos) devem ser quebrados em **fases numeradas** e registrados como um arquivo proprio em `docs/instrucoes/` (por exemplo, `plano-de-acao-<nome>.md`).

Diretrizes do plano:
- Cada fase tem objetivo, checklist e criterio de conclusao claro.
- Uma fase so comeca quando a anterior esta 100% concluida (sem voltar).
- Quando convier, intercalar fases de testes de funcionalidade entre fases de construcao (ex.: Fase 1, 2, 3 -> Fase de testes -> Fase 4, 5). Nao deixar testes so para o fim.
- A ultima fase antes do deploy deve ser uma rodada de testes de seguranca + funcionalidade, cobrindo: sanitizacao/XSS, auditoria de dependencias, headers, segredos, links externos com `rel="noopener noreferrer"`, smoke test manual e re-execucao da suite automatica.
- Ao final de cada fase: marcar como concluida no plano e criar o registro correspondente em `docs/historico/`.
- Listar explicitamente o que esta **fora de escopo** (pos-MVP), para evitar looping em partes ja concluidas.
