import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

console.log("API Key:", API_KEY);

const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );

  return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
}

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};

export const getPopularMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
  );
  return response.data.results;
};

export const getMovieVideos = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getGenres = async ()=> {
  const response = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  return response.data.genres;
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
  );
  return response.data.results;
};


export const getMovieReviews = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
}