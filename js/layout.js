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
    '</header>' +

    // Mobile Drawer Panel (rendered outside <header> so backdrop-filter does not clip or trap it)
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
    '</div>';

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
        var firstFocusable = drawer ? drawer.querySelector('button, input, a') : null;
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

    // Delegated click as reliable touch / dynamic fallback
    document.addEventListener('click', function(e) {
      if (e.target.closest('#nav-hamburger')) {
        e.preventDefault();
        openDrawer();
      }
    });

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
        accordionBtn.classList.toggle('active', isOpen);
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

  var OFFICIAL_SVGS = {
    facebook: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
  };

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
                OFFICIAL_SVGS.facebook +
              '</a>' +
              '<a href="https://www.instagram.com/_16.mart_onlinestore?stkn=MWQ0cXRsaTF0YXIxNw==" class="social-circle-btn" id="footer-social-instagram" target="_blank" rel="noopener" aria-label="Instagram" data-track="social_click" data-network="instagram">' +
                OFFICIAL_SVGS.instagram +
              '</a>' +
              '<a href="https://www.tiktok.com/@sixteenmart1?_r=1&_t=ZS-99h4W7jognR" class="social-circle-btn" id="footer-social-tiktok" target="_blank" rel="noopener" aria-label="TikTok" data-track="social_click" data-network="tiktok">' +
                OFFICIAL_SVGS.tiktok +
              '</a>' +
              '<a href="https://wa.me/' + waPhone + '?text=Hi%20SIXTEEN%20MART,%20I%20have%20an%20inquiry." class="social-circle-btn" id="footer-social-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp" data-track="social_click" data-network="whatsapp">' +
                OFFICIAL_SVGS.whatsapp +
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
              OFFICIAL_SVGS.whatsapp +
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
        '<div class="icon-tab-wa">' + OFFICIAL_SVGS.whatsapp + '</div>' +
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

    btn.innerHTML = OFFICIAL_SVGS.whatsapp;

    document.body.appendChild(btn);
  }

  // Sticky glass header scroll strengthener
  window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.site-header-navbar');
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

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
