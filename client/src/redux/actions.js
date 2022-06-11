
import axios from 'axios';
import store from '../redux/store';

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
    GET_DOG_BY_ID
   } from "./types"

export function getDogsByName(name){

    return async(dispatch)=> {
        const answer = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_DOG_BY_NAME,
            payload: answer.data
        });
    };
}
export function getDogsById (id){
    const dogs = store.getState().dogs
  
    const details = dogs.find((el) => {
        
        return String(el.id) === id
    })
        return  {
        type : GET_DOG_BY_ID,
        payload: details
    }
}



export function postDog(input) {
    return async (dispatch) => {
        dispatch( postDogx())
console.log("DOG INPUT",input)
        try {
            await axios.post('http://localhost:3001/dogs/new', input)
            console.log(ADD_DOG_SUCCESS)
            dispatch(postDogSuccess(input))
            
        } catch (error) {
            console.log('ERROR', error)
            dispatch(postDogError())
            
        }
        


    }

}
const postDogx = () => ({
    type: ADD_DOG,
    payload: true
})
const postDogSuccess = (input) => ({
    type: ADD_DOG_SUCCESS,
    payload : input
})


const postDogError = () => ({
    type: ADD_DOG_ERROR,
    payload: true
})

 export function loadedDogsAction(){
     return async(dispatch)=>{
         dispatch(loadDogs());
         try{
         const answer = await axios.get('http://localhost:3001/dogs');
         console.log(LOADING_DOG_SUCCESS)
         dispatch(loadDogsSuccess(answer.data))
         }
         catch (error){
         dispatch(loadDogsError())
         }
     }
 }
 const loadDogs = () => ({
    type: LOADING_DOG,
    payload: true
})
const loadDogsSuccess = (dog) => ({
    type: LOADING_DOG_SUCCESS,
    payload : dog
})

const loadDogsError = () => ({
    type: LOADING_DOG_ERROR,
    payload: true
})

export function loadTempAction () {
    return async (dispatch) => {
        dispatch(loadedTemperaments());

        try {
            const answer = await axios.get('http://localhost:3001/temperaments');
            console.log(LOADING_TEMPERAMENT_SUCCESS)
            dispatch(loadTempSuccess(answer.data));
            
        } catch (error) {
            dispatch(loadTempError(error));
            
        }
    }
}

const loadedTemperaments = () => ({
    type: LOADING_TEMPERAMENT,
    payload: true

})

const loadTempSuccess = (temperaments) => ({
    type: LOADING_TEMPERAMENT_SUCCESS,
    payload: temperaments
})

const loadTempError = () => ({
    type: LOADING_TEMPERAMENT_ERROR,
    payload: true
})