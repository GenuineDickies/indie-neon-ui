/* ===========================================
   MODAL & DRAWER COMPONENTS
   =========================================== */

/**
 * Modal and Drawer Components
 * Handles opening/closing of modal dialogs and drawer panels
 */

(function() {
  'use strict';

  /**
   * Initialize modal and drawer components
   * Sets up event listeners for open/close triggers
   */
  function initDialogs() {
    // Initialize modal open buttons
    $$('.btn[data-open-modal]').forEach(button => {
      const modalSelector = button.getAttribute('data-open-modal');
      button.addEventListener('click', () => {
        setDialog(modalSelector, true);
      });
    });
    
    // Initialize drawer open buttons
    $$('.btn[data-open-drawer]').forEach(button => {
      const drawerSelector = button.getAttribute('data-open-drawer');
      button.addEventListener('click', () => {
        setDialog(drawerSelector, true);
      });
    });
    
    // Initialize close buttons
    $$('[data-close]').forEach(element => {
      element.addEventListener('click', () => {
        const dialog = element.closest('.modal, .drawer');
        if (dialog) {
          setDialog('#' + dialog.id, false);
        }
      });
    });
    
    // Close dialogs with Escape key
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const openDialogs = $$('.modal[aria-hidden="false"], .drawer[aria-hidden="false"]');
        openDialogs.forEach(dialog => {
          setDialog('#' + dialog.id, false);
        });
      }
    });
  }

  /**
   * Set dialog state (open/closed)
   * @param {string} selector - CSS selector for the dialog
   * @param {boolean} open - Whether to open or close the dialog
   */
  function setDialog(selector, open) {
    const dialog = document.querySelector(selector);
    if (!dialog) return;
    
    dialog.setAttribute('aria-hidden', String(!open));
    
    if (open) {
      // Focus first focusable element when opening
      const focusableElement = dialog.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElement) {
        focusableElement.focus();
      }
    }
  }

  // Add to IndieNeon object
  if (window.IndieNeon) {
    window.IndieNeon._initDialogs = initDialogs;
    window.IndieNeon._setDialog = setDialog;
  }

})();
