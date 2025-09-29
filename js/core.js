/* ===========================================
   CORE UTILITIES & MAIN MODULE
   =========================================== */

/**
 * IndieNeon UI Library - Core Module
 * Provides utility functions and main configuration
 */

(function() {
  'use strict';

  // Utility functions for DOM manipulation
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  /**
   * Main IndieNeon object
   * Contains configuration and initialization methods
   */
  const IndieNeon = {
    // Default configuration
    config: { 
      actions: {} 
    },

    /**
     * Configure the library with custom options
     * @param {Object} opts - Configuration options
     */
    configure(opts = {}) {
      this.config = { ...this.config, ...opts };
    },

    /**
     * Initialize all components
     * Sets up event listeners and component functionality
     */
    init() {
      this._initAccordion();
      this._initTabs();
      this._initDialogs();
      this._initDropdowns();
      this._initToastRoot();
      this._initDemoButtons();
    },

    /**
     * Initialize toast root container if it doesn't exist
     * @private
     */
    _initToastRoot() {
      if (!$('#toast-root')) {
        const toastRoot = document.createElement('div');
        toastRoot.id = 'toast-root';
        toastRoot.className = 'toast-root';
        document.body.appendChild(toastRoot);
      }
    },

    /**
     * Initialize demo buttons (regular button with lit toggle)
     * @private
     */
    _initDemoButtons() {
      const regularBtn = $('#demoRegular');
      if (regularBtn) {
        regularBtn.addEventListener('click', () => {
          regularBtn.classList.toggle('active');
        });
      }
    },

    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {Object} options - Options including tone (good, warn, bad)
     */
    toast(message, { tone } = {}) {
      let root = document.getElementById('toast-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'toast-root';
        root.className = 'toast-root';
        document.body.appendChild(root);
      }
      
      const toast = document.createElement('div');
      toast.className = 'toast' + (tone ? (' ' + tone) : '');
      toast.textContent = message;
      root.appendChild(toast);
      
      // Auto-remove after 3.5 seconds
      setTimeout(() => toast.remove(), 3500);
    }
  };

  // Export to global scope
  window.IndieNeon = IndieNeon;
  window.$ = $;
  window.$$ = $$;

})();
