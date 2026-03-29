/**
 * GrowZen Language Toggle
 * Stores secondary language preference in localStorage.
 */
(function () {
  'use strict';
  var STORAGE_KEY = 'gzen-lang';
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    document.querySelectorAll('#lang-toggle a').forEach(function (a) {
      if (a.dataset.lang === stored) {
        a.style.background = '#f8e8d4';
        a.style.color = '#9a5c2a';
      }
    });
  }
  document.querySelectorAll('#lang-toggle a').forEach(function (a) {
    a.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, a.dataset.lang);
    });
  });
})();
