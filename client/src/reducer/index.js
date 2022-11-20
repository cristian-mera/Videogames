const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "FILTER_BY_GENRE":
      const allVideogames = state.allVideogames;
      const array = [];
      allVideogames.filter((el) => {
        for (let i = 0; i < el.genres.length; i++) {
          el.genres[i].name === action.payload
            ? array.push(el)
            : console.log("nadad agregado");
        }
        return array;
      });

      return {
        ...state,
        videogames: array,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((el) => el.createdInDb)
          : state.allVideogames.filter((el) => !el.createdInDb);

      return {
        ...state,
        videogames: createdFilter,
      };

    case "FILTER_BY_RATING" :
            
      const ratingFiltered =
        action.payload === "topRated"
          ? state.allVideogames.sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            })
          : state.allVideogames.sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            });
            // console.log(ratingFiltered)
      return {
        ...state,
        videogames: ratingFiltered,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascendent"
          ? state.allVideogames.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.allVideogames.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        videogames: sortedArr,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
