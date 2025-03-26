const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'hero-ski.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80',
  'park-city.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'snowbird.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'deer-valley.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'skis.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'boots.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'helmet.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
  'goggles.jpg': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80'
};

const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

Object.entries(images).forEach(([filename, url]) => {
  const filepath = path.join(publicDir, filename);
  
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(filepath));
    console.log(`Downloaded ${filename}`);
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
}); 