/**
 * SIXTEEN MART — 4-Slide Coverflow Hero Slider
 * Features smooth 3D coverflow peeking slides, glass navigation, responsive swipe, and GA4 promotion tracking.
 */
(function() {
  'use strict';

  var SLIDES_DATA = [
    {
      index: 1,
      image: 'images/web-banner-1.jpg',
      link: 'products.html',
      promoId: 'promo-brand-intro',
      promoName: 'Brand Intro — Always More Value',
      alt: '16 Mart — Always More Value',
      slot: 'hero_slide_1'
    },
    {
      index: 2,
      image: 'images/web-banner-2.jpg',
      link: 'home-gadgets.html',
      promoId: 'promo-home-gadgets',
      promoName: 'Home & Gadgets Feature',
      alt: 'Home & Gadgets at 16 Mart',
      slot: 'hero_slide_2'
    },
    {
      index: 3,
      image: 'images/web-banner-3.jpg',
      link: 'skin-care-tools.html',
      promoId: 'promo-beauty-tools',
      promoName: 'Beauty Tools Feature',
      alt: 'Skin care and hair care tools at 16 Mart',
      slot: 'hero_slide_3'
    },
    {
      index: 4,
      image: 'images/web-banner-4.jpg',
      link: 'home-gadgets.html',
      promoId: 'promo-30off-home-gadgets',
      promoName: '30% OFF Home & Gadgets Special Offer',
      alt: '30% off Home & Gadgets at 16 Mart',
      slot: 'hero_slide_4'
    }
  ];

  var currentIndex = 0;
  var intervalTimer = null;
  var isPaused = false;
  var trackContainer = null;
  var dotsContainer = null;
  var slideElements = [];
  var dotElements = [];

  function getIntervalMs() {
    return (window.SITE_CONFIG && window.SITE_CONFIG.slideIntervalMs) || 5000;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function renderHeroSlider() {
    var heroRoot = document.getElementById('hero-slider-container');
    if (!heroRoot) return;

    var html = '<div class="hero-coverflow-wrapper" id="hero-slider" aria-roledescription="carousel" aria-label="Featured Promotions">' +
      '<div class="hero-slides-viewport">' +
        '<div class="hero-slides-track" id="hero-slides-track">';

    SLIDES_DATA.forEach(function(slide, idx) {
      var isFirst = idx === 0;
      var loadingAttr = isFirst ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
      html += '<div class="hero-slide" data-slide-index="' + idx + '" role="group" aria-roledescription="slide" aria-label="' + (idx + 1) + ' of ' + SLIDES_DATA.length + '" aria-hidden="' + (!isFirst) + '">' +
        '<a href="' + slide.link + '" class="hero-slide-hotspot" id="hero-slide-' + slide.index + '" ' +
          'data-track="select_promotion" data-promo-id="' + slide.promoId + '" data-promo-name="' + slide.promoName + '" data-promo-slot="' + slide.slot + '" ' +
          'aria-label="' + slide.alt + '">' +
          '<img src="' + slide.image + '" alt="' + slide.alt + '" class="hero-slide-img" width="1280" height="720" ' + loadingAttr + ' />' +
          '<div class="hero-slide-overlay"></div>' +
        '</a>' +
      '</div>';
    });

    html += '</div></div>' +
      '<button type="button" class="hero-nav-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous Slide">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
      '</button>' +
      '<button type="button" class="hero-nav-arrow hero-arrow-next" id="hero-next" aria-label="Next Slide">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
      '</button>' +
      '<div class="hero-dots-container" id="hero-dots">';

    SLIDES_DATA.forEach(function(slide, idx) {
      html += '<button type="button" class="hero-dot ' + (idx === 0 ? 'active' : '') + '" id="hero-dot-' + slide.index + '" data-slide-index="' + idx + '" aria-label="Go to slide ' + (idx + 1) + '" aria-current="' + (idx === 0 ? 'true' : 'false') + '"></button>';
    });

    html += '</div></div>';

    heroRoot.innerHTML = html;

    trackContainer = document.getElementById('hero-slides-track');
    slideElements = Array.from(heroRoot.querySelectorAll('.hero-slide'));
    dotsContainer = document.getElementById('hero-dots');
    dotElements = Array.from(heroRoot.querySelectorAll('.hero-dot'));

    setupEventListeners(heroRoot);
    updateSliderPositions(0, false);
    startAutoplay();

    // Track first promotion view
    if (window.trackViewPromotion) {
      window.trackViewPromotion(SLIDES_DATA[0].promoId, SLIDES_DATA[0].promoName, SLIDES_DATA[0].slot);
    }
  }

  function updateSliderPositions(index, animate) {
    var total = SLIDES_DATA.length;
    currentIndex = ((index % total) + total) % total;

    slideElements.forEach(function(el, idx) {
      el.classList.remove('slide-active', 'slide-prev', 'slide-next', 'slide-hidden');
      var diff = idx - currentIndex;

      // Handle wrapping for 4 slides
      if (diff === 1 || diff === -(total - 1)) {
        el.classList.add('slide-next');
        el.setAttribute('aria-hidden', 'true');
      } else if (diff === -1 || diff === (total - 1)) {
        el.classList.add('slide-prev');
        el.setAttribute('aria-hidden', 'true');
      } else if (diff === 0) {
        el.classList.add('slide-active');
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.classList.add('slide-hidden');
        el.setAttribute('aria-hidden', 'true');
      }
    });

    dotElements.forEach(function(dot, idx) {
      var isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // Fire view_promotion analytics
    var currentPromo = SLIDES_DATA[currentIndex];
    if (window.trackViewPromotion && currentPromo) {
      window.trackViewPromotion(currentPromo.promoId, currentPromo.promoName, currentPromo.slot);
    }
  }

  function nextSlide() {
    updateSliderPositions(currentIndex + 1, true);
  }

  function prevSlide() {
    updateSliderPositions(currentIndex - 1, true);
  }

  function goToSlide(idx) {
    updateSliderPositions(idx, true);
  }

  function startAutoplay() {
    if (prefersReducedMotion()) return;
    stopAutoplay();
    intervalTimer = setInterval(function() {
      if (!isPaused) {
        nextSlide();
      }
    }, getIntervalMs());
  }

  function stopAutoplay() {
    if (intervalTimer) {
      clearInterval(intervalTimer);
      intervalTimer = null;
    }
  }

  function setupEventListeners(heroRoot) {
    var prevBtn = document.getElementById('hero-prev');
    var nextBtn = document.getElementById('hero-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
      });
    }

    dotElements.forEach(function(dot) {
      dot.addEventListener('click', function(e) {
        e.preventDefault();
        var targetIdx = parseInt(dot.getAttribute('data-slide-index'), 10);
        goToSlide(targetIdx);
      });
    });

    // Clicking dimmed side slides brings them to center
    slideElements.forEach(function(slideEl) {
      slideEl.addEventListener('click', function(e) {
        if (slideEl.classList.contains('slide-prev')) {
          e.preventDefault();
          prevSlide();
        } else if (slideEl.classList.contains('slide-next')) {
          e.preventDefault();
          nextSlide();
        }
      });
    });

    // Hover & focus pausing
    heroRoot.addEventListener('mouseenter', function() { isPaused = true; });
    heroRoot.addEventListener('mouseleave', function() { isPaused = false; });
    heroRoot.addEventListener('focusin', function() { isPaused = true; });
    heroRoot.addEventListener('focusout', function() { isPaused = false; });

    // Touch swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    heroRoot.addEventListener('touchstart', function(e) {
      isPaused = true;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroRoot.addEventListener('touchend', function(e) {
      isPaused = false;
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });

    // Keyboard navigation
    heroRoot.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderHeroSlider();
  });

  window.HeroSlider = {
    render: renderHeroSlider,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide
  };
})();
