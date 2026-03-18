import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const urlParams = new URLSearchParams({
    api_key: TMDB_API_KEY || '',
    ...params,
  });
  const res = await fetch(`${BASE_URL}${endpoint}?${urlParams.toString()}`);
  if (!res.ok) throw new Error(`TMDB error: ${res.statusText}`);
  return res.json();
}

export async function GET(request: Request) {
  // Debug log to check API Key loading
  console.log('API Request received. API Key configured:', !!TMDB_API_KEY);

  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: 'TMDB API key is not configured in .env.local' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // 1. Initial Search
    const searchResult = await fetchFromTMDB('/search/movie', { query, language: 'tr-TR' });
    const inputMovie = searchResult.results[0];

    if (!inputMovie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    const inputId = inputMovie.id;
    const inputGenreIds = inputMovie.genre_ids || [];

    // 2. Director Match
    const credits = await fetchFromTMDB(`/movie/${inputId}/credits`);
    const inputDirector = credits.crew.find((c: { job: string; name: string }) => c.job === 'Director')?.name;

    // 3. Get Recommendations
    const recsResponse = await fetchFromTMDB(`/movie/${inputId}/recommendations`, { language: 'tr-TR' });
    let candidates = recsResponse.results || [];

    // Fallback if no recommendations
    if (candidates.length === 0) {
      const fallbackResponse = await fetchFromTMDB('/discover/movie', {
        with_original_language: 'tr',
        sort_by: 'popularity.desc',
        language: 'tr-TR',
      });
      candidates = fallbackResponse.results || [];
    }

    // Process top 10 candidates to avoid too many API calls for director matching
    const topCandidates = candidates.slice(0, 10);
    
    const scoredCandidates = await Promise.all(
      topCandidates.map(async (movie: { 
        id: number; 
        title: string; 
        original_title: string; 
        poster_path: string | null; 
        genre_ids: number[]; 
        original_language: string 
      }) => {
        let score = 0;
        const insights: string[] = [];

        // Drama Bonus
        if (movie.genre_ids && movie.genre_ids.includes(18)) {
          score += 10;
          insights.push('strong drama elements');
        }

        // Local Language Bonus
        if (movie.original_language === 'tr') {
          score += 20;
          insights.push('Turkish production');
        }

        // Genre Synergy
        const matchingGenres = movie.genre_ids?.filter((id: number) => inputGenreIds.includes(id)) || [];
        if (matchingGenres.length > 1) {
          const synergyPoints = (matchingGenres.length - 1) * 5;
          score += synergyPoints;
          if (synergyPoints > 0) insights.push('similar thematic genres');
        }

        // Fetch director for the candidate
        let directorNode = null;
        try {
          const candCredits = await fetchFromTMDB(`/movie/${movie.id}/credits`);
          directorNode = candCredits.crew.find((c: { job: string; name: string }) => c.job === 'Director');
          if (directorNode && directorNode.name === inputDirector) {
            score += 15;
            insights.push('same director');
          }
        } catch {
          // ignore credit fetch errors
        }

        const insightText = insights.length > 0 
          ? `Matched because of its ${insights.join(', ')}.`
          : 'Matched based on general audience preference.';

        return {
          id: movie.id,
          title: movie.title || movie.original_title,
          poster_path: movie.poster_path,
          score,
          insight: insightText,
        };
      })
    );

    // Sort by score descending
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Return exactly Top 3
    const finalTop3 = scoredCandidates.slice(0, 3);

    return NextResponse.json({
      input: { title: inputMovie.title, director: inputDirector },
      recommendations: finalTop3
    });

  } catch (error: unknown) {
    console.error('Recommendation API Error:', error);
    // Return detailed error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Failed to process recommendations';
    return NextResponse.json({ 
      error: errorMessage
    }, { status: 500 });
  }
}
