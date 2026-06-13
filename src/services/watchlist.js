export const getWatchlist = () => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
};

export const addToWatchlist = (movie) => {
    const watchlist = getWatchlist();

    const exists = watchlist.find((item) => item.id === movie.id);

    if(!exists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
};

export const removeFromWatchlist = (id) => {
    const watchlist = getWatchlist().filter(
        (movie) => movie.id !== id
    );

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
};


