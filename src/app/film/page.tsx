'use client';

import { useState } from 'react';

type MovieRecommendation = {
  id: number;
  title: string;
  poster_path: string | null;
  score: number;
  insight: string;
};

export default function FilmPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const res = await fetch(`/api/recommend?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h1 style={{fontSize: "50px", fontStyle: "italic", fontFamily: "Bastligen"}} className="mb-8 text-center">
          Film Robotu <br/>
          <span className="text-xl font-medium text-gray-500 dark:text-gray-400" style={{fontFamily: "sans-serif", fontStyle: "normal"}}>Turkish-Centric Movie Recommendations</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Sevdiğin bir filmi yaz (örn: Ayla)..." 
            className="flex-1 p-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Get Recommendations'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
          </div>
        )}

        {!loading && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {recommendations.map((movie) => (
              <div key={movie.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl hover:shadow-xl transition-shadow flex flex-col">
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750?text=No+Poster'} 
                  alt={movie.title} 
                  className="rounded-xl mb-4 w-full h-[350px] object-cover bg-gray-100 dark:bg-gray-700" 
                />
                <h3 className="text-lg font-bold mb-2 line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50 italic">
                  "{movie.insight}"
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && recommendations.length === 0 && !error && query && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No recommendations found. Try another movie!
          </div>
        )}
      </div>
    </div>
  );
}
