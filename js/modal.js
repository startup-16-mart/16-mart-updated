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
              '<svg class="icon-wa" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
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
