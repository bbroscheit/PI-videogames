import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../cards/Card.jsx";
import "./Home.css";
import Loading from "../loading/Loading.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import {
  filterDb,
  filterGenre,
  getAllGames,
  getGenres,
  sortByName,
  sortByRating,
} from "../../actions";
import Paginado from "../paginado/Paginado.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.allGames);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesForPage, setGameForPage] = useState(15);
  const lastGame = currentPage * gamesForPage;
  const firstGame = lastGame - gamesForPage;
  const currentGames = games.slice(firstGame, lastGame);

  const paginado = (pagina) => {
    setCurrentPage(pagina)
  };

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllGames());
  }

  function handleFilter(e) {
    dispatch(filterGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterDb(e) {
    dispatch(filterDb(e.target.value));
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  
  return (
    <div className="homeContainer">
      {games.length < 1 ? (
        <Loading />
      ) : games === "no hay resultados"?
        (
        <div className="filterSection">
          <div >
            <div className="filterContainer">
              <select onChange={(e) => handleFilter(e)}>
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Indie">Indie</option>
                <option value="Massively Multiplayer">Multiplayer</option>
                <option value="Platformer">Platformer</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
              </select>
              <select onChange={(e) => handleFilterDb(e)}>
                <option value="All">All</option>
                <option value="Api">Api</option>
                <option value="Database">Creados</option>
              </select>
              <button className="filterReload"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload
            </button>
              <select onChange={(e) => handleSortByName(e)}>
                <option value="AscAlfabetica">A - Z</option>
                <option value="DescAlfabetica">Z - A</option>
              </select>
              <select onChange={(e) => handleSortByRating(e)}>
                <option value="AscRating">0 - 5</option>
                <option value="DesRating">5 - 0</option>
              </select>
            </div>
          </div>
          <hr className="homeLine"/>
          <p className="filterError">No hay resultados</p>
        </div>):(       
          <div className="filterSection">
          <div >
            <div className="filterContainer">
              <select onChange={(e) => handleFilter(e)}>
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Indie">Indie</option>
                <option value="Massively Multiplayer">Multiplayer</option>
                <option value="Platformer">Platformer</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
              </select>
              <select onChange={(e) => handleFilterDb(e)}>
                <option value="All">All</option>
                <option value="Api">Api</option>
                <option value="Database">Creados</option>
              </select>
              <button className="filterReload"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reload
            </button>
              <select onChange={(e) => handleSortByName(e)}>
                <option value="AscAlfabetica">A - Z</option>
                <option value="DescAlfabetica">Z - A</option>
              </select>
              <select onChange={(e) => handleSortByRating(e)}>
                <option value="AscRating">0 - 5</option>
                <option value="DesRating">5 - 0</option>
              </select>
            </div>
          </div>
          <hr className="homeLine"/>
          <div className="cardContainer">
            {!currentGames ? (
              <Loading />
            ) : (
              currentGames.map((c) => {
                return (
                  <Card
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    image={c.image}
                    genres={c.genres}
                    generos={c.generos}
                  />
                );
              })
            )}
          </div>
          
          <div className="paginadoContainer">
            <div className="paginadoArrowLeft"onClick={()=> currentPage <= 1? paginado(7):paginado(currentPage -1)}><FaArrowLeft /></div>
            <Paginado
              gamesForPage={gamesForPage}
              games={games.length}
              paginado={paginado}
            />
            <div className="paginadoArrowRight" onClick={()=> currentPage >= 7? paginado(1):paginado(currentPage +1)}><FaArrowRight /></div>
          </div>
        </div>
      
      )}
    </div>
  );
}
