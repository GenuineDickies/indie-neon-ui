# Indie Neon UI (Vanilla, No Libraries)
Production-grade neon UI components in pure HTML/CSS/JS. Dark theme with glowing neon blue/purple accents and smooth animations.

My first ever public repo. I didn't want a library for my styling... so I made a library? Anyhow, created with AI then tweaked until I was pleased with it. So, use it as you wish. I figured I liked it, someone else might.

## ✨ Enhanced Components

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

## 🚀 Quick Start
Open `index.html` directly in a browser, or serve the folder:
```bash
python3 -m http.server 8080
```

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

## 🎨 Design Features
- **Consistent Theme**: All components use unified neon color palette
- **Smooth Animations**: 0.15s transitions throughout the interface
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Responsive**: Works on desktop and mobile devices
- **Performance**: No dependencies, vanilla JavaScript only

## 🎯 Key Enhancements
- **Custom Dropdown**: Superior to native select with neon styling
- **Enhanced Table**: High-contrast alternating rows with vertical border hover effects
- **Interactive Cards**: Ghost effect animations and improved typography
- **Keyboard Navigation**: Arrow key support in accordions, tabs, and dropdowns
- **Visual Feedback**: Toast notifications and smooth hover states