import React from "react";
import {getDogsById} from '../redux/actions'
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './DogDetail.module.css'

export default function Detail (){
  const {id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDogsById(id))} ,[dispatch,id]) 
  const detailsState = useSelector((state) => state.details)
  
    if(!detailsState){
    return <h1>Loading...</h1>
    }
  return (
        <div>
            <div className={styles.dt}> 
                <Link to='/Home'><button className={styles.btn}>Back to main Page </button> </Link>
                <h1 className={styles.title}> {detailsState.name} </h1>
                <img className={styles.imga} alt='' src={detailsState.image || ''}/>
                <h1 className={styles.type} > Temperament: {detailsState.temperament}</h1>
                <h4 className={styles.type}>Height: {detailsState.height_min}-{detailsState.height_max} [Cm]</h4>
                <h4 className={styles.type}>Weight: {detailsState.weight_min}-{detailsState.weight_max} [Kg]</h4>
                <h4 className={styles.type}>Life_Span: {detailsState.life_span}</h4>
            </div>    
        </div>
    )
}