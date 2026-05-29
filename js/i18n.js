const I18N_KEY = 'magnus-lang';
const SUPPORTED = ['pt', 'en'];

let currentLang = 'pt';
let allTranslations = {};

function initI18n() {
  if (window.__i18n) {
    allTranslations = { ...window.__i18n };
  }
  const saved = localStorage.getItem(I18N_KEY);
  const lang = SUPPORTED.includes(saved) ? saved : 'pt';
  setLanguage(lang, false);
}

function setLanguage(lang, save) {
  if (save === undefined) save = true;
  if (!SUPPORTED.includes(lang)) return;

  currentLang = lang;
  if (save) localStorage.setItem(I18N_KEY, lang);

  var dict = allTranslations[lang] || {};

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var value = dict[key];
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
    var key = el.getAttribute('data-i18n-aria');
    var value = dict[key];
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  document.querySelectorAll('.lang-toggle__btn').forEach(function(btn) {
    var isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

function getCurrentLang() {
  return currentLang;
}
