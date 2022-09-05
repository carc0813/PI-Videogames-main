import axios from "axios";


export const GET_VIDEOGAMES="GET_VIDEOGAMES";
export const   GET_GENRES="GET_GENRES";
export const  FILTER_BY_GENRE ="FILTER_BY_GENRE";
export const FILTER_CREATED="FILTER_CREATED";




//* Trae todos los videojuegos
export function getVideogames() {
    return  function (dispatch) {
      axios.get('http://localhost:3001/videogames')
        .then((videogames) => {
          dispatch({ type: GET_VIDEOGAMES,
            payload:videogames.data})
        })
    }
  }

  //* Trae todos los generos
  // export function getGenres() {
  //   return (dispatch) =>
  //     fetch(`http://localhost:3001/genres`)
  //       .then((resp) => resp.json())
  //       .then((json) => {
  //         dispatch({
  //           type: GET_GENRES,
  //           payload: json,
  //         });
  //       });
  // }



  export function getGenres() {
    return  function (dispatch) {
      axios.get('http://localhost:3001/genres')
        .then((res) => {
          dispatch({ type:GET_GENRES,
            payload:res.data})
        })
    }
  }



//* Filtrado por generos
export function filterByGenres(payload) {
    // console.log(payload)
       return {
            type:FILTER_BY_GENRE,
            payload
       }
}



export function filterCreated(payload){
    console.log(payload)
      return {
          type:FILTER_CREATED,
          payload,
      }
}