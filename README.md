# Indie Neon UI - Modern CSS Component Library
A sleek, modern CSS component library with neon-inspired design. Perfect for creating futuristic interfaces with beautiful animations and effects. Features **2,250+ color variations** through an interactive color slider.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-GenuineDickies%2Findie--neon--ui-blue)](https://github.com/GenuineDickies/indie-neon-ui)

## 🚀 Installation

### NPM
```bash
npm install indie-neon-ui
```

### CDN (Single File)
```html
<script src="https://unpkg.com/indie-neon-ui@latest/dist/indie-neon-ui.cdn.js"></script>
```

### CDN (Separate Files)
```html
<link rel="stylesheet" href="https://unpkg.com/indie-neon-ui@latest/dist/indie-neon-ui.min.css">
<script src="https://unpkg.com/indie-neon-ui@latest/dist/indie-neon-ui.min.js"></script>
```

### Download
Download the latest release from [GitHub](https://github.com/GenuineDickies/indie-neon-ui/releases) and include the files manually.

## ⚡ Quick Start

### Basic HTML Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <!-- Include Indie Neon UI -->
    <link rel="stylesheet" href="https://unpkg.com/indie-neon-ui@latest/dist/indie-neon-ui.min.css">
</head>
<body>
    <!-- Your content -->
    <div class="container">
        <button class="btn">Click me!</button>
        <div class="card">
            <h3>Card Title</h3>
            <p>Card content with neon glow.</p>
        </div>
    </div>
    
    <!-- Include JavaScript -->
    <script src="https://unpkg.com/indie-neon-ui@latest/dist/indie-neon-ui.min.js"></script>
    <script>
        // Initialize components
        IndieNeon.init();
        
        // Show toast notification
        IndieNeon.toast("Welcome to Indie Neon UI!", {tone: "good"});
    </script>
</body>
</html>
```

### NPM Usage
```javascript
// Import CSS (if using bundler)
import 'indie-neon-ui/dist/indie-neon-ui.css';

// Import JavaScript
import IndieNeon from 'indie-neon-ui';

// Initialize
IndieNeon.init();

// Configure custom actions
IndieNeon.configure({
  actions: {
    "my-action": () => IndieNeon.toast("Action executed!")
  }
});
```

## 📁 File Structure

The codebase has been refactored into a modular structure for better organization and maintainability:

```
indie-neon-ui/
├── css/                    # Component-specific CSS files
│   ├── base.css           # CSS variables, base styles, layout utilities
│   ├── buttons.css        # Button components and variants
│   ├── accordion.css      # Accordion/menu component styles
│   ├── tabs.css           # Tabs component styles
│   ├── forms.css          # Form controls (switch, checkbox, radio, inputs)
│   ├── dropdown.css       # Custom dropdown component styles
│   ├── modals.css         # Modal and drawer component styles
│   ├── feedback.css       # Toast, tooltip, progress, spinner styles
│   ├── cards.css          # Card component styles
│   ├── table.css          # Table component styles
│   └── demo.css           # Demo page specific styles
├── js/                     # Component-specific JavaScript modules
│   ├── core.js            # Core utilities and main IndieNeon object
│   ├── accordion.js       # Accordion/menu functionality
│   ├── tabs.js            # Tabs component functionality
│   ├── modals.js          # Modal and drawer functionality
│   └── dropdown.js        # Custom dropdown functionality
├── dist/                   # Built distribution files
│   ├── indie-neon-ui.css  # Combined CSS file
│   ├── indie-neon-ui.js   # Combined JavaScript file
│   ├── indie-neon-ui.min.css # Minified CSS
│   ├── indie-neon-ui.min.js  # Minified JavaScript
│   └── indie-neon-ui.cdn.js  # CDN version
├── demo.html              # Interactive demo page with color slider
├── index.html             # Component showcase page
├── mockup.html            # Dashboard mockup example
├── build.js               # Build script for distribution
├── package.json           # NPM package configuration
└── README.md              # This documentation
```

### Component Organization

Each component is now separated into its own CSS and JavaScript files:

- **CSS Files**: Contain all styles for a specific component, including variants, states, and animations
- **JavaScript Files**: Handle the interactive functionality, event listeners, and component logic
- **HTML**: References all component files and includes comprehensive comments explaining each element

## ✨ Components

### **Interactive Elements**
- **Buttons** (primary, ghost, destructive, disabled) with hover glow effects
- **Custom Dropdown** with neon styling, keyboard navigation, and smooth animations
- **Accordion / Menu** (single-open, arrow rotation, smooth transitions)
- **Tabs** with keyboard navigation (left/right arrow keys)
- **Switch Toggle** with neon glow animation
- **Checkbox**, **Radio**, **Range** with neon accent colors

### **Form Controls**
- **Text Input** with neon focus states
- **Custom Dropdown** with:
  - Neon gradient borders
  - Smooth arrow rotation
  - Keyboard navigation (↑↓ arrows, enter/escape)
  - Item selection with visual feedback
- **Textarea** with neon focus styling

### **Layout & Display**
- **Modal** (centered with neon borders and backdrop blur)
- **Drawer** (right-side slide panel)
- **Cards** with large titles (28px), centered text, tight spacing, and neon borders
- **Enhanced Table** with:
  - High-contrast alternating row colors for better readability
  - Neon borders and glow effects
  - Hover animations with inner vertical border illumination
  - Generic content (Project Alpha, Task Beta, Feature Gamma)

### **Feedback & Interactions**
- **Toast notifications** (top-right positioning with tone variants)
- **Tooltip** (hover/focus activated)
- **Progress bar** with neon gradient
- **Spinner loader** with neon accent
- **Card button ghost effect** (click animation with temporary glow)

### **🎨 Interactive Color System**
- **Dynamic Color Slider** with 2,250+ color variations
- **Real-time Theme Updates** - All components update instantly
- **Persistent Color Storage** - Remembers your color choice
- **Default Color Restore** - One-click reset to original theme
- **Smooth Color Transitions** - Beautiful animations between color changes

## 🚀 Quick Start

### Local Development
Serve the folder to view the interactive demo:
```bash
python3 -m http.server 8080
# or
python -m http.server 8080
```

Then open:
- **Interactive Demo**: http://localhost:8080/demo.html (with color slider)
- **Component Showcase**: http://localhost:8080/index.html
- **Dashboard Mockup**: http://localhost:8080/mockup.html

## ⚙️ Configuration
Wire menu actions and customize behavior:
```js
IndieNeon.configure({
  actions: { 
    "new-request": () => IndieNeon.toast("New Service Request"),
    "example-action": () => IndieNeon.toast("Action completed!", {tone: "good"})
  }
});
IndieNeon.init();
```

## 🔧 Development & Customization

### Adding New Components
1. Create a new CSS file in `css/` for the component styles
2. Create a new JavaScript file in `js/` for the component functionality
3. Add the component to `index.html` with proper comments
4. Update the README with component documentation

### Modifying Existing Components
- **Styles**: Edit the corresponding CSS file in `css/`
- **Functionality**: Edit the corresponding JavaScript file in `js/`
- **HTML Structure**: Update `index.html` and maintain the comment structure

### CSS Variables
All components use CSS custom properties defined in `css/base.css`:
- `--neon-blue` and `--neon-purple`: Primary accent colors
- `--bg`, `--panel`, `--surface`: Background colors
- `--text`, `--muted`: Text colors
- `--radius`, `--btn-h`, `--btn-w`: Layout variables

### JavaScript Architecture
- **Core Module** (`js/core.js`): Main IndieNeon object and utilities
- **Component Modules**: Each component has its own initialization function
- **Event Handling**: All components use proper event delegation and cleanup
- **Accessibility**: Full keyboard navigation and ARIA support

## 🎨 Design Features
- **Consistent Theme**: All components use unified neon color palette
- **Smooth Animations**: 0.15s transitions throughout the interface
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Responsive**: Works on desktop and mobile devices
- **Performance**: No dependencies, vanilla JavaScript only

## 🎯 Key Features
- **15+ Components**: Complete UI component library
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **2.5KB Minified**: Lightweight and fast
- **Interactive Color System**: 2,250+ color variations with real-time updates
- **Modern Design**: Neon-inspired with smooth animations
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive**: Works on desktop and mobile devices
- **Cross-browser**: Compatible with all modern browsers

## 🎨 Color Customization

The library features a powerful interactive color system:

```javascript
// The color slider automatically updates all components
// Colors are stored in localStorage and persist across sessions
// Use the "default" button to restore original colors
```

**Color Features:**
- **HSL-based**: 360-degree hue control
- **Real-time Updates**: Instant theme changes
- **Persistent Storage**: Remembers your preferences
- **Smooth Transitions**: Beautiful color animations
- **Default Restore**: One-click reset functionality