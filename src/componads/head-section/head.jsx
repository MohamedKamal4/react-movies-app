import { useEffect, useState } from 'react'
import './head.css'
import { Link } from 'react-router-dom';
export default function Head() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };


        fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                console.log(data.results);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section className='head'>
            <div id="carouselExampleFade" className="carousel carousel-head slide carousel-fade">
                <div className="carousel-inner">
                    {movies.map((movie, index) => {
                        return (
                            <div className={`carousel-item bg-danger ${index === 4 ? 'active' : ''}`} key={movie.id} style={{}}>
                                <div className="img d-block w-100" alt={movie.title} style={{ background: `linear-gradient(to top right, rgba(255, 0, 0, 0.500), rgba(0, 0, 255, 0.500)) ,url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }} ></div>
                                <div className="carousel-caption d-flex flex-column align-items-start justify-content-center gap-2 p-3">
                                    <h1 className='fw-bold text-danger text-start fs-1'>COMING SOON</h1>
                                    <h5 className='text-start fw-bold fs-1'> {movie.original_title}</h5>
                                    <p className='text-start dis'>{movie.overview}</p>
                                    <span>Language : {movie.original_language}</span>
                                    <span>Date : {movie.release_date}</span>
                                    <div className='show-rating d-flex  align-items-start justify-content-center gap-2'>
                                        <span className='rate '>Rate : {movie.vote_average}</span>
                                        <Link to={`/movie/${movie.id}`} className='show text-decoration-none'>
                                            Show More
                                        </Link>
                                    </div>
                                </div>
                                <div className="mini-caption d-none">
                                    <span className='text-danger fw-bold py-3'>Comming Soon</span>
                                    <h5 className='text-start fw-bold fs-1'> {movie.original_title}</h5>
                                    <p className='text-center dis'>{movie.overview}</p>
                                    <Link to={`/movie/${movie.id}`} className='show py-1 px-5 btn-danger btn text-decoration-none'>
                                        Show More
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    )
}
