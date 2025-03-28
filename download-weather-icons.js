const https = require('https');
const fs = require('fs');
const path = require('path');

const weatherIcons = {
  'clear-day': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/clear-day.svg',
  'partly-cloudy-day': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/partly-cloudy-day.svg',
  'cloudy': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/cloudy.svg',
  'fog': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/fog.svg',
  'drizzle': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/drizzle.svg',
  'rain': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/rain.svg',
  'snow': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/snow.svg',
  'thunderstorm': 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/line/svg/thunderstorms.svg'
};

const iconDir = path.join(__dirname, 'public', 'weather-icons');

// Create the weather-icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Download each icon
Object.entries(weatherIcons).forEach(([name, url]) => {
  const filepath = path.join(iconDir, `${name}.svg`);
  
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(filepath));
    console.log(`Downloaded ${name}.svg`);
  }).on('error', (err) => {
    console.error(`Error downloading ${name}.svg:`, err.message);
  });
}); 