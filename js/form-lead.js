/* ARQUIVO GERADO. Fonte: _compartilhado/form-lead/form.js
   Nao edite aqui: edite a fonte e rode sincronizar.py */
/**
 * ============================================================
 * form-lead.js — formulário de lead da Magnus
 * ------------------------------------------------------------
 * FONTE: _compartilhado/form-lead/form.js
 * ⛔ Não editar a cópia dentro de um projeto: editar a fonte e
 *    rodar `sincronizar.py`. O `conferir.py` aborta se divergir.
 *
 * Autocontido de propósito: não depende do i18n nem de nenhuma
 * variável CSS do site que o hospeda. Cada site chama
 *
 *     MagnusLead.init({ origem: 'magnus-cases' });
 *
 * e o resto funciona igual nos três.
 * ============================================================
 */
window.MagnusLead = (function () {
  'use strict';

  var WHATSAPP = '5555999062078';
  /* COM barra final de propósito. O cases-magnus tem
     `trailingSlash: true` no vercel.json (as 14 páginas de case
     dependem disso), e lá `/api/lead` responde 308 para
     `/api/lead/`. O fetch segue o 308 preservando método e corpo,
     mas ele sai com `keepalive` no mesmo turno em que a aba vai
     para o WhatsApp: uma ida e volta a mais é tempo que o lead
     pode não ter. Com a barra, os três respondem direto.
     Medido em 14/10/2026: `/api/lead/` → 400 nos três (resposta
     certa para corpo inválido), sem nenhum redirect. */
  var ENDPOINT = '/api/lead/';
  var TRACK_KEY = 'magnus-track';

  var cfg = {};
  var modal = null;
  var ultimoFoco = null;
  var enviando = false;

  /* ─── RASTREAMENTO ──────────────────────────────────────────
   * Guardar na sessão importa: sem isso, quem entra pelo anúncio,
   * navega e volta chega ao formulário sem UTM, e o lead vira
   * "direto". O `src` entra junto porque um site manda para o
   * outro e a gente precisa saber de onde veio.
   */
  function rastreio() {
    var chaves = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
                  'utm_content', 'fbclid', 'gclid', 'src'];
    var p = new URLSearchParams(window.location.search);
    var daUrl = {};
    chaves.forEach(function (k) {
      var v = p.get(k);
      if (v) daUrl[k] = v.slice(0, 200);
    });
    var guardado = {};
    try {
      var cru = sessionStorage.getItem(TRACK_KEY);
      if (cru) guardado = JSON.parse(cru) || {};
    } catch (e) {}
    var out = guardado;
    Object.keys(daUrl).forEach(function (k) { out[k] = daUrl[k]; });
    if (Object.keys(daUrl).length) {
      try { sessionStorage.setItem(TRACK_KEY, JSON.stringify(out)); } catch (e) {}
    }
    return out;
  }
  var TRACKING = null;

  function idioma() {
    if (typeof getCurrentLang === 'function') return getCurrentLang() === 'en' ? 'en' : 'pt';
    if (window.__i18n && window.__i18n.currentLocale === 'en') return 'en';
    return 'pt';
  }

  /* texto do dicionário do site, com o padrão embutido como rede */
  function txt(chave, padrao) {
    var d = window.__i18n && window.__i18n[idioma()];
    return (d && d[chave]) || padrao;
  }

  /* ─── ABRIR E FECHAR ─────────────────────────────────────── */

  /* O modal tem ROTA (#projeto), e não é enfeite. A NN/g mediu que
     o erro mais comum com overlay no celular é a pessoa usar o
     gesto de VOLTAR, que sem rota sai da página inteira e leva o
     formulário preenchido junto. Com rota, voltar só fecha o modal
     e o que foi digitado continua lá. De quebra, a URL vira o
     evento "formulário aberto", que dá para medir sem JS extra. */
  var HASH = '#projeto';
  var marcou = false;

  function abrir(semHistorico) {
    if (!modal || !modal.hidden) return;
    ultimoFoco = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    if (!semHistorico && window.location.hash !== HASH) {
      try { history.pushState({ leadModal: true }, '', HASH); marcou = true; } catch (e) {}
    }
    evento('form:abriu');
    var campo = modal.querySelector('#lead-nome');
    if (campo) campo.focus();
  }

  function fechar(semHistorico) {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    /* fechar NÃO apaga o que foi digitado: só o envio reseta */
    if (!semHistorico && marcou) {
      marcou = false;
      try { history.back(); } catch (e) {}
    }
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
  }

  /* ─── MEDIÇÃO ───────────────────────────────────────────────
   * Separar "abriu" de "começou a preencher" é o que diz onde a
   * perda acontece: modal que não abre é problema do BOTÃO, modal
   * que abre e ninguém preenche é problema do FORMULÁRIO. Sem as
   * duas etapas, qualquer mudança é avaliada no número errado.
   */
  var jaContou = {};
  function evento(nome, extra) {
    if (jaContou[nome]) return;
    jaContou[nome] = true;
    if (window.fbq && window.__PIXEL_ID) {
      try {
        fbq('trackCustom', nome.replace(/[:]/g, '_'),
            Object.assign({ origem: cfg.origem }, extra || {}));
      } catch (e) {}
    }
  }

  /* o foco não escapa do diálogo enquanto ele está aberto */
  function prenderFoco(e) {
    if (e.key !== 'Tab' || !modal || modal.hidden) return;
    var lista = Array.prototype.filter.call(
      modal.querySelectorAll('button:not([tabindex="-1"]), input, textarea, [href]'),
      function (el) { return !el.disabled && el.offsetParent !== null; });
    if (!lista.length) return;
    var pri = lista[0], ult = lista[lista.length - 1];
    if (e.shiftKey && document.activeElement === pri) { e.preventDefault(); ult.focus(); }
    else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
  }

  /* ─── CHIPS ──────────────────────────────────────────────── */

  function ligarChips() {
    var chips = modal.querySelectorAll('.lead-chip');
    var oculto = modal.querySelector('#lead-interesse');

    /* grava SEMPRE o rótulo em português, mesmo com a tela em
       inglês: o banco e o relatório falam uma língua só. A
       mensagem do WhatsApp usa o texto visível, que é outra coisa. */
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

  /* ─── MÁSCARA DE TELEFONE ────────────────────────────────── */

  function mascarar(campo) {
    if (!campo) return;
    campo.addEventListener('input', function () {
      var bruto = campo.value;
      /* número internacional passa intacto */
      if (bruto.trim().charAt(0) === '+') return;
      /* só reformata com o cursor NO FIM: remontar a string com o
         cursor no meio joga ele para o fim a cada tecla */
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

  /* ─── VALIDAÇÃO ──────────────────────────────────────────── */

  function validar(form) {
    var caixa = modal.querySelector('#lead-erro');
    var problemas = [], primeiro = null;

    [['nome', 'form.erro.nome', 'Preencha seu nome.'],
     ['telefone', 'form.erro.whatsapp', 'Informe um WhatsApp com DDD.'],
     ['email', 'form.erro.email', 'Informe um e-mail válido.']
    ].forEach(function (par) {
      var el = form.elements[par[0]];
      var v = el.value.trim();
      var ok = v.length > 0;
      if (par[0] === 'email')    ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (par[0] === 'telefone') ok = v.replace(/\D/g, '').length >= 10;
      el.classList.toggle('lead-input--error', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      if (!ok) { problemas.push(txt(par[1], par[2])); if (!primeiro) primeiro = el; }
    });

    if (problemas.length) {
      caixa.textContent = problemas.join(' ');
      caixa.hidden = false;
      if (primeiro) primeiro.focus();
      return false;
    }
    caixa.hidden = true;
    caixa.textContent = '';
    return true;
  }

  /* ─── MENSAGEM DO WHATSAPP ───────────────────────────────── */

  function juntar(str, locale) {
    var partes = str.split(', ').filter(Boolean);
    if (partes.length <= 1) return str;
    var ultima = partes.pop();
    return partes.join(', ') + (locale === 'en' ? ' and ' : ' e ') + ultima;
  }

  function urlWhatsApp(d) {
    var locale = idioma();
    var mostra = d.interesseVisivel || d.interesse;
    var t;
    if (locale === 'en') {
      t = 'Hi, Magnus! I am ' + d.nome + (d.empresa ? ', from ' + d.empresa : '') + '. ';
      t += mostra ? 'I am looking for ' + juntar(mostra, locale) + '.'
                  : 'I would like to talk about my funnel.';
    } else {
      t = 'Olá, Magnus! Sou ' + d.nome + (d.empresa ? ', da ' + d.empresa : '') + '. ';
      t += mostra ? 'Procuro ' + juntar(mostra, locale) + '.'
                  : 'Gostaria de conversar sobre o meu funil.';
    }
    if (d.mensagem) t += ' ' + d.mensagem;
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(t);
  }

  /* ─── ENVIO ──────────────────────────────────────────────── */

  function gravar(payload) {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true, /* conclui mesmo com a aba saindo */
      }).catch(function () {});
    } catch (e) {}
  }

  function carregando(ligado) {
    var btn = modal.querySelector('#lead-submit');
    if (!btn) return;
    btn.disabled = ligado;
    var t = btn.querySelector('.lead-submit__txt');
    var l = btn.querySelector('.lead-submit__load');
    if (t) t.hidden = ligado;
    if (l) l.hidden = !ligado;
  }

  function enviar(e) {
    e.preventDefault();
    if (enviando) return;          /* dois cliques gravavam dois leads */
    var form = e.target;
    if (!validar(form)) return;

    enviando = true;
    carregando(true);

    var d = {
      origem:    cfg.origem,
      nome:      form.elements.nome.value.trim(),
      empresa:   form.elements.empresa.value.trim(),
      email:     form.elements.email.value.trim(),
      telefone:  form.elements.telefone.value.trim(),
      interesse: form.elements.interesse.value.trim(),
      interesseVisivel: form.elements.interesse.getAttribute('data-visivel') || '',
      mensagem:  form.elements.mensagem.value.trim(),
      locale:    idioma(),
      pagina:    window.location.href,
      utm:       TRACKING,
    };

    gravar(d);
    evento('form:enviou');

    if (window.fbq && window.__PIXEL_ID) {
      try { fbq('track', 'Lead', { content_category: cfg.origem }); } catch (err) {}
    }

    /* o WhatsApp abre no MESMO turno do clique: esperar o fetch
       perde o gesto do usuário e o navegador bloqueia o popup */
    var url = urlWhatsApp(d);
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
      var oc = modal.querySelector('#lead-interesse');
      oc.value = '';
      oc.removeAttribute('data-visivel');
    }, 600);
  }

  /* ─── INIT ───────────────────────────────────────────────── */

  function init(opcoes) {
    cfg = opcoes || {};
    if (!cfg.origem) {
      /* sem origem o lead entra no banco sem saber de onde veio,
         que é pior que não entrar: vira dado que mente */
      console.warn('MagnusLead: falta a origem.');
      return;
    }
    modal = document.getElementById('lead-modal');
    if (!modal) return;

    TRACKING = rastreio();

    document.querySelectorAll('[data-open-form]').forEach(function (b) {
      b.addEventListener('click', function (ev) { ev.preventDefault(); abrir(); });
    });
    modal.querySelectorAll('[data-close-form]').forEach(function (el) {
      el.addEventListener('click', fechar);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !modal.hidden) fechar();
      prenderFoco(ev);
    });

    /* o voltar do navegador (e o gesto do celular) fecha o modal */
    window.addEventListener('popstate', function () {
      marcou = false;
      if (!modal.hidden) fechar(true);
      else if (window.location.hash === HASH) abrir(true);
    });

    ligarChips();
    mascarar(modal.querySelector('#lead-telefone'));
    var form = modal.querySelector('#lead-form');
    if (form) form.addEventListener('submit', enviar);

    /* a rota direta e a prévia abrem o modal já aberto */
    if (window.location.hash === HASH) abrir(true);
    else if (new URLSearchParams(window.location.search).get('form') === '1') abrir();
  }

  return { init: init, abrir: abrir, fechar: fechar };
}());
