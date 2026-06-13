import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from '../components/SearchBar';
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getGenres,
  getMoviesByGenre,
  searchMovies,
} from '../services/api';

const categoryOptions = [
  { label: '🔥 Trending', value: 'trending', color: 'bg-red-500 hover:bg-red-600' },
  { label: '🎥 Popular', value: 'popular', color: 'bg-blue-500 hover:bg-blue-600' },
  { label: '⭐ Top Rated', value: 'toprated', color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: '📅 Upcoming', value: 'upcoming', color: 'bg-violet-500 hover:bg-violet-600' },
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("trending");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        let data = [];

        if (searchTerm.trim() !== "") {
          data = await searchMovies(searchTerm);
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, page);
        } else if (category === "trending") {
          data = await getTrendingMovies(page);
        } else if (category === "popular") {
          data = await getPopularMovies(page);
        } else if (category === "toprated") {
          data = await getTopRatedMovies(page);
        } else if (category === "upcoming") {
          data = await getUpcomingMovies(page);
        }

        if (page === 1) {
          setMovies(data);
        } else {
          setMovies((prev) => [...prev, ...data]);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, category, selectedGenre, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <section className="mb-10 overflow-hidden rounded-[34px] border border-white/10 bg-slate-900/85 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                🎬 Movie Recommendation System
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Discover movies by category, genre, or search term.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedGenre(null);
                setCategory('trending');
                setPage(1);
                setSearchTerm('');
              }}
              className="inline-flex h-12 items-center rounded-full bg-red-500 px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-red-500/20 transition hover:bg-red-600"
            >
              Reset
            </button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${option.color} rounded-3xl px-5 py-3 text-sm font-semibold text-white transition shadow-sm shadow-black/10 hover:-translate-y-0.5`}
                  onClick={() => {
                    setCategory(option.value);
                    setSelectedGenre(null);
                    setPage(1);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => {
                  setSelectedGenre(genre.id);
                  setPage(1);
                }}
                className={`rounded-full border px-4 py-2 text-sm transition ${selectedGenre === genre.id ? 'border-red-500 bg-red-500/15 text-white' : 'border-white/10 bg-slate-800 text-slate-200 hover:border-red-500 hover:bg-red-500/10'}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <div className="mb-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-96 rounded-3xl bg-slate-800/70 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-16 text-center text-slate-300">
                <h2 className="text-2xl font-semibold text-white">No movies found</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Try a different search, category, or genre.
                </p>
              </div>
            )}
          </>
        )}

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Load More Movies
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
