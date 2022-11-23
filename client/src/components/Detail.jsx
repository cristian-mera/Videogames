import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import "../styles/Detail.css";
import defaultImage from "../components/videogame.png"


export default function Detail({ match }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch(getDetail(match.params.id));
  }, [dispatch]);


  const myVideogame =  useSelector((state) => state.detail);


  
  
  
  return (
    <div className="detail_container">
      {console.log(myVideogame)}
      {myVideogame ? (
        <div className="detail_principal">
          <h1 className="detail_game_name">{myVideogame.name}</h1>
          <div className="detail_game_container">
            <img
              className="detail_game_image"
              src={
                myVideogame.background_image
                  ? myVideogame.background_image
                  : defaultImage
              }
              alt="no img found"
            />
            <div className="detail_game_info">
              <h2 className="detail_game_release">
                Released at: {!myVideogame.createdInDb? myVideogame.released : myVideogame.released}
              </h2>
              <h2 className="detail_game_release">
                <div>
                Genres: {myVideogame.genres?.map(el => el.name + ' ')}
                  
                </div> 
              </h2>
              <h2 className="detail_game_release">
                
                Rating: {myVideogame.rating}
              </h2>
              {/* <h2 className="detail_game_release">
                <div>
                Platforms: {myVideogame.platforms?.map(el => el.platform.name + ' ')}

                </div>
              </h2> */}
              

              <h2 className="detail_game_description">
                Description: {myVideogame.description_raw}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <p className="detail_game_loading">Loading</p>
      )}
      <div>
        <Link to={"/home"} className="detail_back_container">
          <button className="detail_back_button">Go Back</button>

        </Link>
      </div>
    </div>
  );
}
