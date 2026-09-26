/**
 * SIXTEEN MART — Theme Management (Light / Dark Mode)
 * Default theme: Daylight (Light Mode).
 * Persists user's manual selection via localStorage.
 */
(function() {
    'use strict';

    var STORAGE_KEY = 'sixteen_mart_theme';

    /**
     * Get preferred theme:
     * Strictly defaults to 'light' (Daylight theme) unless user manually selected 'dark'.
     */
    function getPreferredTheme() {
        var storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme === 'dark') {
            return 'dark';
        }
        return 'light'; // Always default to daylight
    }

    /**
     * Apply theme to <html> element and update any toggle button icons
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        var toggleBtns = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
        toggleBtns.forEach(function(btn) {
            if (theme === 'dark') {
                btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                btn.setAttribute('aria-label', 'Switch to daylight mode');
                btn.setAttribute('title', 'Switch to daylight mode');
            } else {
                btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                btn.setAttribute('aria-label', 'Switch to dark mode');
                btn.setAttribute('title', 'Switch to dark mode');
            }
        });
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, newTheme);
        applyTheme(newTheme);
    }

    // Expose functions globally
    window.toggleTheme = toggleTheme;
    window.applyTheme = applyTheme;

    // Apply preferred theme immediately
    var initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Bind event listeners when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        applyTheme(document.documentElement.getAttribute('data-theme') || getPreferredTheme());

        var toggleBtns = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
        toggleBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        });
    });
})();
