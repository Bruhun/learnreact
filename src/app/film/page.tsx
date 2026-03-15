// src/app/film/page.tsx (Taslak)

import styles from './film.module.css';

async function getRecommendations(movieName: string) {
  // 1. Önce film isminden ID'yi bul
  // 2. TMDB 'recommendations' endpoint'ine istek at
  // 3. Gelen listeyi 'Turkish Preference' kuralına göre filtrele
  // Örn: Eğer film orijinal dili 'tr' ise listenin başına taşı.
}

export default function FilmPage() {
  return (
    <div className={styles.container}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Film Robotu 🤖</h1>
      <input 
        type="text" 
        placeholder="Sevdiğin bir filmi yaz..." 
        className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Öneri Kartları Buraya Gelecek */}
        <div className="border p-4 rounded-xl hover:shadow-lg transition">
          <img src="/placeholder-poster.jpg" alt="Film" className="rounded-md mb-2" />
          <h3 className="font-bold">Film Adı</h3>
          <p className="text-sm text-gray-500 mt-2">"Bu film, Türk izleyicisinin sevdiği 'aile bağları' temasını işlediği için seçildi."</p>
        </div>
      </div>
      </div>
    </div>
  );
}