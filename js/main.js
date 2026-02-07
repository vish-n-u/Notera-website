/* =============================================
   NOTERA LANDING PAGE - JAVASCRIPT
   ============================================= */

(function () {
    'use strict';

    // ----- Scroll Animation Observer -----
    const animateObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    animateObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
        animateObserver.observe(el);
    });

    // ----- Navbar Scroll Effect -----
    const navbar = document.getElementById('navbar');
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 60) {
                    navbar.classList.add('nav--scrolled');
                } else {
                    navbar.classList.remove('nav--scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ----- Mobile Nav Toggle -----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            navLinks.classList.toggle('is-open');
            document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('is-active');
                navLinks.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ----- Smooth Scroll for Anchor Links -----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });
})();
