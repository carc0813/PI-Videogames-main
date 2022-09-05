import { GET_VIDEOGAMES } from "../action/index.js";
import { GET_GENRES } from "../action/index.js";
import { FILTER_BY_GENRE } from "../action/index.js";
import { FILTER_CREATED } from "../action/index.js";


const initialState = {
  videogames: [],
  allVideogames:[],
  genres:[],
};

export default function rootReducer(state = initialState, action) {
 
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames:action.payload,
      }
      case GET_GENRES:
            return{       
                ...state,   
                genres:action.payload,
            }
        case FILTER_BY_GENRE:
          const allVideogames = state.allVideogames;
          const genresFiltered = action.payload === "All" ? allVideogames
              : allVideogames.filter((el) => el.genres.includes(action.payload))
              if (genresFiltered.length === 0) {
                alert(`No videogames found for ${action.payload} genre`)
                return state} else {
          return{
            ...state,
            videogames: genresFiltered,
          }
        }
        case FILTER_CREATED:
          const createdFilter =
          action.payload === "Created"
            ? state.allVideogames.filter((el) => el.createdInDb)
            : state.allVideogames.filter((el) => !el.createdInDb);
            console.log(createdFilter)
        return {
          ...state,
         videogames: createdFilter,
        };
    default:
      return state;
  }
}
