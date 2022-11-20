import React from "react";

export default function Card({ name, img, genres, createdInDb,id, rating }) {

  
  
  
    return (
      <div>
        
        
        <h3>{name}</h3>
          
        <h5>Generos: {
        genres.map(el => el.name+ ' ')
          //  !createdInDb ? genres + " " : genres.map(gen => gen.name + ' ')
          } 
          </h5>
          <h5>Rating: {rating}</h5>
        <img src={img} alt="img not found" width="200px" height="250px" />
      </div>
    )
   }

