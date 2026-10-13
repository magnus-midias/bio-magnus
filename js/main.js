/**
 * ============================================================
 * main.js — bio-magnus
 * ============================================================
 *  1. Inicializa o i18n (PT/EN).
 *  2. Captura UTM/fbclid da URL e PERSISTE na sessão, para não
 *     perder a origem se o visitante navegar e voltar.
 *  3. Controla o formulário de contato: abrir, fechar, chips,
 *     máscara de telefone, validação com mensagem.
 *  4. No envio: grava o lead (/api/lead → n8n) e abre o
 *     WhatsApp com a mensagem já escrita.
 *
 * O secret do webhook NÃO vive aqui: ele fica na função
 * serverless, do lado do servidor.
 *
 * Ordem no HTML: translations/pt → en → i18n.js → main.js
 * ============================================================
 */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5555999062078';
  var LEAD_ENDPOINT   = '/api/lead';
  var TRACK_KEY       = 'magnus-track';

  /* ─── RASTREAMENTO ──────────────────────────────────────────
   * Lê a URL de entrada e guarda na sessão. Guardar importa:
   * sem isso, quem entra pelo anúncio, abre os cases e volta
   * chega ao formulário sem UTM, e o lead vira "direto".
   */
  function captureTracking() {
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'src'];
    var p = new URLSearchParams(window.location.search);
    var daUrl = {};
    keys.forEach(function (k) {
      var v = p.get(k);
      if (v) daUrl[k] = v.slice(0, 200);
    });

    var guardado = {};
    try {
      var cru = sessionStorage.getItem(TRACK_KEY);
      if (cru) guardado = JSON.parse(cru) || {};
    } catch (e) {}

    /* a URL de agora ganha do que estava guardado: clique novo, origem nova */
    var out = guardado;
    Object.keys(daUrl).forEach(function (k) { out[k] = daUrl[k]; });

    if (Object.keys(daUrl).length) {
      try { sessionStorage.setItem(TRACK_KEY, JSON.stringify(out)); } catch (e) {}
    }
    return out;
  }
  var TRACKING = captureTracking();

  function getLocale() {
    return (typeof getCurrentLang === 'function' ? getCurrentLang() : 'pt') === 'en' ? 'en' : 'pt';
  }

  function txt(chave, padrao) {
    var dicio = window.__i18n && window.__i18n[getLocale()];
    return (dicio && dicio[chave]) || padrao;
  }

  /* ─── MODAL ─────────────────────────────────────────────────── */

  var modal = null;
  var ultimoFoco = null;
  var enviando = false;

  function abrir() {
    if (!modal) return;
    ultimoFoco = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    var campo = modal.querySelector('#lead-nome');
    if (campo) campo.focus();
  }

  function fechar() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
  }

  /* o foco não escapa do diálogo enquanto ele está aberto */
  function prenderFoco(e) {
    if (e.key !== 'Tab' || !modal || modal.hidden) return;
    var alcancaveis = modal.querySelectorAll('button, input, textarea, [href]');
    var lista = Array.prototype.filter.call(alcancaveis, function (el) {
      return !el.disabled && el.offsetParent !== null;
    });
    if (!lista.length) return;
    var primeiro = lista[0], ultimo = lista[lista.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }

  /* ─── CHIPS (seleção múltipla) ───────────────────────────────── */

  function ligarChips() {
    var chips = modal.querySelectorAll('.lead-chip');
    var oculto = modal.querySelector('#lead-interesse');
    /* o campo gravado é SEMPRE o rótulo em português, mesmo com a
       tela em inglês: o banco e o relatório falam uma língua só.
       A mensagem do WhatsApp usa o texto visível, que é outra coisa. */
    function sincronizar() {
      var pt = (window.__i18n && window.__i18n.pt) || {};
      var canonico = [], visivel = [];
      Array.prototype.forEach.call(chips, function (c) {
        if (!c.classList.contains('lead-chip--active')) return;
        var slug = c.getAttribute('data-value');
        canonico.push(pt['form.chip.' + slug] || c.textContent.trim());
        visivel.push(c.textContent.trim());
      });
      oculto.value = canonico.join(', ');
      oculto.setAttribute('data-visivel', visivel.join(', '));
    }
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        var ativo = chip.classList.toggle('lead-chip--active');
        chip.setAttribute('aria-pressed', String(ativo));
        sincronizar();
      });
    });
  }

  /* ─── MÁSCARA DE TELEFONE ────────────────────────────────────
   * Formata (00) 00000-0000 no padrão brasileiro. Duas guardas:
   * número que começa com "+" é internacional e passa intacto,
   * e a reformatação só acontece com o cursor NO FIM, porque
   * remontar a string com o cursor no meio joga ele para o fim
   * a cada tecla.
   */
  function mascararTelefone(campo) {
    campo.addEventListener('input', function () {
      var bruto = campo.value;
      if (bruto.trim().charAt(0) === '+') return;
      if (campo.selectionStart !== bruto.length) return;

      var d = bruto.replace(/\D/g, '').slice(0, 11);
      var fmt = d;
      if (d.length > 10)      fmt = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      else if (d.length > 6)  fmt = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
      else if (d.length > 2)  fmt = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      else if (d.length > 0)  fmt = '(' + d;

      if (fmt !== bruto) {
        campo.value = fmt;
        campo.setSelectionRange(fmt.length, fmt.length);
      }
    });
  }

  /* ─── VALIDAÇÃO ──────────────────────────────────────────────
   * Borda vermelha sozinha mostra ONDE, e não O QUE fazer:
   * por isso a mensagem é texto, num aria-live.
   */
  function validar(form) {
    var caixa = document.getElementById('lead-erro');
    var problemas = [];
    var primeiroRuim = null;

    [['nome', 'form.erro.nome', 'Preencha seu nome.'],
     ['telefone', 'form.erro.whatsapp', 'Informe um WhatsApp com DDD.'],
     ['email', 'form.erro.email', 'Informe um e-mail válido.']
    ].forEach(function (par) {
      var campo = form.elements[par[0]];
      var v = campo.value.trim();
      var ok = v.length > 0;
      if (par[0] === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (par[0] === 'telefone') ok = v.replace(/\D/g, '').length >= 10;

      campo.classList.toggle('lead-input--error', !ok);
      campo.setAttribute('aria-invalid', String(!ok));
      if (!ok) {
        problemas.push(txt(par[1], par[2]));
        if (!primeiroRuim) primeiroRuim = campo;
      }
    });

    if (problemas.length) {
      caixa.textContent = problemas.join(' ');
      caixa.hidden = false;
      if (primeiroRuim) primeiroRuim.focus();
      return false;
    }
    caixa.hidden = true;
    caixa.textContent = '';
    return true;
  }

  /* "A, B, C" vira "A, B e C" */
  function juntar(str, locale) {
    var partes = str.split(', ').filter(Boolean);
    if (partes.length <= 1) return str;
    var ultima = partes.pop();
    return partes.join(', ') + (locale === 'en' ? ' and ' : ' e ') + ultima;
  }

  function urlDoWhatsApp(d) {
    var locale = getLocale();
    var mostra = d.interesseVisivel || d.interesse;
    var t;
    if (locale === 'en') {
      t = 'Hi, Magnus! I am ' + d.nome + (d.empresa ? ', from ' + d.empresa : '') + '. ';
      t += mostra ? 'I am looking for ' + juntar(mostra, locale) + '.' : 'I would like to talk about my funnel.';
    } else {
      t = 'Olá, Magnus! Sou ' + d.nome + (d.empresa ? ', da ' + d.empresa : '') + '. ';
      t += mostra ? 'Procuro ' + juntar(mostra, locale) + '.' : 'Gostaria de conversar sobre o meu funil.';
    }
    if (d.mensagem) t += ' ' + d.mensagem;
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(t);
  }

  /* Grava sem bloquear: keepalive conclui mesmo com a aba saindo. */
  function gravarLead(payload) {
    try {
      fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () {});
    } catch (e) {}
  }

  function carregando(ligado) {
    var btn = document.getElementById('lead-submit');
    if (!btn) return;
    btn.disabled = ligado;
    var rotulo = btn.querySelector('.lead-submit__txt');
    var espera = btn.querySelector('.lead-submit__load');
    if (rotulo) rotulo.hidden = ligado;
    if (espera) espera.hidden = !ligado;
  }

  function enviar(e) {
    e.preventDefault();
    /* a trava existe porque dois cliques rápidos gravavam DOIS leads */
    if (enviando) return;
    var form = e.target;
    if (!validar(form)) return;

    enviando = true;
    carregando(true);

    var d = {
      nome:      form.elements.nome.value.trim(),
      empresa:   form.elements.empresa.value.trim(),
      email:     form.elements.email.value.trim(),
      telefone:  form.elements.telefone.value.trim(),
      interesse: form.elements.interesse.value.trim(),
      interesseVisivel: form.elements.interesse.getAttribute('data-visivel') || '',
      mensagem:  form.elements.mensagem.value.trim(),
      locale:    getLocale(),
      pagina:    window.location.href,
      utm:       TRACKING,
    };

    gravarLead(d);

    /* o WhatsApp abre no MESMO turno do clique, sem esperar o
       fetch: esperar perde o gesto do usuário e o navegador
       bloqueia o popup. */
    var url = urlDoWhatsApp(d);
    var aba = window.open(url, '_blank', 'noopener,noreferrer');
    if (!aba) window.location.href = url;

    window.setTimeout(function () {
      carregando(false);
      enviando = false;
      fechar();
      form.reset();
      Array.prototype.forEach.call(modal.querySelectorAll('.lead-chip'), function (c) {
        c.classList.remove('lead-chip--active');
        c.setAttribute('aria-pressed', 'false');
      });
      modal.querySelector('#lead-interesse').value = '';
    }, 600);
  }

  function ligarModal() {
    modal = document.getElementById('lead-modal');
    if (!modal) return;

    document.querySelectorAll('[data-open-form]').forEach(function (b) {
      b.addEventListener('click', abrir);
    });
    modal.querySelectorAll('[data-close-form]').forEach(function (el) {
      el.addEventListener('click', fechar);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) fechar();
      prenderFoco(e);
    });

    ligarChips();
    mascararTelefone(modal.querySelector('#lead-telefone'));
    var form = document.getElementById('lead-form');
    if (form) form.addEventListener('submit', enviar);

    /* prévia: ?form=1 abre o modal já aberto */
    if (new URLSearchParams(window.location.search).get('form') === '1') abrir();
  }

  function iniciar() {
    if (typeof initI18n === 'function') initI18n();

    document.querySelectorAll('.lang-toggle__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });

    ligarModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
}());
