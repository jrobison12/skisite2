const https = require('https');
const fs = require('fs');
const path = require('path');

// Using local images from Pictures folder
const images = {
  'background.jpeg': '',  // Using local file from Pictures folder
  'alta.jpg': '',        // Using local file from Pictures folder
  'snowbird.jpg': '',    // Using local file from Pictures folder
  'brighton.jpg': '',    // Using local file from Pictures folder
  'solitude.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'park-city.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'deer-valley.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'snowbasin.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'skis.jpg': '',        // Using local file from Pictures folder
  'boots.jpg': '',       // Using local file from Pictures folder
  'helmet.jpg': '',      // Using local file from Pictures folder
  'goggle.jpg': '',      // Using local file from Pictures folder
  'bindings.jpg': '',    // Using local file from Pictures folder
  'poles.jpg': ''        // Using local file from Pictures folder
};

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Only download images that have URLs (the remaining resort images)
Object.entries(images).forEach(([filename, url]) => {
  if (!url) return; // Skip local files
  
  const filepath = path.join(publicDir, filename);
  
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(filepath));
    console.log(`Downloaded ${filename}`);
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 