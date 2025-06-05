import { useState, useEffect } from 'react';
import './allseries.css';
import Head from '../../componads/head-section/head';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../rudex/favoritesSlice';
export default function SeriesTabs() {
    const [activeTab, setActiveTab] = useState('toprate');
    const [series, setSeries] = useState([]);
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

    const fetchseries = (tab) => {
        setLoading(true);
        let url = '';

        if (tab === 'toprate') url = `${API_BASE}/tv/top_rated?language=en-US&page=1`;
        else if (tab === 'popular') url = `${API_BASE}/tv/popular?language=en-US&page=1`;
        else if (tab === 'airing') url = `${API_BASE}/tv/airing_today?language=en-US&page=1`;

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setSeries(data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchseries(activeTab);
    }, [activeTab]);

    const toggleFavorite = (item) => {
        const isFav = favorites.find(fav => fav.id === item.id);
        isFav ? dispatch(removeFavorite(item.id)) : dispatch(addFavorite(item));
    };

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <>
            <Head />
            <div className="container my-5">
                <div className="d-flex gap-3 mb-4 flex-wrap justify-content-center">
                    <button onClick={() => setActiveTab('toprate')} className={`btn text-light ${activeTab === 'toprate' ? 'btn-outline-danger' : 'bg-transparent btn-outline-light'}`}>Top Rate Series</button>
                    <button onClick={() => setActiveTab('popular')} className={`btn text-light ${activeTab === 'popular' ? 'btn-outline-danger' : 'bg-transparent btn-outline-light'}`}>Popular Series</button>
                    <button onClick={() => setActiveTab('airing')} className={`btn text-light ${activeTab === 'airing' ? 'btn-outline-danger' : 'bg-transparent btn-outline-light'}`}>Airing Today Series</button>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="boxs fade-in d-flex flex-wrap justify-content-center gap-4">
                        {
                            series.map(item => (
                                <div key={item.id}>
                                    <Link to={`/tv/${item.id}`} className="text-decoration-none text-white">
                                        <div className="now-card my-5 card modern-card text-white" style={{ width: '15rem' }}>
                                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} className="card-img-trend" alt={item.name} />
                                            <div className="card-body">
                                                <div className="title">
                                                    <h5 className="card-title" data-text={item.original_name}>{item.original_name}</h5>
                                                    <p className="card-text">Language: {item.original_language}</p>
                                                </div>
                                                <div className="rate fs-5 d-flex justify-content-between align-items-center p-2">
                                                    <p className="card-text m-0 bg-warning rounded p-1 text-dark fw-bold">Rate: {item.vote_average}</p>
                                                    <p className="card-text m-0 bg-primary rounded p-1 text-dark fw-bold">View: {item.vote_count}</p>
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
                        }
                    </div>
                )}
            </div>
        </>
    );
}
