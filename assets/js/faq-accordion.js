/**
 * FAQ Accordion
 * - Vanilla JS accordion with keyboard accessibility
 * - Smooth animations
 */

(function () {
  'use strict';

  // Initialize FAQ accordion
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (!faqQuestions.length) return;

    faqQuestions.forEach(function (question) {
      question.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');

        // Toggle current item
        if (isExpanded) {
          // Close
          this.setAttribute('aria-expanded', 'false');
          answer.hidden = true;
          if (icon) icon.textContent = '+';
        } else {
          // Open
          this.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
          if (icon) icon.textContent = '−';
        }
      });

      // Keyboard accessibility
      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initFAQ);

  // Also init after partials are loaded
  document.addEventListener('partialLoaded', function () {
    setTimeout(initFAQ, 50);
  });

})();
