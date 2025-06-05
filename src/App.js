import { AiOutlineArrowUp } from "react-icons/ai";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componads/nav/navbar';
import MasterHomePage from './pages/masterPageHome';
import MovieDeteils from './pages/movieDeteils';
import Footer from './componads/footer/footer';
import MovieTabs from './pages/allmovies/allmovies';
import SeriesTabs from './pages/allseries/allseries';
import SeriesDeteils from './pages/showdateilsseries';
import Search from './pages/search';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MasterHomePage />} />
        <Route path='/movie/:id' element={<MovieDeteils />} />
        <Route path='/tv/:id' element={<SeriesDeteils />} />
        <Route path='/movies' element={<MovieTabs />} />
        <Route path='/series' element={<SeriesTabs />} />
        <Route path='/search/:title' element={<Search />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
      <button className="btn d-flex justify-content-center align-items-center border-0 p-0 text-light fw-bold rounded-circle fs-4"
        id="scrollToTopBtn" style={{ position: 'sticky', bottom: '20px', left: '95%', zIndex: '100000000000000000000', background: 'rgba(0, 0, 0, 0.53)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><AiOutlineArrowUp className="m-1" /></button>
    </>
  );
}

export default App;
