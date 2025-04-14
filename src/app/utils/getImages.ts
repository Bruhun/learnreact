import fs from 'fs';
import path from 'path';

export function getImagePaths() {
  // Get images from the main directory
  const mainDirectory = path.join(process.cwd(), 'public/images');
  const twitterDirectory = path.join(process.cwd(), 'public/images/twitter');
  
  let allImagePaths: string[] = [];
  
  // Get files from the main images directory
  try {
    const mainFiles = fs.readdirSync(mainDirectory);
    // Filter out directories (including 'twitter')
    const mainImages = mainFiles.filter(file => {
      const filePath = path.join(mainDirectory, file);
      return fs.statSync(filePath).isFile();
    });
    // Add main directory images
    allImagePaths = mainImages.map(file => `/images/${file}`);
  } catch (error) {
    console.error(`Error reading main images directory: ${error}`);
  }
  
  // Get files from the twitter subdirectory
  try {
    if (fs.existsSync(twitterDirectory)) {
      const twitterFiles = fs.readdirSync(twitterDirectory);
      // Add twitter directory images
      const twitterImages = twitterFiles.map(file => `/images/twitter/${file}`);
      allImagePaths = [...allImagePaths, ...twitterImages];
    }
  } catch (error) {
    console.error(`Error reading twitter images directory: ${error}`);
  }
  
  return allImagePaths;
}
