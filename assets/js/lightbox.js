/**
 * Lightbox - Simple Image Gallery
 * - Minimal vanilla JS lightbox
 * - ESC to close, arrow keys to navigate
 */

(function () {
  'use strict';

  let currentIndex = 0;
  let galleryImages = [];

  // Create lightbox HTML
  function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Bezárás">&times;</button>
      <button class="lightbox__prev" aria-label="Előző kép">&lsaquo;</button>
      <button class="lightbox__next" aria-label="Következő kép">&rsaquo;</button>
      <img class="lightbox__image" src="" alt="">
      <div class="lightbox__caption"></div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
  }

  // Initialize lightbox
  function initLightbox() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-image'));

    if (!galleryImages.length) return;

    const lightbox = document.getElementById('lightbox') || createLightbox();
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    // Open lightbox
    function openLightbox(index) {
      currentIndex = index;
      const img = galleryImages[currentIndex];
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = img.alt || '';
      lightbox.classList.add('lightbox--active');
      document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('lightbox--active');
      document.body.style.overflow = '';
    }

    // Show next image
    function showNext() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      openLightbox(currentIndex);
    }

    // Show previous image
    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      openLightbox(currentIndex);
    }

    // Event listeners
    galleryImages.forEach(function (img, index) {
      img.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('lightbox--active')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });

    // Close on backdrop click
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initLightbox);

  // Also init after partials are loaded
  document.addEventListener('partialLoaded', function () {
    setTimeout(initLightbox, 50);
  });

})();
