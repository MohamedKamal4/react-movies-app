import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // لاستخراج ID من الـ URL
import './showdeteils.css'
import Castseries from "./castseries";
import Trailer from "./triler";

export default function ShowDetails() {
    const { id } = useParams(); // جلب الـ ID من رابط الصفحة
    const [series, setSeries] = useState(null); // تخزين تفاصيل الفيلم

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDE4N2VjMmZmZDQxNzk1ZDgxOWQ1OWVhNmUzMWE5OSIsIm5iZiI6MTc0NDM3NjY1MC42MzM5OTk4LCJzdWIiOiI2N2Y5MTM0YTdmNzBhYzFhMjFkOTRlOTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hWm7tkoEoX6mh442nNRoPCcsgGy439obMiIfOxtr-aw'
            }
        };

        fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(data => {
                setSeries(data);
                console.log(data);
            })
            .catch(err => console.error(err));
    }, []);



    return (
        <>
            <div className="x text-center mt-5" >
                {
                    series ? (
                        <>

                            <div className="poster p-5 rounded-0 m-auto d-flex justify-content-between align-items-end" style={{ background: `linear-gradient(to top right, rgba(124, 2, 2, 0.69), rgba(1, 53, 150, 0.63)) ,url(https://image.tmdb.org/t/p/original${series.backdrop_path})` }} >
                                <div className=" w-50 content d-flex flex-column gap-2 p-5 justify-content-center align-items-start">
                                    <h1 className="text-light text-start w-100 fw-bold  text-center">{series.original_name}</h1>
                                    <p className="w-100 text-light text-start fw-bold text-center">{series.overview}</p>

                                </div>
                                <div className="mini-poster w-50 h-100" style={{ background: `linear-gradient(to top right, rgba(124, 2, 2, 0.69), rgba(1, 53, 150, 0.63)) ,url(https://image.tmdb.org/t/p/original${series.poster_path})` }} ></div>
                            </div>
                            <div className="details ">
                                {
                                    <div className="about container d-flex justify-content-between align-items-center">
                                        <div className=" content-two d-flex flex-column gap-2 py-5 justify-content-between align-items-start" key={series.id}>
                                            <p className="text-light">
                                                TYPE : {series.genres.map((genre) => genre.name).join(" , ")}
                                            </p>
                                            <p className="text-light">
                                                Language : {series.original_language}
                                            </p>
                                            <p className="text-light">
                                                Date : {series.release_date}
                                            </p>
                                            <p className="text-light">
                                                Popularity : {series.popularity}
                                            </p>
                                            <p className="text-light">
                                                Runtime : {series.runtime} Min
                                            </p>
                                            <p className="text-dark bg-warning p-1 px-5 rounded">
                                                Rate : {series.vote_average}
                                            </p>
                                        </div>
                                        <div className="Trailer w-50 ">
                                            <Trailer movieId={id} className="video w-50" />
                                        </div>

                                    </div>
                                }
                                <Castseries movieId={id} />
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </>
    );
}
