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

    // ----- Feature Tabs + Carousel -----
    const featureTabs = document.querySelectorAll('.feature-tab');
    const phoneCarousels = document.querySelectorAll('.phone-carousel');
    let carouselTimer = null;

    function switchFeature(index) {
        // Update tabs
        featureTabs.forEach(t => t.classList.remove('is-active'));
        featureTabs[index].classList.add('is-active');

        // Update carousels
        phoneCarousels.forEach(c => c.classList.remove('is-active'));
        phoneCarousels[index].classList.add('is-active');

        // Reset carousel to first slide
        const activeCarousel = phoneCarousels[index];
        const slides = activeCarousel.querySelectorAll('.phone-carousel__slide');
        const dots = activeCarousel.querySelectorAll('.carousel-dot');
        const labels = activeCarousel.querySelectorAll('.carousel-label');
        if (slides.length > 0) {
            slides.forEach(s => s.classList.remove('is-active'));
            dots.forEach(d => d.classList.remove('is-active'));
            labels.forEach(l => l.classList.remove('is-active'));
            slides[0].classList.add('is-active');
            if (dots[0]) dots[0].classList.add('is-active');
            if (labels[0]) labels[0].classList.add('is-active');
        }

        // Restart auto-rotation
        startCarouselRotation(index);
    }

    function startCarouselRotation(featureIndex) {
        clearInterval(carouselTimer);
        const carousel = phoneCarousels[featureIndex];
        const slides = carousel.querySelectorAll('.phone-carousel__slide');
        if (slides.length <= 1) return;

        carouselTimer = setInterval(() => {
            const currentSlide = carousel.querySelector('.phone-carousel__slide.is-active');
            const currentDot = carousel.querySelector('.carousel-dot.is-active');
            const currentLabel = carousel.querySelector('.carousel-label.is-active');
            const slidesArr = Array.from(slides);
            const currentIdx = slidesArr.indexOf(currentSlide);
            const nextIdx = (currentIdx + 1) % slidesArr.length;

            slidesArr.forEach(s => s.classList.remove('is-active'));
            carousel.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('is-active'));
            carousel.querySelectorAll('.carousel-label').forEach(l => l.classList.remove('is-active'));

            slidesArr[nextIdx].classList.add('is-active');
            const dots = carousel.querySelectorAll('.carousel-dot');
            const labels = carousel.querySelectorAll('.carousel-label');
            if (dots[nextIdx]) dots[nextIdx].classList.add('is-active');
            if (labels[nextIdx]) labels[nextIdx].classList.add('is-active');
        }, 3000);
    }

    // Tab click handlers
    featureTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => switchFeature(i));
    });

    // Dot click handlers
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const carousel = dot.closest('.phone-carousel');
            const slideIdx = parseInt(dot.dataset.slide, 10);
            const slides = carousel.querySelectorAll('.phone-carousel__slide');
            const dots = carousel.querySelectorAll('.carousel-dot');
            const labels = carousel.querySelectorAll('.carousel-label');

            slides.forEach(s => s.classList.remove('is-active'));
            dots.forEach(d => d.classList.remove('is-active'));
            labels.forEach(l => l.classList.remove('is-active'));

            slides[slideIdx].classList.add('is-active');
            dots[slideIdx].classList.add('is-active');
            if (labels[slideIdx]) labels[slideIdx].classList.add('is-active');

            // Restart timer
            const featureIdx = parseInt(carousel.dataset.feature, 10);
            startCarouselRotation(featureIdx);
        });
    });

    // Start auto-rotation for the first (active) feature
    if (phoneCarousels.length > 0) {
        startCarouselRotation(0);
    }

    // ----- Mumbai Local Train Sound -----
    var trainAudio = document.getElementById('trainAudio');
    var trainSoundBtn = document.getElementById('trainSoundBtn');
    var soundIcon = trainSoundBtn ? trainSoundBtn.querySelector('.train-ctrl-icon--sound') : null;
    var muteIcon = trainSoundBtn ? trainSoundBtn.querySelector('.train-ctrl-icon--mute') : null;

    if (trainSoundBtn && trainAudio) {
        trainAudio.loop = true;

        trainSoundBtn.addEventListener('click', function () {
            if (trainAudio.paused) {
                trainAudio.play();
                trainSoundBtn.classList.add('is-active');
                muteIcon.style.display = 'none';
                soundIcon.style.display = 'block';
            } else {
                trainAudio.pause();
                trainSoundBtn.classList.remove('is-active');
                soundIcon.style.display = 'none';
                muteIcon.style.display = 'block';
            }
        });
    }

    // ----- Train Animation Play/Pause -----
    var trainToggleBtn = document.getElementById('trainToggleBtn');
    var trainSvg = document.querySelector('.train-svg');
    var pauseIcon = trainToggleBtn ? trainToggleBtn.querySelector('.train-ctrl-icon--pause') : null;
    var playIcon = trainToggleBtn ? trainToggleBtn.querySelector('.train-ctrl-icon--play') : null;
    var trainPaused = false;

    if (trainToggleBtn && trainSvg) {
        trainToggleBtn.addEventListener('click', function () {
            if (trainPaused) {
                trainSvg.unpauseAnimations();
                trainPaused = false;
                trainToggleBtn.classList.remove('is-active');
                pauseIcon.style.display = 'block';
                playIcon.style.display = 'none';
            } else {
                trainSvg.pauseAnimations();
                trainPaused = true;
                trainToggleBtn.classList.add('is-active');
                pauseIcon.style.display = 'none';
                playIcon.style.display = 'block';
                // Also stop the audio if playing
                if (trainAudio && !trainAudio.paused) {
                    trainAudio.pause();
                    trainSoundBtn.classList.remove('is-active');
                    soundIcon.style.display = 'none';
                    muteIcon.style.display = 'block';
                }
            }
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
