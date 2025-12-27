/**
 * Navigation JavaScript
 * - Mobile hamburger menu
 * - Smooth scroll
 * - Sticky navbar behavior
 */

(function () {
  'use strict';

  // ========== Mobile Menu Toggle ==========
  const navToggle = document.querySelector('.navbar__toggle');
  const navMobile = document.querySelector('.navbar__mobile');
  const navBackdrop = document.querySelector('.navbar__backdrop');
  const navMobileClose = document.querySelector('.navbar__mobile-close');
  const navMobileLinks = document.querySelectorAll('.navbar__mobile-link');

  function openMobileMenu() {
    navToggle.classList.add('navbar__toggle--active');
    navToggle.setAttribute('aria-expanded', 'true');
    navMobile.classList.add('navbar__mobile--active');
    navMobile.setAttribute('aria-hidden', 'false');
    navBackdrop.classList.add('navbar__backdrop--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('navbar__toggle--active');
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.classList.remove('navbar__mobile--active');
    navMobile.setAttribute('aria-hidden', 'true');
    navBackdrop.classList.remove('navbar__backdrop--active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navMobileClose) {
    navMobileClose.addEventListener('click', closeMobileMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking a link
  navMobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });


  // ========== Smooth Scroll ==========
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore if href is empty / just "#"
      if (!href || href === '#' || href === '/#') {
        return;
      }

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex); // e.g. "#kapcsolat"
      const target = document.querySelector(hash);

      if (target) {
        e.preventDefault();

        // Calculate offset (navbar height)
        const navbarEl = document.querySelector('.navbar');
        const navbarHeight = navbarEl ? navbarEl.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Keep the hash in the URL (for copy/paste)
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', hash);
        }

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });


  // ========== Sticky Navbar Shadow ==========
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 10) {
      navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
      navbar.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });


  // ========== Active Link Highlighting ==========
  const navLinks = document.querySelectorAll('.navbar__link');
  const currentUrl = new URL(window.location.href);

  function canonicalizePathname(pathname) {
    if (!pathname) return '';
    let p = pathname;
    p = p.replace(/\/+$/, '');
    p = p.replace(/\/index\.html$/, '');
    return p;
  }

  navLinks.forEach(function (link) {
    link.classList.remove('navbar__link--active');
  });

  // Same for mobile links
  const navMobileLinksAll = document.querySelectorAll('.navbar__mobile-link');

  navMobileLinksAll.forEach(function (link) {
    link.classList.remove('navbar__mobile-link--active');
  });

  // Highlight active link (supports relative hrefs + GitHub Pages subpaths)
  function setActiveLinks(links, activeClass) {
    const currentPath = canonicalizePathname(currentUrl.pathname);
    const currentHash = currentUrl.hash || '';

    // Prefer hash-matching links when there is a hash in the URL
    let hasHashMatch = false;
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkUrl = new URL(href, currentUrl);

      const linkPath = canonicalizePathname(linkUrl.pathname);
      const linkHash = linkUrl.hash || '';

      if (currentHash && linkHash && linkPath === currentPath && linkHash === currentHash) {
        hasHashMatch = true;
      }
    });

    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkUrl = new URL(href, currentUrl);

      const linkPath = canonicalizePathname(linkUrl.pathname);
      const linkHash = linkUrl.hash || '';

      const pathMatches = linkPath === currentPath;
      const hashMatches = !linkHash || linkHash === currentHash;

      const isActive = hasHashMatch ? (pathMatches && linkHash && linkHash === currentHash) : (pathMatches && hashMatches);

      if (isActive) link.classList.add(activeClass);
      else link.classList.remove(activeClass);
    });
  }

  setActiveLinks(navLinks, 'navbar__link--active');
  setActiveLinks(navMobileLinksAll, 'navbar__mobile-link--active');

})();
