const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
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
      const statusFiltered =
        action.payload === "all"
          ? allVideogames
          : allVideogames.filter((el) => el.status === el.payload);
      return {
        ...state,
        videogames: statusFiltered,
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
      const allVideogames2 = state.allVideogames;
      const createdFilter =
        action.payload === "created"
          ? state.allVideogames.filter((el) => el.createdInDb)
          : allVideogames2.filter((el) => !el.createdInDb);

      return {
        ...state,
        videogames: createdFilter
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "ascendent"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        videgames: sortedArr,
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
