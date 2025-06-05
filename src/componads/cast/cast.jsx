import { useEffect, useState } from 'react';
import './cast.css';

export default function Cast() {
    const [cast, setCast] = useState([]);
    const [cardsPerSlide, setCardsPerSlide] = useState(4);


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };

        fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => setCast(data.results))
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


    const chunkedCast = [];
    for (let i = 0; i < cast.length; i += cardsPerSlide) {
        chunkedCast.push(cast.slice(i, i + cardsPerSlide));
    }

    return (
        <div id="carouselExample" className="carousel slide now-playing" data-bs-ride="carousel">
            <h1 className='text-white mx-5 text-center'>Trending Stars</h1>
            <div className="carousel-inner ">
                {
                    chunkedCast.map((cast, castIndex) => (
                        <div className={`carousel-item ${castIndex === 0 ? 'active' : ''}`} key={castIndex}>
                            <div className="d-flex justify-content-center gap-3 py-4">
                                {
                                    cast.map(member => (
                                        <div className="card modern-card text-white" style={{ width: '15rem' }} key={member.id}>
                                            <img src={`https://image.tmdb.org/t/p/w300${member.profile_path}`} className="card-img-top" alt={member.name} />
                                            <div className="card-body ">
                                                <h5 className="card-title">{member.name}</h5>
                                                <p className="card-text">Known for: {member.known_for_department}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
