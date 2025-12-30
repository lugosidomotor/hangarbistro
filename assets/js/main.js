/**
 * Main JavaScript
 * - Cookie Consent & Google Analytics
 * - Social Share Functions
 * - Floating CTA button
 * - Lazy loading fallback
 * - General utilities
 */

// ========== SOCIAL SHARE FUNCTIONS (Global) ==========

function shareOnFacebook() {
  var url = encodeURIComponent(window.location.href);
  var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  window.open(shareUrl, 'facebook-share', 'width=550,height=420,scrollbars=yes');
}

function shareOnTwitter() {
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  window.open(shareUrl, 'twitter-share', 'width=550,height=420,scrollbars=yes');
}

function shareOnLinkedIn() {
  var url = encodeURIComponent(window.location.href);
  var shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
  window.open(shareUrl, 'linkedin-share', 'width=550,height=420,scrollbars=yes');
}

function copyPageLink() {
  var copyBtn = document.querySelector('.share-btn--copy');
  var iconLink = copyBtn.querySelector('.icon-link');
  var iconCheck = copyBtn.querySelector('.icon-check');

  navigator.clipboard.writeText(window.location.href).then(function() {
    // Show success feedback
    copyBtn.classList.add('is-copied');
    iconLink.style.display = 'none';
    iconCheck.style.display = 'block';

    // Reset after 2 seconds
    setTimeout(function() {
      copyBtn.classList.remove('is-copied');
      iconLink.style.display = 'block';
      iconCheck.style.display = 'none';
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy link:', err);
  });
}

(function () {
  'use strict';

  // ========== COOKIE CONSENT & GOOGLE ANALYTICS ==========

  var COOKIE_CONSENT_KEY = 'cookieConsent';
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 Measurement ID

  function initCookieConsent() {
    var banner = document.getElementById('cookie-consent');
    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (!banner) return;

    var consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    // If no consent stored, show banner
    if (!consent) {
      setTimeout(function() {
        banner.classList.add('is-visible');
        banner.setAttribute('aria-hidden', 'false');
      }, 1000); // Delay for better UX
    } else if (consent === 'accepted') {
      // User already accepted, load GA
      loadGoogleAnalytics();
    }

    // Accept button handler
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        hideBanner();
        loadGoogleAnalytics();
      });
    }

    // Decline button handler
    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        hideBanner();
      });
    }

    function hideBanner() {
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  function loadGoogleAnalytics() {
    // Check if already loaded
    if (window.gtag) return;

    // Create and append gtag script
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true
    });

    console.log('Google Analytics loaded');
  }

  // ========== INJECT COOKIE BANNER & SHARE BUTTONS ==========

  function injectCookieBanner() {
    // Check if already exists
    if (document.getElementById('cookie-consent')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-consent';
    banner.className = 'cookie-banner';
    banner.setAttribute('aria-hidden', 'true');
    banner.innerHTML = '<div class="cookie-banner__content">' +
      '<div class="cookie-banner__text">' +
      '<p class="cookie-banner__title">Sütik használata</p>' +
      '<p class="cookie-banner__description">Weboldalunk sütiket használ a felhasználói élmény javítása és a forgalom elemzése érdekében. A "Rendben" gombra kattintva hozzájárulsz a sütik használatához.</p>' +
      '</div>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" id="cookie-accept" class="btn btn-primary btn-sm">Rendben</button>' +
      '<button type="button" id="cookie-decline" class="btn btn-secondary btn-sm">Elutasítom</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(banner);
  }

  function injectShareButtons() {
    // Check if already exists
    if (document.getElementById('share-buttons')) return;

    var shareDiv = document.createElement('div');
    shareDiv.className = 'share-buttons';
    shareDiv.id = 'share-buttons';
    shareDiv.innerHTML = '<span class="share-buttons__label">Megosztás</span>' +
      '<button type="button" class="share-btn share-btn--facebook" onclick="shareOnFacebook()" aria-label="Megosztás Facebookon">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
      '</button>' +
      '<button type="button" class="share-btn share-btn--twitter" onclick="shareOnTwitter()" aria-label="Megosztás X-en">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
      '</button>' +
      '<button type="button" class="share-btn share-btn--linkedin" onclick="shareOnLinkedIn()" aria-label="Megosztás LinkedInen">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
      '</button>' +
      '<button type="button" class="share-btn share-btn--copy" onclick="copyPageLink()" aria-label="Link másolása">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-check" style="display:none;"><polyline points="20 6 9 17 4 12"/></svg>' +
      '</button>';
    document.body.appendChild(shareDiv);
  }

  // Inject elements on page load
  injectCookieBanner();
  injectShareButtons();

  // Initialize cookie consent
  initCookieConsent();

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
