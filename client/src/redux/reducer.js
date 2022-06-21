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
         GET_DOGS_BY_BREED,
         GET_BREEDS,
         ORDER_BY_NAME,
         GET_DOGS_BY_TEMP,
         FILTER_CREATED,
         FILTER_BY_MAX_WEIGHT,
         FILTER_BY_MIN_WEIGHT,
         ORDER_BY_WEIGHT
         
         
            
        } from "./types"

const initialState = {
    dogs: [],
    temperaments: [],
    breeds:[],
    alldogx:[],
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
                dogs: action.payload,
                alldogx: action.payload
                }

        case LOADING_TEMPERAMENT_SUCCESS:
            console.log('temperaments',action.payload)
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
        case GET_BREEDS:
                return {
                    ...state,
                    breeds: action.payload
                        }
        case GET_DOGS_BY_BREED:
            const filterBreed = action.payload ==='all'? [...state.alldogx]:
            state.alldogx.filter(e => e.breed_group === action.payload)
            return{
                ...state,
                dogs: filterBreed
            }
            
        case ORDER_BY_NAME:
            const sortedArr = action.payload === 'asc' ?
                    [...state.dogs].sort(function (a, b) {
                        if (a.name > b.name) { return 1 }
                        if (b.name > a.name) { return -1 }
                        return 0;
                     }) :
                    [...state.dogs].sort(function (a, b) {
                        if (a.name > b.name) { return -1; }
                        if (b.name > a.name) { return 1; }
                        return 0;
                                })
                return {
                    ...state,
                    dogs: sortedArr
                            }

        case GET_DOGS_BY_TEMP:
            
            const filterTemp = action.payload ==='all'? [...state.alldogx]:
            state.alldogx.filter(e => {
                
                return  (e.temperament?.includes(action.payload) || e.Temperaments?.map(el=>el.name === action.payload))})
                
            return{
                ...state,
                dogs: filterTemp
                
            }
    


        case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ?
                    state.alldogx.filter(e => e.createdInDB === true) :
                    state.alldogx.filter(e => !e.createdInDB);
                        return {
                            ...state,
                            dogs: createdFilter,
                            }






        case FILTER_BY_MAX_WEIGHT:
            const everyDog = state.dogs
            const maxFiltered = action.payload === 'all' ?
                everyDog :
                everyDog.filter(el => el.weight_max <= Number(action.payload))
            return {
                ...state,
                dogs: maxFiltered
            }
        case FILTER_BY_MIN_WEIGHT:
            const allDoguis = state.dogs
            const minFiltered = action.payload === 'all' ?
                allDoguis :
                allDoguis.filter(el => el.weight_min >= Number(action.payload))
            return {
                ...state,
                dogs: minFiltered
            }
            
        case ORDER_BY_WEIGHT:
            const sortedWeight = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return 1 }
                    if (b.weight_min < a.weight_min) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return -1; }
                    if (b.weight_min < a.weight_min) { return 1; }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedWeight
            }
        default:
            return state
    }
}