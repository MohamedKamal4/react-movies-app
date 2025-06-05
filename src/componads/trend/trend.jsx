import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../rudex/favoritesSlice'; // تأكد من اسم المسار الصحيح

export default function Trend() {
    const [trend, setTrend] = useState([]);
    const [cardsPerSlide, setCardsPerSlide] = useState(4);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTrend = async () => {
            try {
                const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
                    }
                });
                const data = await res.json();
                setTrend(data.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrend();
    }, []);
    
    useEffect(() => {
        function updateCardsPerSlide() {
            const width = window.innerWidth;
            if (width < 576) setCardsPerSlide(1);
            else if (width < 768) setCardsPerSlide(2);
            else if (width < 992) setCardsPerSlide(3);
            else setCardsPerSlide(4);
        }

        updateCardsPerSlide();
        window.addEventListener('resize', updateCardsPerSlide);
        return () => window.removeEventListener('resize', updateCardsPerSlide);
    }, []);


    const chunkedTrend = [];
    for (let i = 0; i < trend.length; i += cardsPerSlide) {
        chunkedTrend.push(trend.slice(i, i + cardsPerSlide));
    }

    const toggleFavorite = (item) => {
        const isFav = favorites.find(fav => fav.id === item.id);
        isFav ? dispatch(removeFavorite(item.id)) : dispatch(addFavorite(item));
    };

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <div id="carouselExample5" className="carousel slide now-playing" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="top d-flex justify-content-between align-items-center px-5 me-5">
                    <h1 className='text-white mx-5'>Trend Movies:</h1>
                    <Link to={`/movies`} className="link-more text-decoration-none text-white me-5 p-1 rounded bg-danger">
                        Show More <BiRightArrowAlt />
                    </Link>
                </div>
                {
                    chunkedTrend.map((slide, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <div className="d-flex justify-content-center gap-3 py-4 flex-wrap">
                                {slide.map(item => {
                                    const isFav = isFavorite(item.id);
                                    return (
                                        <div key={item.id}>
                                            <Link to={`/movie/${item.id}`} className="text-decoration-none text-white">
                                                <div className="now-card card modern-card text-white" style={{ width: '15rem' }}>
                                                    <img
                                                        src={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '/fallback.jpg'}
                                                        className="card-img-top"
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    <div className="card-body">
                                                        <div className="title">
                                                            <h5 className="card-title">{item.title}</h5>
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
                                                    className={`btn btn-sm ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
                                                    onClick={() => toggleFavorite(item)}
                                                >
                                                    {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample5" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample5" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
