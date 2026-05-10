const fs = require('fs');

const svg192 = `<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg"><rect width="192" height="192" fill="#1DB954"/></svg>`;
const svg512 = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" fill="#1DB954"/></svg>`;

fs.writeFileSync('public/icon-192x192.svg', svg192);
fs.writeFileSync('public/icon-512x512.svg', svg512);
