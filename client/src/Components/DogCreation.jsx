import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../Components/NavBar';
import { postDog, loadTempAction } from '../redux/actions';
import styles from './DogCreation.module.css'
import {Link} from 'react-router-dom'

function validateForm(input){
    // Error handling
    let errorx = {};

  if (!input.name) {
    errorx.name = "A Name must be typed";
  } else {
    errorx.name = "";
  }
  if (!input.weight_min) {
    errorx.weight_min = "A min Weight number must be typed";
  } else {
    errorx.weight_min = "";
  }
  if (!input.weight_max) {
    errorx.weight_max = "Type a valid maxim weight number";
  }  else {
    errorx.weight_max = "";
  }
  if (!input.height_min) {
    errorx.height_min = "Type a valid minimal height number";
  } else {
    errorx.height_min = "";
  }
  if (!input.height_max) {
    errorx.height_max = "Type a valid maxim height number";
  }else {
    errorx.height_max = "";
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
    <NavBar/>
    <div className={styles.mainContainerCreation}>DogCreation</div>
    <form onSubmit={((e)=>handleOnSubmit(e))}>
          <label>Create New Dog and Add to Database</label>
          <div className={styles.formContainer}>
          <div className={styles.Section}>
          <label>Name</label>
          <input type="text" onChange={(e)=>handleOnChange(e)} placeholder="American Bulldog..." name="name" value={input.name}/>
          <label>Image</label>
          <input type="url" onChange={(e)=>handleOnChange(e)} placeholder="http://image.com" name="image" value={input.image}/> 
          <label>Max-Height</label>
          <input type="number" onChange={(e)=>handleOnChange(e)} placeholder="32" name="height_max" value={input.height_max}/>
          <label>Min-Height</label>
          <input type="number" onChange={(e)=>handleOnChange(e)} placeholder="5" name="height_min" value={input.height_min}/>
          <label>Max-Weight</label>
          <input type="number" onChange={(e)=>handleOnChange(e)} placeholder="20" name="weight_max" value={input.weight_max}/>
          <label>Min-Weight</label>
          <input type="number" onChange={(e)=>handleOnChange(e)} placeholder="4" name="weight_min" value={input.weight_min}/>
          <label>Life-Span</label>
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
                 handleDelete(el)}>Delete[x]</button>
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
    
    </>
  )




  }

      