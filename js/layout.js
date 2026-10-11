/**
 * SIXTEEN MART — Shared Layout Engine
 * Renders header, navigation, mobile drawer, footer, mobile bottom tab bar, and floating WhatsApp button.
 */
(function() {
  'use strict';

  function getCurrentPageName() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    if (!file || file === '') file = 'index.html';
    return file;
  }

  function renderHeader() {
    var headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    var currentPage = getCurrentPageName();

    var isHome = currentPage === 'index.html';
    var isAbout = currentPage === 'about.html';
    var isProducts = ['products.html', 'home-gadgets.html', 'skin-care-tools.html', 'hair-care-tools.html', 'self-care-wellness.html'].indexOf(currentPage) > -1;
    var isContact = currentPage === 'contact.html';
    var isFaq = currentPage === 'faq.html';
    var isCart = currentPage === 'cart.html';
    var isSignin = currentPage === 'signin.html';

    var html = '<header class="site-header-navbar" role="banner">' +
      '<div class="header-container">' +
        // Left: Logo
        '<a href="index.html" class="navbar-logo-link" id="nav-logo" data-track="nav_click" data-link-id="nav-logo">' +
          '<div class="logo-chip">' +
            '<img src="images/logo.jpeg" alt="SIXTEEN MART — Always More Value" class="navbar-logo-img" width="160" height="68" />' +
          '</div>' +
        '</a>' +

        // Center: Desktop Navigation Links
        '<nav class="navbar-nav desktop-nav" aria-label="Main Navigation">' +
          '<ul class="nav-links-list">' +
            '<li><a href="index.html" class="nav-link ' + (isHome ? 'active' : '') + '" id="nav-home" data-track="nav_click">Home</a></li>' +
            '<li><a href="about.html" class="nav-link ' + (isAbout ? 'active' : '') + '" id="nav-about" data-track="nav_click">About Us</a></li>' +
            '<li class="nav-dropdown-item">' +
              '<a href="products.html" class="nav-link nav-dropdown-trigger ' + (isProducts ? 'active' : '') + '" id="nav-products" data-track="nav_click" aria-haspopup="true" aria-expanded="false">' +
                'All Products ' +
                '<svg class="icon-caret" viewBox="0 0 20 20" width="14" height="14" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>' +
              '</a>' +
              '<ul class="nav-dropdown-menu" aria-label="Product Categories">' +
                '<li><a href="products.html" class="dropdown-link" id="nav-cat-all" data-track="category_click" data-category="all">All Products</a></li>' +
                '<li><a href="home-gadgets.html" class="dropdown-link" id="nav-cat-home-gadgets" data-track="category_click" data-category="home-gadgets">Home &amp; Gadgets</a></li>' +
                '<li><a href="skin-care-tools.html" class="dropdown-link" id="nav-cat-skin-care-tools" data-track="category_click" data-category="skin-care-tools">Skin Care Tools</a></li>' +
                '<li><a href="hair-care-tools.html" class="dropdown-link" id="nav-cat-hair-care-tools" data-track="category_click" data-category="hair-care-tools">Hair Care Tools</a></li>' +
                '<li><a href="self-care-wellness.html" class="dropdown-link" id="nav-cat-self-care-wellness" data-track="category_click" data-category="self-care-wellness">Self-Care &amp; Wellness</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="contact.html" class="nav-link ' + (isContact ? 'active' : '') + '" id="nav-contact" data-track="nav_click">Contact Us</a></li>' +
            '<li><a href="faq.html" class="nav-link ' + (isFaq ? 'active' : '') + '" id="nav-faq" data-track="nav_click">FAQ</a></li>' +
          '</ul>' +
        '</nav>' +

        // Right side desktop icons: [Search] [Cart] [Sign In] [Theme]
        '<div class="navbar-actions desktop-actions">' +
          '<form class="nav-search-form" id="header-search-form" role="search">' +
            '<div class="search-input-wrapper">' +
              '<input type="search" class="nav-search-input" id="nav-search" name="q" placeholder="Search products..." aria-label="Search products" autocomplete="off" />' +
              '<button type="submit" class="search-submit-btn" aria-label="Search">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
              '</button>' +
            '</div>' +
          '</form>' +

          '<a href="cart.html" class="navbar-icon-btn ' + (isCart ? 'active' : '') + '" id="nav-cart" aria-label="Shopping Cart" data-track="nav_click">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-2z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
            '<span class="cart-badge-count" style="display:none;">0</span>' +
          '</a>' +

          '<a href="signin.html" class="navbar-icon-btn ' + (isSignin ? 'active' : '') + '" id="nav-signin" aria-label="Sign In" data-track="nav_click">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '</a>' +

          '<button type="button" class="navbar-icon-btn" id="nav-theme-toggle" aria-label="Toggle Theme" title="Toggle Theme" data-track="nav_click">' +
            '<svg class="theme-icon-sun" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
            '<svg class="theme-icon-moon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>' +
          '</button>' +
        '</div>' +

        // Mobile top bar actions: [Cart] [Theme toggle] [Hamburger]
        // Strictly ordered per Section 5 & Prompt 5: Hamburger far-right, Theme toggle immediately left of it, Cart to left of theme.
        '<div class="navbar-actions mobile-actions">' +
          '<a href="cart.html" class="navbar-icon-btn ' + (isCart ? 'active' : '') + '" id="nav-cart-mob" aria-label="Shopping Cart" data-track="nav_click">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-2z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
            '<span class="cart-badge-count" style="display:none;">0</span>' +
          '</a>' +

          '<button type="button" class="navbar-icon-btn" id="nav-theme-toggle-mob" aria-label="Toggle Theme" title="Toggle Theme" data-track="nav_click">' +
            '<svg class="theme-icon-sun" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
            '<svg class="theme-icon-moon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>' +
          '</button>' +

          '<button type="button" class="navbar-icon-btn hamburger-btn" id="nav-hamburger" aria-label="Open Navigation Menu" aria-expanded="false" data-track="nav_click">' +
            '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +

      // Mobile Drawer Panel
      '<div class="mobile-drawer-overlay" id="mobile-drawer-overlay">' +
        '<div class="mobile-drawer-panel" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">' +
          '<div class="drawer-header">' +
            '<div class="logo-chip">' +
              '<img src="images/logo.jpeg" alt="SIXTEEN MART" class="drawer-logo-img" width="130" height="55" />' +
            '</div>' +
            '<button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Close Navigation Menu">&times;</button>' +
          '</div>' +
          '<div class="drawer-body">' +
            '<form class="drawer-search-form" id="drawer-search-form" role="search">' +
              '<div class="search-input-wrapper">' +
                '<input type="search" class="drawer-search-input" id="drawer-search-input" placeholder="Search products..." aria-label="Search products" autocomplete="off" />' +
                '<button type="submit" class="search-submit-btn" aria-label="Search">' +
                  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
                '</button>' +
              '</div>' +
            '</form>' +
            '<nav class="drawer-nav">' +
              '<ul class="drawer-links-list">' +
                '<li><a href="index.html" class="drawer-link ' + (isHome ? 'active' : '') + '" data-track="nav_click">Home</a></li>' +
                '<li><a href="about.html" class="drawer-link ' + (isAbout ? 'active' : '') + '" data-track="nav_click">About Us</a></li>' +
                '<li class="drawer-accordion-group">' +
                  '<button type="button" class="drawer-accordion-btn ' + (isProducts ? 'active' : '') + '" id="drawer-products-btn" aria-expanded="false">' +
                    'All Products' +
                    '<svg class="icon-caret" viewBox="0 0 20 20" width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>' +
                  '</button>' +
                  '<ul class="drawer-sublinks-list" id="drawer-products-sublist">' +
                    '<li><a href="products.html" class="drawer-sublink" data-track="category_click" data-category="all">Explore All Catalog</a></li>' +
                    '<li><a href="home-gadgets.html" class="drawer-sublink" data-track="category_click" data-category="home-gadgets">Home &amp; Gadgets</a></li>' +
                    '<li><a href="skin-care-tools.html" class="drawer-sublink" data-track="category_click" data-category="skin-care-tools">Skin Care Tools</a></li>' +
                    '<li><a href="hair-care-tools.html" class="drawer-sublink" data-track="category_click" data-category="hair-care-tools">Hair Care Tools</a></li>' +
                    '<li><a href="self-care-wellness.html" class="drawer-sublink" data-track="category_click" data-category="self-care-wellness">Self-Care &amp; Wellness</a></li>' +
                  '</ul>' +
                '</li>' +
                '<li><a href="contact.html" class="drawer-link ' + (isContact ? 'active' : '') + '" data-track="nav_click">Contact Us</a></li>' +
                '<li><a href="faq.html" class="drawer-link ' + (isFaq ? 'active' : '') + '" data-track="nav_click">FAQ</a></li>' +
                '<li><a href="signin.html" class="drawer-link ' + (isSignin ? 'active' : '') + '" id="drawer-signin" data-track="nav_click">Sign In</a></li>' +
              '</ul>' +
            '</nav>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>';

    headerEl.innerHTML = html;
    setupHeaderEvents();
  }

  function setupHeaderEvents() {
    var hamburger = document.getElementById('nav-hamburger');
    var overlay = document.getElementById('mobile-drawer-overlay');
    var drawer = document.getElementById('mobile-drawer');
    var closeBtn = document.getElementById('drawer-close-btn');
    var accordionBtn = document.getElementById('drawer-products-btn');
    var accordionList = document.getElementById('drawer-products-sublist');

    function openDrawer() {
      if (overlay) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
        var firstFocusable = drawer.querySelector('button, input, a');
        if (firstFocusable) firstFocusable.focus();
      }
    }

    function closeDrawer() {
      if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        if (hamburger) {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.focus();
        }
      }
    }

    if (hamburger) {
      hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeDrawer();
        }
      });
    }

    if (accordionBtn && accordionList) {
      accordionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        var isOpen = accordionList.classList.toggle('open');
        accordionBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Close on drawer link click
    if (drawer) {
      var drawerLinks = drawer.querySelectorAll('a');
      drawerLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          closeDrawer();
        });
      });
    }

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Search submissions
    var desktopSearch = document.getElementById('header-search-form');
    if (desktopSearch) {
      desktopSearch.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = document.getElementById('nav-search');
        var term = input ? input.value.trim() : '';
        if (term) {
          if (window.handleSearchSubmit) {
            window.handleSearchSubmit(term);
          } else {
            window.location.href = 'products.html?search=' + encodeURIComponent(term);
          }
        }
      });
    }

    var drawerSearch = document.getElementById('drawer-search-form');
    if (drawerSearch) {
      drawerSearch.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = document.getElementById('drawer-search-input');
        var term = input ? input.value.trim() : '';
        if (term) {
          closeDrawer();
          if (window.handleSearchSubmit) {
            window.handleSearchSubmit(term);
          } else {
            window.location.href = 'products.html?search=' + encodeURIComponent(term);
          }
        }
      });
    }
  }

  function renderFooter() {
    var footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    var waPhone = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) || '94768056036';

    var html = '<footer class="site-main-footer" role="contentinfo">' +
      '<div class="footer-top-orange-line"></div>' +
      '<div class="footer-container">' +
        '<div class="footer-grid">' +
          // Column 1: Brand
          '<div class="footer-col footer-col-brand">' +
            '<div class="footer-logo-chip">' +
              '<img src="images/logo.jpeg" alt="SIXTEEN MART" class="footer-logo-img" width="150" height="64" />' +
            '</div>' +
            '<p class="footer-tagline">Smart everyday finds with more value &mdash; affordable, functional, and trendy lifestyle products</p>' +
            '<div class="footer-social-links">' +
              '<a href="https://www.facebook.com/share/1FCNRuqKVa/?mibextid=wwXIfr" class="social-circle-btn" id="footer-social-facebook" target="_blank" rel="noopener" aria-label="Facebook" data-track="social_click" data-network="facebook">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>' +
              '</a>' +
              '<a href="https://www.instagram.com/_16.mart_onlinestore?stkn=MWQ0cXRsaTF0YXIxNw==" class="social-circle-btn" id="footer-social-instagram" target="_blank" rel="noopener" aria-label="Instagram" data-track="social_click" data-network="instagram">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z"/></svg>' +
              '</a>' +
              '<a href="https://www.tiktok.com/@sixteenmart1?_r=1&_t=ZS-99h4W7jognR" class="social-circle-btn" id="footer-social-tiktok" target="_blank" rel="noopener" aria-label="TikTok" data-track="social_click" data-network="tiktok">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.65 6.33 6.33 0 009.33 22 6.33 6.33 0 0015.66 15.7V8.8a8.28 8.28 0 004.93 1.6V7a4.87 4.87 0 01-1-.31z"/></svg>' +
              '</a>' +
              '<a href="https://wa.me/' + waPhone + '?text=Hi%20SIXTEEN%20MART,%20I%20have%20an%20inquiry." class="social-circle-btn" id="footer-social-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp" data-track="social_click" data-network="whatsapp">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +

          // Column 2: Shop
          '<div class="footer-col">' +
            '<h4 class="footer-col-title">Shop</h4>' +
            '<ul class="footer-links-list">' +
              '<li><a href="products.html" id="footer-shop-all" data-track="nav_click">All Products</a></li>' +
              '<li><a href="home-gadgets.html" id="footer-shop-home-gadgets" data-track="category_click" data-category="home-gadgets">Home &amp; Gadgets</a></li>' +
              '<li><a href="skin-care-tools.html" id="footer-shop-skin-care" data-track="category_click" data-category="skin-care-tools">Skin Care Tools</a></li>' +
              '<li><a href="hair-care-tools.html" id="footer-shop-hair-care" data-track="category_click" data-category="hair-care-tools">Hair Care Tools</a></li>' +
              '<li><a href="self-care-wellness.html" id="footer-shop-self-care" data-track="category_click" data-category="self-care-wellness">Self-Care &amp; Wellness</a></li>' +
            '</ul>' +
          '</div>' +

          // Column 3: Help
          '<div class="footer-col">' +
            '<h4 class="footer-col-title">Help</h4>' +
            '<ul class="footer-links-list">' +
              '<li><a href="about.html" id="footer-help-about" data-track="nav_click">About Us</a></li>' +
              '<li><a href="faq.html" id="footer-help-faq" data-track="nav_click">FAQ</a></li>' +
              '<li><a href="contact.html" id="footer-help-contact" data-track="nav_click">Contact Us</a></li>' +
              '<li><a href="cart.html" id="footer-help-cart" data-track="nav_click">Cart</a></li>' +
              '<li><a href="signin.html" id="footer-help-signin" data-track="nav_click">Sign In</a></li>' +
            '</ul>' +
          '</div>' +

          // Column 4: Order with us
          '<div class="footer-col footer-col-order">' +
            '<h4 class="footer-col-title">Order with Us</h4>' +
            '<p class="footer-order-text">Browse, connect and confirm your order on WhatsApp</p>' +
            '<a href="https://wa.me/' + waPhone + '" class="btn btn-primary footer-wa-btn" id="footer-whatsapp" target="_blank" rel="noopener" data-track="whatsapp_order" data-location="footer">' +
              '<svg class="icon-wa" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>' +
              'Chat on WhatsApp' +
            '</a>' +
            '<a href="tel:+94768056036" class="footer-phone-link">+94 76 805 6036</a>' +
          '</div>' +
        '</div>' +

        // Bottom Copyright
        '<div class="footer-bottom-bar">' +
          '<p>&copy; 2026 SIXTEEN MART. All Rights Reserved. Always More Value.</p>' +
        '</div>' +
      '</div>' +
    '</footer>';

    footerEl.innerHTML = html;
  }

  function renderMobileBottomBar() {
    var existing = document.getElementById('mobile-bottom-bar');
    if (existing) return;

    var currentPage = getCurrentPageName();
    var isHome = currentPage === 'index.html';
    var isCategories = ['products.html', 'home-gadgets.html', 'skin-care-tools.html', 'hair-care-tools.html', 'self-care-wellness.html'].indexOf(currentPage) > -1;
    var isCart = currentPage === 'cart.html';
    var waPhone = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) || '94768056036';

    var bar = document.createElement('nav');
    bar.id = 'mobile-bottom-bar';
    bar.className = 'mobile-bottom-tab-bar';
    bar.setAttribute('aria-label', 'Mobile Navigation');

    bar.innerHTML = '<div class="bottom-bar-inner">' +
      '<a href="index.html" class="bottom-tab-btn ' + (isHome ? 'active' : '') + '" id="mobnav-home" data-track="nav_click">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
        '<span>Home</span>' +
      '</a>' +
      '<a href="products.html" class="bottom-tab-btn ' + (isCategories ? 'active' : '') + '" id="mobnav-categories" data-track="nav_click">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' +
        '<span>Categories</span>' +
      '</a>' +
      '<a href="cart.html" class="bottom-tab-btn ' + (isCart ? 'active' : '') + '" id="mobnav-cart" data-track="nav_click">' +
        '<div class="bottom-tab-icon-wrap">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-2z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
          '<span class="cart-badge-count" style="display:none;">0</span>' +
        '</div>' +
        '<span>Cart</span>' +
      '</a>' +
      '<a href="https://wa.me/' + waPhone + '" class="bottom-tab-btn" id="mobnav-whatsapp" target="_blank" rel="noopener" data-track="whatsapp_order" data-location="mobile-bottom-bar">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>' +
        '<span>WhatsApp</span>' +
      '</a>' +
    '</div>';

    document.body.appendChild(bar);
  }

  function renderFloatingWhatsApp() {
    var existing = document.getElementById('float-whatsapp');
    if (existing) return;

    var waPhone = (window.SITE_CONFIG && window.SITE_CONFIG.whatsappNumber) || '94768056036';

    var btn = document.createElement('a');
    btn.href = 'https://wa.me/' + waPhone;
    btn.id = 'float-whatsapp';
    btn.className = 'floating-whatsapp-btn desktop-only';
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
    btn.setAttribute('data-track', 'whatsapp_order');
    btn.setAttribute('data-location', 'floating-button');

    btn.innerHTML = '<svg class="icon-wa" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.149.929 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.16-.175.348-.217.464-.217.116 0 .232.002.333.007.107.005.249-.041.39.299.144.348.492 1.2.535 1.288.043.087.072.188.014.304-.058.116-.087.188-.174.29-.087.101-.184.227-.262.305-.088.087-.18.182-.077.359.101.174.453.748.972 1.211.668.596 1.232.78 1.406.867.174.087.275.072.377-.044.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1 1.025z"/></svg>';

    document.body.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderHeader();
    renderFooter();
    renderMobileBottomBar();
    renderFloatingWhatsApp();

    // Trigger cart badge refresh if CartService is ready
    if (window.CartService && window.CartService.updateBadge) {
      window.CartService.updateBadge();
    }
  });

  window.LayoutService = {
    renderHeader: renderHeader,
    renderFooter: renderFooter
  };
})();
