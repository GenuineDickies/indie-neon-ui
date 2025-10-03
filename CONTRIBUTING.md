# Contributing to Indie Neon UI

Thank you for your interest in contributing to Indie Neon UI! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Component Guidelines](#component-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive environment. Please:

- Be respectful and constructive
- Welcome newcomers and help them get started
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 12+ installed
- Git installed
- Code editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/indie-neon-ui.git
   cd indie-neon-ui
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/GenuineDickies/indie-neon-ui.git
   ```

4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**:
   ```bash
   npm run serve
   # or
   python3 -m http.server 8080
   ```

6. **Open in browser**:
   - Component docs: http://localhost:8080/index.html
   - Demo page: http://localhost:8080/demo.html

## Development Workflow

### Making Changes

1. **Edit source files** in `/css/` or `/js/` directories
2. **Build distribution files**:
   ```bash
   node build.js
   ```

3. **Update version numbers** in HTML files (if modifying CSS/JS):
   ```html
   <!-- Increment version for cache busting -->
   <link rel="stylesheet" href="dist/indie-neon-ui.min.css?v=1.0.X">
   ```

4. **Test your changes**:
   - Open demo.html in browser
   - Test all affected components
   - Check console for errors
   - Test on mobile devices
   - Verify accessibility (keyboard navigation, screen readers)

5. **Check for linting errors** (no inline styles, no inline onclick handlers)

### Cache Busting Policy (CRITICAL)

**Every time CSS or JS files are modified**, you MUST increment version numbers:

- **PATCH** (1.0.1 → 1.0.2): Bug fixes, minor tweaks
- **MINOR** (1.0.2 → 1.1.0): New features, new components
- **MAJOR** (1.1.0 → 2.0.0): Breaking changes

**Files to update:**
- `demo.html` - Update version in CSS and JS links
- `index.html` - Update version in CSS and JS links

See [DEVELOPMENT.md](DEVELOPMENT.md) for complete guidelines.

## Coding Standards

### CSS Guidelines

**✅ DO:**
- Use CSS custom properties (variables) defined in `css/base.css`
- Follow existing naming conventions
- Add comments for complex styles
- Keep specificity low
- Use consistent spacing (2 spaces)
- Group related properties together

**❌ DON'T:**
- Use inline styles
- Use `!important` unless absolutely necessary
- Hard-code colors (use CSS variables)
- Use browser-specific prefixes without fallbacks

**Example:**
```css
/* Good */
.btn-primary {
  background: var(--neon-blue);
  color: var(--text);
  border-radius: var(--radius);
  transition: all 0.15s ease;
}

/* Bad */
.btn-primary {
  background: #37b7ff !important; /* Hard-coded color, !important */
  color: white;
  border-radius: 8px; /* Hard-coded value */
}
```

### JavaScript Guidelines

**✅ DO:**
- Use modern ES6+ syntax
- Add JSDoc comments for functions
- Use meaningful variable names
- Handle errors gracefully
- Clean up event listeners
- Follow existing patterns

**❌ DON'T:**
- Use inline onclick handlers
- Use `var` (use `const` or `let`)
- Pollute global scope
- Ignore accessibility (add ARIA attributes)

**Example:**
```javascript
// Good
/**
 * Initializes the accordion component
 * @param {Element} container - The accordion container element
 */
function initAccordion(container) {
  const buttons = container.querySelectorAll('.accordion-toggle');
  buttons.forEach(btn => {
    btn.addEventListener('click', handleAccordionClick);
    btn.setAttribute('aria-expanded', 'false');
  });
}

// Bad
function init(c) { // Unclear name, no comments, no accessibility
  var btns = c.querySelectorAll('.accordion-toggle');
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() { ... }; // Inline handler, var
  }
}
```

### HTML Guidelines

**✅ DO:**
- Use semantic HTML5 elements
- Add ARIA attributes for accessibility
- Use proper heading hierarchy
- Include alt text for images
- Use labels for form inputs

**❌ DON'T:**
- Use divs for everything
- Skip accessibility attributes
- Use inline styles or scripts
- Use deprecated HTML tags

## Component Guidelines

### Creating New Components

1. **Create CSS file** in `/css/` directory:
   ```css
   /* css/my-component.css */
   .my-component {
     /* Styles here */
   }
   ```

2. **Create JS file** in `/js/` directory (if needed):
   ```javascript
   /* js/my-component.js */
   (function() {
     IndieNeon.myComponent = {
       init: function() {
         // Initialization code
       }
     };
   })();
   ```

3. **Add to build.js**:
   ```javascript
   const cssFiles = [
     // ... existing files
     'css/my-component.css'
   ];
   
   const jsFiles = [
     // ... existing files
     'js/my-component.js'
   ];
   ```

4. **Add to index.html** with documentation:
   ```html
   <!-- ========================================
        MY COMPONENT
        ======================================== -->
   <section>
     <h2>My Component</h2>
     <p>Description of what the component does.</p>
     
     <!-- Example usage -->
     <div class="my-component">
       <!-- Component markup -->
     </div>
     
     <!-- Usage documentation -->
     <pre><code>
   &lt;div class="my-component"&gt;
     &lt;!-- Your content --&gt;
   &lt;/div&gt;
     </code></pre>
   </section>
   ```

5. **Update FUTURE_COMPONENTS.md** (remove from wishlist if it was there)

### Component Checklist

Before submitting a new component, ensure:

- [ ] CSS file created in `/css/` directory
- [ ] JS file created in `/js/` directory (if needed)
- [ ] Added to `build.js` file lists
- [ ] Documented in `index.html`
- [ ] Uses CSS variables from `base.css`
- [ ] Includes ARIA attributes
- [ ] Keyboard navigation works
- [ ] Responsive on mobile
- [ ] Tested in major browsers
- [ ] No console errors
- [ ] Follows neon theme aesthetic
- [ ] Version numbers updated in HTML files

## Submitting Changes

### Pull Request Process

1. **Ensure all tests pass**:
   - Build completes without errors
   - No console errors in browser
   - All components work as expected

2. **Update documentation**:
   - Add component to README.md if new
   - Update CHANGELOG.md
   - Add usage examples

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add new button variant"
   ```
   
   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - CSS/styling changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** on GitHub:
   - Describe what changes you made
   - Explain why the changes are needed
   - Include screenshots/GIFs if visual changes
   - Reference any related issues

### Pull Request Guidelines

**Good PR title examples:**
- `feat: add slide-out drawer component`
- `fix: modal backdrop not closing on mobile`
- `docs: improve button component documentation`
- `style: enhance card hover effects`

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/UI improvement

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Keyboard navigation works
- [ ] No console errors

## Screenshots
(if applicable)
```

## Questions?

- **Issues**: [GitHub Issues](https://github.com/GenuineDickies/indie-neon-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GenuineDickies/indie-neon-ui/discussions)

## Thank You!

Your contributions help make Indie Neon UI better for everyone. We appreciate your time and effort! 💙

