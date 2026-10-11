/**
 * SIXTEEN MART — Shopping Cart & WhatsApp Checkout System
 * LocalStorage-based cart with real-time price rehydration and WhatsApp checkout formatting.
 */
(function() {
  'use strict';

  var CART_KEY = (window.SITE_CONFIG && window.SITE_CONFIG.cartStorageKey) || 'sixteenmart_cart_v1';

  function readRawCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  }

  function writeRawCart(items) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      notifyCartChange();
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }

  function getCart() {
    var raw = readRawCart();
    var hydrated = [];
    raw.forEach(function(item) {
      var prod = window.getProductById ? window.getProductById(item.id) : null;
      if (prod) {
        var effectivePrice = window.getEffectivePrice ? window.getEffectivePrice(prod) : prod.price;
        var max = prod.maxQty || (window.SITE_CONFIG && window.SITE_CONFIG.defaultMaxQty) || 5;
        var validQty = Math.max(1, Math.min(item.qty, max));
        hydrated.push({
          id: prod.id,
          name: prod.name,
          categoryId: prod.categoryId,
          originalPrice: prod.price,
          effectivePrice: effectivePrice,
          image: prod.image,
          badge: prod.badge,
          maxQty: max,
          qty: validQty,
          lineTotal: effectivePrice * validQty
        });
      }
    });
    return hydrated;
  }

  function getCartCount() {
    var raw = readRawCart();
    return raw.reduce(function(sum, item) {
      return sum + (item.qty || 0);
    }, 0);
  }

  function updateBadge() {
    var count = getCartCount();
    var badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(function(b) {
      b.textContent = count;
      if (count > 0) {
        b.style.display = 'inline-flex';
        b.classList.remove('badge-bump');
        void b.offsetWidth; // force reflow for animation restart
        b.classList.add('badge-bump');
      } else {
        b.style.display = 'none';
      }
    });
  }

  function showToast(message, actionText, actionUrl) {
    var container = document.getElementById('site-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'site-toast-container';
      container.className = 'site-toast-container';
      document.body.appendChild(container);
    }

    var toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.setAttribute('role', 'alert');

    var msgSpan = document.createElement('span');
    msgSpan.className = 'toast-msg';
    msgSpan.textContent = message;
    toast.appendChild(msgSpan);

    if (actionText && actionUrl) {
      var actionLink = document.createElement('a');
      actionLink.href = actionUrl;
      actionLink.className = 'toast-action';
      actionLink.textContent = actionText;
      toast.appendChild(actionLink);
    }

    container.appendChild(toast);

    setTimeout(function() {
      toast.classList.add('toast-show');
    }, 10);

    setTimeout(function() {
      toast.classList.remove('toast-show');
      setTimeout(function() {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  function addToCart(id, qty, location) {
    qty = parseInt(qty, 10) || 1;
    var prod = window.getProductById ? window.getProductById(id) : null;
    if (!prod) return;

    var max = prod.maxQty || (window.SITE_CONFIG && window.SITE_CONFIG.defaultMaxQty) || 5;
    var raw = readRawCart();
    var existingIndex = -1;
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].id === id) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex > -1) {
      var currentQty = raw[existingIndex].qty;
      if (currentQty >= max) {
        showToast('Limited stock: maximum ' + max + ' items reached for this product.');
        return;
      }
      var newQty = Math.min(currentQty + qty, max);
      raw[existingIndex].qty = newQty;
      writeRawCart(raw);
      showToast('Cart updated: ' + prod.name + ' (' + newQty + ')', 'View Cart', 'cart.html');
    } else {
      var addedQty = Math.min(qty, max);
      raw.push({ id: id, qty: addedQty });
      writeRawCart(raw);
      showToast('Added to cart: ' + prod.name, 'View Cart', 'cart.html');
    }

    // Fire analytics tracking
    if (window.trackAddToCart) {
      window.trackAddToCart(prod, qty, location || 'product-card');
    }
  }

  function updateQty(id, qty) {
    qty = parseInt(qty, 10);
    var raw = readRawCart();
    var prod = window.getProductById ? window.getProductById(id) : null;
    var max = prod ? (prod.maxQty || 5) : 5;

    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    for (var i = 0; i < raw.length; i++) {
      if (raw[i].id === id) {
        raw[i].qty = Math.min(qty, max);
        break;
      }
    }
    writeRawCart(raw);
  }

  function removeFromCart(id) {
    var raw = readRawCart();
    var removedItem = null;
    var updated = raw.filter(function(item) {
      if (item.id === id) {
        removedItem = item;
        return false;
      }
      return true;
    });

    writeRawCart(updated);

    if (removedItem && window.trackRemoveFromCart) {
      var prod = window.getProductById ? window.getProductById(id) : null;
      if (prod) {
        window.trackRemoveFromCart(prod, removedItem.qty);
      }
    }
  }

  function clearCart() {
    writeRawCart([]);
  }

  function formatWhatsAppOrderMessage(cartItems, totalAmount) {
    var lines = ["Hi SIXTEEN MART, I'd like to order:", ""];
    cartItems.forEach(function(item, idx) {
      lines.push((idx + 1) + '. ' + item.name + ' x' + item.qty + ' — Rs. ' + item.lineTotal.toLocaleString());
    });
    lines.push("");
    lines.push("Total: Rs. " + totalAmount.toLocaleString());
    lines.push("");
    lines.push("Name:");
    lines.push("Delivery address:");
    lines.push("Phone:");
    return lines.join("\n");
  }

  function notifyCartChange() {
    updateBadge();
    window.dispatchEvent(new CustomEvent('sixteenmart:cartchange', { detail: { count: getCartCount() } }));
  }

  // Cross-tab sync
  window.addEventListener('storage', function(e) {
    if (e.key === CART_KEY) {
      notifyCartChange();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    updateBadge();
  });

  window.CartService = {
    getCart: getCart,
    getCartCount: getCartCount,
    addToCart: addToCart,
    updateQty: updateQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    formatWhatsAppOrderMessage: formatWhatsAppOrderMessage,
    updateBadge: updateBadge,
    showToast: showToast
  };
})();
