/**
 * Partials Loader
 * - Loads header and footer HTML partials
 * - Handles path resolution for subdirectories
 */

(function () {
  'use strict';

  // Determine base path based on current location
  function getBasePath() {
    const path = window.location.pathname;
    // If we're in a subdirectory (e.g., /rendezvenyek/), go up one level
    if (path.includes('/rendezvenyek/')) {
      return '../';
    }
    return '';
  }

  const basePath = getBasePath();

  // Load partial HTML into placeholder
  async function loadPartial(placeholderId, partialPath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
      const response = await fetch(basePath + partialPath);
      if (!response.ok) throw new Error(`Failed to load ${partialPath}`);

      let html = await response.text();

      // Fix asset paths for subdirectories
      if (basePath) {
        html = html.replace(/href="(?!http|\/|#)/g, `href="${basePath}`);
        html = html.replace(/src="(?!http|\/)/g, `src="${basePath}`);
      }

      placeholder.innerHTML = html;

      // Dispatch event to notify other scripts that partial is loaded
      const event = new CustomEvent('partialLoaded', { detail: { id: placeholderId } });
      document.dispatchEvent(event);

    } catch (error) {
      console.error(`Error loading partial ${partialPath}:`, error);
    }
  }

  // Load header and footer when DOM is ready
  document.addEventListener('DOMContentLoaded', async function () {
    await loadPartial('header-placeholder', 'partials/header.html');
    await loadPartial('footer-placeholder', 'partials/footer.html');

    // After partials are loaded, reinitialize navigation.js behaviors
    // (navigation.js will listen for 'partialLoaded' events)
  });

})();
