import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const QUALITY = 85; // high quality, minimal visual loss
const MAX_WIDTH = 1600; // max width for any image

const dirs = [
  'public/assets/blog',
  'public/assets/team',
  'public/assets/places',
  'public/assets/screens',
];

async function optimizeImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const name = basename(inputPath, ext);
  const dir = inputPath.substring(0, inputPath.lastIndexOf('/') || inputPath.lastIndexOf('\\'));
  const webpPath = join(dir, `${name}.webp`);

  // Skip if webp already exists and is newer
  if (existsSync(webpPath)) {
    const srcStat = statSync(inputPath);
    const webpStat = statSync(webpPath);
    if (webpStat.mtimeMs > srcStat.mtimeMs) {
      console.log(`  SKIP ${webpPath} (up to date)`);
      return;
    }
  }

  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;

  await sharp(inputPath)
    .resize(width)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(webpPath);

  const origSize = statSync(inputPath).size;
  const newSize = statSync(webpPath).size;
  const saved = ((1 - newSize / origSize) * 100).toFixed(1);
  console.log(`  ${inputPath} (${(origSize/1024).toFixed(0)}KB) → ${webpPath} (${(newSize/1024).toFixed(0)}KB) [${saved}% smaller]`);
}

async function processDir(dir) {
  if (!existsSync(dir)) return;
  console.log(`\nProcessing ${dir}:`);
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('Optimizing images to WebP (quality: ' + QUALITY + ')...\n');
for (const dir of dirs) {
  await processDir(dir);
}

// Also handle public root images
const rootImages = ['public/logo.png', 'public/favicon.png'];
console.log('\nProcessing root images:');
for (const img of rootImages) {
  if (existsSync(img)) await optimizeImage(img);
}

console.log('\nDone! WebP files created alongside originals.');
console.log('Original PNGs kept as fallback. Update your code to use .webp extensions.');
