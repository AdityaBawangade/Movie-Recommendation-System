function SearchBar({ searchTerm, setSearchTerm }){
    return (
        <input
            type="text"
            placeholder="Search movies, genres, titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-slate-100 placeholder:text-slate-500 shadow-lg shadow-black/10 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        />
    );
}
export default SearchBar;