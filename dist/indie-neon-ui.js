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
      this._initPagination();
      this._initSidebar();
      this._initToastRoot();
      this._initDemoButtons();
      this._initColorSlider();
      this._initTodoList();
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
          const willActivate = !regularBtn.classList.contains('active');
          
          // Deactivate accordion button if regular button is being activated
          const accordionBtn = $('[data-acc-btn]');
          const accordionPanel = $('[data-acc-panel]');
          if (willActivate && accordionBtn) {
            accordionBtn.classList.remove('active');
            if (accordionPanel) {
              accordionPanel.classList.remove('open');
              accordionBtn.setAttribute('aria-expanded', 'false');
              accordionPanel.setAttribute('aria-hidden', 'true');
            }
          }
          
          // Toggle regular button with ghost effect
          regularBtn.classList.toggle('active', willActivate);
          if (willActivate) {
            regularBtn.classList.add('ghost-effect');
            setTimeout(() => {
              regularBtn.classList.remove('ghost-effect');
            }, 300);
          }
          
          this.toast(willActivate ? 'Regular button activated!' : 'Regular button deactivated!', {tone: 'good'});
        });
      }
    },

    /**
     * Initialize color slider functionality
     * @private
     */
    _initColorSlider() {
      const colorSlider = $('#colorSlider');
      const colorPreview = $('#colorPreview');
      const colorNumberDisplay = $('#colorNumberDisplay');
      const restoreBtn = $('#restoreDefaultBtn');
      
      
      if (!colorSlider || !colorPreview) return;
      
      // Store original default colors
      const defaultColors = {
        neonBlue: '#37b7ff',
        neonPurple: '#9a4dff',
        defaultSliderValue: 1500, // Maps to hue 216 (blue)
        // Table colors
        tableBorder: 'rgba(55,183,255,.2)',
        tableGlow: 'rgba(55,183,255,.15)',
        tableHeaderBorder: 'rgba(55,183,255,.4)',
        tableHeaderBorderLight: 'rgba(55,183,255,.2)',
        tableHeaderTextShadow: 'rgba(55,183,255,.5)',
        tableHeaderTextShadowSecondary: 'rgba(154,77,255,.3)',
        tableHeaderInsetShadow: 'rgba(55,183,255,.1)',
        tableRowOdd: 'rgba(30,50,100,.85)',
        tableRowEven: 'rgba(10,18,35,.25)',
        tableRowHover: 'rgba(40,70,140,.7)',
        tableRowHoverShadow: 'rgba(55,183,255,.2)',
        tableRowOddHover: 'rgba(40,70,140,.8)',
        tableRowEvenHover: 'rgba(30,50,100,.6)',
        tableHoverBorder: 'rgba(55,183,255,.8)',
        tableRowActiveShadow: 'rgba(55,183,255,.3)'
      };
      
      // Update theme colors based on hue value
      const updateThemeColors = (sliderValue) => {
        const root = document.documentElement;
        
        // Update number display (sliderValue + 1 to show 1-2500 instead of 0-2499)
        if (colorNumberDisplay) {
          colorNumberDisplay.textContent = sliderValue + 1;
        }
        
        // Convert slider value (0-2499) to hue (0-360)
        const hue = (sliderValue / 2499) * 360;
        
        // Convert hue to HSL values for different color variations
        const baseHue = hue;

        const primaryHue = baseHue;
        const infoHue = (baseHue + 10) % 360;
        const successHue = (baseHue + 16) % 360;
        const warningHue = (baseHue + 28) % 360;
        const dangerHue = (baseHue - 12 + 360) % 360;
        const accentHue = (baseHue + 20) % 360;

        const primaryColor = `hsl(${primaryHue}, 68%, 58%)`;
        const infoColor = `hsl(${infoHue}, 66%, 60%)`;
        const successColor = `hsl(${successHue}, 62%, 56%)`;
        const warningColor = `hsl(${warningHue}, 68%, 58%)`;
        const dangerColor = `hsl(${dangerHue}, 68%, 52%)`;
        const accentColorExtended = `hsl(${accentHue}, 60%, 57%)`;
        const accentColor = `hsl(${baseHue}, 80%, 70%)`;
        const mutedColor = `hsl(${baseHue}, 28%, 68%)`;

        const primaryRgb = hslToRgb(primaryHue / 360, 0.68, 0.58);
        const infoRgb = hslToRgb(infoHue / 360, 0.66, 0.6);
        const successRgb = hslToRgb(successHue / 360, 0.62, 0.56);
        const warningRgb = hslToRgb(warningHue / 360, 0.68, 0.58);
        const dangerRgb = hslToRgb(dangerHue / 360, 0.68, 0.52);
        const accentRgb = hslToRgb(accentHue / 360, 0.6, 0.57);

        root.style.setProperty('--neon-blue', primaryColor);
        root.style.setProperty('--neon-purple', accentColorExtended);

        root.style.setProperty('--accent-color', accentColor);
        root.style.setProperty('--checkbox-accent', accentColor);
        root.style.setProperty('--radio-accent', accentColor);

        // Update badge colors
        root.style.setProperty('--badge-primary-color', primaryColor);
        root.style.setProperty('--badge-primary-bg', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.12)`);
        root.style.setProperty('--badge-primary-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.32)`);
        root.style.setProperty('--badge-primary-glow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.28)`);
        root.style.setProperty('--badge-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);

        root.style.setProperty('--badge-success-color', successColor);
        root.style.setProperty('--badge-success-bg', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.12)`);
        root.style.setProperty('--badge-success-border', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.32)`);
        root.style.setProperty('--badge-success-glow', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.28)`);
        root.style.setProperty('--badge-success-rgb', `${successRgb.r}, ${successRgb.g}, ${successRgb.b}`);

        root.style.setProperty('--badge-warning-color', warningColor);
        root.style.setProperty('--badge-warning-bg', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.12)`);
        root.style.setProperty('--badge-warning-border', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.32)`);
        root.style.setProperty('--badge-warning-glow', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.28)`);
        root.style.setProperty('--badge-warning-rgb', `${warningRgb.r}, ${warningRgb.g}, ${warningRgb.b}`);

        root.style.setProperty('--badge-danger-color', dangerColor);
        root.style.setProperty('--badge-danger-bg', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.12)`);
        root.style.setProperty('--badge-danger-border', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.32)`);
        root.style.setProperty('--badge-danger-glow', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.28)`);
        root.style.setProperty('--badge-danger-rgb', `${dangerRgb.r}, ${dangerRgb.g}, ${dangerRgb.b}`);

        root.style.setProperty('--badge-info-color', infoColor);
        root.style.setProperty('--badge-info-bg', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.12)`);
        root.style.setProperty('--badge-info-border', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.32)`);
        root.style.setProperty('--badge-info-glow', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.28)`);
        root.style.setProperty('--badge-info-rgb', `${infoRgb.r}, ${infoRgb.g}, ${infoRgb.b}`);

        // Update filter chip colors
        root.style.setProperty('--chip-primary-color', primaryColor);
        root.style.setProperty('--chip-primary-bg', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.12)`);
        root.style.setProperty('--chip-primary-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.32)`);
        root.style.setProperty('--chip-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);

        root.style.setProperty('--chip-success-color', successColor);
        root.style.setProperty('--chip-success-bg', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.12)`);
        root.style.setProperty('--chip-success-border', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.32)`);
        root.style.setProperty('--chip-success-rgb', `${successRgb.r}, ${successRgb.g}, ${successRgb.b}`);

        root.style.setProperty('--chip-warning-color', warningColor);
        root.style.setProperty('--chip-warning-bg', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.12)`);
        root.style.setProperty('--chip-warning-border', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.32)`);
        root.style.setProperty('--chip-warning-rgb', `${warningRgb.r}, ${warningRgb.g}, ${warningRgb.b}`);

        root.style.setProperty('--chip-danger-color', dangerColor);
        root.style.setProperty('--chip-danger-bg', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.12)`);
        root.style.setProperty('--chip-danger-border', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.32)`);
        root.style.setProperty('--chip-danger-rgb', `${dangerRgb.r}, ${dangerRgb.g}, ${dangerRgb.b}`);

        root.style.setProperty('--chip-info-color', infoColor);
        root.style.setProperty('--chip-info-bg', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.12)`);
        root.style.setProperty('--chip-info-border', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.32)`);
        root.style.setProperty('--chip-info-rgb', `${infoRgb.r}, ${infoRgb.g}, ${infoRgb.b}`);

        // Update status indicator colors
        root.style.setProperty('--status-online-color', primaryColor);
        root.style.setProperty('--status-online-bg', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.12)`);
        root.style.setProperty('--status-online-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.32)`);
        root.style.setProperty('--status-online-glow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},0.28)`);

        root.style.setProperty('--status-away-color', mutedColor);
        root.style.setProperty('--status-away-bg', `rgba(${mutedColor},0.12)`);
        root.style.setProperty('--status-away-border', `rgba(${mutedColor},0.4)`);
        root.style.setProperty('--status-away-glow', `rgba(${mutedColor},0.35)`);

        root.style.setProperty('--status-busy-color', accentColorExtended);
        root.style.setProperty('--status-busy-bg', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.12)`);
        root.style.setProperty('--status-busy-border', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.4)`);
        root.style.setProperty('--status-busy-glow', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.35)`);

        root.style.setProperty('--status-loading-color', infoColor);
        root.style.setProperty('--status-loading-bg', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.12)`);
        root.style.setProperty('--status-loading-border', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.4)`);
        root.style.setProperty('--status-loading-glow', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.35)`);
        
        // Update selection control colors
        root.style.setProperty('--accent-color', accentColor);
        root.style.setProperty('--checkbox-accent', accentColor);
        root.style.setProperty('--radio-accent', accentColor);
        
        // Update table colors
        root.style.setProperty('--table-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.2)`);
        root.style.setProperty('--table-glow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.15)`);
        root.style.setProperty('--table-header-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.4)`);
        root.style.setProperty('--table-header-border-light', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.2)`);
        root.style.setProperty('--table-header-text-shadow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.5)`);
        root.style.setProperty('--table-header-text-shadow-secondary', `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},.3)`);
        root.style.setProperty('--table-header-inset-shadow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.1)`);
        root.style.setProperty('--table-row-hover-shadow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.2)`);
        root.style.setProperty('--table-hover-border', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.8)`);
        root.style.setProperty('--table-row-active-shadow', `rgba(${primaryRgb.r},${primaryRgb.g},${primaryRgb.b},.3)`);
        
        // Update row backgrounds with hue-adjusted colors
        const rowOddRgb = hslToRgb(hue / 360, 0.4, 0.25);
        const rowEvenRgb = hslToRgb(hue / 360, 0.3, 0.15);
        const rowHoverRgb = hslToRgb(hue / 360, 0.5, 0.35);
        const rowOddHoverRgb = hslToRgb(hue / 360, 0.5, 0.4);
        const rowEvenHoverRgb = hslToRgb(hue / 360, 0.4, 0.3);
        
        root.style.setProperty('--table-row-odd', `rgba(${rowOddRgb.r},${rowOddRgb.g},${rowOddRgb.b},.85)`);
        root.style.setProperty('--table-row-even', `rgba(${rowEvenRgb.r},${rowEvenRgb.g},${rowEvenRgb.b},.25)`);
        root.style.setProperty('--table-row-hover', `rgba(${rowHoverRgb.r},${rowHoverRgb.g},${rowHoverRgb.b},.7)`);
        root.style.setProperty('--table-row-odd-hover', `rgba(${rowOddHoverRgb.r},${rowOddHoverRgb.g},${rowOddHoverRgb.b},.8)`);
        root.style.setProperty('--table-row-even-hover', `rgba(${rowEvenHoverRgb.r},${rowEvenHoverRgb.g},${rowEvenHoverRgb.b},.6)`);
        
        // Update color preview
        colorPreview.style.background = primaryColor;
        colorPreview.style.boxShadow = `0 0 8px ${primaryColor}40`;
        
        // Update slider thumb shadow
        const sliderThumb = colorSlider;
        sliderThumb.style.setProperty('--thumb-shadow', `0 0 8px ${primaryColor}80`);
        sliderThumb.style.setProperty('--thumb-shadow-hover', `0 0 12px ${primaryColor}CC`);

        // Update alert banner colors
        root.style.setProperty('--alert-info-color', infoColor);
        root.style.setProperty('--alert-info-border', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.32)`);
        root.style.setProperty('--alert-info-bg-start', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.14)`);
        root.style.setProperty('--alert-info-bg-end', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.055)`);
        root.style.setProperty('--alert-info-icon-bg', `rgba(${infoRgb.r},${infoRgb.g},${infoRgb.b},0.22)`);
        root.style.setProperty('--alert-info-rgb', `${infoRgb.r}, ${infoRgb.g}, ${infoRgb.b}`);

        root.style.setProperty('--alert-success-color', successColor);
        root.style.setProperty('--alert-success-border', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.32)`);
        root.style.setProperty('--alert-success-bg-start', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.14)`);
        root.style.setProperty('--alert-success-bg-end', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.055)`);
        root.style.setProperty('--alert-success-icon-bg', `rgba(${successRgb.r},${successRgb.g},${successRgb.b},0.22)`);
        root.style.setProperty('--alert-success-rgb', `${successRgb.r}, ${successRgb.g}, ${successRgb.b}`);

        root.style.setProperty('--alert-warning-color', warningColor);
        root.style.setProperty('--alert-warning-border', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.32)`);
        root.style.setProperty('--alert-warning-bg-start', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.14)`);
        root.style.setProperty('--alert-warning-bg-end', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.055)`);
        root.style.setProperty('--alert-warning-icon-bg', `rgba(${warningRgb.r},${warningRgb.g},${warningRgb.b},0.22)`);
        root.style.setProperty('--alert-warning-rgb', `${warningRgb.r}, ${warningRgb.g}, ${warningRgb.b}`);

        root.style.setProperty('--alert-error-color', dangerColor);
        root.style.setProperty('--alert-error-border', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.32)`);
        root.style.setProperty('--alert-error-bg-start', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.14)`);
        root.style.setProperty('--alert-error-bg-end', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.055)`);
        root.style.setProperty('--alert-error-icon-bg', `rgba(${dangerRgb.r},${dangerRgb.g},${dangerRgb.b},0.22)`);
        root.style.setProperty('--alert-error-rgb', `${dangerRgb.r}, ${dangerRgb.g}, ${dangerRgb.b}`);
      };
      
      // Helper function to convert HSL to RGB
      const hslToRgb = (h, s, l) => {
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      };
      
      // Restore default colors
      const restoreDefaultColors = () => {
        const root = document.documentElement;
        
        // Restore original CSS custom properties
        root.style.setProperty('--neon-blue', defaultColors.neonBlue);
        root.style.setProperty('--neon-purple', defaultColors.neonPurple);
        
        // Restore table colors
        root.style.setProperty('--table-border', defaultColors.tableBorder);
        root.style.setProperty('--table-glow', defaultColors.tableGlow);
        root.style.setProperty('--table-header-border', defaultColors.tableHeaderBorder);
        root.style.setProperty('--table-header-border-light', defaultColors.tableHeaderBorderLight);
        root.style.setProperty('--table-header-text-shadow', defaultColors.tableHeaderTextShadow);
        root.style.setProperty('--table-header-text-shadow-secondary', defaultColors.tableHeaderTextShadowSecondary);
        root.style.setProperty('--table-header-inset-shadow', defaultColors.tableHeaderInsetShadow);
        root.style.setProperty('--table-row-odd', defaultColors.tableRowOdd);
        root.style.setProperty('--table-row-even', defaultColors.tableRowEven);
        root.style.setProperty('--table-row-hover', defaultColors.tableRowHover);
        root.style.setProperty('--table-row-hover-shadow', defaultColors.tableRowHoverShadow);
        root.style.setProperty('--table-row-odd-hover', defaultColors.tableRowOddHover);
        root.style.setProperty('--table-row-even-hover', defaultColors.tableRowEvenHover);
        root.style.setProperty('--table-hover-border', defaultColors.tableHoverBorder);
        root.style.setProperty('--table-row-active-shadow', defaultColors.tableRowActiveShadow);
        
        // Reset slider to default position
        colorSlider.value = defaultColors.defaultSliderValue;
        
        // Update theme colors and number display
        updateThemeColors(defaultColors.defaultSliderValue);
        
        // Update color preview
        colorPreview.style.background = defaultColors.neonBlue;
        colorPreview.style.boxShadow = `0 0 8px ${defaultColors.neonBlue}40`;
        
        // Reset slider thumb shadow
        const sliderThumb = colorSlider;
        sliderThumb.style.setProperty('--thumb-shadow', `0 0 8px ${defaultColors.neonBlue}80`);
        sliderThumb.style.setProperty('--thumb-shadow-hover', `0 0 12px ${defaultColors.neonBlue}CC`);
        
        // Clear saved slider value from localStorage
        localStorage.removeItem('indie-neon-slider-value');
        
        // Show toast notification
        this.toast('Default colors restored!', { tone: 'good' });
      };
      
      // Handle slider input
      colorSlider.addEventListener('input', (e) => {
        const sliderValue = parseInt(e.target.value);
        updateThemeColors(sliderValue);
        
        // Store the current slider value in localStorage
        localStorage.setItem('indie-neon-slider-value', sliderValue);
      });
      
      // Handle restore button click
      if (restoreBtn) {
        restoreBtn.addEventListener('click', restoreDefaultColors);
      }
      
      // Load saved slider value on page load
      const savedSliderValue = localStorage.getItem('indie-neon-slider-value');
      if (savedSliderValue) {
        colorSlider.value = savedSliderValue;
        updateThemeColors(parseInt(savedSliderValue));
      } else {
        // Set default slider value (1500 for middle position, maps to blue hue)
        colorSlider.value = 1500;
        updateThemeColors(1500);
      }
    },

    /**
     * Initialize todo list functionality
     * @private
     */
    _initTodoList() {
      const todoContainer = $('.todo-container');
      if (!todoContainer) return;

      const todoItems = $$('.todo-item');
      const todoInputs = $$('.todo-input');
      const todoDeleteBtns = $$('.todo-delete');
      const todoAddBtn = $('.todo-add-btn');
      const todoInputField = $('.todo-input-field');
      const todoCount = $('.todo-count');

      // Update todo count
      const updateTodoCount = () => {
        const total = todoItems.length;
        const completed = $$('.todo-item[data-completed="true"]').length;
        if (todoCount) {
          todoCount.textContent = `${completed}/${total} completed`;
        }
      };

      // Handle checkbox changes
      todoInputs.forEach(input => {
        input.addEventListener('change', (e) => {
          const todoItem = e.target.closest('.todo-item');
          const isCompleted = e.target.checked;
          
          todoItem.setAttribute('data-completed', isCompleted);
          updateTodoCount();
          
          // Show toast notification
          if (isCompleted) {
            this.toast('Task completed!', { tone: 'good' });
          }
        });
      });

      // Handle delete buttons
      todoDeleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const todoItem = e.target.closest('.todo-item');
          todoItem.style.transform = 'translateX(-100%)';
          todoItem.style.opacity = '0';
          
          setTimeout(() => {
            todoItem.remove();
            updateTodoCount();
            this.toast('Task deleted', { tone: 'warn' });
          }, 300);
        });
      });

      // Handle add new task
      const addNewTask = () => {
        const text = todoInputField.value.trim();
        if (!text) return;

        const todoList = $('.todo-list');
        const newTodoItem = document.createElement('div');
        newTodoItem.className = 'todo-item';
        newTodoItem.setAttribute('data-completed', 'false');
        
        newTodoItem.innerHTML = `
          <label class="todo-checkbox">
            <input type="checkbox" class="todo-input"/>
            <span class="todo-checkmark"></span>
          </label>
          <span class="todo-text">${text}</span>
          <button class="todo-delete" title="Delete task">×</button>
        `;

        // Add event listeners to new item
        const newInput = newTodoItem.querySelector('.todo-input');
        const newDeleteBtn = newTodoItem.querySelector('.todo-delete');
        
        newInput.addEventListener('change', (e) => {
          const todoItem = e.target.closest('.todo-item');
          const isCompleted = e.target.checked;
          
          todoItem.setAttribute('data-completed', isCompleted);
          updateTodoCount();
          
          if (isCompleted) {
            this.toast('Task completed!', { tone: 'good' });
          }
        });

        newDeleteBtn.addEventListener('click', (e) => {
          const todoItem = e.target.closest('.todo-item');
          todoItem.style.transform = 'translateX(-100%)';
          todoItem.style.opacity = '0';
          
          setTimeout(() => {
            todoItem.remove();
            updateTodoCount();
            this.toast('Task deleted', { tone: 'warn' });
          }, 300);
        });

        todoList.appendChild(newTodoItem);
        todoInputField.value = '';
        updateTodoCount();
        
        this.toast('Task added!', { tone: 'good' });
      };

      // Add button click
      if (todoAddBtn) {
        todoAddBtn.addEventListener('click', addNewTask);
      }

      // Enter key in input field
      if (todoInputField) {
        todoInputField.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            addNewTask();
          }
        });
      }

      // Initialize count
      updateTodoCount();
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
        
        // Remove active from all main nav links (both accordion and non-accordion)
        navLinks.forEach(l => {
          l.classList.remove('active');
        });
        
        // Add active to clicked accordion link
        link.classList.add('active');
        
        // Remove active from all submenu links
        const submenuLinks = sidebar.querySelectorAll('.sidebar-submenu-link');
        submenuLinks.forEach(l => l.classList.remove('active'));
        
        // Close other open submenus (accordion behavior)
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
        
        // Add active to clicked submenu link
        link.classList.add('active');
        
        // Remove active from non-accordion main nav links only
        navLinks.forEach(l => {
          if (!l.classList.contains('has-submenu')) {
            l.classList.remove('active');
          }
        });
        
        // KEEP the parent accordion button active
        // Find the parent list item, then find the accordion link within it
        const parentNavItem = link.closest('.sidebar-nav-item');
        if (parentNavItem) {
          const parentLink = parentNavItem.querySelector('.sidebar-nav-link.has-submenu');
          if (parentLink) {
            // Remove active from other accordion buttons
            accordionLinks.forEach(accLink => {
              if (accLink !== parentLink) {
                accLink.classList.remove('active');
              }
            });
            // Ensure parent stays active
            parentLink.classList.add('active');
          }
        }

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
