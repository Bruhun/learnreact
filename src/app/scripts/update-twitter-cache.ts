import fs from 'fs/promises'; // Use promise-based fs
import path from 'path';
// You might need to install node-fetch if not using Node 18+ with global fetch
// import fetch from 'node-fetch'; 

// Re-use or adapt your existing function (ensure paths are correct)
import { getRecentTwitterPhotos } from '../../lib/twitter'; 

const CACHE_DIR = path.join(process.cwd(), 'public/images/twitter');
const TWITTER_USER_ID = "1545351328582574081"; // Or get from env var
const NUM_PHOTOS_TO_CACHE = 10;

async function downloadImage(url: string, filepath: string): Promise<void> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        // Node 18+ / Next.js Edge runtime have response.arrayBuffer()
         if (typeof response.arrayBuffer === 'function') {
             const buffer = await response.arrayBuffer();
             await fs.writeFile(filepath, Buffer.from(buffer));
         } else {
             // Fallback for environments without arrayBuffer (might need node-fetch)
             const buffer = await (response as any).buffer(); // May need adjustment based on fetch implementation
             await fs.writeFile(filepath, buffer);
         }
        console.log(`Successfully downloaded ${url} to ${filepath}`);
    } catch (error) {
        console.error(`Error downloading image ${url}:`, error);
        // Decide if you want to stop or continue with other images
    }
}

async function updateCache() {
    console.log('Starting Twitter photo cache update...');

    try {
        // 1. Ensure cache directory exists
        await fs.mkdir(CACHE_DIR, { recursive: true });

        // 2. (Optional but Recommended) Clear existing cache
        console.log('Clearing existing cache directory...');
        const existingFiles = await fs.readdir(CACHE_DIR);
        for (const file of existingFiles) {
            await fs.unlink(path.join(CACHE_DIR, file));
        }
        console.log('Cache directory cleared.');

        // 3. Fetch recent photo URLs from Twitter API
        console.log(`Fetching ${NUM_PHOTOS_TO_CACHE} recent photo URLs for user ${TWITTER_USER_ID}...`);
        // IMPORTANT: Temporarily remove noStore or use a different fetching function
        // if getRecentTwitterPhotos keeps using noStore. For this script, caching is fine.
        const photoUrls = await getRecentTwitterPhotos(TWITTER_USER_ID, NUM_PHOTOS_TO_CACHE);

        if (!photoUrls || photoUrls.length === 0) {
            console.log('No photo URLs received from Twitter API. Cache update skipped.');
            return;
        }
        console.log(`Received ${photoUrls.length} photo URLs. Starting download...`);

        // 4. Download and save each photo
        for (let i = 0; i < photoUrls.length; i++) {
            const url = photoUrls[i];
            // Create a unique filename (e.g., based on index or original filename)
            const filename = `twitter_photo_${i + 1}${path.extname(new URL(url).pathname) || '.jpg'}`;
            const filepath = path.join(CACHE_DIR, filename);
            await downloadImage(url, filepath);
        }

        console.log('Twitter photo cache update completed successfully.');

    } catch (error) {
        console.error('Error during cache update process:', error);
    }
}

// Run the update function
updateCache();
