/**
 * SIXTEEN MART — Live Search & Product Query Handler
 * Connects header and drawer search inputs to live product filtering or navigation.
 */
(function() {
  'use strict';

  function handleSearchSubmit(term) {
    if (!term) return;
    var trimmed = term.trim();

    if (window.trackSearch) {
      window.trackSearch(trimmed);
    }

    var isProductsPage = window.location.pathname.indexOf('products.html') > -1;
    if (isProductsPage && window.ProductsService && window.ProductsService.filterByQuery) {
      window.ProductsService.filterByQuery(trimmed);
    } else {
      window.location.href = 'products.html?search=' + encodeURIComponent(trimmed);
    }
  }

  window.handleSearchSubmit = handleSearchSubmit;
})();
