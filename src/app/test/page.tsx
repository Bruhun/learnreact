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
            <img
              key={index}
              src={url} // url will now be like '/images/twitter/twitter_photo_1.jpg'
              alt={`Cached Twitter photo ${index + 1}`}
              style={{ width: '200px', height: 'auto', border: '1px solid #ccc' }}
            />
          ))}
        </div>
      ) : (
        <p>No cached Twitter photos found. Run the update script?</p>
      )}
    </div>
  );
}
