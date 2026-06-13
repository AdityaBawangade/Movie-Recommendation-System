import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
    >
      <div className="relative overflow-hidden bg-slate-900/90">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-96 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to from-slate-950/90 to-transparent p-4">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-3">{movie.overview || 'No description available.'}</p>
      </div>
    </Link>
  );
}

export default MovieCard;