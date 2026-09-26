/**
 * SIXTEEN MART — Product Quick-View Modal (Daraz/Amazon Style)
 * Supports image gallery, star ratings, authentic customer reviews,
 * stock-limited quantity stepper (1-5), and WhatsApp deep-linking.
 */
(function() {
    'use strict';

    var currentProduct = null;
    var currentImageIndex = 0;
    var currentQuantity = 1;
    var MAX_QUANTITY = 5;

    // Official SIXTEEN MART WhatsApp Number (+94 76 805 6036)
    var WHATSAPP_PHONE = '94768056036';

    /**
     * Ensure modal backdrop markup exists in DOM
     */
    function ensureModalDOM() {
        var existing = document.getElementById('productQuickViewModal');
        if (existing) return existing;

        var backdrop = document.createElement('div');
        backdrop.id = 'productQuickViewModal';
        backdrop.className = 'modal-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.setAttribute('aria-hidden', 'true');
        backdrop.setAttribute('aria-labelledby', 'modalProductTitle');

        backdrop.innerHTML = [
            '<div class="modal-container" role="document">',
            '  <button type="button" class="modal-close-btn" id="modalCloseBtn" aria-label="Close quick view">&times;</button>',
            '  <div class="modal-body" id="modalBody">',
            '    <!-- Content populated dynamically -->',
            '  </div>',
            '</div>'
        ].join('');

        document.body.appendChild(backdrop);

        // Close on backdrop click
        backdrop.addEventListener('click', function(e) {
            if (e.target === backdrop) {
                closeModal();
            }
        });

        // Close button click
        var closeBtn = backdrop.querySelector('#modalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (backdrop.classList.contains('active')) {
                    closeModal();
                }
            }
        });

        return backdrop;
    }

    /**
     * Generate HTML for star rating
     */
    function renderStars(rating) {
        var fullStars = Math.floor(rating);
        var hasHalf = (rating - fullStars) >= 0.4;
        var starsHtml = '';

        for (var i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalf) {
                starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i>';
            }
        }
        return starsHtml;
    }

    /**
     * Compute WhatsApp deep link with product details and selected quantity
     */
    function getWhatsAppOrderLink(product, quantity) {
        var totalAmount = product.price * quantity;
        var totalFormatted = 'Rs. ' + totalAmount.toLocaleString('en-US');

        var message = [
            'Hello SIXTEEN MART! 🛍️',
            '',
            'I would like to place an order for:',
            '• Product: ' + product.name,
            '• Quantity: ' + quantity + ' unit' + (quantity > 1 ? 's' : ''),
            '• Unit Price: ' + product.priceFormatted,
            '• Total Amount: ' + totalFormatted,
            '',
            'Please let me know the available delivery time and payment details. Thank you!'
        ].join('\n');

        var base = WHATSAPP_PHONE ? ('https://wa.me/' + WHATSAPP_PHONE) : 'https://wa.me/';
        return base + '?text=' + encodeURIComponent(message);
    }

    /**
     * Render the modal body content for the given product
     */
    function renderModalContent(product) {
        var modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        currentQuantity = 1;
        currentImageIndex = 0;
        var images = product.images && product.images.length > 0 ? product.images : ['images/logo.jpeg'];

        // Gallery HTML
        var hasMultipleImages = images.length > 1;
        var galleryHtml = [
            '<div class="modal-gallery">',
            '  <div class="modal-main-image-wrap">',
            '    <img src="' + images[0] + '" alt="' + product.name + '" id="modalMainImage" class="modal-main-img">',
            hasMultipleImages ? '    <button type="button" class="gallery-nav-btn prev" id="modalPrevImg" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>' : '',
            hasMultipleImages ? '    <button type="button" class="gallery-nav-btn next" id="modalNextImg" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>' : '',
            '  </div>'
        ];

        if (hasMultipleImages) {
            galleryHtml.push('  <div class="modal-thumb-strip" id="modalThumbStrip">');
            images.forEach(function(imgSrc, idx) {
                galleryHtml.push(
                    '    <button type="button" class="modal-thumb ' + (idx === 0 ? 'active' : '') + '" data-index="' + idx + '" aria-label="View photo ' + (idx + 1) + '">' +
                    '      <img src="' + imgSrc + '" alt="Thumbnail ' + (idx + 1) + '">' +
                    '    </button>'
                );
            });
            galleryHtml.push('  </div>');
        }
        galleryHtml.push('</div>');

        // Customer Reviews HTML
        var reviewsHtml = '';
        if (product.reviews && product.reviews.length > 0) {
            reviewsHtml += '<div class="modal-reviews-section">';
            reviewsHtml += '  <div class="modal-reviews-heading">';
            reviewsHtml += '    <span>Verified Customer Feedback</span>';
            reviewsHtml += '    <span class="stars" style="color:var(--star-gold);">' + renderStars(product.rating) + ' ' + product.rating + '</span>';
            reviewsHtml += '  </div>';

            product.reviews.forEach(function(rev) {
                reviewsHtml += [
                    '  <div class="modal-review-card">',
                    '    <div class="modal-review-header">',
                    '      <span class="modal-reviewer-name">' + rev.author + '</span>',
                    '      <span class="modal-reviewer-badge"><i class="fa-solid fa-circle-check"></i> ' + rev.date + '</span>',
                    '    </div>',
                    '    <div class="modal-review-text">"' + rev.text + '"</div>',
                    '  </div>'
                ].join('');
            });
            reviewsHtml += '</div>';
        }

        // Details Column HTML
        var detailsHtml = [
            '<div class="modal-details">',
            '  <span class="modal-category-badge">' + (product.categoryLabel || 'Lifestyle') + '</span>',
            '  <h2 class="modal-title" id="modalProductTitle">' + product.name + '</h2>',
            '  <div class="modal-rating-row">',
            '    <span class="stars">' + renderStars(product.rating) + '</span>',
            '    <span class="rating-score">' + product.rating + ' / 5.0</span>',
            '    <span>(' + product.reviewCount + ' reviews)</span>',
            '  </div>',
            '  <div class="modal-price-wrap">',
            '    <span class="modal-price" id="modalPrice">' + product.priceFormatted + '</span>',
            '    <span class="modal-stock-badge">In Stock (Limited Quantity)</span>',
            '  </div>',
            '  <p class="modal-description">' + product.description + '</p>',
            '  <div class="modal-qty-row">',
            '    <span class="modal-qty-label">Quantity:</span>',
            '    <div class="modal-qty-stepper">',
            '      <button type="button" class="modal-qty-btn" id="modalQtyMinus" aria-label="Decrease quantity" disabled><i class="fa-solid fa-minus"></i></button>',
            '      <input type="text" class="modal-qty-input" id="modalQtyInput" value="1" readonly aria-label="Selected quantity">',
            '      <button type="button" class="modal-qty-btn" id="modalQtyPlus" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>',
            '    </div>',
            '    <span class="modal-qty-limit-note">(Max 5 per customer)</span>',
            '  </div>',
            '  <a href="' + getWhatsAppOrderLink(product, 1) + '" id="modalWhatsAppCta" class="modal-whatsapp-cta" target="_blank" rel="noopener noreferrer">',
            '    <i class="fa-brands fa-whatsapp"></i>',
            '    <span>Order Now via WhatsApp</span>',
            '  </a>',
            reviewsHtml,
            '</div>'
        ].join('');

        modalBody.innerHTML = galleryHtml.join('') + detailsHtml;

        // Wire gallery interactions
        bindGalleryEvents(images);

        // Wire quantity stepper interactions
        bindQuantityEvents(product);
    }

    /**
     * Bind gallery events (thumbnails, arrows)
     */
    function bindGalleryEvents(images) {
        if (images.length <= 1) return;

        var mainImg = document.getElementById('modalMainImage');
        var prevBtn = document.getElementById('modalPrevImg');
        var nextBtn = document.getElementById('modalNextImg');
        var thumbs = document.querySelectorAll('.modal-thumb');

        function showImage(idx) {
            if (idx < 0) idx = images.length - 1;
            if (idx >= images.length) idx = 0;
            currentImageIndex = idx;

            if (mainImg) {
                mainImg.style.opacity = '0.3';
                setTimeout(function() {
                    mainImg.src = images[currentImageIndex];
                    mainImg.style.opacity = '1';
                }, 120);
            }

            thumbs.forEach(function(th, i) {
                if (i === currentImageIndex) {
                    th.classList.add('active');
                } else {
                    th.classList.remove('active');
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showImage(currentImageIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showImage(currentImageIndex + 1);
            });
        }

        thumbs.forEach(function(th) {
            th.addEventListener('click', function(e) {
                e.stopPropagation();
                var idx = parseInt(th.getAttribute('data-index'), 10);
                showImage(idx);
            });
        });
    }

    /**
     * Bind stepper plus/minus controls
     */
    function bindQuantityEvents(product) {
        var minusBtn = document.getElementById('modalQtyMinus');
        var plusBtn = document.getElementById('modalQtyPlus');
        var qtyInput = document.getElementById('modalQtyInput');
        var whatsappCta = document.getElementById('modalWhatsAppCta');
        var priceEl = document.getElementById('modalPrice');

        function updateQuantity(newQty) {
            if (newQty < 1) newQty = 1;
            if (newQty > MAX_QUANTITY) newQty = MAX_QUANTITY;

            currentQuantity = newQty;
            if (qtyInput) qtyInput.value = currentQuantity;

            if (minusBtn) minusBtn.disabled = (currentQuantity <= 1);
            if (plusBtn) plusBtn.disabled = (currentQuantity >= MAX_QUANTITY);

            if (whatsappCta) {
                whatsappCta.href = getWhatsAppOrderLink(product, currentQuantity);
            }

            if (priceEl) {
                var total = product.price * currentQuantity;
                if (currentQuantity > 1) {
                    priceEl.innerHTML = 'Rs. ' + total.toLocaleString('en-US') + ' <small style="font-size:13px;font-weight:500;color:var(--muted)">(' + product.priceFormatted + ' each)</small>';
                } else {
                    priceEl.textContent = product.priceFormatted;
                }
            }
        }

        if (minusBtn) {
            minusBtn.addEventListener('click', function() {
                updateQuantity(currentQuantity - 1);
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', function() {
                updateQuantity(currentQuantity + 1);
            });
        }
    }

    /**
     * Open Quick-View Modal for a product
     */
    function openModal(productId) {
        var product = null;
        if (typeof window.getProductById === 'function') {
            product = window.getProductById(productId);
        }

        if (!product && window.SIXTEEN_MART_PRODUCTS) {
            product = window.SIXTEEN_MART_PRODUCTS.find(function(p) {
                return p.id === productId;
            });
        }

        if (!product) {
            console.warn('Product not found with id: ' + productId);
            return;
        }

        currentProduct = product;
        var modal = ensureModalDOM();
        renderModalContent(product);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Focus close button for accessibility
        var closeBtn = modal.querySelector('#modalCloseBtn');
        if (closeBtn) closeBtn.focus();
    }

    /**
     * Close the modal
     */
    function closeModal() {
        var modal = document.getElementById('productQuickViewModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('modal-open');
        currentProduct = null;
    }

    // Attach open and close to window
    window.openQuickViewModal = openModal;
    window.closeQuickViewModal = closeModal;

    /**
     * Initialize product card click handlers site-wide
     */
    function initProductCardTriggers() {
        var cards = document.querySelectorAll('.product-card');
        cards.forEach(function(card) {
            var productId = card.getAttribute('data-product-id');
            if (!productId) return;

            // Clicking card anywhere opens modal
            card.addEventListener('click', function(e) {
                // If user clicks a direct whatsapp order link that wants direct open, allow;
                // Otherwise open modal quick-view
                if (e.target.closest('.direct-wa-link')) {
                    return; // let direct link work
                }

                e.preventDefault();
                openModal(productId);
            });

            // Also wire quick-view button/badge if present
            var qvBtn = card.querySelector('.product-quick-view-badge, .quick-view-trigger');
            if (qvBtn) {
                qvBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(productId);
                });
            }
        });
    }

    // Auto-init on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        ensureModalDOM();
        initProductCardTriggers();
    });

    // Re-expose in case dynamically rendered
    window.initProductCardTriggers = initProductCardTriggers;
})();
