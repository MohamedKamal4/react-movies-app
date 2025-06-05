import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Head from '../componads/head-section/head';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../rudex/favoritesSlice';

export default function Search() {
    const params = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
        }
    };

    useEffect(() => {
        setLoading(true);

        const fetchMovies = fetch(`https://api.themoviedb.org/3/search/movie?query=${params.title}`, options).then(res => res.json());
        const fetchTV = fetch(`https://api.themoviedb.org/3/search/tv?query=${params.title}`, options).then(res => res.json());

        Promise.all([fetchMovies, fetchTV])
            .then(([movieData, tvData]) => {
                const movieResults = (movieData.results || []).map(item => ({ ...item, media_type: 'movie' }));
                const tvResults = (tvData.results || []).map(item => ({ ...item, media_type: 'tv' }));
                setResults([...movieResults, ...tvResults]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [params.title]);

    const toggleFavorite = (item) => {
        const isFav = favorites.find(fav => fav.id === item.id);
        isFav ? dispatch(removeFavorite(item.id)) : dispatch(addFavorite(item));
    };

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <>
            <Head />
            <div className="container my-5">
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="boxs fade-in d-flex flex-wrap gap-4 justify-content-center">
                        {results.length > 0 ? (
                            results.map(item => (
                                <div key={`${item.media_type}-${item.id}`}>
                                    <Link
                                        to={`/${item.media_type === 'movie' ? 'movie' : 'tv'}/${item.id}`}
                                        className="text-decoration-none text-white"
                                    >
                                        <div className="now-card card modern-card text-white" style={{ width: '15rem' }}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                                className="card-img-trend"
                                                alt={item.title || item.name}
                                            />
                                            <div className="card-body">
                                                <div className="title">
                                                    <h5 className="card-title" data-text={item.title || item.name}>
                                                        {item.title || item.name}
                                                    </h5>
                                                    <p className="card-text">Language: {item.original_language}</p>
                                                </div>
                                                <div className="rate fs-5 d-flex justify-content-between align-items-center p-2">
                                                    <p className="card-text m-0 bg-warning rounded p-1 text-dark fw-bold">
                                                        Rate: {item.vote_average}
                                                    </p>
                                                    <p className="card-text m-0 bg-primary rounded p-1 text-dark fw-bold">
                                                        View: {item.vote_count}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="text-center mt-2">
                                        <button
                                            className={`btn btn-sm ${isFavorite(item.id) ? 'btn-danger' : 'btn-outline-light'}`}
                                            onClick={() => toggleFavorite(item)}
                                        >
                                            {isFavorite(item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white fs-4">No results found for "{params.title}"</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
