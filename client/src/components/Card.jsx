import React from "react";

export default function Card({ name, img, genres, createdInDb }) {
  
    return (
      <div>
        {/* {console.log(genre)} */}
        <h3>{ name}</h3>
        <h5>Generos: {genres[0].name ? genres[0].name : genres}</h5>
        <img src={img} alt="img not found" width="200px" height="250px" />
      </div>
    )
   }

