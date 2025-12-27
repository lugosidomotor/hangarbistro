/**
 * Sticky Mobile CTA
 * - Shows sticky phone/email buttons on mobile after scrolling
 */

(function () {
  'use strict';

  function initStickyCTA() {
    const stickyCTA = document.getElementById('sticky-cta');

    if (!stickyCTA) return;

    let isVisible = false;

    function updateVisibility() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Show sticky CTA after scrolling 300px
      if (scrollTop > 300 && !isVisible) {
        stickyCTA.classList.add('sticky-cta--visible');
        isVisible = true;
      } else if (scrollTop <= 300 && isVisible) {
        stickyCTA.classList.remove('sticky-cta--visible');
        isVisible = false;
      }
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility(); // Check on load
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initStickyCTA);

  // Also init after partials are loaded
  document.addEventListener('partialLoaded', function () {
    setTimeout(initStickyCTA, 50);
  });

})();
