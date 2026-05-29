# 08 — Ajustes visuais: links navy, hover claro, footer e reorganização de botões

**Data:** 2026-05-29

## O que mudou

- **Cards de link** — fundo alterado para navy `#00002B` por padrão (antes era branco). Hover invertido: fundo branco + borda navy + texto navy. Mais presença da cor da marca.
- **Ícones sociais** — mesma lógica: fundo navy por padrão, hover branco com borda navy.
- **Espaçamento** — `margin-top` da tagline aumentado de 4px para 16px. `margin-top` do lang-toggle aumentado de 20px para 24px. Mais respiro entre logo, toggle e tagline.
- **Reorganização dos links** — removido "Diagnóstico Gratuito", adicionado "Enviar E-mail" (`mailto:contato@magnusmidias.com`). Nova ordem: Site Oficial → Falar no WhatsApp → Enviar E-mail.
- **Rótulos dos botões** — "WhatsApp" renomeado para "Falar no WhatsApp". Mais descritivo e alinhado com o tom da LP.
- **Footer tagline** — texto atualizado de "Negócios que crescem com inteligência." para "Marketing estratégico. Tecnologia aplicada. IA onde gera resultado." — alinhado com a copy da LP e do portfolio.
- **Traduções atualizadas** — `translations/pt.js` e `translations/en.js` refletem todas as mudanças acima. Chave `link.diagnostic` removida, `link.email` adicionada.
- **Metas e OG** atualizadas para refletir os novos links disponíveis.

## Por que

Consistência visual com a identidade navy da Magnus. Links claros sobre fundo escuro têm mais impacto e presença. Reorganização dos CTAs prioriza contato direto (WhatsApp, e-mail) em vez do diagnóstico, que tem URL própria e não precisa estar no link-in-bio.

## Arquivos alterados

- `src/style.css`
- `index.html`
- `translations/pt.js`
- `translations/en.js`
