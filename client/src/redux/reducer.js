import { ADD_DOG,
         ADD_DOG_SUCCESS,
         ADD_DOG_ERROR,
         LOADING_DOG, 
         LOADING_DOG_SUCCESS,
         LOADING_DOG_ERROR,
         LOADING_TEMPERAMENT,
         LOADING_TEMPERAMENT_SUCCESS,
         LOADING_TEMPERAMENT_ERROR,
         GET_DOG_BY_NAME,
         GET_DOG_BY_ID,
         

        } from "./types"

const initialState = {
    dogs: [],
    temperaments: [],
    details:null,
    loadedDogs:0,
    loadTemperaments:false,
    error:false,
    loading:false
    
}
export default function rootReducer(state=initialState, action){
    switch(action.type){
        case ADD_DOG:
        case LOADING_DOG:
        case LOADING_TEMPERAMENT:
            return{
                ...state,
                loading:action.payload
            }
        case ADD_DOG_ERROR:
        case LOADING_DOG_ERROR:
        case LOADING_TEMPERAMENT_ERROR:
            return{

                ...state,
                error:action.payload
            }    
        case ADD_DOG_SUCCESS:
            console.log('actions',action.payload)
            return{
                ...state,
                loadedDogs:state.loadedDogs+1,
                loading:false,
                dogs:[...state.dogs, action.payload]
            }
            
        case LOADING_DOG_SUCCESS:
                return{
                ...state,
                loading: false,
                error: null,
                loadedDogs: action.payload.length,
                loadedTemperaments: true,
                dogs: action.payload
                }

        case LOADING_TEMPERAMENT_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    temperaments: action.payload
                }
        case GET_DOG_BY_NAME:
                return {
                    ...state,
                    dogs: action.payload,
                    }
        case GET_DOG_BY_ID:
                return{
                    ...state,
                    details:action.payload,
                        }  
        
        default:
            return state
    }
}