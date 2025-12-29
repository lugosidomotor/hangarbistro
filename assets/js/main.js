/**
 * Main JavaScript
 * - Floating CTA button
 * - Lazy loading fallback
 * - General utilities
 */

(function () {
  'use strict';

  // ========== Floating CTA Button ==========
  const floatingCta = document.getElementById('floating-cta');

  if (floatingCta) {
    window.addEventListener('scroll', function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Show floating CTA after scrolling 300px
      if (scrollTop > 300) {
        floatingCta.classList.add('is-visible');
      } else {
        floatingCta.classList.remove('is-visible');
      }
    });
  }


  // ========== Lazy Loading Fallback (for older browsers) ==========
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading, nothing to do
  } else {
    // Fallback for older browsers using Intersection Observer
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            observer.unobserve(img);
          }
        });
      });

      images.forEach(function (img) {
        imageObserver.observe(img);
      });
    } else {
      // Very old browser, just load all images
      images.forEach(function (img) {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    }
  }


  // ========== External Links (open in new tab) ==========
  const externalLinks = document.querySelectorAll('a[href^="http"]');

  externalLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    const hostname = link.hostname;

    // Check if link is external (not same domain)
    if (hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });


  // ========== Phone Number Click-to-Call Analytics (optional) ==========
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

  phoneLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Log phone click event (can be used with analytics)
      console.log('Phone number clicked:', this.getAttribute('href'));

      // If you use Google Analytics:
      // gtag('event', 'click_to_call', {
      //   'event_category': 'engagement',
      //   'event_label': this.getAttribute('href')
      // });
    });
  });


  // ========== Email Link Analytics (optional) ==========
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

  emailLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Log email click event
      console.log('Email link clicked:', this.getAttribute('href'));

      // If you use Google Analytics:
      // gtag('event', 'email_click', {
      //   'event_category': 'engagement',
      //   'event_label': this.getAttribute('href')
      // });
    });
  });

  // ========== CTA Banner Parallax Background ==========
  const ctaBanners = document.querySelectorAll('.cta-banner');
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (ctaBanners.length && !prefersReducedMotion) {
    let ticking = false;

    const updateCtaParallax = function () {
      ticking = false;
      const viewportH = window.innerHeight || document.documentElement.clientHeight;

      ctaBanners.forEach(function (banner) {
        const rect = banner.getBoundingClientRect();

        // Skip if far outside viewport (perf)
        if (rect.bottom < -200 || rect.top > viewportH + 200) return;

        // Parallax offset relative to viewport center
        const delta = rect.top - viewportH / 2;
        const y = -delta * 0.08;

        banner.style.setProperty('--cta-parallax', `${y}px`);
      });
    };

    const requestTick = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateCtaParallax);
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    requestTick();
  }


  // ========== Form Focus Management ==========
  const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

  formInputs.forEach(function (input) {
    input.addEventListener('focus', function () {
      this.parentElement.classList.add('is-focused');
    });

    input.addEventListener('blur', function () {
      this.parentElement.classList.remove('is-focused');
    });
  });


  // ========== Scroll Reveal Animations ==========
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  // Respect reduced-motion preference
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(function (element) {
      element.classList.add('revealed');
    });
  }


  // ========== Navbar Scroll Effect ==========
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > 100) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }


  // ========== Smooth Parallax for Hero ==========
  const heroParallax = document.querySelector('.parallax-layer--bg');

  if (heroParallax && !prefersReducedMotion) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.35;
      heroParallax.style.transform = `scale(1.1) translateY(${rate}px)`;
    }, { passive: true });
  }


  // ========== Console Log (for debugging) ==========
  console.log('Hangár Bistro - Main JS loaded successfully');
  console.log('Environment:', window.location.hostname);

})();
