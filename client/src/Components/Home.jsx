
import React, {useEffect} from 'react'
import Dog from './Dog'
import styles from './Home.module.css'
import { useDispatch, useSelector } from "react-redux";

import {loadedDogsAction, loadTempAction } from '../redux/actions'
import NavBar from './NavBar';
import Filters from './Filters';


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
    }, [loadTemperaments, dispatch] )

  
  return (
    <> 
    <div className={styles.bkg}>
        
          <NavBar/>
          <div className={styles.mainContainer}>
          <Filters/>
          <Dog/>
        </div>
      </div>
    
    </>
   
  )
}

export default Home