import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect, } from "react";


export default function Detail({match}) {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(match.params.id));
  }, [dispatch]);
  
  const myVideogame = useSelector((state) => state.detail);
  console.log(myVideogame)
  
  
  return (
    <div>
      {myVideogame ? 
        <div>
          <h1>{myVideogame.name}</h1>
          <img
            src={myVideogame.background_image ? myVideogame.background_image : "/videogame.png"}
            alt="no img found"
          />
          {/* <h2>
            
            Genres:{" "}
            {generes.map((gen) => (
              <li>{gen}</li>
            ))}
          </h2> */}
          <h2>Released at: {myVideogame.released}</h2>
          <h2>Description: {myVideogame.description_raw}</h2>
        </div>
       : 
        <p>Loading</p>
      }
      <Link to={'/home'}>
        <button>Go Back</button>
      </Link>

    </div>
  );
}
