#!/usr/bin/env node

/**
 * Build script for Indie Neon UI
 * Combines and minifies CSS and JavaScript files
 */

const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Simple minification functions
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
    .replace(/{\s*/g, '{') // Remove spaces after opening braces
    .replace(/;\s*/g, ';') // Remove spaces after semicolons
    .replace(/,\s*/g, ',') // Remove spaces after commas
    .replace(/:\s*/g, ':') // Remove spaces after colons
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\/\/.*$/gm, '') // Remove line comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/;\s*/g, ';') // Remove spaces after semicolons
    .replace(/{\s*/g, '{') // Remove spaces after opening braces
    .replace(/}\s*/g, '}') // Remove spaces before closing braces
    .replace(/,\s*/g, ',') // Remove spaces after commas
    .replace(/:\s*/g, ':') // Remove spaces after colons
    .trim();
}

// Read and combine CSS files
const cssFiles = [
  'css/base.css',
  'css/buttons.css',
  'css/accordion.css',
  'css/tabs.css',
  'css/forms.css',
  'css/dropdown.css',
  'css/modals.css',
  'css/feedback.css',
  'css/cards.css',
  'css/table.css'
];

let combinedCSS = '';
cssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    combinedCSS += fs.readFileSync(filePath, 'utf8') + '\n';
  } else {
    console.warn(`Warning: CSS file ${file} not found`);
  }
});

// Read and combine JS files
const jsFiles = [
  'js/core.js',
  'js/accordion.js',
  'js/tabs.js',
  'js/modals.js',
  'js/dropdown.js'
];

let combinedJS = '';
jsFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    combinedJS += fs.readFileSync(filePath, 'utf8') + '\n';
  } else {
    console.warn(`Warning: JS file ${file} not found`);
  }
});

// Create minified versions
const minifiedCSS = minifyCSS(combinedCSS);
const minifiedJS = minifyJS(combinedJS);

// Write distribution files
fs.writeFileSync(path.join(distDir, 'indie-neon-ui.css'), combinedCSS);
fs.writeFileSync(path.join(distDir, 'indie-neon-ui.min.css'), minifiedCSS);
fs.writeFileSync(path.join(distDir, 'indie-neon-ui.js'), combinedJS);
fs.writeFileSync(path.join(distDir, 'indie-neon-ui.min.js'), minifiedJS);

// Create CDN version (single file with embedded CSS)
const cdnVersion = `/*!
 * Indie Neon UI - CDN Version
 * Version: 1.0.0
 * License: MIT
 * Author: Jason
 */

// Embed CSS
const style = document.createElement('style');
style.textContent = \`${minifiedCSS.replace(/`/g, '\\`')}\`;
document.head.appendChild(style);

// Embed JavaScript
${minifiedJS}`;

fs.writeFileSync(path.join(distDir, 'indie-neon-ui.cdn.js'), cdnVersion);

console.log('✅ Build completed successfully!');
console.log('📁 Generated files:');
console.log('   - dist/indie-neon-ui.css (development)');
console.log('   - dist/indie-neon-ui.min.css (production)');
console.log('   - dist/indie-neon-ui.js (development)');
console.log('   - distie-neon-ui.min.js (production)');
console.log('   - dist/indie-neon-ui.cdn.js (CDN single file)');
console.log('');
console.log('📊 File sizes:');
console.log(`   CSS: ${(fs.statSync(path.join(distDir, 'indie-neon-ui.css')).size / 1024).toFixed(1)}KB (dev) / ${(fs.statSync(path.join(distDir, 'indie-neon-ui.min.css')).size / 1024).toFixed(1)}KB (min)`);
console.log(`   JS:  ${(fs.statSync(path.join(distDir, 'indie-neon-ui.js')).size / 1024).toFixed(1)}KB (dev) / ${(fs.statSync(path.join(distDir, 'indie-neon-ui.min.js')).size / 1024).toFixed(1)}KB (min)`);
console.log(`   CDN: ${(fs.statSync(path.join(distDir, 'indie-neon-ui.cdn.js')).size / 1024).toFixed(1)}KB`);

