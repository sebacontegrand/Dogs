import React from 'react'
import styles from './DogCard.module.css'


export default function Card({dog}){

    const { name, weight_min,  image,  temperament} = dog;

  return (
    <div className={styles.cards}>
        <div className={styles.cd}>
            
            <h2 >{name}</h2>
            <img className={styles.cardimg} src={image} alt={`Imagen de ${name}`}></img>
            <p>Weight: {weight_min} kg</p>
            <p>Temperament: {temperament}</p>
            
            
        </div>
    </div>
  )
}
