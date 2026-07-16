import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, '..', 'ASSETS');
const destDir = path.join(__dirname, 'public', 'frames');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);
const frames = files.filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.png'));

frames.forEach(file => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
});

console.log(`Copied ${frames.length} frames to public/frames`);
