/**
 * SIXTEEN MART — Products Grid, Filter Chips & Card Rendering Engine
 * Handles catalog display, legacy redirects, search filtering, and responsive card templates.
 */
(function() {
  'use strict';

  // Handle legacy redirects on products.html
  function handleLegacyRedirects() {
    var params = new URLSearchParams(window.location.search);
    var oldCat = params.get('category');
    if (oldCat === 'home') {
      window.location.replace('home-gadgets.html');
      return true;
    }
    if (oldCat === 'beauty') {
      window.location.replace('skin-care-tools.html');
      return true;
    }
    return false;
  }

  function renderProductCard(prod, location) {
    var effectivePrice = window.getEffectivePrice ? window.getEffectivePrice(prod) : prod.price;
    var hasDiscount = effectivePrice < prod.price;
    var formattedCurrent = window.formatPrice ? window.formatPrice(effectivePrice) : 'Rs. ' + effectivePrice.toLocaleString();

    var badgeHtml = prod.badge ? '<span class="product-card-badge">' + prod.badge + '</span>' : '';
    var discountTagHtml = hasDiscount ? '<span class="card-discount-tag">-30%</span>' : '';

    return '<article class="product-card" id="card-' + prod.id + '" ' +
      'data-product-id="' + prod.id + '" data-product-name="' + prod.name + '" data-category="' + prod.categoryId + '" ' +
      'data-price="' + effectivePrice + '" data-location="' + location + '">' +
      '<div class="card-media-wrap">' +
        '<a href="javascript:void(0)" class="card-img-link" data-action="quickview" data-product-id="' + prod.id + '" ' +
          'data-track="select_item" data-location="' + location + '" aria-label="' + prod.name + ' - Quick View">' +
          '<img src="' + prod.image + '" alt="' + prod.name + '" class="card-img" width="320" height="320" loading="lazy" />' +
        '</a>' +
        badgeHtml +
        discountTagHtml +
      '</div>' +

      '<div class="card-content">' +
        '<h3 class="card-title">' +
          '<a href="javascript:void(0)" class="card-title-link" data-action="quickview" data-product-id="' + prod.id + '" ' +
            'data-track="select_item" data-location="' + location + '">' + prod.name + '</a>' +
        '</h3>' +
        '<p class="card-desc desktop-only-text">' + prod.shortDescription + '</p>' +

        '<div class="card-price-row">' +
          '<div class="card-prices">' +
            '<span class="card-price-current">' + formattedCurrent + '</span>' +
            (hasDiscount ? '<span class="card-price-original">Rs. ' + prod.price.toLocaleString() + '</span>' : '') +
          '</div>' +

          // Mobile-only round orange "+" button
          '<button type="button" class="btn-card-add-mobile mobile-only-btn" id="btn-addtocart-' + prod.id + '" ' +
            'data-action="add-to-cart" data-product-id="' + prod.id + '" data-price="' + effectivePrice + '" ' +
            'data-track="add_to_cart" data-location="mobile-card" aria-label="Add ' + prod.name + ' to cart">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</button>' +
        '</div>' +

        // Desktop / tablet action buttons
        '<div class="card-actions desktop-only-actions">' +
          '<button type="button" class="btn btn-secondary btn-card-quickview" id="btn-quickview-' + prod.id + '" ' +
            'data-action="quickview" data-product-id="' + prod.id + '" data-track="select_item" data-location="' + location + '">' +
            'Quick View' +
          '</button>' +
          '<button type="button" class="btn btn-primary btn-card-cart" id="btn-addtocart-' + prod.id + '" ' +
            'data-action="add-to-cart" data-product-id="' + prod.id + '" data-price="' + effectivePrice + '" ' +
            'data-track="add_to_cart" data-location="' + location + '">' +
            'Add to Cart' +
          '</button>' +
          '<button type="button" class="btn-card-wa-icon" id="btn-whatsapp-' + prod.id + '" ' +
            'data-action="whatsapp-direct" data-product-id="' + prod.id + '" data-price="' + effectivePrice + '" ' +
            'data-track="whatsapp_order" data-location="' + location + '" aria-label="Order via WhatsApp">' +
            '<svg class="icon-wa" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderComingSoonCard() {
    return '<article class="product-card card-coming-soon">' +
      '<div class="card-media-wrap coming-soon-media">' +
        '<div class="coming-soon-icon">' +
          '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' +
        '</div>' +
      '</div>' +
      '<div class="card-content coming-soon-content">' +
        '<h3 class="card-title">More Items Coming Soon</h3>' +
        '<p class="card-desc">We are curating more functional, high-value tools for this collection. Stay tuned!</p>' +
        '<a href="products.html" class="btn btn-secondary btn-coming-soon">Explore All Products &rarr;</a>' +
      '</div>' +
    '</article>';
  }

  function renderGrid(containerId, products, location, listName, showComingSoon) {
    var container = document.getElementById(containerId);
    if (!container) return;

    if (!products || products.length === 0) {
      container.innerHTML = '<div class="no-products-found">' +
        '<div class="no-results-icon"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>' +
        '<h3>No matching products found</h3>' +
        '<p>Try checking your spelling or explore our complete catalog.</p>' +
        '<a href="products.html" class="btn btn-primary">View All Products</a>' +
      '</div>';
      return;
    }

    var html = products.map(function(p) {
      return renderProductCard(p, location);
    }).join('');

    if (showComingSoon) {
      html += renderComingSoonCard();
    }

    container.innerHTML = html;

    // Track view_item_list
    if (window.trackViewItemList) {
      window.trackViewItemList(listName || 'Catalog', products);
    }
  }

  // Filter products by search query
  function filterByQuery(query) {
    var q = (query || '').toLowerCase().trim();
    var allProducts = window.PRODUCTS || [];
    var filtered = allProducts.filter(function(p) {
      return p.name.toLowerCase().indexOf(q) > -1 ||
        p.description.toLowerCase().indexOf(q) > -1 ||
        p.categoryId.toLowerCase().indexOf(q) > -1;
    });

    var countEl = document.getElementById('catalog-products-count');
    if (countEl) {
      countEl.textContent = 'Showing ' + filtered.length + ' of ' + allProducts.length + ' products';
    }

    renderGrid('products-grid', filtered, 'all-products', 'Search Results: ' + query, false);
  }

  // Event delegation for card actions
  document.addEventListener('DOMContentLoaded', function() {
    if (handleLegacyRedirects()) return;

    // Check for search param on load
    var params = new URLSearchParams(window.location.search);
    var searchQuery = params.get('search') || params.get('q');
    if (searchQuery && window.location.pathname.indexOf('products.html') > -1) {
      var searchInput = document.getElementById('nav-search');
      if (searchInput) searchInput.value = searchQuery;
      filterByQuery(searchQuery);
    }

    document.addEventListener('click', function(e) {
      // Add to cart click
      var addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        e.preventDefault();
        var pId = addBtn.getAttribute('data-product-id');
        var loc = addBtn.getAttribute('data-location') || 'product-card';
        if (pId && window.CartService) {
          window.CartService.addToCart(pId, 1, loc);
        }
        return;
      }

      // WhatsApp direct click from card
      var waBtn = e.target.closest('[data-action="whatsapp-direct"]');
      if (waBtn) {
        e.preventDefault();
        var pId = waBtn.getAttribute('data-product-id');
        var prod = window.getProductById ? window.getProductById(pId) : null;
        if (prod) {
          var effectivePrice = window.getEffectivePrice ? window.getEffectivePrice(prod) : prod.price;
          var msg = "Hi SIXTEEN MART, I'd like to order:\n\n1. " + prod.name + " x1 — Rs. " + effectivePrice.toLocaleString() + "\n\nTotal: Rs. " + effectivePrice.toLocaleString() + "\n\nName:\nDelivery address:\nPhone:";
          var waPhone = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) || '94768056036';
          var url = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg);
          if (window.trackWhatsAppOrderClick) {
            window.trackWhatsAppOrderClick(prod.id, 'product-card', effectivePrice);
          }
          window.open(url, '_blank', 'noopener');
        }
        return;
      }
    });
  });

  window.ProductsService = {
    renderProductCard: renderProductCard,
    renderGrid: renderGrid,
    filterByQuery: filterByQuery
  };
})();
