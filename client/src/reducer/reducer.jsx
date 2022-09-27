const initialState = {
  allGames: [],
  altForGames: [],
  detail: [],
  detailApi: [],
  altForFilter: [],
  allGenre: [],
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_GAMES":
      return {
        ...state,
        allGames: action.payload,
        altForGames: action.payload,
      };
    case "GET_GAMES_NAME":
      return {
        ...state,
        allGames: action.payload,
      };
    case "GET_GENRE":
      return {
        ...state,
        allGenre: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_DETAIL_API":
      return {
        ...state,
        detailApi: action.payload,
      };
    case "NEW_GAME":
      return {
        ...state,
      };
    case "FILTER_GENRE":
      const sidekick = state.altForGames;
      const sidekickDB = state.altForGames.filter((el) => el.created)
      let gamesFilter = [];
      //console.log(sidekick, "soy sidekick1");
      //console.log(sidekickDB, "soy sidekickDB");
      const gamesFilterApi =
        action.payload === "All"
          ? sidekick
          : sidekick.filter((el) =>
              el.genres ? el.genres.includes(action.payload) : ""
            );
      const gamesFilterDB = sidekickDB.filter(el => el.generos.map(el => el.name === action.payload).includes(true))
      //console.log(gamesFilterDB , "soy games filterDB")  
      gamesFilterDB.length > 0 ? gamesFilter = gamesFilterApi.concat(gamesFilterDB):gamesFilter=gamesFilterApi
      
      return {
        ...state,
        allGames: gamesFilter,
        altForFilter:gamesFilter
      };

    case "FILTER_DB":
      let sidekick2 = []
      state.allGames !== "no hay resultados"? sidekick2 = state.allGames: sidekick2= state.altForGames
      const filterDb =
        action.payload === "Api"
          ? sidekick2.filter((el) => !el.created) 
          : sidekick2.filter((el) => el.created);
      return {
        ...state,
        allGames: action.payload === "All" ? state.altForGames : filterDb.length >= 1? filterDb:"no hay resultados"
      };
    case "SORT_NAME":
      //console.log(state.allGames);
      let sortName =
        action.payload === "AscAlfabetica"
          ? state.allGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      console.log(sortName);
      return {
        ...state,
        allGames: sortName,
      };
    case "SORT_RATING":
      console.log(state.allGames);
      let sortRating =
        action.payload === "AscRating"
          ? state.allGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.allGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      //console.log(sortRating);
      return {
        ...state,
        allGames: sortRating,
      };
      case "DELETE_GAME":
			return {
				...state,
				allGames: state.allGames.filter((el) => el.id !== action.payload),
			};
    default:
      return state;
  }
}

export default mainReducer;
