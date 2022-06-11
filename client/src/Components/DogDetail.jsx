import React from "react";
import {getDogsById} from '../redux/actions'
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './DogDetail.module.css'

export default function Detail (props){
  const   {id} = useParams()
  console.log(id)
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDogsById(id))} ,[dispatch,id]) 
  const detailsstate = useSelector((state) => state.details)
  console.log('DETAILS', detailsstate)
    if(!detailsstate){
    return <h1>Loading...</h1>
    }
  return (
        <div>
            <div className={styles.dt}> 
                <Link to='/Home'><button className={styles.btn}>Back to main Page </button> </Link>
                <h1 className={styles.title}> {detailsstate.name} </h1>
                <img className={styles.imga} alt='' src={detailsstate.image || ''}/>
                <h1 className={styles.type} > Temperament: {detailsstate.temperament}</h1>
                <h4 className={styles.type}>Height { detailsstate.height_min } [Cm]</h4>
                <h4 className={styles.type}>Weight {detailsstate.weight_min} [Kg]</h4>
                <h4 className={styles.type}>Life_Span: {detailsstate.life_span}</h4>
            </div>    
        </div>
    )
}