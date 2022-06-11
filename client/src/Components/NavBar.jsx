import React from 'react';
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import { SearchBar } from './SearchBar';

export default function NavBar(){

   

    return(
<>

<nav className={styles.navOptions} >
   
   
    <h1>Hey...This is a DOG...</h1>
    
    <ul>
        <li>
            <Link to={'/'}>Landing_Page   </Link>     
        </li>
        <li>
            <Link to={'/Home'}>HOME</Link>
        </li>
        <li>
            <SearchBar/>
        </li>
        
        <li>
            <Link  to='/dogs/new'>NEW DOG</Link>
        </li>
       
        <li>
            <Link  to={'/about'}>    About   </Link>
        </li>
    </ul>
</nav>

</>
    )


}