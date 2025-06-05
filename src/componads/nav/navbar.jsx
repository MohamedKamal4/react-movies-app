import { AiFillHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import { BsFillTvFill } from "react-icons/bs";
import './navbar.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const favorites = useSelector(state => state.favorites);


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container d-flex justify-content-between align-items-center">
                <Link className="navbar-brand " to="/"><BsFillTvFill className="icon-brand" /><span className="brand-name">Box Movies</span></Link>
                <form className="search d-flex " style={{ position: "relative" }} role="search">
                    <input className="form-control me-2 search-bar" type="search" placeholder="Search..." aria-label="Search"
                        onChange={(e) =>
                            setSearch(e.target.value)}
                    />
                    <Link to={`/search/${search}`}><button className="btn p-0 text-white" style={{ position: "absolute", right: "40px" }} type="submit"><BiSearch /></button></Link>
                </form>
                <div className="links d-flex align-items-center gap-4">
                    <Link to="/favorites" className="nav-link text-white position-relative">
                        <AiFillHeart
                            className="fs-4"
                            id="favicon"
                            onClick={() => {
                                const favicon = document.getElementById("favicon");
                                favicon.classList.add("text-danger");
                                setTimeout(() => {
                                    favicon.classList.remove("text-danger");
                                }, 1000);
                            }}
                        />
                        {favorites.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {favorites.length}
                            </span>
                        )}
                    </Link>
                    <button className="navbar-icon bg-transparent border-0" onClick={() => {
                        setIsOpen(!isOpen);
                        const navbarNavDropdown = document.getElementById("navbarNavDropdown");
                        const openicon = document.getElementById("open-menu");
                        const closeicon = document.getElementById("close-menu");
                        if (isOpen) {
                            navbarNavDropdown.classList.add("d-none");
                            openicon.classList.remove("d-none");
                            closeicon.classList.add("d-none");

                        } else {
                            navbarNavDropdown.classList.remove("d-none");
                            openicon.classList.add("d-none");
                            closeicon.classList.remove("d-none");

                        }
                    }} type="button"><IoIosMenu className="menu-icon" id="open-menu" /> <AiOutlineClose className="d-none menu-icon" id="close-menu" /></button>
                    <div className="navbarNavDropdown d-none" id="navbarNavDropdown">
                        <ul className="navbar-nav d-flex align-items-center flex-column" >
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/movies">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/series">Series</Link>
                            </li>
                            <li className="nav-item-search py-3 d-none align-items-center justify-content-center">
                                <form className="d-flex w-100" style={{ position: "relative" }} role="search">
                                    <input className="form-control me-2 search-bar" type="search" placeholder="Search..." aria-label="Search"
                                        onChange={(e) =>
                                            setSearch(e.target.value)}
                                    />
                                    <Link to={`/search/${search}`}><button className="btn p-0 text-white" style={{ position: "absolute", right: "40px" }} type="submit"><BiSearch /></button></Link>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}