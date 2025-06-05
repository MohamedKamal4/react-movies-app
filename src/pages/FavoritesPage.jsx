import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../rudex/favoritesSlice';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFavorite(id));
    };

    if (favorites.length === 0) {
        return (
            <div className="text-center text-white mt-5">
                <h2 style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No favorites added yet.</h2>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h2 className="text-white mb-4 text-center my-5 py-5">Your Favorite List</h2>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                {favorites.map(item => (
                    <div>
                        <Link to={`/movie/${item.id}`} className="text-decoration-none text-white">
                            <div className=" now-card card modern-card text-white" style={{ width: '15rem' }}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} style={{ height: '356px' }} className="card-img-trend" alt={item.name} />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div className="title w-100 text-center h-100 d-flex justify-content-center align-items-center">
                                        <h5 className="card-title text-center">{item.name || item.title}</h5>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="mt-2 d-flex justify-content-center align-items-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
