/* ===========================================
   ACCORDION COMPONENT
   =========================================== */

/**
 * Accordion/Menu Component
 * Handles expandable menu functionality with keyboard navigation
 */

(function() {
  'use strict';

  /**
   * Initialize accordion components
   * Sets up event listeners for accordion buttons and submenu items
   */
  function initAccordion() {
    const accordions = $$('.accordion[data-accordion]');
    
    /**
     * Close all accordions except the specified one
     * @param {Element} except - Accordion to keep open (optional)
     */
    const closeAll = (except = null) => {
      accordions.forEach(accordion => {
        if (accordion === except) return;
        
        const button = $('[data-acc-btn]', accordion);
        const panel = $('[data-acc-panel]', accordion);
        
        if (button) {
          button.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        }
        
        if (panel) {
          panel.classList.remove('open');
          panel.setAttribute('aria-hidden', 'true');
        }
      });
    };

    // Initialize each accordion
    accordions.forEach(accordion => {
      const button = $('[data-acc-btn]', accordion);
      const panel = $('[data-acc-panel]', accordion);
      
      // Ensure panel has an ID for accessibility
      if (panel && !panel.id) {
        panel.id = 'acc-' + Math.random().toString(36).slice(2);
      }
      
      if (button) {
        button.setAttribute('aria-controls', panel.id);
        
        // Toggle accordion on button click
        button.addEventListener('click', () => {
          const willOpen = !button.classList.contains('active');
          
          // Close other accordions
          closeAll(willOpen ? accordion : null);
          
          // Toggle current accordion
          button.classList.toggle('active', willOpen);
          panel.classList.toggle('open', willOpen);
          button.setAttribute('aria-expanded', String(willOpen));
          panel.setAttribute('aria-hidden', String(!willOpen));
          
          // Deactivate regular button when menu is opened
          if (willOpen) {
            const regularBtn = $('#demoRegular');
            if (regularBtn && regularBtn.classList.contains('active')) {
              regularBtn.classList.remove('active');
            }
          }
          
          // Focus first submenu item when opening
          if (willOpen) {
            const firstItem = $('.submenu-item', panel);
            if (firstItem) {
              // Ensure the link is focusable and focus it
              firstItem.setAttribute('tabindex', '0');
              firstItem.focus();
            }
          }
        });
      }
      
      // Initialize submenu items
      const submenuItems = $$('.submenu-item', panel);
      submenuItems.forEach((item, index, list) => {
        /**
         * Handle submenu item click
         */
        const handleItemClick = () => {
          const action = item.getAttribute('data-action');
          const text = item.textContent;
          
          // Remove active class from all submenu items
          submenuItems.forEach(subItem => subItem.classList.remove('active'));
          
          // Add active class to clicked item
          item.classList.add('active');
          
          // Show toast notification
          if (window.IndieNeon && typeof IndieNeon.toast === 'function') {
            IndieNeon.toast(`${text} selected!`, {tone: 'good'});
          }
          
          // Execute configured action if available
          if (action && typeof IndieNeon.config.actions[action] === 'function') {
            try {
              IndieNeon.config.actions[action]();
            } catch (error) {
              console.error('Error executing action:', error);
            }
          }
          
          // Apply ghost effect animation
          item.classList.add('ghost-effect');
          
          // Remove ghost effect after animation
          setTimeout(() => {
            item.classList.remove('ghost-effect');
          }, 300);
        };
        
        // Click event
        item.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default link behavior
          handleItemClick();
        });
        
        // Keyboard navigation
        item.addEventListener('keydown', event => {
          switch (event.key) {
            case 'Enter':
            case ' ':
              event.preventDefault();
              handleItemClick();
              break;
              
            case 'ArrowDown':
              event.preventDefault();
              const nextItem = list[index + 1] || list[0];
              nextItem.focus();
              break;
              
            case 'ArrowUp':
              event.preventDefault();
              const prevItem = list[index - 1] || list[list.length - 1];
              prevItem.focus();
              break;
              
            case 'Home':
              event.preventDefault();
              list[0].focus();
              break;
              
            case 'End':
              event.preventDefault();
              list[list.length - 1].focus();
              break;
              
            case 'Escape':
              event.preventDefault();
              if (button) button.click();
              break;
          }
        });
      });
    });
    
    // Close accordions when clicking outside
    document.addEventListener('click', event => {
      if (!event.target.closest('.accordion[data-accordion]')) {
        closeAll();
      }
    });
  }

  // Add to IndieNeon object
  if (window.IndieNeon) {
    window.IndieNeon._initAccordion = initAccordion;
  }

})();
