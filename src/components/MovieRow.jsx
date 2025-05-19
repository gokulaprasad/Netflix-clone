import { useEffect, useState } from 'react';
import axios from 'axios';
import TrailerModal from './TrailerModal'; // import the modal component

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(fetchUrl).then((res) => setMovies(res.data.results));
  }, [fetchUrl]);

  const handleMovieClick = async (movie) => {
    try {
      const videoRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=7ca976c7ef39438a6546bd429e2def5b`
      );

      const trailer = videoRes.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        setShowModal(true);
      } else {
        alert("Trailer not available");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <div className="px-6 sm:px-12 lg:px-24 py-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h2>

      {/* Movie Row */}
      <div className={`flex gap-3 overflow-x-scroll scrollbar-hide ${showModal ? 'backdrop-blur-lg' : ''}`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-36 sm:w-48 rounded-lg hover:scale-105 transition cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>

      {/* Show Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
          <TrailerModal
            trailerUrl={trailerUrl}
            onClose={() => {
              setShowModal(false);
              setTrailerUrl(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
