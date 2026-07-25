# bio-magnus

Link na bio da Magnus Midias: pagina unica que concentra os pontos de contato da marca, usada no link do Instagram e das demais redes. Publicada em https://bio.magnusmidias.com

## Rodar localmente

```
npm install
npm run dev      # npx serve . --listen 3000
```

Nao ha build step: e HTML, CSS e JavaScript estaticos.

## Documentacao

Toda a documentacao esta em `docs/`. Comece por `docs/constitution.md`, depois `docs/prd-e-arquitetura/instrucoes.md`, depois `docs/historico/` em ordem crescente.

## Deploy

Vercel, com deploy automatico a cada push na `main`. Configuracao de headers, CSP e cache em `vercel.json`. Dominio e projeto na conta da Magnus.
