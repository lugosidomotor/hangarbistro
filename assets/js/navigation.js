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
  const currentPath = window.location.pathname;

  navLinks.forEach(function (link) {
    const linkPath = link.getAttribute('href');

    // Check if current page matches link
    if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
      link.classList.add('navbar__link--active');
    } else {
      link.classList.remove('navbar__link--active');
    }
  });

  // Same for mobile links
  const navMobileLinksAll = document.querySelectorAll('.navbar__mobile-link');
  navMobileLinksAll.forEach(function (link) {
    const linkPath = link.getAttribute('href');

    if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
      link.classList.add('navbar__mobile-link--active');
    } else {
      link.classList.remove('navbar__mobile-link--active');
    }
  });

})();
