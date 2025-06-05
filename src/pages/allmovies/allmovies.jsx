import { useState, useEffect } from 'react';
import Head from '../../componads/head-section/head';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../rudex/favoritesSlice';

export default function MovieTabs() {
    const [activeTab, setActiveTab] = useState('trending');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const API_BASE = 'https://api.themoviedb.org/3';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
        }
    };

    const fetchMovies = (tab) => {
        setLoading(true);
        let url = '';

        if (tab === 'trending') url = `${API_BASE}/trending/movie/day?language=en-US`;
        else if (tab === 'popular') url = `${API_BASE}/movie/popular?language=en-US&page=1`;
        else if (tab === 'upcoming') url = `${API_BASE}/movie/upcoming?language=en-US&page=1`;
        else if (tab === 'toprate') url = `${API_BASE}/movie/top_rated?language=en-US&page=1`;
        else if (tab === 'nowplaying') url = `${API_BASE}/movie/now_playing?language=en-US&page=1`;

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMovies(activeTab);
    }, [activeTab]);

    const toggleFavorite = (movie) => {
        const isFav = favorites.find(fav => fav.id === movie.id);
        isFav ? dispatch(removeFavorite(movie.id)) : dispatch(addFavorite(movie));
    };

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <>
            <Head />
            <div className="container my-5">
                <div className="d-flex gap-3 mb-4 flex-wrap justify-content-center">
                    {['trending', 'popular', 'upcoming', 'toprate', 'nowplaying'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`btn text-light ${activeTab === tab ? 'btn-outline-danger' : 'bg-transparent btn-outline-light'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace('toprate', 'Top Rate').replace('nowplaying', 'Now Playing')}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="boxs fade-in d-flex flex-wrap justify-content-center gap-4">
                        {movies.map(movie => (
                            <div key={movie.id}>
                                <Link to={`/movie/${movie.id}`} className="text-decoration-none text-white">
                                    <div className="now-card my-5 card modern-card text-white" style={{ width: '15rem' }}>
                                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} className="card-img-trend" alt={movie.original_title} />
                                        <div className="card-body">
                                            <div className="title">
                                                <h5 className="card-title" data-text={movie.original_title}>{movie.original_title}</h5>
                                                <p className="card-text">Language: {movie.original_language}</p>
                                            </div>
                                            <div className="rate fs-5 d-flex justify-content-between align-items-center p-2">
                                                <p className="card-text m-0 bg-warning rounded p-1 text-dark fw-bold">Rate: {movie.vote_average}</p>
                                                <p className="card-text m-0 bg-primary rounded p-1 text-dark fw-bold">View: {movie.vote_count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="text-center mt-2">
                                    <button
                                        className={`btn btn-sm ${isFavorite(movie.id) ? 'btn-danger' : 'btn-outline-light'}`}
                                        onClick={() => toggleFavorite(movie)}
                                    >
                                        {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
