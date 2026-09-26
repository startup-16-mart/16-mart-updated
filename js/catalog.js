/**
 * SIXTEEN MART — Catalog Management (products.html)
 * Handles category filtering, real-time search, sorting, and dynamic product rendering.
 */
(function() {
    'use strict';

    var currentCategory = 'all';
    var currentSearch = '';
    var currentSort = 'featured';

    /**
     * Render product card HTML matching existing styling pattern
     */
    function renderProductCard(p) {
        var firstImg = (p.images && p.images.length > 0) ? p.images[0] : 'images/logo.jpeg';

        return [
            '<article class="product-card" data-product-id="' + p.id + '" data-category="' + p.category + '" data-name="' + p.name.replace(/"/g, '&quot;') + '" role="button" tabindex="0" aria-label="View ' + p.name.replace(/"/g, '&quot;') + '">',
            '  <span class="product-badge">' + (p.badge || 'Featured') + '</span>',
            '  <span class="product-quick-view-badge"><i class="fa-solid fa-eye"></i> Quick View</span>',
            '  <div class="product-image-container">',
            '    <img class="product-img" src="' + firstImg + '" alt="' + p.name.replace(/"/g, '&quot;') + '" loading="lazy">',
            '  </div>',
            '  <div class="product-info">',
            '    <div class="product-rating">',
            '      <span class="stars"><i class="fa-solid fa-star"></i></span>',
            '      <span>' + p.rating + ' (' + p.reviewCount + ')</span>',
            '    </div>',
            '    <h3>' + p.name + '</h3>',
            '    <p class="product-description">' + p.shortDescription + '</p>',
            '    <div class="product-bottom">',
            '      <span class="price">' + p.priceFormatted + '</span>',
            '      <a class="order-btn" href="#" aria-label="Order ' + p.name.replace(/"/g, '&quot;') + '">',
            '        <span>Order</span>',
            '      </a>',
            '    </div>',
            '  </div>',
            '</article>'
        ].join('');
    }

    /**
     * Filter and sort products according to state
     */
    function getFilteredProducts() {
        var products = window.SIXTEEN_MART_PRODUCTS || [];

        // Category filter
        var filtered = products.filter(function(p) {
            if (currentCategory === 'all') return true;
            return p.category === currentCategory;
        });

        // Search query filter
        if (currentSearch) {
            var q = currentSearch.toLowerCase();
            filtered = filtered.filter(function(p) {
                return (
                    p.name.toLowerCase().indexOf(q) !== -1 ||
                    p.shortDescription.toLowerCase().indexOf(q) !== -1 ||
                    p.categoryLabel.toLowerCase().indexOf(q) !== -1
                );
            });
        }

        // Sorting
        var sorted = filtered.slice();
        if (currentSort === 'price-low') {
            sorted.sort(function(a, b) { return a.price - b.price; });
        } else if (currentSort === 'price-high') {
            sorted.sort(function(a, b) { return b.price - a.price; });
        } else if (currentSort === 'rating') {
            sorted.sort(function(a, b) { return b.rating - a.rating; });
        }

        return sorted;
    }

    /**
     * Update DOM with filtered products
     */
    function updateCatalogUI() {
        var grid = document.getElementById('catalogGrid');
        var noResults = document.getElementById('catalogNoResults');
        var countEl = document.getElementById('catalogResultCount');
        var queryEcho = document.getElementById('searchQueryEcho');

        if (!grid) return;

        var items = getFilteredProducts();

        if (countEl) {
            countEl.textContent = items.length + ' item' + (items.length === 1 ? '' : 's');
        }

        if (queryEcho) {
            if (currentSearch) {
                queryEcho.textContent = 'for "' + currentSearch + '"';
                queryEcho.style.display = 'inline';
            } else {
                queryEcho.style.display = 'none';
            }
        }

        if (items.length === 0) {
            grid.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
            grid.innerHTML = items.map(renderProductCard).join('');
        }

        // Re-attach modal trigger listeners to all rendered cards
        if (window.initProductCardTriggers) {
            window.initProductCardTriggers();
        }
    }

    /**
     * Apply search from external calls (e.g., header search)
     */
    window.applyCatalogSearch = function(query) {
        currentSearch = query.trim();
        var searchInput = document.getElementById('catalogSearchInput');
        if (searchInput) searchInput.value = currentSearch;
        updateCatalogUI();
    };

    /**
     * Initialize catalog controls on DOMContentLoaded
     */
    document.addEventListener('DOMContentLoaded', function() {
        var grid = document.getElementById('catalogGrid');
        if (!grid) return; // Not on products.html

        // Parse URL params for initial filters (?category=... or ?search=... or ?quickview=...)
        var urlParams = new URLSearchParams(window.location.search);
        var initialCat = urlParams.get('category');
        var initialSearch = urlParams.get('search');
        var initialQuickView = urlParams.get('quickview');

        if (initialCat === 'home' || initialCat === 'beauty') {
            currentCategory = initialCat;
        }

        if (initialSearch) {
            currentSearch = initialSearch.trim();
            var searchInput = document.getElementById('catalogSearchInput');
            if (searchInput) searchInput.value = currentSearch;
        }

        // Setup category filter tabs
        var tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(function(tab) {
            var cat = tab.getAttribute('data-category');
            if (cat === currentCategory) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }

            tab.addEventListener('click', function(e) {
                e.preventDefault();
                tabs.forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                currentCategory = cat;
                updateCatalogUI();
            });
        });

        // Setup sort dropdown
        var sortSelect = document.getElementById('catalogSortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSort = sortSelect.value;
                updateCatalogUI();
            });
        }

        // Setup search input inside catalog toolbar
        var catalogSearch = document.getElementById('catalogSearchInput');
        if (catalogSearch) {
            catalogSearch.addEventListener('input', function() {
                currentSearch = catalogSearch.value.trim();
                updateCatalogUI();
            });
        }

        // Reset search button
        var resetBtn = document.getElementById('resetSearchBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                currentSearch = '';
                currentCategory = 'all';
                if (catalogSearch) catalogSearch.value = '';
                tabs.forEach(function(t) {
                    if (t.getAttribute('data-category') === 'all') {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                updateCatalogUI();
            });
        }

        // Initial render
        updateCatalogUI();

        // If quickview parameter provided in URL, auto-open modal
        if (initialQuickView && window.openQuickViewModal) {
            setTimeout(function() {
                window.openQuickViewModal(initialQuickView);
            }, 250);
        }
    });
})();
