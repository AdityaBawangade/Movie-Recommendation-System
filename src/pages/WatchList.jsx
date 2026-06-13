import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getWatchlist, removeFromWatchlist } from "../services/watchlist";

function WatchList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);

    setMovies(
      movies.filter((movie) => movie.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        My Watchlist ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />

            <button
              onClick={() => handleRemove(movie.id)}
              className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              ❌ Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;