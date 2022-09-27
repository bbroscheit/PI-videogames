import React from "react";
import {Link} from "react-router-dom";
import "./Card.css";

function Card({ id, name, image, genres, generos }) {
  console.log(id)
  return (
    <div className="card" key={id}>
      <img className="cardImage" src={image} alt="portada del juego" />
      <hr className="cardLine" />
      <h3 className="cardTitle"><Link to={`/home/${id}`} className="cardTitle">{name}</Link></h3>
      <div className="containerGender">
        {genres
          ? genres.map((el) => <h5 className="cardGenre">{el}</h5>)
          : generos.map((el) => <h5 className="cardGenre">{el.name}</h5>)}
      </div>
    </div>
  );
}

export default Card;
