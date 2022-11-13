import axios from "axios";
const { API_KEY } = process.env;
console.log(API_KEY);

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames", {});
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getNameVideogames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames?name=${name}` 
      
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres(){
  return async function (dispatch){
    var info = await axios.get ('http://localhost:3001/genres', {

    });
    return dispatch ({
      type: 'GET_GENRES',
      payload : info.data
    })
  }
}

export function postVideogame (payload){
  return async function (dispatch){
    const response = await axios.post ('http://localhost:3001/videogame', payload)
    console.log(response)
    return response
  }
}


export function filterVideogamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}


