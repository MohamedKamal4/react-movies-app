import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../rudex/favoritesSlice';

export default function TopRate() {
    const [top, setTop] = useState([]);
    const [cardsPerSlide, setCardsPerSlide] = useState(4);
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => setTop(data.results))
            .catch(err => console.error(err));
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

    const chunkedtop = [];
    for (let i = 0; i < top.length; i += cardsPerSlide) {
        chunkedtop.push(top.slice(i, i + cardsPerSlide));
    }

    const toggleFavorite = (item) => {
        const isFav = favorites.find(fav => fav.id === item.id);
        isFav ? dispatch(removeFavorite(item.id)) : dispatch(addFavorite(item));
    };

    const isFavorite = (id) => favorites.some(fav => fav.id === id);

    return (
        <div id="carouselExample4" className="carousel slide now-playing" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="top d-flex justify-content-between align-items-center px-5 me-5">
                    <h1 className='text-white mx-5'>Top Rating Movies: </h1>
                    <Link to={`/movies`} className="link-more text-decoration-none text-white me-5 p-1 rounded bg-danger">
                        Show More <BiRightArrowAlt />
                    </Link>
                </div>
                {
                    chunkedtop.map((group, topIndex) => (
                        <div className={`carousel-item ${topIndex === 0 ? 'active' : ''}`} key={topIndex}>
                            <div className="d-flex justify-content-center gap-3 py-4">
                                {
                                    group.map(item => (
                                        <div key={item.id}>
                                            <Link to={`/movie/${item.id}`} className="link-more text-decoration-none text-white">
                                                <div className="now-card card modern-card text-white" style={{ width: '15rem' }}>
                                                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} className="card-img-top" alt={item.original_title} />
                                                    <div className="card-body">
                                                        <div className="title">
                                                            <h5 className="card-title">{item.original_title}</h5>
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
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample4" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample4" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
