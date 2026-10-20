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
            '<svg class="icon-wa" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
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

    // Update count labels if present
    var catCountEl = document.getElementById('category-products-count');
    if (catCountEl && location === 'category-page' && products) {
      catCountEl.textContent = 'Showing ' + products.length + (products.length === 1 ? ' product' : ' products');
    }
    var catalogCountEl = document.getElementById('catalog-products-count');
    if (catalogCountEl && location === 'all-products' && products && window.PRODUCTS) {
      catalogCountEl.textContent = 'Showing ' + products.length + ' of ' + window.PRODUCTS.length + ' products';
    }

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
