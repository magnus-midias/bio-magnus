# Favicon (Magnus)

Set completo, pronto pra ir no `public/` do projeto. O SVG e o real do cofre; o raster foi gerado a partir do `favicon.svg` (quadrado arredondado navy com o monograma "M" off-white).

## Arquivos nesta pasta
- `favicon.svg` : principal (vetor).
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon-192x192.png`, `favicon-512x512.png`
- `apple-touch-icon.png` (180x180, fundo navy solido)
- `favicon.ico` (multi-size 16/32/48)
- `site.webmanifest` (theme navy `#00002B`, background off-white `#F4F4F9`)

## Como usar (no `<head>`)
```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```
