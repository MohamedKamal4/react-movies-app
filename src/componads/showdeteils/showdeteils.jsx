import { AiTwotoneStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../rudex/favoritesSlice";
import './showdeteils.css';
import Cast from "./castmovies";
import Trailer from "./triler";

export default function ShowDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    const isFavorite = (id) => favorites.some(fav => fav.id === parseInt(id));
    const toggleFavorite = () => {
        if (!movie) return;
        const isFav = isFavorite(movie.id);
        isFav ? dispatch(removeFavorite(movie.id)) : dispatch(addFavorite({ ...movie, media_type: 'movie' }));
    };

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                console.log(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <>
            <div className="x text-center mt-5">
                {
                    movie ? (
                        <>
                            <div className="poster p-5 rounded-0 m-auto d-flex justify-content-between align-items-end"
                                style={{ background: `linear-gradient(to top right, rgba(124, 2, 2, 0.69), rgba(1, 53, 150, 0.63)) ,url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }} >
                                <div className="w-50 content d-flex flex-column gap-2 p-5 justify-content-center align-items-start">
                                    <h1 className="title text-light text-start w-100 fw-bold text-center">{movie.title}</h1>
                                    <p className="dis w-100 text-light text-start fw-bold text-center">{movie.overview}</p>
                                </div>
                                <div className="mini-poster w-50 h-100"
                                    style={{ background: `linear-gradient(to top right, rgba(124, 2, 2, 0.69), rgba(1, 53, 150, 0.63)) ,url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}>
                                </div>
                            </div>
                            <div className="details">
                                <div className="about container d-flex justify-content-between align-items-center">
                                    <div className="content-two d-flex flex-column gap-2 py-5 justify-content-between align-items-start" key={movie.id}>
                                        <p className="text-light">TYPE : {movie.genres.map((genre) => genre.name).join(" , ")}</p>
                                        <p className="text-light">Language : {movie.original_language}</p>
                                        <p className="text-light">Date : {movie.release_date}</p>
                                        <p className="text-light">Popularity : {movie.popularity}</p>
                                        <p className="text-light">Runtime : {movie.runtime} Min</p>
                                        <p className=" m-0 py-1 px-5 text-dark d-flex align-items-center justify-content-center gap-2 bg-warning rounded">{movie.vote_average}<AiTwotoneStar /></p>
                                        <button
                                            className={`btn mt-0 p-1 px-5 ${isFavorite(movie.id) ? 'btn-danger' : 'btn-outline-light'} `}
                                            onClick={toggleFavorite}
                                        >
                                            {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                        </button>
                                    </div>
                                    <div className="Trailer w-50 ">
                                        <Trailer movieId={id} className="video w-50" />
                                    </div>
                                </div>
                                <Cast movieId={id} />
                            </div>
                        </>
                    ) : (
                        <p className="text-light">Loading...</p>
                    )
                }
            </div>
        </>
    );
}
