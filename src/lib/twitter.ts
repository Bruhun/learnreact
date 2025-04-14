import { unstable_noStore as noStore } from 'next/cache';

// Define interfaces for the Twitter API response structure
interface TwitterMedia {
  media_key: string;
  type: 'photo' | 'video' | 'animated_gif';
  url?: string; // Included because we request it in media.fields
  // Add other media fields if needed
}

interface TweetAttachments {
  media_keys?: string[];
}

interface Tweet {
  id: string;
  text: string;
  created_at?: string; // Included because we request it in tweet.fields
  attachments?: TweetAttachments;
  // Add other tweet fields if needed
}

interface TwitterApiResponse {
  data?: Tweet[];
  includes?: {
    media?: TwitterMedia[];
    // Add other includes like users if needed
  };
  meta?: {
    result_count: number;
    newest_id?: string;
    oldest_id?: string;
    next_token?: string;
    previous_token?: string;
  };
  errors?: {code: string; message: string }[]; // Added for basic error checking from API
}


export async function getRecentTwitterPhotos(userId: string, maxResults: number = 10): Promise<string[]> {
  noStore(); // Opt-out of static caching for dynamic data

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;
  if (!bearerToken) {
    console.error("Twitter Bearer Token not configured.");
    return [];
  }

  // Calculate start time (approx. one month ago)
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  // Format as YYYY-MM-DDTHH:mm:ssZ as required by Twitter API v2
  const startTime = oneMonthAgo.toISOString();

  // Construct the API URL
  const endpoint = `https://api.twitter.com/2/users/${userId}/tweets`;
  const params = new URLSearchParams({
    start_time: startTime,
    // Ensure max_results is between 5 and 100 for this endpoint
    max_results: String(Math.max(5, Math.min(100, maxResults))),
    expansions: 'attachments.media_keys',
    'media.fields': 'url,type', // Requesting url and type for media objects
    'tweet.fields': 'created_at,attachments', // Requesting created_at and attachments for tweet objects
  });

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      // Optional: Cache revalidation strategy if not using noStore()
      // next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
       const errorBody = await response.text();
       console.error(`Twitter API Error: ${response.status} ${response.statusText}`, errorBody);
       return [];
    }

    // Type the response data
    const data: TwitterApiResponse = await response.json();

     // Check for API-level errors reported in the body
     if (data.errors) {
         console.error("Twitter API returned errors:", data.errors);
         return [];
     }

    // Extract photo URLs using the defined types
    const mediaMap = new Map<string, TwitterMedia>(
        data.includes?.media?.map((m) => [m.media_key, m]) ?? []
    );
    const photoUrls: string[] = [];

    if (data.data) {
      for (const tweet of data.data) {
         if (tweet.attachments?.media_keys) {
           for (const key of tweet.attachments.media_keys) {
             const media = mediaMap.get(key);
             // Check media exists, type is 'photo', and URL is present
             if (media?.type === 'photo' && media.url && photoUrls.length < maxResults) {
               photoUrls.push(media.url);
             }
           }
         }
         // Stop collecting if we have reached the desired number of photos
         if (photoUrls.length >= maxResults) break;
      }
    }
    console.log(`Found ${photoUrls.length} photo URLs.`); // Add logging
    return photoUrls;

  } catch (error) {
    console.error("Error fetching or processing Twitter photos:", error);
    return [];
  }
} 