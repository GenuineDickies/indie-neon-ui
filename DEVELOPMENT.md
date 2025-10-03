# Development Guidelines

## 🚨 Critical: Cache Busting Policy

Every time you modify CSS or JavaScript files, you **MUST** update version numbers in all HTML files to prevent browser caching issues.

### Quick Reference

**Modified CSS/JS?** → **Update versions in HTML files!**

### Files to Update

When you change any CSS or JS file, increment the version number in:
- `demo.html`

### Version Number Format

```html
<!-- Current format -->
<link rel="stylesheet" href="dist/indie-neon-ui.min.css?v=1.0.1">
<link rel="stylesheet" href="css/demo.css?v=1.0.1">
<script src="dist/indie-neon-ui.min.js?v=1.0.1"></script>
```

### Semantic Versioning

- **Patch** (1.0.1 → 1.0.2): Bug fixes, minor tweaks
- **Minor** (1.0.2 → 1.1.0): New features, new components
- **Major** (1.1.0 → 2.0.0): Breaking changes, major redesigns

### Example Workflow

```bash
# 1. Make your changes
vim css/demo.css

# 2. Build distribution files
node build.js

# 3. Update version numbers in HTML files
# Change v=1.0.1 to v=1.0.2 in demo.html

# 4. Test locally
# Open demo.html in browser

# 5. Commit everything
git add .
git commit -m "Fix sidebar styles - bump to v1.0.2"
git push

# 6. Deploy to server
```

---

## 📋 Development Workflow

### Setup

```bash
# Clone repository
git clone <repo-url>
cd indie_neon_ui

# Install dependencies (if any)
npm install
```

### Making Changes

#### 1. Edit Source Files

- **CSS**: Edit files in `/css/` directory
- **JavaScript**: Edit files in `/js/` directory
- **HTML**: Edit `demo.html`

#### 2. Build Distribution Files

```bash
node build.js
```

This generates:
- `dist/indie-neon-ui.css` (development)
- `dist/indie-neon-ui.min.css` (production)
- `dist/indie-neon-ui.js` (development)
- `dist/indie-neon-ui.min.js` (production)
- `dist/indie-neon-ui.cdn.js` (CDN single-file)

#### 3. Update Version Numbers

**Required every time CSS/JS changes!**

In `demo.html`, update:
```html
?v=1.0.1  →  ?v=1.0.2
```

#### 4. Test Locally

Open `demo.html` in your browser and verify:
- [ ] All components render correctly
- [ ] No console errors
- [ ] Interactive features work
- [ ] Responsive design works
- [ ] No visual glitches

#### 5. Commit and Push

```bash
git add .
git commit -m "Descriptive commit message"
git push origin main
```

---

## 🧪 Testing

### Browser Testing

Test in multiple browsers:
- Chrome
- Firefox
- Edge
- Safari (if available)

### Responsive Testing

Test at different screen sizes:
- Desktop (1920x1080)
- Tablet (768px)
- Mobile (375px)

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader friendly (use aria-labels)
- [ ] All interactive elements are focusable
- [ ] Color contrast is sufficient

---

## 📝 Code Standards

### CSS

- Use external stylesheets only (no inline styles)
- Organize by component (one file per component)
- Use CSS variables for theming
- Follow BEM-like naming conventions

### JavaScript

- Use event listeners (no inline onclick)
- Keep code modular (one file per component)
- Comment complex logic
- Use ES6+ features

### HTML

- Semantic markup
- Proper accessibility attributes (aria-label, role, etc.)
- No inline styles or scripts

---

## 🔧 Build System

### Build Configuration

The `build.js` script concatenates and minifies:

**CSS Files (in order):**
1. base.css
2. buttons.css
3. forms.css
4. cards.css
5. modals.css
6. tabs.css
7. accordion.js
8. dropdown.css
9. badges.css
10. alert-banners.css
11. table.css
12. pagination.css
13. sidebar.css
14. fab.css
15. star-rating.css
16. stats-cards.css
17. loading-skeletons.css
18. circular-progress.css
19. status-indicators.css
20. empty-states.css
21. feedback.css
22. search-bar.css
23. filter-chips.css
24. button-group.css
25. demo.css

**JavaScript Files (in order):**
1. core.js
2. accordion.js
3. tabs.js
4. modals.js
5. dropdown.js
6. sidebar.js
7. pagination.js

### Adding New Components

1. Create CSS file: `css/new-component.css`
2. Create JS file (if needed): `js/new-component.js`
3. Add to `build.js`:
```javascript
const cssFiles = [
  // ... existing files
  'css/new-component.css'
];

const jsFiles = [
  // ... existing files
  'js/new-component.js'
];
```
4. Run `node build.js`
5. **Bump MINOR version**: v=1.1.0 → v=1.2.0
6. Add demo to `demo.html`

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No linting errors
- [ ] Version numbers updated in HTML
- [ ] Built files are up to date
- [ ] Changes committed and pushed to GitHub

### Deployment Steps

1. Upload updated files to server:
   - `demo.html` (with new version numbers)
   - `dist/*` (all built files)
   - `css/*` (all CSS source files)
   - `js/*` (all JS source files)

2. Verify on live site:
   - Hard refresh (Ctrl+F5)
   - Test all changed components
   - Check console for errors

3. If issues occur:
   - Increment version numbers again
   - Redeploy HTML files
   - Users will get fresh files on next visit

---

## 🐛 Troubleshooting

### Users See Old Styles

**Problem**: Browser caching old CSS/JS files

**Solution**: 
1. Increment version numbers in HTML files
2. Commit and push
3. Deploy updated HTML
4. Users get fresh files automatically

### Build Fails

**Problem**: `node build.js` throws errors

**Solution**:
1. Check Node.js is installed: `node --version`
2. Verify all source files exist
3. Check file permissions
4. Look for syntax errors in CSS/JS

### Components Not Working

**Problem**: JavaScript features broken

**Solution**:
1. Check browser console for errors
2. Verify `IndieNeon.init()` is called
3. Check JavaScript is loaded after DOM
4. Verify version numbers match

---

## 📚 Additional Resources

- Main README: `README.md`
- License: `LICENSE`
- Cursor Rules: `.cursorrules` (for AI agents)

---

## 🤝 Contributing

When contributing:
1. Follow this development guide
2. Update version numbers when changing CSS/JS
3. Write clear commit messages
4. Test thoroughly before pushing
5. Update documentation if adding features

---

**Current Version**: v1.0.1  
**Last Updated**: October 2, 2025

