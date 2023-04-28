import axios from "axios";

export function getAllGames() {
  return async function (dispatch) {
    const response = await fetch(`https://videogamesback.onrender.com`);
    const json = await response.json();
    dispatch({
      type: "GET_ALL_GAMES",
      payload: json,
    });
  };
}

export function getGamesByName(payload){
  //console.log(payload)
  return async function(dispatch){
    try{
      let json = await axios(`videogames?name=${payload}`);
      //console.log(json.data , " soy data")
      
      if(json.data.length >= 1){
        return dispatch({
          type:"GET_GAMES_NAME",
          payload : json.data
          
        })
      }else{
        return dispatch({
        type:"GET_GAMES_NAME",
        payload : "no hay resultados"
        
      })
      }
      
      
    } catch (error){
      console.log("no hay resultados")
    }
  }
}

export function getGenres(){
  return async function(dispatch){
    let json = await axios(`genre`)
    return dispatch({
      type:"GET_GENRE",
      payload:json.data
    })
  }
}

export function getDetailApi(id){
  return async function(dispatch){
    let json = await axios(`https://api.rawg.io/api/games/${id}?key=0ba4830bf3dc4e608360e24543cf3e1f`)
    return dispatch({
      type:"GET_DETAIL_API",
      payload:json.data
    })
  }
}


export function getDetail(id) {
  return async function (dispatch) {
    const json = await axios(`videogames/${id}`);
    // const json = await response.json();
    dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}

export function detailRemove(payload){
  //console.log(payload,"soy payload de action")
  return {
    type: "DETAIL_REMOVE",
    payload: payload,
  }
}


export function newGame(payload){
  return async function(dispatch){
    const json = await axios.post(`videogames`,payload)
    return json
  }
}

export function filterGenre(payload){
  return{
    type:"FILTER_GENRE",
    payload
  }
}

export function filterDb(payload){
  return{
    type:"FILTER_DB",
    payload
  }
}

export function sortByName(payload){
  return{
    type:"SORT_NAME",
    payload
  }
}

export function sortByRating(payload){
  return{
    type:"SORT_RATING",
    payload
  }
}

export const deleteGame = (id) => {
  return function (dispatch) {
      axios.delete(`videogames/delete/${id}`)
          .then(response => {
              console.log(response.data);
              dispatch({
                  type: 'DELETE_GAME',
                  payload: id,
              });
          })
          .catch(error => {
              console.log(error);
          }
      );
  }
}
