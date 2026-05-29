document.addEventListener('DOMContentLoaded', function() {
  initI18n();

  document.querySelectorAll('.lang-toggle__btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
});
