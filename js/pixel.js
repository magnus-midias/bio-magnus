/**
 * ============================================================
 * pixel.js — Meta Pixel da estrutura da Magnus
 * ============================================================
 * Decisão do Cristian em 13/10/2026: toda a estrutura da Magnus
 * (site oficial, cases e link na bio) usa o pixel da MARCA
 * PESSOAL. Um pixel só, para a audiência não ficar partida em
 * três públicos pequenos demais para servir a qualquer coisa.
 *
 * Por que arquivo externo e não inline no <head>: o CSP destes
 * sites é `script-src 'self'`, sem 'unsafe-inline'. Um loader
 * inline exigiria afrouxar o CSP para o site inteiro, o que é
 * caro demais para um script de medição.
 * ============================================================
 */
(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
  t = b.createElement(e); t.async = !0; t.src = v;
  s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'));

window.__PIXEL_ID = '968526639003107'; /* pixel da marca pessoal */
fbq('init', window.__PIXEL_ID);
fbq('track', 'PageView');
