import React from "react";
import "../styles/Card.css";

export default function Card({ name, img, genres, createdInDb, id, rating }) {
  
  return (
    <div className="container">
      <div className="container_card">
        <div className="container_card_text">
          <h3 className="container_card_name">{name}</h3>

          <h5 className="container_card_genres">
            Generos:{" "}
            {
              genres.map((el) => el.name + " ")
              //  !createdInDb ? genres + " " : genres.map(gen => gen.name + ' ')
            }
          </h5>
          <h5 className="container_card_rating">Rating: {rating}</h5>
        </div>
        
          <img src={img} alt="img not found" className="container_card_img" />
        
      </div>
    </div>
  );
}
