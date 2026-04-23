# Centralizacao do texto dos botoes em relacao a pagina

- **Data:** 2026-04-23
- **Autor:** Claude
- **Escopo:** UI / CSS

## Contexto / Motivacao
Os botoes `.link` em `index.html` usavam um grid de 3 colunas (`44px 1fr 24px`) com `icon` a esquerda, `label` no meio e `ext` (icone de link externo) a direita. Como as colunas laterais tem larguras diferentes (44px vs 24px), o centro geometrico da coluna do meio nao coincide com o centro do card — o texto parecia levemente deslocado a direita em relacao a pagina. O Cristian pediu para centralizar o texto em relacao ao eixo central do card.

## O que mudou

### `src/style.css`

1. `.link .label` passou a ser posicionado absolutamente no centro do botao:
   - `position: absolute; left: 50%; transform: translateX(-50%);`
   - `text-align: center;`
   - `pointer-events: none;` (para nao capturar clique, deixando o `<a>` responder normalmente).
2. Como `position: absolute` remove o elemento do fluxo do grid, o `.ext` passou a ocupar a 2a coluna (`1fr`) e ficou sobreposto ao `.label` no centro do botao. Correcao: fixar explicitamente as colunas:
   - `.link .icon { grid-column: 1; }`
   - `.link .ext { grid-column: 3; }`

### `index.html`
Nenhuma alteracao.

## Impacto
- O texto dos tres botoes (`Diagnostico Gratuito`, `Site Oficial`, `WhatsApp`) agora esta centralizado em relacao ao eixo vertical do card.
- `.icon` continua ancorado a esquerda e `.ext` a direita, mantendo a leitura visual original.
- Sem alteracao de tokens, cores, animacoes ou estrutura de HTML — apenas ajuste de layout do componente `.link`.

## Notas
- Durante a iteracao o Cristian pediu experimentar um carrossel infinito no texto `Tecnologia · IA · Marketing` (`.tagline`), mas nao aprovou o resultado e foi revertido no mesmo ciclo. Estado final identico ao inicial para esse elemento.
