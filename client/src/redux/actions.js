
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
    GET_DOG_BY_ID,
    GET_DOGS_BY_BREED,
    GET_BREEDS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_DOGS_BY_TEMP,
    FILTER_CREATED,
    FILTER_BY_MAX_WEIGHT,
    FILTER_BY_MIN_WEIGHT


   } from "./types"

export function getDogsByName(name){

    return async(dispatch)=> {
        const answer = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        if(!name){
            return alert('Dog is not on DB')
        }
        else{
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: answer.data
            })}
        }
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
       
        

        try {
            const answer = await axios.get('http://localhost:3001/temperaments');
            dispatch(loadedTemperaments())
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

export function getDogsByBreed(breed) {
    return async(dispatch) =>{
        dispatch({
            type: GET_DOGS_BY_BREED,
            payload:breed
        })
    }
}


export function getBreedsAction() {
    return async function (dispatch) {
        const answer = await axios.get('http://localhost:3001/breeds');
        
        return dispatch({
            type: GET_BREEDS,
            payload: answer.data
        });
    }
}
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function filteredDogsByTemperament(temp) {
   console.log(temp)
    return async(dispatch) =>{
        dispatch({
            type: GET_DOGS_BY_TEMP,
            payload:temp
        })
    }
    
}
export function filteredCreated(payload) {
   
    return {
        type: FILTER_CREATED,
        payload
    }
}
export function filterByMAXWeight(payload) {
    return {
        type: FILTER_BY_MAX_WEIGHT,
        payload
    }
}
export function filterByMINWeight(payload) {
    return {
        type: FILTER_BY_MIN_WEIGHT,
        payload
    }
}
export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}