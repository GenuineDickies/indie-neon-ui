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
