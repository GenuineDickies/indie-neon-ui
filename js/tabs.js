/* ===========================================
   TABS COMPONENT
   =========================================== */

/**
 * Tabs Component
 * Handles tab navigation with keyboard support
 */

(function() {
  'use strict';

  /**
   * Initialize tabs components
   * Sets up event listeners for tab buttons and keyboard navigation
   */
  function initTabs() {
    const tabContainers = $$('.tabs[data-tabs]');
    
    tabContainers.forEach(tabs => {
      const tabButtons = $$('.tab', tabs);
      
      /**
       * Activate a specific tab by ID
       * @param {string} tabId - ID of the tab to activate
       */
      const activateTab = (tabId) => {
        tabButtons.forEach(button => {
          const isActive = button.getAttribute('data-tab') === tabId;
          
          // Update button state
          button.classList.toggle('active', isActive);
          button.setAttribute('aria-selected', String(isActive));
          
          // Update corresponding panel
          const panel = $('#' + button.getAttribute('data-tab'), tabs);
          if (panel) {
            panel.classList.toggle('active', isActive);
          }
        });
      };
      
      // Initialize each tab button
      tabButtons.forEach(button => {
        // Click event to switch tabs
        button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');
          if (tabId) {
            activateTab(tabId);
          }
        });
        
        // Keyboard navigation
        button.addEventListener('keydown', event => {
          const currentIndex = tabButtons.indexOf(button);
          
          switch (event.key) {
            case 'ArrowRight':
              event.preventDefault();
              const nextTab = tabButtons[currentIndex + 1] || tabButtons[0];
              nextTab.focus();
              break;
              
            case 'ArrowLeft':
              event.preventDefault();
              const prevTab = tabButtons[currentIndex - 1] || tabButtons[tabButtons.length - 1];
              prevTab.focus();
              break;
          }
        });
      });
    });
  }

  // Add to IndieNeon object
  if (window.IndieNeon) {
    window.IndieNeon._initTabs = initTabs;
  }

})();
