import { GET_VIDEOGAMES } from "../action/index.js";
import { GET_GENRES } from "../action/index.js";
import { FILTER_BY_GENRE } from "../action/index.js";
import { FILTER_CREATED } from "../action/index.js";
import { SORT_VGAMES } from "../action/index.js";
import { SEARCH_VIDEOGAMES } from "../action/index.js";
import { POST_VIDEOGAME } from "../action/index.js";
import { GET_DETAIL } from "../action/index.js";
// import { NUEVO_RATING } from "../action/index.js";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  detail: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_GENRE:
      const allVideogames = state.allVideogames;
      const genresFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.genres.includes(action.payload));
      if (genresFiltered.length === 0) {
        alert(`No videogames found for ${action.payload} genre`);
        return state;
      } else {
        return {
          ...state,
          videogames: genresFiltered,
        };
      }
    case FILTER_CREATED:
      const originVg = state.allVideogames
      const filterCreated = action.payload === 'Created' ? 
            originVg.filter(p=>p.origin==='DB'): originVg.filter(p=>p.origin==='API')
            return {
                ...state, //me devuelve el estado anterior
                videogames: action.payload === 'All'? state.allVideogames
                : filterCreated 
             }
    case SORT_VGAMES:
      if (action.payload === "desc_rating" || action.payload === "asc_rating") {
        let sortedArr = action.payload === "asc_rating" ?
         state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return 1;
                }
                if (b.rating > a.rating) {
                  return-1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return -1;
                }
                if (b.rating > a.rating) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: sortedArr,
        };
      } else {
        let sortedArr =
          action.payload === "asc_name"
            ? state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: sortedArr,
        };
      }
    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
  //  case  NUEVO_RATING:
  //   const originVg1 = state.allVideogames
  //   const result= originVg1.filter(e=>e.rating >=4)
  //     return{
  //   ...state,
  //    videogames:result,
  //  }
    default:
      return state;
  }
}
