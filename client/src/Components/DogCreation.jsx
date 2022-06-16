import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, loadTempAction } from '../redux/actions';
import styles from './DogCreation.module.css'
import {Link} from 'react-router-dom'

function validateForm(input){
    // Error handling
    let errorx = {};

  if (input.name === '') {
    errorx.name = "A Name must be typed";
  } else {
   if(!input.name.match(/^[A-Za-z]+$/)){
    errorx.name = "Name must contain letters only";
  }}
  if (!input.weight_min) {
    errorx.weight_min = "A min Weight number must be typed";
  } else {
    if(!input.name.match(!/\d{1,2}/)){
    errorx.weight_min = "weight must have min values";
  }}
  if (!input.weight_max) {
    errorx.weight_max = "Type a valid max weight number";
  }  else {
    if(!input.name.match(!/\d{1,2}/)){
      errorx.weight_max = "weight must have max values";
    }
   
  }
  if (!input.height_min) {
    errorx.height_min = "Type a valid minimal height number";
  } else {
    if(!input.name.match(!/\d{1,2}/)){
      errorx.height_min = "height must have min values";
    }
  }
  if (!input.height_max) {
    errorx.height_max = "Type a valid maxim height number";
  }else {
    if(!input.name.match(!/\d{1,2}/)){
      errorx.height_max = "height must have max values";
    }
  }
  return errorx;

     }

export const DogCreation = () => {

const dispatch = useDispatch();
const temperamentx = useSelector((state) => state.temperaments)
useEffect(() => {
  dispatch(loadTempAction());
}, [dispatch]);

const[input, setInput] = React.useState({
        name:'',
        image:'',
        height_max:'',
        height_min:'',
        weight_max:'',
        weight_min:'',
        life_span:'',
        temperament:[] 
});
const[errorx, setError] = React.useState({});


function handleOnChange(e){
  
    setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    setError(
        validateForm({
          ...input,
          [e.target.name]: e.target.value,
        })
      )
    }
    function handleDelete(el) {
        setInput({
          ...input,
          temperament: input.temperament.filter((temp) => temp !== el),
        });
      }
function handleOnSubmit(e){
    e.preventDefault();
    if(!errorx.name && !errorx.image && !errorx.weigth_max && !errorx.weigth_min && !errorx.height_max && !errorx.height_min && !errorx.life_span && !errorx.temperament){
     alert("Your dog has been created successfully");
    
      dispatch(postDog(input))
      //reseteo el estado
      setInput({
        name:'',
        image:'',
        height_max:'',
        height_min:'',
        weight_max:'',
        weight_min:'',
        life_span:'',
        temperament:[]   
    })}
    
    else{
     alert('Something went wrong... please try later');
    }
}
function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  

  }


  return (
    <> 
    
    <div className={styles.mainContainerCreation}>Dog Creation
    <form onSubmit={((e)=>handleOnSubmit(e))}>
         
          <div className={styles.formContainer}>
          <label>Create New Dog and Add to Database</label>
          <div className={styles.Section}>
          <label>Name</label>
          <input type="text" onChange={(e)=>handleOnChange(e)} placeholder="American Bulldog..." name="name" value={input.name}/>
          <div><p className={styles.error}>{errorx.name}</p></div>
          <label>Image</label>
          <input type="url" onChange={(e)=>handleOnChange(e)} placeholder="http://image.com" name="image" value={input.image}/> 
          <div><p className={styles.error}>{errorx.image}</p></div>
          <label>Max-Height[cm]</label>
          <input type="number" max="60" min="2" onChange={(e)=>handleOnChange(e)} placeholder="32" name="height_max" value={input.height_max}/>
          <div><p className={styles.error}>{errorx.height_max}</p></div>
          <label>Min-Height[cm]</label>
          <input type="number" max="40" min="0" onChange={(e)=>handleOnChange(e)} placeholder="5" name="height_min" value={input.height_min}/>
          <div><p className={styles.error}>{errorx.height_min}</p></div>
          <label>Max-Weight[kg]</label>
          <input type="number" max="80" min="0" onChange={(e)=>handleOnChange(e)} placeholder="20" name="weight_max" value={input.weight_max}/>
          <div><p className={styles.error}>{errorx.weight_max}</p></div>
          <label>Min-Weight[kg]</label>
          <input type="number" max="50" min="0" onChange={(e)=>handleOnChange(e)} placeholder="4" name="weight_min" value={input.weight_min}/>
          <div><p className={styles.error}>{errorx.weight_min}</p></div>
          <label>Life-Span[years]</label>
          <input type="text" onChange={(e)=>handleOnChange(e)} placeholder="Life_span..." name="life_span" value={input.life_span}/>
      </div>
      <select onChange={(e)=>handleSelect(e)} className={styles.styled_select}> 
                {temperamentx?.map((temp) => {
                  return (<option key={temp.id} name={temp.name}>{temp.name}</option>);
                })}
      </select>  
                 <div className={styles.sidebar_box}>
                 <h4>Temperament Selection:</h4>
                 {input.temperament.map((el) => (
                 <div key={el} className={styles.selectedItems}>
                 <p>{el}</p>
     <button onClick={() => 
                 handleDelete(el)}>x</button>
                 </div>
                 ))}
                 </div>
     
     <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Home</button>
              </Link>
              <button className={styles.button} type="submit">
                CREATE DOG 
              </button>
              </div>
    </div>
    </form>
    </div>
    </>
  )




  }

      