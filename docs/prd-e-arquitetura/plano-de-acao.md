# bio-magnus: Plano de acao

Versao 1.0 | 2026-07-25

O projeto esta em producao e estavel. Este plano nao e de construcao: e a fila de pendencias abertas depois do alinhamento da area ao padrao do `agente-desenvolvedor-magnus`, em 2026-07-25.

## Concluido

- [x] Pagina em producao, PT e EN, em `https://bio.magnusmidias.com`
- [x] Migracao de Vite para site estatico servido direto
- [x] Headers de seguranca com CSP estrita
- [x] Estrutura de docs no padrao da area (constitution, PRD, MASTER, framework, specs)
- [x] Favicon set completo mais `site.webmanifest`
- [x] `robots.txt`, `sitemap.xml` e `llms.txt`

## Fase 1: medicao (bloqueada, depende de decisao)

- [ ] Criar o container GTM da Magnus (decisao do Cristian: ainda nao existe)
- [ ] Instalar o snippet do GTM, container unico, sem GA4 direto no codigo
- [ ] Ajustar a CSP para liberar as origens do GTM de forma explicita
- [ ] Marcar como evento o clique em cada card de link

**Bloqueio:** o container GTM ainda nao foi criado. Sem o ID, o snippet nao entra.

## Fase 2: monitoramento

- [ ] Uptime Robot apontando para a raiz
- [ ] Dependabot habilitado no repositorio
- [ ] Sentry: avaliar se compensa em pagina sem runtime relevante

## Fase 3: higiene

- [ ] Remover os SVG duplicados da raiz do projeto (`favicon.svg` legado, `logo-dark.svg`, `logo-light.svg`), mantendo `assets/images/` como pasta viva. Conferir antes que nada referencia os caminhos da raiz.
- [ ] Passar a usar branches `feat/` e `fix/` em vez de commitar direto na `main`
