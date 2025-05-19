export default function SearchResults({ results }) {
  return (
    <div className="px-6 sm:px-12 lg:px-24 py-8">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
            {movie.poster_path ? (
              <img
                className="w-full h-64 object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 flex items-center justify-center">No Image</div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title || movie.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
