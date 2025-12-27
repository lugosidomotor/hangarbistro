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

    faqQuestions.forEach(function (question, index) {
      // Avoid binding multiple listeners when partials fire multiple times
      if (question.dataset.faqBound === '1') return;
      question.dataset.faqBound = '1';

      // Ensure a predictable default state
      if (!question.hasAttribute('aria-expanded')) {
        question.setAttribute('aria-expanded', 'false');
      }

      const getAnswerEl = function () {
        const next = question.nextElementSibling;
        if (next && next.classList && next.classList.contains('faq-answer')) return next;
        const item = question.closest('.faq-item');
        if (item) {
          const ans = item.querySelector('.faq-answer');
          if (ans) return ans;
        }
        return null;
      };

      const ensureA11yLinking = function (answerEl) {
        // Ensure question has an id for aria-labelledby
        if (!question.id) {
          question.id = `faq-q-${index + 1}`;
        }

        if (!answerEl) return;

        if (!answerEl.id) {
          answerEl.id = `faq-a-${index + 1}`;
        }

        question.setAttribute('aria-controls', answerEl.id);
        answerEl.setAttribute('role', 'region');
        answerEl.setAttribute('aria-labelledby', question.id);
      };

      const setIconState = function (expanded) {
        const icon = question.querySelector('.faq-icon');
        if (!icon) return;

        // Text-icon variant: <span class="faq-icon">+</span>
        const isTextIcon = icon.tagName !== 'svg' && icon.tagName !== 'SVG' && icon.childElementCount === 0;
        if (isTextIcon) {
          icon.textContent = expanded ? '−' : '+';
        }
        // SVG variant is handled via CSS rules based on [aria-expanded]
      };

      // Apply initial hidden state (many event pages ship without `hidden`)
      const initialExpanded = question.getAttribute('aria-expanded') === 'true';
      const initialAnswer = getAnswerEl();
      ensureA11yLinking(initialAnswer);
      if (initialAnswer) initialAnswer.hidden = !initialExpanded;
      setIconState(initialExpanded);

      question.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const answer = getAnswerEl();
        ensureA11yLinking(answer);

        // Toggle current item
        if (isExpanded) {
          // Close
          this.setAttribute('aria-expanded', 'false');
          if (answer) answer.hidden = true;
          setIconState(false);
        } else {
          // Open
          this.setAttribute('aria-expanded', 'true');
          if (answer) answer.hidden = false;
          setIconState(true);
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
