/**
 * ============================================================
 * main.js — bio-magnus
 * ============================================================
 * O que sobrou aqui é o que é DA BIO: o i18n e o toggle de
 * idioma. Todo o formulário (chips, máscara, validação, envio,
 * rastreamento) vive no componente compartilhado, em
 * js/form-lead.js, que os três sites da Magnus usam igual.
 *
 * Ordem no HTML: translations → i18n.js → form-lead.js → main.js
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', function () {
  initI18n();

  document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  /* a origem é fixa por site e também vive no api/lead.js, do
     lado do servidor: o cliente não decide de onde o lead veio */
  if (window.MagnusLead) MagnusLead.init({ origem: 'magnus-linkbio' });

  initLetras();
});

/* ── O título entra LETRA A LETRA, com desfoque ───────────────
   Reescrita do recurso do componente `hero-section`, que era React
   puro. Nada foi instalado.

   ⭐ Aqui e não no site: letra a letra pede FRASE CURTA. A da bio
   tem 41 caracteres; o título do site tem 45 e é uma sentença
   inteira, e nela isto viraria efeito de decodificador.

   🔴 E o original fazia isto com um requestAnimationFrame POR
   LETRA, chamando setState a cada quadro: numa palavra de 8 letras
   são 8 laços redesenhando o componente inteiro. Em CSS é um
   transition-delay por letra e ZERO JavaScript por quadro.

   ⚠️ O espaço vai FORA do span: dentro de uma caixa inline-block
   ele é removido na quebra de linha, e as palavras encostam. Foi
   o defeito medido nas 15 páginas em 15/10/2026. */
function initLetras() {
  var alvo = document.querySelector('[data-letras]');
  if (!alvo) return;
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function quebrar() {
    var txt = (alvo.textContent || '').trim();
    if (!txt) return;
    alvo.textContent = '';
    var i = 0;
    txt.split(' ').forEach(function (palavra, p) {
      if (p) alvo.appendChild(document.createTextNode(' '));
      /* a palavra inteira num invólucro, para a quebra de linha
         acontecer entre PALAVRAS e nunca no meio de uma */
      var w = document.createElement('span');
      w.className = 'palavra';
      palavra.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'letra';
        s.textContent = ch;
        s.style.transitionDelay = (i * 0.018) + 's';  /* 18ms por letra */
        w.appendChild(s);
        i++;
      });
      alvo.appendChild(w);
    });
    if (reduz) { alvo.classList.add('letras-prontas'); return; }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { alvo.classList.add('letras-prontas'); });
    });
  }

  quebrar();
  document.addEventListener('i18n:aplicado', function () {
    alvo.classList.remove('letras-prontas');
    quebrar();
  });
}
