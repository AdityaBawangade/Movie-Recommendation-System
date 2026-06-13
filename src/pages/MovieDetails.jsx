import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/api";
import { addToWatchlist } from "../services/watchlist";
import { getMovieReviews } from "../services/api";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
                const videos = await getMovieVideos(id);
                const trailer = videos.find(
                    (video) => video.site === "YouTube" && video.type === "Trailer"
                );
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
                const reviewData = await getMovieReviews(id);
                setReviews(reviewData || []);
            } catch (fetchError) {
                console.error(fetchError);
                setError("Unable to load movie details. Please refresh or try again later.");
            }
        };
        fetchMovie();
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
                <div className="max-w-xl rounded-3xl border border-red-500 bg-slate-950/80 p-8 text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
                    <p className="text-slate-300 mb-6">{error}</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return <h2 className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</h2>;
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-xl w-80"
                />

                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        {movie.title}
                    </h1>

                    <p className="mb-4">
                        {movie.overview}
                    </p>

                    <p className="text-yellow-400 mb-2">
                        ⭐ {movie.vote_average}
                    </p>

                    <p className="mb-4">
                        📅 {movie.release_date}
                    </p>

                    <button
                        onClick={() => {
                            addToWatchlist(movie);
                            alert("Added to Watchlist ❤️");
                        }}
                        className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
                    >
                        ❤️ Add to Watchlist
                    </button>

                    {trailerKey && (
                        <button onClick={() => setShowTrailer(true)}
                            className="ml-4 bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
                        >▶ Watch Trailer</button>
                    )}
                </div>
            </div>
            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="bg-gray-900 p-4 rounded-xl w-[90%] max-w-4xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-bold">
                                Movie Trailer
                            </h2>

                            <button onClick={() => setShowTrailer(false)}
                                className="text-white text-2xl">
                                ✖
                            </button>

                        </div>
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            allowFullScreen
                            className="rounded-lg" />
                    </div>
                </div>
            )}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">📄 Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-slate-300">No reviews available.</p>
                ) : (
                    reviews.slice(0, 5).map((review) => (
                        <div key={review.id} className="bg-gray-800 p-4 rounded-lg mb-4">
                            <h3 className="font-bold text-yellow-400">{review.author}</h3>
                            <p className="mt-2 text-slate-300">
                                {review.content?.substring(0, 300) ?? "Review not available."}...
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MovieDetails;