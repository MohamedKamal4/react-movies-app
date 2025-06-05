import React, { useEffect, useState } from "react";

export default function Trailer({ movieId }) {
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MS43NDQzNzY2NTA2MzM5OTk4ZSs5LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4OkW_hfYgox62T7NnUVnGROQw_b7DZjiN8KepX1k7ng'
                }
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
                const data = await response.json();
                const trailer = data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");

                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
                }
            } catch (err) {
                console.error("Error fetching trailer:", err);
            }
        };

        fetchTrailer();
    }, [movieId]);

    if (!trailerUrl) {
        return <p className="text-light">Loading trailer...</p>;
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div style={{
                position: "relative",
                paddingBottom: "56.25%", // Aspect ratio 16:9
                height: 0,
                width: "100%",
                overflow: "hidden",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)"
            }}>
                <iframe
                    src={trailerUrl}
                    title="YouTube Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px"
                    }}
                ></iframe>
            </div>
        </div>
    );
}
