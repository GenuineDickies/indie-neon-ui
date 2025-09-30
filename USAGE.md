# Indie Neon UI - Usage Instructions

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

### Manual Installation
Copy the `dist/` folder files to your project:
```
your-project/
├── indie-neon-ui.min.css
├── indie-neon-ui.min.js
└── your-html-file.html
```

## 🚀 Quick Start

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

## 📖 Component Usage

### Buttons
```html
<button class="btn">Primary</button>
<button class="btn ghost">Ghost</button>
<button class="btn destructive">Destructive</button>
<button class="btn" disabled>Disabled</button>
```

### Forms
```html
<!-- Text Input -->
<label class="field">
  <span>Text Input</span>
  <input type="text" placeholder="Type here"/>
</label>

<!-- Custom Dropdown -->
<label class="field">
  <span>Select</span>
  <div class="dropdown" data-dropdown>
    <button class="dropdown-btn" aria-expanded="false">
      <span class="dropdown-text">Choose option...</span>
    </button>
    <ul class="dropdown-menu" role="listbox">
      <li><span class="dropdown-item" data-value="option1">Option 1</span></li>
      <li><span class="dropdown-item" data-value="option2">Option 2</span></li>
    </ul>
  </div>
</label>

<!-- Switch Toggle -->
<label class="switch">
  <input type="checkbox"/>
  <span class="track"></span>
  <span class="label">Toggle</span>
</label>

<!-- Checkbox & Radio -->
<label class="checkbox">
  <input type="checkbox"/>
  <span>Checkbox</span>
</label>

<label class="radio">
  <input type="radio" name="group" checked/>
  <span>Radio Option</span>
</label>
```

### Modals & Drawers
```html
<!-- Modal Trigger -->
<button class="btn" data-open-modal="#myModal">Open Modal</button>

<!-- Modal -->
<div class="modal" id="myModal" aria-hidden="true">
  <div class="backdrop" data-close></div>
  <div class="dialog">
    <header>
      <h3>Modal Title</h3>
      <button class="icon-btn" data-close>✕</button>
    </header>
    <div class="content">
      <p>Modal content here</p>
    </div>
    <footer>
      <button class="btn destructive" data-close>Cancel</button>
      <button class="btn" data-close>Confirm</button>
    </footer>
  </div>
</div>

<!-- Drawer Trigger -->
<button class="btn ghost" data-open-drawer="#myDrawer">Open Drawer</button>

<!-- Drawer -->
<div class="drawer" id="myDrawer" aria-hidden="true">
  <div class="backdrop" data-close></div>
  <div class="panel">
    <header>
      <h3>Drawer</h3>
      <button class="icon-btn" data-close>✕</button>
    </header>
    <div class="content">
      <p>Drawer content here</p>
    </div>
  </div>
</div>
```

### Tabs
```html
<div class="tabs" data-tabs>
  <div class="tablist" role="tablist">
    <button role="tab" aria-selected="true" class="tab active" data-tab="tab-1">Tab 1</button>
    <button role="tab" aria-selected="false" class="tab" data-tab="tab-2">Tab 2</button>
  </div>
  <div id="tab-1" role="tabpanel" class="tabpanel active">
    <p>Tab 1 content</p>
  </div>
  <div id="tab-2" role="tabpanel" class="tabpanel">
    <p>Tab 2 content</p>
  </div>
</div>
```

### Accordion/Menu
```html
<div class="accordion" data-accordion>
  <button class="btn with-chevron" data-acc-btn aria-expanded="false">
    <span>Menu</span>
    <svg class="chev" width="12" height="12" viewBox="0 0 12 12">
      <path d="M2 8 L6 4 L10 8" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </button>
  <ul class="submenu" data-acc-panel role="menu" aria-hidden="true">
    <li><a href="#" class="submenu-item" role="menuitem" data-action="action1">Action 1</a></li>
    <li><a href="#" class="submenu-item" role="menuitem" data-action="action2">Action 2</a></li>
  </ul>
</div>
```

### Cards & Tables
```html
<!-- Card -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content with neon glow.</p>
  <button class="btn small">Action</button>
</div>

<!-- Table -->
<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Item 1</td><td>Active</td><td>100</td></tr>
      <tr><td>Item 2</td><td>Pending</td><td>200</td></tr>
    </tbody>
  </table>
</div>
```

### Layout Utilities
```html
<div class="container">     <!-- Main container -->
  <div class="hstack">      <!-- Horizontal flex layout -->
  <div class="stack">       <!-- Vertical grid layout -->
  <div class="grid-2">      <!-- 2-column responsive grid -->
</div>
```

## ⚙️ Configuration

### Custom Actions
Configure custom actions for accordion menu items:

```javascript
IndieNeon.configure({
  actions: {
    "save-data": () => {
      // Your custom logic
      IndieNeon.toast("Data saved!", {tone: "good"});
    },
    "delete-item": () => {
      // Your custom logic
      IndieNeon.toast("Item deleted", {tone: "bad"});
    }
  }
});
```

### Toast Notifications
Use the toast system anywhere in your code:

```javascript
IndieNeon.toast("Success message", {tone: "good"});
IndieNeon.toast("Warning message", {tone: "warn"});
IndieNeon.toast("Error message", {tone: "bad"});
```

## 🎨 Customization

### CSS Variables
Edit CSS variables in `css/base.css` to customize the theme:

```css
:root {
  --neon-blue: #37b7ff;     /* Primary neon color */
  --neon-purple: #9a4dff;   /* Secondary neon color */
  --bg: #0a0f1a;            /* Background color */
  --panel: #0e1422;         /* Panel background */
  --surface: #121a2e;       /* Component surface */
  --text: #cfeaff;          /* Text color */
  --muted: #9fb6cc;         /* Muted text */
  --radius: 16px;           /* Border radius */
  --btn-h: 56px;            /* Button height */
}
```

### Selective Loading
Include only the CSS/JS files you need for your project to reduce file size.

## ✨ Features

- **No Dependencies**: Pure HTML/CSS/JavaScript
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Works on desktop and mobile
- **Smooth Animations**: 0.15s transitions throughout
- **Consistent Theme**: Unified neon color palette
- **Modular**: Use only the components you need

## 🎯 Demo

Open `index.html` directly in a browser, or serve the folder:
```bash
python3 -m http.server 8080
```

