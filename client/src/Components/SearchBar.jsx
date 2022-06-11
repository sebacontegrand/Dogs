import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getDogsByName} from '../redux/actions'


export const SearchBar = () => {

const [dogState, setDogState] = useState([])
const dispatch= useDispatch();

function handleSubmit(e){
    e.preventDefault()
    
    if(dogState.length===0) {
        return alert('Please enter a Dogs Breed')
    } else{
        dispatch(getDogsByName(dogState));
        setDogState('');
    } 
}

  return (
    <div>SearchBar
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                onChange={(e)=> setDogState(e.target.value)} 
                value={dogState} 
                id="dog"
                name="dog"
                placeholder = "Search a Dog..."/>
            <button type="submit" ></button>
        </form>
    </div>
  )
}
