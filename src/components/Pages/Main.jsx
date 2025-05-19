import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieRow from '../MovieRow';
import NavBarFunctional from '../navBarFunctional';
import Footer from '../footer';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
};

export default function App() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(requests.trending).then((res) => {
      const randomMovie = res.data.results[Math.floor(Math.random() * res.data.results.length)];
      setBannerMovie(randomMovie);
    });
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      setSearchResults(res.data.results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <>
    <div className="bg-black min-h-screen text-white">
      <NavBarFunctional onSearch={handleSearch} />

      {/* Banner only if not searching */}
      {searchQuery === "" && (
        <header
          className="h-[90vh] bg-cover bg-center relative text-white"
          style={{
            backgroundImage: bannerMovie
              ? `url('https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}')`
              : 'none'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>

          {/* Banner Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
            <p className="text-red-500 font-bold text-sm sm:text-base mb-2">N SERIES</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
            </h1>
            <p className="max-w-xl text-sm sm:text-base md:text-lg line-clamp-3">
              {bannerMovie?.overview}
            </p>
            <div className="mt-6 flex gap-3">
              <button className="flex items-center bg-white text-black px-5 py-2 font-semibold rounded hover:bg-gray-300 transition">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="flex items-center bg-gray-700 text-white px-5 py-2 font-semibold rounded hover:bg-gray-600 transition">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="px-6">
        {/* If searching, show search results */}
        {searchQuery !== "" ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {searchResults.length > 0 ? (
                searchResults.map((movie) => (
                  <div key={movie.id} className="rounded overflow-hidden hover:scale-105 transition transform">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-auto"
                    />
                    <h3 className="text-sm mt-2">{movie.title || movie.name}</h3>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <MovieRow title="Trending Now" fetchUrl={requests.trending} />
            <MovieRow title="Top Rated" fetchUrl={requests.topRated} />
            <MovieRow title="Action Movies" fetchUrl={requests.action} />
          </>
        )}
      </main>
    </div>

    <Footer />
    </>
  );
}
