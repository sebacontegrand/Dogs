import React from 'react';
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import { SearchBar } from './SearchBar';
export default function NavBar(){

   

    return(
<>

<div className={styles.nav} >
   <div className={styles.TitleAndSearchBar}>
       
<div className={styles.logoAndTitle}>“Somewhere, a little dog gonna love you.” – ...</div>
    
    
        <div>
            <Link to={'/'}>@</Link>     
        </div>
        <div>
            <Link to={'/Home'}>HOME
            
            </Link>
        </div>
        <div>
            <SearchBar/>
        </div>
        
        </div>
        <div>
            <Link  to='/dogs/new'>NEW DOG</Link>
        </div>

   
    
       
        <div className={styles.aboutNavButton}>
            <Link  to={'/quotes'}>    Quotes?   </Link>
        </div>
    
</div>

</>
    )


}