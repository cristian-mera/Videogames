import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import "../styles/Detail.css";

export default function Detail({ match }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log('efect')
    dispatch(getDetail(match.params.id));
  }, [dispatch, match.params.id]);
  const myVideogame =  useSelector((state) => state.detail);

  
  
  
  return (
    <div className="detail_container">
      {myVideogame ? (
        <div className="detail_principal">
          <h1 className="detail_game_name">{myVideogame.name}</h1>
          <div className="detail_game_container">
            <img
              className="detail_game_image"
              src={
                myVideogame.background_image
                  ? myVideogame.background_image
                  : "/videogame.png"
              }
              alt="no img found"
            />
            <div className="detail_game_info">
              <h2 className="detail_game_release">
                Released at: {myVideogame.released}
              </h2>
              <h2 className="detail_game_release">
                Genres: {myVideogame.genres.map(el => el.name + ' ')}
              </h2>
              <h2 className="detail_game_release">
                Rating: {myVideogame.rating}
              </h2>
              <h2 className="detail_game_release">
                Platforms: {myVideogame.platforms.map(el => el.platform.name + ' ')}
              </h2>
              

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
