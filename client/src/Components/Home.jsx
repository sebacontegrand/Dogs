
import React, {useEffect} from 'react'
import DogCards from './DogCards'
import styles from './Home.module.css'
import { useDispatch, useSelector } from "react-redux";

import {loadedDogsAction, loadTempAction } from '../redux/actions'
import NavBar from './NavBar';


function Home() {


  const dispatch = useDispatch();

  const loadTemperaments = useSelector(state => state.loadedTemperaments);
  

  useEffect(() => {
    if(!loadTemperaments){
      const loadTemperaments = () => dispatch(loadTempAction());
      loadTemperaments();
    }
    const loadDogs = () => dispatch(loadedDogsAction());
    loadDogs();
    console.log(loadDogs)
  }, [loadTemperaments, dispatch] )

  
  return (
    <> 
    <NavBar/>
      <div className={styles.bkg}>
        <DogCards />
      </div>
    </>
   
  )
}

export default Home