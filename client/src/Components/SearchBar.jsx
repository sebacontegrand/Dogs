import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {getDogsByName} from '../redux/actions'
import styles from './SearchBar.module.css'

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
    <div className={styles.searchBarObject}>Find a DOG...

        <form onSubmit={handleSubmit}>
            <input
                className={styles.input} 
                type="text" 
                onChange={(e)=> setDogState(e.target.value)} 
                value={dogState} 
                id="dog"
                name="dog"
                placeholder = "Search..."/>
            <button className={styles.button} type="submit" ></button>
        </form>
    </div>
  )
}
