import React from 'react'
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage(){
  return (
      <>
      
      <div className={styles.landing}>
          <h1 className={styles.wlc}>WELCOME TO DOGS...</h1> 
          <button className={styles.btn}>
              <Link to={'/Home'} >ENTER APP</Link>
          </button> 
            
      </div>
      
      </>
    
  )
}




