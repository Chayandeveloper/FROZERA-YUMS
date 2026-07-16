import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\biswa\\Downloads\\frozen';
const destDir = 'C:\\Users\\biswa\\OneDrive\\Desktop\\WHITEBRAINS\\frozera-yums\\public\\products';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

files.forEach(file => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, file));
});

console.log(`Copied ${files.length} product images to public/products`);
