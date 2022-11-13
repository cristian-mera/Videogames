import React from "react";

export default function Card({ name, img, genre }) {

  // let genero = genre.map(gen => gen.name)

  // if (!genre || genre.length < 1) {
  //   return (
  //     <div>
  //       <h2>Loading</h2>
  //     </div>
  //   );
  // } else {
    return (
      <div>
        {/* {console.log(genre)} */}
        <h3>{name}</h3>
        <h5>Generos: {genre}</h5>
        <img src={img} alt="img not found" width="200px" height="250px" />
      </div>
    )
  // }
}
