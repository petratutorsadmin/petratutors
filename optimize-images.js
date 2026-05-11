import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'public', 'logo.png');
const outputPathWebp = path.join(__dirname, 'public', 'logo-optimized.webp');
const outputPathPng = path.join(__dirname, 'public', 'logo-optimized.png');

async function optimizeLogo() {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('logo.png not found in public directory');
      return;
    }

    // Generate WebP
    await sharp(inputPath)
      .resize(200, 200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPathWebp);
    
    // Generate optimized PNG fallback
    await sharp(inputPath)
      .resize(200, 200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outputPathPng);

    console.log('Successfully optimized logo images!');
    
    const webpStats = fs.statSync(outputPathWebp);
    console.log(`WebP size: ${(webpStats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('Error optimizing logo:', error);
  }
}

optimizeLogo();
