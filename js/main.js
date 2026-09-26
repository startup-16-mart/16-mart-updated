/**
 * SIXTEEN MART — Main JavaScript
 * Handles navigation, mobile menu, search, filtering, and page interactions.
 */
(function() {
    'use strict';

    /**
     * Set active nav link based on current page pathname
     */
    function initActiveNav() {
        var currentPath = window.location.pathname;
        var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

        var navLinks = document.querySelectorAll('nav .nav-link, .footer-column a');
        navLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) return;

            var linkPage = href.split('?')[0].split('#')[0];
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    /**
     * Header scroll shadow effect
     */
    function initHeaderScroll() {
        var header = document.querySelector('header');
        if (!header) return;

        function checkScroll() {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    /**
     * Mobile Menu Navigation Drawer
     */
    function initMobileMenu() {
        var menuBtn = document.getElementById('mobileMenuBtn');
        var mainNav = document.getElementById('mainNav');
        if (!menuBtn || !mainNav) return;

        function toggleMenu() {
            var isOpen = mainNav.classList.toggle('mobile-open');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        }

        function closeMenu() {
            mainNav.classList.remove('mobile-open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open navigation menu');
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }

        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking any nav link (except dropdown toggles)
        var navLinks = mainNav.querySelectorAll('a:not(.dropdown-toggle)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close on window resize if expanded
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('mobile-open')) {
                closeMenu();
            }
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Dropdown accordions on mobile
        var dropdownToggles = mainNav.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    var parentDropdown = toggle.closest('.dropdown');
                    if (parentDropdown) {
                        parentDropdown.classList.toggle('mobile-open');
                    }
                }
            });
        });

        var categoryToggles = mainNav.querySelectorAll('.category-dropdown > a');
        categoryToggles.forEach(function(catToggle) {
            catToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    var parentCat = catToggle.closest('.category-dropdown');
                    if (parentCat) {
                        parentCat.classList.toggle('mobile-open');
                    }
                }
            });
        });
    }

    /**
     * Global Header Search Handling
     */
    function initHeaderSearch() {
        var searchForms = document.querySelectorAll('.search-box');
        searchForms.forEach(function(box) {
            var input = box.querySelector('input');
            var btn = box.querySelector('.search-btn');
            if (!input) return;

            function doSearch() {
                var query = input.value.trim();
                var isProductsPage = window.location.pathname.indexOf('products.html') !== -1;

                if (isProductsPage) {
                    if (window.applyCatalogSearch) {
                        window.applyCatalogSearch(query);
                    }
                } else {
                    if (query) {
                        window.location.href = 'products.html?search=' + encodeURIComponent(query);
                    } else {
                        window.location.href = 'products.html';
                    }
                }
            }

            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    doSearch();
                });
            }

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    doSearch();
                }
            });
        });
    }

    /**
     * Contact Form WhatsApp Link Generator (for contact.html)
     */
    function initContactForm() {
        var contactForm = document.getElementById('contactWhatsAppForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = (document.getElementById('contactName') || {}).value || '';
            var topic = (document.getElementById('contactTopic') || {}).value || 'General Inquiry';
            var message = (document.getElementById('contactMessage') || {}).value || '';

            var waText = [
                'Hello SIXTEEN MART! 👋',
                '',
                'Name: ' + name,
                'Inquiry Regarding: ' + topic,
                '',
                'Message:',
                message
            ].join('\n');

            var url = 'https://wa.me/94768056036?text=' + encodeURIComponent(waText);
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    /**
     * Hero Slider (5 Full-Bleed Banners matching reference implementation)
     */
    function initHeroSlider() {
        var slider = document.querySelector('.hero-slider');
        var slides = document.querySelectorAll('.hero-slide');
        var dots = document.querySelectorAll('.hero-dot');
        var prevBtn = document.getElementById('heroPrevBtn');
        var nextBtn = document.getElementById('heroNextBtn');

        if (!slider || !slides.length) return;

        var currentSlide = 0;
        var totalSlides = slides.length;
        var slideTimer = null;
        var slideCleanup = null;
        var SLIDE_INTERVAL = 4000;

        window.showHeroSlide = function(index, dir) {
            var n = slides.length;
            if (!n) return;
            var next = ((index % n) + n) % n;
            if (next === currentSlide) return;

            dir = dir || (index > currentSlide ? 1 : -1);
            var from = slides[currentSlide];
            var to = slides[next];

            clearTimeout(slideCleanup);
            slides.forEach(function(s) {
                if (s !== from) {
                    s.classList.remove('to-left', 'to-right', 'from-left', 'from-right');
                }
            });

            to.classList.add(dir > 0 ? 'from-right' : 'from-left');
            void to.offsetWidth; // Force reflow
            to.classList.remove('from-left', 'from-right');
            to.classList.add('active');

            from.classList.remove('active');
            from.classList.add(dir > 0 ? 'to-left' : 'to-right');

            slideCleanup = setTimeout(function() {
                from.classList.remove('to-left', 'to-right');
            }, 700);

            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === next);
            });

            currentSlide = next;
        };

        window.nextHeroSlide = function() {
            window.showHeroSlide(currentSlide + 1, 1);
            resetAutoSlide();
        };

        window.previousHeroSlide = function() {
            window.showHeroSlide(currentSlide - 1, -1);
            resetAutoSlide();
        };

        function startAutoSlide() {
            clearInterval(slideTimer);
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            slideTimer = setInterval(function() {
                window.showHeroSlide(currentSlide + 1, 1);
            }, SLIDE_INTERVAL);
        }

        function resetAutoSlide() {
            startAutoSlide();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.previousHeroSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.nextHeroSlide();
            });
        }

        dots.forEach(function(dot, idx) {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                var dir = idx > currentSlide ? 1 : -1;
                window.showHeroSlide(idx, dir);
                resetAutoSlide();
            });
        });

        // Pause on mouse hover
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideTimer);
        });
        slider.addEventListener('mouseleave', function() {
            startAutoSlide();
        });

        // Touch / pointer swipe handling (smooth swipe gesture)
        slider.style.touchAction = 'pan-y';
        var sx = 0, sy = 0, lastDx = 0, pid = null, dragging = false, decided = false, busy = false;
        var samples = [];
        var neighbor = null, neighborIdx = -1;

        function getSlidesArray() {
            return Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
        }

        function place(dx) {
            var allSlides = getSlidesArray();
            var n = allSlides.length;
            var cur = allSlides[currentSlide];
            var W = slider.clientWidth;
            var dir = dx < 0 ? 1 : -1;
            var idx = (currentSlide + dir + n) % n;

            if (idx !== neighborIdx) {
                if (neighbor) {
                    neighbor.style.visibility = '';
                    neighbor.style.transform = '';
                    neighbor.style.transition = '';
                }
                neighbor = allSlides[idx];
                neighborIdx = idx;
                neighbor.style.transition = 'none';
                neighbor.style.visibility = 'visible';
            }
            cur.style.transition = 'none';
            cur.style.transform = 'translateX(' + dx + 'px)';
            neighbor.style.transform = 'translateX(' + (dir * W + dx) + 'px)';
        }

        function settle(commit, dx) {
            if (!neighbor) return;
            var allSlides = getSlidesArray();
            var cur = allSlides[currentSlide];
            var nb = neighbor;
            var idx = neighborIdx;
            var W = slider.clientWidth;
            var dir = dx < 0 ? 1 : -1;
            busy = true;

            void cur.offsetWidth;
            var ease = 'transform .38s cubic-bezier(.22,.8,.25,1)';
            cur.style.transition = ease;
            nb.style.transition = ease;
            cur.style.transform = commit ? 'translateX(' + (-dir * W) + 'px)' : 'translateX(0px)';
            nb.style.transform = commit ? 'translateX(0px)' : 'translateX(' + (dir * W) + 'px)';

            setTimeout(function() {
                if (commit) {
                    cur.classList.remove('active');
                    nb.classList.add('active');
                    dots.forEach(function(d, i) {
                        d.classList.toggle('active', i === idx);
                    });
                    currentSlide = idx;
                }
                allSlides.forEach(function(s) {
                    s.style.transform = '';
                    s.style.transition = '';
                    s.style.visibility = '';
                });
                neighbor = null;
                neighborIdx = -1;
                busy = false;
                startAutoSlide();
            }, 400);
        }

        function endDrag(e, cancelled) {
            if (e.pointerId !== pid) return;
            pid = null;
            if (!dragging) return;
            dragging = false;

            var a = samples[0];
            var b = samples[samples.length - 1];
            var v = (b && a && b.t > a.t) ? (b.x - a.x) / (b.t - a.t) : 0;
            var flick = Math.abs(v) > 0.45 && Math.abs(lastDx) > 24 && Math.sign(v) === Math.sign(lastDx);
            settle(!cancelled && (Math.abs(lastDx) > slider.clientWidth * 0.2 || flick), lastDx);
        }

        slider.addEventListener('pointerdown', function(e) {
            if (busy || slides.length < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
            sx = e.clientX;
            sy = e.clientY;
            lastDx = 0;
            pid = e.pointerId;
            dragging = false;
            decided = false;
            samples = [{ x: e.clientX, t: e.timeStamp }];
        });

        slider.addEventListener('pointermove', function(e) {
            if (e.pointerId !== pid || busy) return;
            var dx = e.clientX - sx;
            var dy = e.clientY - sy;

            if (!decided) {
                if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
                decided = true;
                if (Math.abs(dx) <= Math.abs(dy)) {
                    pid = null;
                    return; // vertical scroll allowed
                }
                dragging = true;
                clearInterval(slideTimer);
                clearTimeout(slideCleanup);
                slider.setPointerCapture(e.pointerId);
            }

            if (!dragging) return;
            lastDx = dx;
            samples.push({ x: e.clientX, t: e.timeStamp });
            if (samples.length > 6) samples.shift();
            place(dx);
        });

        slider.addEventListener('pointerup', function(e) {
            endDrag(e, false);
        });

        slider.addEventListener('pointercancel', function(e) {
            endDrag(e, true);
        });

        startAutoSlide();
    }

    // Initialize all components on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initActiveNav();
        initHeaderScroll();
        initMobileMenu();
        initHeaderSearch();
        initContactForm();
        initHeroSlider();
    });
})();
