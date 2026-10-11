/**
 * SIXTEEN MART — Google Tag Manager & GA4 Event Tracking Engine
 * Container: GTM-NBMDWPS4
 * Follows GA4 Enhanced Ecommerce specification with { ecommerce: null } reset.
 */
(function() {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  function pushEcommerce(eventName, ecommerceData, extraParams) {
    window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object per GA4 spec
    var payload = Object.assign({
      event: eventName,
      ecommerce: ecommerceData
    }, extraParams || {});
    window.dataLayer.push(payload);
  }

  function pushCustomEvent(eventName, params) {
    var payload = Object.assign({ event: eventName }, params || {});
    window.dataLayer.push(payload);
  }

  // Helper to format product item for GA4
  function formatGa4Item(product, quantity) {
    if (!product) return null;
    var effectivePrice = window.getEffectivePrice ? window.getEffectivePrice(product) : product.price;
    return {
      item_id: product.id,
      item_name: product.name,
      item_category: product.categoryId,
      price: effectivePrice,
      quantity: quantity || 1
    };
  }

  // Tracking API functions
  window.trackViewItemList = function(listName, products) {
    var items = (products || []).map(function(p, idx) {
      var item = formatGa4Item(p, 1);
      if (item) item.index = idx + 1;
      return item;
    }).filter(Boolean);

    pushEcommerce('view_item_list', {
      item_list_name: listName,
      items: items
    });
  };

  window.trackSelectItem = function(product, listName) {
    var item = formatGa4Item(product, 1);
    pushEcommerce('select_item', {
      item_list_name: listName || 'Catalog',
      items: item ? [item] : []
    });
  };

  window.trackViewItem = function(product) {
    var item = formatGa4Item(product, 1);
    pushEcommerce('view_item', {
      currency: 'LKR',
      value: item ? item.price : 0,
      items: item ? [item] : []
    });
  };

  window.trackAddToCart = function(product, quantity, location) {
    var qty = quantity || 1;
    var item = formatGa4Item(product, qty);
    var val = item ? (item.price * qty) : 0;
    pushEcommerce('add_to_cart', {
      currency: 'LKR',
      value: val,
      items: item ? [item] : []
    }, {
      location: location || 'unknown'
    });
  };

  window.trackRemoveFromCart = function(product, quantity) {
    var item = formatGa4Item(product, quantity || 1);
    pushEcommerce('remove_from_cart', {
      currency: 'LKR',
      items: item ? [item] : []
    });
  };

  window.trackViewCart = function(cartItems, totalValue) {
    var items = (cartItems || []).map(function(ci) {
      return {
        item_id: ci.id,
        item_name: ci.name,
        item_category: ci.categoryId,
        price: ci.effectivePrice,
        quantity: ci.qty
      };
    });
    pushEcommerce('view_cart', {
      currency: 'LKR',
      value: totalValue || 0,
      items: items
    });
  };

  window.trackBeginCheckout = function(cartItems, totalValue) {
    var items = (cartItems || []).map(function(ci) {
      return {
        item_id: ci.id,
        item_name: ci.name,
        item_category: ci.categoryId,
        price: ci.effectivePrice,
        quantity: ci.qty
      };
    });
    pushEcommerce('begin_checkout', {
      currency: 'LKR',
      value: totalValue || 0,
      items: items
    });
  };

  window.trackWhatsAppOrderClick = function(productId, location, value) {
    pushCustomEvent('whatsapp_order_click', {
      product_id: productId || null,
      location: location || 'unknown',
      value: value || 0
    });
  };

  window.trackViewPromotion = function(promoId, name, slot) {
    pushEcommerce('view_promotion', {
      items: [{
        promotion_id: promoId,
        promotion_name: name,
        creative_name: name,
        creative_slot: slot
      }]
    });
  };

  window.trackSelectPromotion = function(promoId, name, slot) {
    pushEcommerce('select_promotion', {
      items: [{
        promotion_id: promoId,
        promotion_name: name,
        creative_name: name,
        creative_slot: slot
      }]
    });
  };

  window.trackNavClick = function(linkId, linkText) {
    pushCustomEvent('nav_click', {
      link_id: linkId,
      link_text: linkText
    });
  };

  window.trackCategoryClick = function(categoryId) {
    pushCustomEvent('category_click', {
      category_id: categoryId
    });
  };

  window.trackSearch = function(searchTerm) {
    pushCustomEvent('search', {
      search_term: searchTerm
    });
  };

  window.trackThemeToggle = function(newTheme) {
    pushCustomEvent('theme_toggle', {
      theme: newTheme
    });
  };

  window.trackSocialClick = function(network) {
    pushCustomEvent('social_click', {
      network: network
    });
  };

  // Delegated click listener for data-track attributes
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
      var trackEl = e.target.closest('[data-track]');
      if (!trackEl) return;

      var trackAction = trackEl.getAttribute('data-track');
      var pId = trackEl.getAttribute('data-product-id');
      var loc = trackEl.getAttribute('data-location') || 'page';

      if (trackAction === 'nav_click') {
        var linkId = trackEl.id || trackEl.getAttribute('data-link-id') || 'nav-item';
        var linkText = (trackEl.textContent || '').trim();
        window.trackNavClick(linkId, linkText);
      } else if (trackAction === 'category_click') {
        var catId = trackEl.getAttribute('data-category') || trackEl.getAttribute('data-category-id');
        if (catId) window.trackCategoryClick(catId);
      } else if (trackAction === 'social_click') {
        var network = trackEl.getAttribute('data-network') || 'social';
        window.trackSocialClick(network);
      } else if (trackAction === 'whatsapp_order') {
        var val = parseFloat(trackEl.getAttribute('data-price')) || 0;
        window.trackWhatsAppOrderClick(pId, loc, val);
      } else if (trackAction === 'select_promotion') {
        var promoId = trackEl.getAttribute('data-promo-id');
        var promoName = trackEl.getAttribute('data-promo-name');
        var promoSlot = trackEl.getAttribute('data-promo-slot');
        if (promoId) window.trackSelectPromotion(promoId, promoName, promoSlot);
      }
    });
  });
})();
