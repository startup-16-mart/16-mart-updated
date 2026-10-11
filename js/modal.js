/**
 * SIXTEEN MART — Quick View Modal Dialog
 * Fully accessible product inspection modal with gallery, stock capping, reviews, and direct WhatsApp ordering.
 */
(function() {
  'use strict';

  var activeModal = null;
  var triggerElement = null;

  function renderStars(count) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= count) {
        stars += '<svg class="icon-star filled" viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
      } else {
        stars += '<svg class="icon-star empty" viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>';
      }
    }
    return '<span class="stars-row">' + stars + '</span>';
  }

  function openQuickView(productId, triggerBtn) {
    var prod = window.getProductById ? window.getProductById(productId) : null;
    if (!prod) return;

    triggerElement = triggerBtn || document.activeElement;

    // Track view_item
    if (window.trackViewItem) {
      window.trackViewItem(prod);
    }

    var effectivePrice = window.getEffectivePrice ? window.getEffectivePrice(prod) : prod.price;
    var hasDiscount = effectivePrice < prod.price;
    var maxQty = prod.maxQty || 5;
    var reviews = window.getProductReviews ? window.getProductReviews(prod.id) : [];

    // Ensure modal container exists
    var modalOverlay = document.getElementById('quickview-modal-overlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'quickview-modal-overlay';
      modalOverlay.className = 'quickview-overlay';
      modalOverlay.setAttribute('role', 'dialog');
      modalOverlay.setAttribute('aria-modal', 'true');
      modalOverlay.setAttribute('aria-label', 'Product Quick View');
      document.body.appendChild(modalOverlay);
    }

    // Build gallery thumbnails
    var galleryHtml = '';
    var galleryImages = prod.gallery && prod.gallery.length > 0 ? prod.gallery : [prod.image];
    if (galleryImages.length > 1) {
      galleryHtml = '<div class="modal-gallery-thumbs">';
      galleryImages.forEach(function(imgUrl, idx) {
        galleryHtml += '<button type="button" class="gallery-thumb-btn ' + (idx === 0 ? 'active' : '') + '" data-img="' + imgUrl + '" aria-label="View image ' + (idx + 1) + '">' +
          '<img src="' + imgUrl + '" alt="' + prod.name + ' thumbnail ' + (idx + 1) + '" width="60" height="60" />' +
          '</button>';
      });
      galleryHtml += '</div>';
    }

    // Build reviews HTML
    var reviewsHtml = '';
    if (reviews.length > 0) {
      reviewsHtml = '<div class="modal-reviews-section">' +
        '<h4 class="modal-reviews-heading">Customer Feedback</h4>' +
        '<div class="modal-reviews-list">';
      reviews.forEach(function(rev) {
        reviewsHtml += '<div class="review-item">' +
          '<div class="review-header">' +
            renderStars(rev.stars) +
            '<span class="review-author">' + rev.author + '</span>' +
            (rev.date ? '<span class="review-date">' + rev.date + '</span>' : '') +
          '</div>' +
          '<p class="review-text">' + rev.text + '</p>' +
        '</div>';
      });
      reviewsHtml += '</div></div>';
    }

    var html = '<div class="quickview-dialog" tabindex="-1">' +
      '<button type="button" class="quickview-close-btn" id="modal-close-btn" aria-label="Close dialog">&times;</button>' +
      '<div class="quickview-body">' +
        '<div class="quickview-media">' +
          '<div class="modal-main-img-wrap">' +
            '<img id="modal-main-image" src="' + galleryImages[0] + '" alt="' + prod.name + '" width="400" height="400" />' +
            (prod.badge ? '<span class="product-badge">' + prod.badge + '</span>' : '') +
          '</div>' +
          galleryHtml +
        '</div>' +
        '<div class="quickview-details">' +
          '<h2 class="modal-title">' + prod.name + '</h2>' +
          '<div class="modal-price-wrap">' +
            '<span class="modal-price-current">' + (window.formatPrice ? window.formatPrice(effectivePrice) : 'Rs. ' + effectivePrice.toLocaleString()) + '</span>' +
            (hasDiscount ? '<span class="modal-price-original">Rs. ' + prod.price.toLocaleString() + '</span><span class="modal-discount-tag">-30%</span>' : '') +
          '</div>' +
          '<p class="modal-description">' + prod.description + '</p>' +
          '<div class="modal-qty-control">' +
            '<label for="modal-qty-val" class="qty-label">Quantity:</label>' +
            '<div class="qty-stepper">' +
              '<button type="button" class="stepper-btn" id="modal-qty-minus" aria-label="Decrease quantity">−</button>' +
              '<input type="number" id="modal-qty-val" class="stepper-input" value="1" min="1" max="' + maxQty + '" readonly />' +
              '<button type="button" class="stepper-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<span id="modal-stock-cap-note" class="stock-cap-note" style="display:none;">Limited stock (max ' + maxQty + ')</span>' +
          '</div>' +
          '<div class="modal-actions">' +
            '<button type="button" class="btn btn-primary btn-modal-cart" id="modal-addtocart-' + prod.id + '" ' +
              'data-track="add_to_cart" data-product-id="' + prod.id + '" data-price="' + effectivePrice + '" data-location="quick-view">' +
              'Add to Cart' +
            '</button>' +
            '<button type="button" class="btn btn-secondary btn-modal-whatsapp" id="modal-whatsapp-' + prod.id + '" ' +
              'data-track="whatsapp_order" data-product-id="' + prod.id + '" data-price="' + effectivePrice + '" data-location="quick-view">' +
              '<svg class="icon-wa" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>' +
              'Order via WhatsApp' +
            '</button>' +
          '</div>' +
          reviewsHtml +
        '</div>' +
      '</div>' +
    '</div>';

    modalOverlay.innerHTML = html;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    activeModal = modalOverlay;

    var dialogBox = modalOverlay.querySelector('.quickview-dialog');
    if (dialogBox) dialogBox.focus();

    // Setup interactive handlers inside modal
    var qtyValInput = modalOverlay.querySelector('#modal-qty-val');
    var qtyMinusBtn = modalOverlay.querySelector('#modal-qty-minus');
    var qtyPlusBtn = modalOverlay.querySelector('#modal-qty-plus');
    var stockCapNote = modalOverlay.querySelector('#modal-stock-cap-note');
    var mainImg = modalOverlay.querySelector('#modal-main-image');

    // Thumbnail switching
    var thumbBtns = modalOverlay.querySelectorAll('.gallery-thumb-btn');
    thumbBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        thumbBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (mainImg) mainImg.src = btn.getAttribute('data-img');
      });
    });

    // Stepper buttons
    qtyMinusBtn.addEventListener('click', function() {
      var currentVal = parseInt(qtyValInput.value, 10) || 1;
      if (currentVal > 1) {
        currentVal--;
        qtyValInput.value = currentVal;
        qtyPlusBtn.disabled = false;
        stockCapNote.style.display = 'none';
      }
    });

    qtyPlusBtn.addEventListener('click', function() {
      var currentVal = parseInt(qtyValInput.value, 10) || 1;
      if (currentVal < maxQty) {
        currentVal++;
        qtyValInput.value = currentVal;
        if (currentVal >= maxQty) {
          qtyPlusBtn.disabled = true;
          stockCapNote.style.display = 'inline-block';
        }
      }
    });

    // Add to cart from modal
    var addBtn = modalOverlay.querySelector('#modal-addtocart-' + prod.id);
    addBtn.addEventListener('click', function() {
      var q = parseInt(qtyValInput.value, 10) || 1;
      if (window.CartService) {
        window.CartService.addToCart(prod.id, q, 'quick-view');
      }
    });

    // WhatsApp order directly from modal
    var waBtn = modalOverlay.querySelector('#modal-whatsapp-' + prod.id);
    waBtn.addEventListener('click', function() {
      var q = parseInt(qtyValInput.value, 10) || 1;
      var lineTotal = effectivePrice * q;
      var msg = "Hi SIXTEEN MART, I'd like to order:\n\n1. " + prod.name + " x" + q + " — Rs. " + lineTotal.toLocaleString() + "\n\nTotal: Rs. " + lineTotal.toLocaleString() + "\n\nName:\nDelivery address:\nPhone:";
      var waPhone = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) || '94768056036';
      var url = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg);

      if (window.trackWhatsAppOrderClick) {
        window.trackWhatsAppOrderClick(prod.id, 'quick-view', lineTotal);
      }
      window.open(url, '_blank', 'noopener');
    });

    // Close button
    var closeBtn = modalOverlay.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', closeQuickView);

    // Backdrop click
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeQuickView();
      }
    });
  }

  function closeQuickView() {
    if (!activeModal) return;
    activeModal.classList.remove('open');
    document.body.style.overflow = '';
    activeModal = null;
    if (triggerElement && typeof triggerElement.focus === 'function') {
      triggerElement.focus();
    }
  }

  // Keyboard accessibility: Escape to close & focus trap
  document.addEventListener('keydown', function(e) {
    if (!activeModal || !activeModal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeQuickView();
      return;
    }

    if (e.key === 'Tab') {
      var focusables = activeModal.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled])');
      if (focusables.length === 0) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Delegated click listener to trigger modal from any product card
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
      var quickViewTrigger = e.target.closest('[data-action="quickview"]');
      if (quickViewTrigger) {
        e.preventDefault();
        var pId = quickViewTrigger.getAttribute('data-product-id');
        if (pId) {
          openQuickView(pId, quickViewTrigger);
        }
      }
    });
  });

  window.openQuickView = openQuickView;
  window.closeQuickView = closeQuickView;
})();
