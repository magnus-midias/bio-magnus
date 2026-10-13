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
});
