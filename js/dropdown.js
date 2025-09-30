/* ===========================================
   DROPDOWN COMPONENT
   =========================================== */

/**
 * Custom Dropdown Component
 * Handles custom dropdown functionality with keyboard navigation
 */

(function() {
  'use strict';

  /**
   * Initialize dropdown components
   * Sets up event listeners for dropdown buttons and menu items
   */
  function initDropdowns() {
    const dropdowns = $$('.dropdown[data-dropdown]');
    
    /**
     * Close all dropdowns except the specified one
     * @param {Element} except - Dropdown to keep open (optional)
     */
    const closeAll = (except = null) => {
      dropdowns.forEach(dropdown => {
        if (dropdown === except) return;
        
        const button = $('.dropdown-btn', dropdown);
        const menu = $('.dropdown-menu', dropdown);
        
        if (button) {
          button.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        }
        
        if (menu) {
          menu.classList.remove('open');
          menu.setAttribute('aria-hidden', 'true');
        }
      });
    };
    
    // Initialize each dropdown
    dropdowns.forEach(dropdown => {
      const button = $('.dropdown-btn', dropdown);
      const menu = $('.dropdown-menu', dropdown);
      const items = $$('.dropdown-item', menu);
      const textDisplay = $('.dropdown-text', button);
      
      // Ensure menu has an ID for accessibility
      if (menu && !menu.id) {
        menu.id = 'dropdown-menu-' + Math.random().toString(36).slice(2);
      }
      
      if (button) {
        button.setAttribute('aria-controls', menu.id);
        
        // Toggle dropdown on button click
        button.addEventListener('click', event => {
          event.stopPropagation();
          const willOpen = !button.classList.contains('active');
          
          // Close other dropdowns
          closeAll(willOpen ? dropdown : null);
          
          // Toggle current dropdown
          button.classList.toggle('active', willOpen);
          menu.classList.toggle('open', willOpen);
          button.setAttribute('aria-expanded', String(willOpen));
          menu.setAttribute('aria-hidden', String(!willOpen));
          
          // Focus first item when opening
          if (willOpen && items.length > 0) {
            const selectedItem = items.find(item => item.classList.contains('selected'));
            const itemToFocus = selectedItem || items[0];
            itemToFocus.focus();
          }
        });
        
        // Keyboard navigation on button
        button.addEventListener('keydown', event => {
          if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            button.click();
          }
        });
      }
      
      // Initialize menu items
      items.forEach((item, index, list) => {
        /**
         * Handle item selection
         * @param {Event} event - The click or keyboard event
         */
        const selectItem = (event) => {
          event.preventDefault();
          
          // Update display text
          if (textDisplay) {
            textDisplay.textContent = item.textContent;
          }
          
          // Update selection state
          items.forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          
          // Set value for form compatibility
          const value = item.getAttribute('data-value');
          if (value) {
            button.setAttribute('data-value', value);
            button.dispatchEvent(new CustomEvent('change', {
              detail: { value, text: item.textContent }
            }));
          }
          
          // Close dropdown
          button.classList.remove('active');
          menu.classList.remove('open');
          button.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          button.focus();
        };
        
        // Click event
        item.addEventListener('click', (e) => {
          e.preventDefault();
          selectItem(e);
        });
        
        // Keyboard navigation
        item.addEventListener('keydown', event => {
          switch (event.key) {
            case 'Enter':
            case ' ':
              selectItem(event);
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
              button.click();
              break;
          }
        });
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', event => {
      if (!event.target.closest('.dropdown[data-dropdown]')) {
        closeAll();
      }
    });
    
    // Close dropdowns with Escape key
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeAll();
      }
    });
  }

  // Add to IndieNeon object
  if (window.IndieNeon) {
    window.IndieNeon._initDropdowns = initDropdowns;
  }

})();
