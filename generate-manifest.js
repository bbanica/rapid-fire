#!/usr/bin/env node

/**
 * Manifest Generator for Rapid Fire
 * 
 * Scans the polls directory and generates manifest.json automatically.
 * 
 * Usage:
 *   node generate-manifest.js
 * 
 * Or make it executable and run:
 *   chmod +x generate-manifest.js
 *   ./generate-manifest.js
 */

const fs = require('fs');
const path = require('path');

const POLLS_DIR = './polls';
const MANIFEST_PATH = './polls/manifest.json';
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

function generateManifest() {
  const polls = [];
  
  // Read the polls directory
  const entries = fs.readdirSync(POLLS_DIR, { withFileTypes: true });
  
  for (const entry of entries) {
    // Skip files (like manifest.json) and hidden folders
    if (!entry.isDirectory() || entry.name.startsWith('.')) {
      continue;
    }
    
    const pollPath = path.join(POLLS_DIR, entry.name);
    const files = fs.readdirSync(pollPath);
    
    // Filter for image files
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .sort() // Alphabetical order
      .map(file => `./${path.join('polls', entry.name, file)}`);
    
    if (images.length === 0) {
      console.warn(`⚠️  Skipping "${entry.name}" - no images found`);
      continue;
    }
    
    // Generate a nice display name from folder name
    const displayName = entry.name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    
    polls.push({
      id: entry.name,
      name: displayName,
      thumbnail: images[0],
      images: images
    });
    
    console.log(`✓ Added "${displayName}" with ${images.length} images`);
  }
  
  if (polls.length === 0) {
    console.log('\n❌ No polls found. Create folders with images in the polls/ directory.\n');
    console.log('Example structure:');
    console.log('  polls/');
    console.log('  ├── my-poll-name/');
    console.log('  │   ├── design-1.png');
    console.log('  │   ├── design-2.png');
    console.log('  │   └── design-3.png');
    console.log('  └── another-poll/');
    console.log('      ├── option-a.jpg');
    console.log('      └── option-b.jpg\n');
    return;
  }
  
  // Write the manifest
  const manifest = { polls };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  
  console.log(`\n✅ Generated manifest with ${polls.length} poll(s)`);
  console.log(`   Saved to: ${MANIFEST_PATH}\n`);
}

// Run
generateManifest();
