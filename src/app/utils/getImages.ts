import fs from 'fs';
import path from 'path';

export function getImagePaths() {
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const imageFiles = fs.readdirSync(imagesDirectory);
  
  return imageFiles.map(file => `/images/${file}`);
}
