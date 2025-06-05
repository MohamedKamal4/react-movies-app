import './showdeteils.css'
import { useEffect, useState } from "react";

export default function Cast({ movieId }) {
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
            .then(res => res.json())
            .then(data => {
                setCast(data.cast || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [movieId]);

    if (loading) return <p>Loading cast...</p>;

    return (
        <div className="cast container">
            <h2 className='text-white text-center p-3'>Cast</h2>
            <div className="cast-list">
                {cast.slice(0, 8).map(actor => (
                    <div className="cast-card " key={actor.cast_id}>
                        <img
                            src={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                    : 'https://via.placeholder.com/200x300?text=No+Image'
                            }
                            alt={actor.name}
                        />
                        <p className="actor-name">{actor.name}</p>
                        <p className="actor-character">as {actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
