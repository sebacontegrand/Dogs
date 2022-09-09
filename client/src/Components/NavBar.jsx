import React from 'react';
import {Link} from 'react-router-dom'
import styles from './NavBar.module.css'
import { SearchBar } from './SearchBar';
export default function NavBar(){

    return(
<>
    <div className={styles.nav} >
        <div className={styles.TitleAndSearchBar}>
            <div >“Somewhere, a little dog loves you.” – ...
            </div>
            <div>
                <Link to={'/'}>@</Link>     
            </div>
            <div>
                <Link className={styles.letters}to={'/Home'}>HOME
                </Link>
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
        <div>
            <Link className={styles.letters} to='/dogs/new'>NEW DOG</Link>
        </div>
        <div className={styles.letters}>
            <Link  to={'/quotes'}>    Quotes?   </Link>
        </div>
    </div>
</>
    )
}