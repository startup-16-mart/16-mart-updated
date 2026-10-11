/**
 * SIXTEEN MART — Theme Management (Light / Dark)
 * Defaults to Light theme. Persists selection in localStorage.
 */
(function() {
  'use strict';

  var THEME_KEY = (window.SITE_CONFIG && window.SITE_CONFIG.themeStorageKey) || 'sixteenmart_theme';

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update aria-label and icon state on theme toggles
    var toggles = document.querySelectorAll('#nav-theme-toggle, #nav-theme-toggle-mob');
    toggles.forEach(function(btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);

    // Track theme toggle event
    if (window.trackThemeToggle) {
      window.trackThemeToggle(next);
    }
  }

  // Initial setup on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    var saved = getSavedTheme();
    applyTheme(saved);

    document.addEventListener('click', function(e) {
      var toggleBtn = e.target.closest('#nav-theme-toggle, #nav-theme-toggle-mob');
      if (toggleBtn) {
        e.preventDefault();
        toggleTheme();
      }
    });
  });

  window.toggleTheme = toggleTheme;
  window.applyTheme = applyTheme;
})();
