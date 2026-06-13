import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-0 z-20 bg-slate-950/95 border-b border-white/10 px-6 py-3 shadow-sm shadow-black/20 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-sm text-slate-200">
                <Link to="/" className="flex items-center gap-3 font-semibold text-slate-100 transition hover:text-red-400">
                    <span className="text-2xl">🎬</span>
                    <span className="text-xl">MovieFlex</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/" className="transition hover:text-red-400">Home</Link>
                    <Link to="/watchlist" className="transition hover:text-red-400">Watchlist 💓</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;