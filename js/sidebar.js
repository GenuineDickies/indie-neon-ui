/* ===========================================
   SIDEBAR COMPONENT - JAVASCRIPT
   =========================================== */

(function() {
  'use strict';

  /**
   * Initialize sidebar functionality
   * Handles toggle, mobile menu, active states, and accordion submenus
   */
  const initSidebar = function() {
    const sidebar = document.querySelector('[data-sidebar]');
    if (!sidebar) return;

    const toggleBtn = sidebar.querySelector('[data-sidebar-toggle]');
    const mobileToggleBtn = document.querySelector('[data-sidebar-mobile-toggle]');
    const overlay = document.querySelector('[data-sidebar-overlay]');
    const navLinks = sidebar.querySelectorAll('.sidebar-nav-link');
    const accordionLinks = sidebar.querySelectorAll('.sidebar-nav-link.has-submenu');

    // Toggle sidebar (desktop collapse/expand)
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mini');
        
        // Close all submenus when switching to mini mode
        if (sidebar.classList.contains('mini')) {
          const openSubmenus = sidebar.querySelectorAll('.sidebar-submenu.open');
          openSubmenus.forEach(submenu => {
            submenu.classList.remove('open');
            const parentLink = submenu.previousElementSibling;
            if (parentLink) {
              parentLink.classList.remove('expanded');
            }
          });
        }
        
        // Store preference in localStorage
        const isMini = sidebar.classList.contains('mini');
        localStorage.setItem('sidebar-mini', isMini ? 'true' : 'false');
      });
    }

    // Mobile toggle
    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) {
          overlay.classList.toggle('active');
        }
      });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Handle accordion submenu toggles
    accordionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Don't toggle in mini mode
        if (sidebar.classList.contains('mini')) {
          return;
        }
        
        const parentItem = link.parentElement;
        const submenu = parentItem.querySelector('.sidebar-submenu');
        
        if (!submenu) return;
        
        const isExpanded = link.classList.contains('expanded');
        
        // Close other open submenus (optional - for accordion behavior)
        accordionLinks.forEach(otherLink => {
          if (otherLink !== link) {
            otherLink.classList.remove('expanded');
            const otherSubmenu = otherLink.parentElement.querySelector('.sidebar-submenu');
            if (otherSubmenu) {
              otherSubmenu.classList.remove('open');
            }
          }
        });
        
        // Toggle current submenu
        link.classList.toggle('expanded', !isExpanded);
        submenu.classList.toggle('open', !isExpanded);
      });
    });

    // Handle navigation link clicks (non-accordion links)
    navLinks.forEach(link => {
      if (!link.classList.contains('has-submenu')) {
        link.addEventListener('click', (e) => {
          // Remove active from all main links
          navLinks.forEach(l => {
            if (!l.classList.contains('has-submenu')) {
              l.classList.remove('active');
            }
          });
          
          // Add active to clicked link
          link.classList.add('active');

          // On mobile, close sidebar after navigation
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            if (overlay) {
              overlay.classList.remove('active');
            }
          }
        });
      }
    });

    // Handle submenu link clicks
    const submenuLinks = sidebar.querySelectorAll('.sidebar-submenu-link');
    submenuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active from all submenu links
        submenuLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        link.classList.add('active');
        
        // Remove active from main nav links
        navLinks.forEach(l => {
          if (!l.classList.contains('has-submenu')) {
            l.classList.remove('active');
          }
        });

        // On mobile, close sidebar after navigation
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
          if (overlay) {
            overlay.classList.remove('active');
          }
        }
      });
    });

    // Restore sidebar state from localStorage
    const savedMiniState = localStorage.getItem('sidebar-mini');
    if (savedMiniState === 'true') {
      sidebar.classList.add('mini');
    }

    // Close mobile sidebar on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        if (overlay) {
          overlay.classList.remove('active');
        }
      }
    });
  };

  // Add to IndieNeon initialization
  if (window.IndieNeon) {
    const originalInit = window.IndieNeon.init;
    window.IndieNeon.init = function() {
      originalInit.call(this);
      initSidebar();
    };
    
    // Also add as standalone method
    window.IndieNeon._initSidebar = initSidebar;
  } else {
    // If IndieNeon is not loaded, initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
      initSidebar();
    }
  }

})();

