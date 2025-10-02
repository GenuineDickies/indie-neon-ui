/* ===========================================
   PAGINATION COMPONENT
   =========================================== */

/**
 * Pagination Component
 * Handles page navigation with previous/next buttons and dynamic page numbers
 */

(function() {
  'use strict';

  /**
   * Initialize pagination components
   * Sets up event listeners for pagination buttons
   */
  function initPagination() {
    const paginationContainers = $$('.pagination');
    
    paginationContainers.forEach(pagination => {
      const wrapper = $('.pagination-wrapper', pagination);
      if (!wrapper) return;
      
      const prevBtn = $('.pagination-prev', wrapper);
      const nextBtn = $('.pagination-next', wrapper);
      const pagesContainer = $('.pagination-pages', wrapper);
      
      if (!prevBtn || !nextBtn || !pagesContainer) return;
      
      const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 10;
      let currentPage = 1;
      
      /**
       * Generate page numbers to display
       * Works for any number of pages (1 to 1000+)
       * Algorithm:
       * - First 4 pages (1-4): Show 1,2,3,4,5...last (ellipsis only on right)
       * - Last 4 pages: Show 1...last-4,last-3,last-2,last-1,last (ellipsis only on left)
       * - Middle pages: Show 1...current-1,current,current+1...last (ellipsis on both sides)
       * 
       * @param {number} current - Current page number
       * @param {number} total - Total number of pages
       * @returns {Array} Array of page numbers and ellipses
       */
      const generatePageNumbers = (current, total) => {
        const pages = [];
        
        // If total pages is 7 or fewer, show all pages
        if (total <= 7) {
          for (let i = 1; i <= total; i++) {
            pages.push(i);
          }
          return pages;
        }
        
        // Within first 4 pages: 1,2,3,4,5...last
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(total);
        }
        // Within last 4 pages: 1...last-4,last-3,last-2,last-1,last
        else if (current >= total - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = total - 4; i <= total; i++) {
            pages.push(i);
          }
        }
        // Middle pages: 1...current-1,current,current+1...last
        else {
          pages.push(1);
          pages.push('...');
          pages.push(current - 1);
          pages.push(current);
          pages.push(current + 1);
          pages.push('...');
          pages.push(total);
        }
        
        return pages;
      };
      
      /**
       * Render pagination pages
       */
      const renderPages = () => {
        const pages = generatePageNumbers(currentPage, totalPages);
        pagesContainer.innerHTML = '';
        
        pages.forEach(page => {
          if (page === '...') {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            pagesContainer.appendChild(ellipsis);
          } else {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn pagination-page';
            btn.textContent = page;
            
            if (page === currentPage) {
              btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
              goToPage(page);
            });
            
            pagesContainer.appendChild(btn);
          }
        });
      };
      
      /**
       * Go to specific page
       * @param {number} page - Page number to navigate to
       */
      const goToPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        
        currentPage = page;
        renderPages();
        updateNavigationButtons();
      };
      
      /**
       * Update prev/next button states
       */
      const updateNavigationButtons = () => {
        // Update prev button state
        if (currentPage === 1) {
          prevBtn.classList.add('disabled');
          prevBtn.setAttribute('aria-disabled', 'true');
        } else {
          prevBtn.classList.remove('disabled');
          prevBtn.setAttribute('aria-disabled', 'false');
        }
        
        // Update next button state
        if (currentPage === totalPages) {
          nextBtn.classList.add('disabled');
          nextBtn.setAttribute('aria-disabled', 'true');
        } else {
          nextBtn.classList.remove('disabled');
          nextBtn.setAttribute('aria-disabled', 'false');
        }
      };
      
      // Previous button
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          goToPage(currentPage - 1);
        }
      });
      
      // Next button
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          goToPage(currentPage + 1);
        }
      });
      
      // Initialize
      renderPages();
      updateNavigationButtons();
    });
  }

  // Add to IndieNeon object
  if (window.IndieNeon) {
    window.IndieNeon._initPagination = initPagination;
  }

})();

