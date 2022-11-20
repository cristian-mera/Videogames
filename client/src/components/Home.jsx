import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenre,
  filterCreated,
  filterByRating,
  orderByName,
  getGenres,
  getDetail,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import defaultImage from "../components/videogame.png";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(16);
  const indexLastVideogame = currentPage * videogamesPerPage;
  const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexFirstVideogame,
    indexLastVideogame
  );
  const generos = useSelector((state) => state.genres);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // console.log(getGenres())
  function handleClick(event) {
    event.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterByGenre(event) {
    event.preventDefault();
    dispatch(filterVideogamesByGenre(event.target.value));
  }

  function handleFilterCreated(event) {
    event.preventDefault();
    dispatch(filterCreated(event.target.value));
  }

  function handleFilterRating(event) {
    event.preventDefault();
    dispatch(filterByRating(event.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${event.target.value}`)
  }

  function handleSort(event) {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrden(`ordenado ${event.target.value}`);

  }

  return (
    <div>
      <Link to="/videogame">Crear Videojuego</Link>
      <h1>Lista de Juegos</h1>
      <button
        onClick={(event) => {
          handleClick(event);
          
        }}
      >
        Reload Videogames
      </button>
      <div>
        <select onChange={(targetValue) => handleSort(targetValue)}>
          <option value="all">A-Z...</option>
          <option value="ascendent">Assendent</option>
          <option value="descendent">Descendent</option>
        </select>
        <select onChange={(targetValue) => handleFilterByGenre(targetValue)}>
          {generos.map((gen) => (
            <option value={gen.name.toString()}>{gen.name}</option>
          ))}
        </select>
        <select onChange={(targetValue) => handleFilterRating(targetValue)}>
          <option value="noRating">By Rating</option>
          <option value="topRated">Top Rated</option>
          <option value="botonRated">Boton Rated</option>
        </select>
        <select onChange={(targetValue) => handleFilterCreated(targetValue)}>
          <option value="all">All Videogames</option>
          <option value="created">Your Videogames</option>
          <option value="existent">Existent Videogames</option>
        </select>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <SearchBar />

        {currentVideogames?.map((el) => {
          return (
            <Link key={el.id} to={"/videogames/" + el.id}  >
              {/* agregar imagen por default */}
              <Card
                name={el.name}
                img={el.img ? el.img : defaultImage}
                genres={el.genres}
                createdInDb={el.createdInDb}
                rating={el.rating}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
