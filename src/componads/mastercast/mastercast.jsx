import { useEffect, useState } from 'react';
import './masterCastplaying.css'
import { data, Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';




export default function MasterCast() {

    const [masterCast, setMasterCast] = useState([]);
    const [cardsPerSlide, setCardsPerSlide] = useState(4);


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };



        fetch('https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US', options)
            .then(res => res.json())
            .then(data => setMasterCast(data.results))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        function updateCardsPerSlide() {
            const width = window.innerWidth;

            if (width < 576) {
                setCardsPerSlide(1);
            } else if (width < 768) {
                setCardsPerSlide(2);
            } else if (width < 992) {
                setCardsPerSlide(3);
            } else {
                setCardsPerSlide(4);
            }
        }

        updateCardsPerSlide();
        window.addEventListener('resize', updateCardsPerSlide);

        return () => window.removeEventListener('resize', updateCardsPerSlide);
    }, []);


    const chunkedmasterCast = [];
    for (let i = 0; i < masterCast.length; i += cardsPerSlide) {
        chunkedmasterCast.push(masterCast.slice(i, i + cardsPerSlide));
    }

    return (
        <div id="carouselExample2" className="carousel slide masterCast-playing" data-bs-ride="carousel">
            <div className="carousel-inner ">
                <div className="top d-flex justify-content-between align-items-center px-5 me-5">
                    <h1 className='text-white mx-5'>masterCast Playing Movies : </h1>
                    <Link to={`/movies`} className={`link-more text-decoration-none text-white me-5  p-1 rounded bg-danger`}>Show More <BiRightArrowAlt /></Link>
                </div>
                {
                    chunkedmasterCast.map((masterCast, masterCastIndex) => (
                        <div className={`carousel-item ${masterCastIndex === 0 ? 'active' : ''}`} key={masterCastIndex}>
                            <div className="d-flex justify-content-center gap-3 py-4">
                                {
                                    masterCast.map(masterCast => (
                                        <Link to={`/movie/${masterCast.id}`} className="text-decoration-none text-white"><div className=" masterCast-card card modern-card text-white " style={{ width: '15rem' }} key={masterCast.id}>
                                            <img src={`https://image.tmdb.org/t/p/w300${masterCast.poster_path}`} className="card-img-top" alt={masterCast.name} />
                                            <div className="card-body">
                                                <div className="title">
                                                    <h5 className="card-title ">{masterCast.original_title}</h5>
                                                    <p className="card-text">Language : {masterCast.original_language}</p>
                                                </div>
                                                <div className="rate fs-5 d-flex justify-content-between align-items-center p-2">
                                                    <p className="card-text m-0 bg-warning rounded p-1 text-dark fw-bold">Rate : {masterCast.vote_average}</p>
                                                    <p className="card-text m-0 bg-primary rounded p-1 text-dark fw-bold">View : {masterCast.vote_count}</p>
                                                </div>
                                            </div>
                                        </div></Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}