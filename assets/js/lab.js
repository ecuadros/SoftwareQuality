// Componentes compartidos de las páginas de laboratorio: checklist con
// progreso persistente (localStorage) y autoevaluación de una pregunta.
// Sin dependencias externas, sin backend — cada página es independiente.
(function () {
  function initChecklists() {
    document.querySelectorAll('.checklist').forEach(function (box) {
      var storageKey = 'sq-checklist:' + location.pathname + ':' + (box.dataset.key || 'default');
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (e) { saved = {}; }

      var items = box.querySelectorAll('li[data-item]');
      var progress = box.querySelector('.checklist-progress');

      function updateProgress() {
        var checked = box.querySelectorAll('li.checked').length;
        if (progress) progress.textContent = checked + '/' + items.length + ' completado';
      }

      items.forEach(function (li) {
        var checkbox = li.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        var key = li.dataset.item;
        if (saved[key]) {
          checkbox.checked = true;
          li.classList.add('checked');
        }
        checkbox.addEventListener('change', function () {
          li.classList.toggle('checked', checkbox.checked);
          saved[key] = checkbox.checked;
          localStorage.setItem(storageKey, JSON.stringify(saved));
          updateProgress();
        });
      });

      updateProgress();
    });
  }

  function initSelfChecks() {
    document.querySelectorAll('.self-check').forEach(function (box) {
      var options = box.querySelectorAll('.sc-option');
      options.forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (box.classList.contains('revealed')) return;
          box.classList.add('revealed');
          options.forEach(function (o) {
            o.disabled = true;
            if (o.dataset.correct === 'true') {
              o.classList.add('correct');
            } else if (o === opt) {
              o.classList.add('incorrect');
            }
          });
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initChecklists();
    initSelfChecks();
  });
})();
