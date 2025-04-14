import Image from 'next/image';
import { getImagePaths } from '../utils/getImages'; // Reuse or adapt this utility

// Example in a Server Component page (e.g., src/app/test/page.tsx)
export default function TestPage() {
  // Read image paths from the LOCAL cache directory
  const photoUrls = getImagePaths(); // Get all images from default directory

  return (
    <div>
      <h1>Recent Twitter Photos (Cached)</h1>
      {photoUrls.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {photoUrls.map((url, index) => (
            // Use the local URL
            <Image
                  key={index}
                  src={url}
                  alt={`Twitter photo ${index + 1}`}
                  width={200}
                  height={200}
                  style={{ height: 'auto', border: '1px solid #ccc' }}
                />
          ))}
        </div>
      ) : (
        <p>No cached Twitter photos found. Run the update script?</p>
      )}
    </div>
  );
}
