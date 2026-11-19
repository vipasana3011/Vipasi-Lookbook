import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const require = createRequire(import.meta.url);
const sharpPath = path.join(
  rootDir,
  'node_modules',
  '.pnpm',
  'sharp@0.33.5',
  'node_modules',
  'sharp'
);
const sharp = require(sharpPath);

const srcDir = path.join(rootDir, 'originals_backup', 'photos');
const destDir = path.join(rootDir, 'public', 'photos');

async function optimizeAll() {
  const files = fs.readdirSync(srcDir);
  console.log(`Starting image optimization for ${files.length} photos...`);
  
  let originalTotal = 0;
  let optimizedTotal = 0;
  let count = 0;

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const srcStat = fs.statSync(srcPath);
    originalTotal += srcStat.size;

    const buffer = await sharp(srcPath)
      .resize({ height: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(destPath, buffer);
    optimizedTotal += buffer.length;
    count++;

    if (count % 20 === 0 || count === files.length) {
      console.log(`Optimized ${count}/${files.length} photos...`);
    }
  }

  console.log('\n--- Optimization Summary ---');
  console.log(`Original total size:  ${(originalTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(optimizedTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(
    `Total reduction:      ${((1 - optimizedTotal / originalTotal) * 100).toFixed(1)}%`
  );
}

optimizeAll().catch((err) => {
  console.error('Optimization error:', err);
  process.exit(1);
});
