import React from 'react'
import axios from "axios"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, loadTempAction } from '../redux/actions';
import styles from './DogCreation.module.css'
import {Link, useNavigate} from 'react-router-dom'



export const DogCreation = () => {
const navigate= useNavigate();
const dispatch = useDispatch();
const temperamentx = useSelector((state) => state.temperaments)
useEffect(() => {
  dispatch(loadTempAction());
}, [dispatch]);

const success = useSelector((state) => state.success)
const[errorx, setError] = React.useState({});
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
async function handleOnSubmit(e){
        e.preventDefault();
        if(!errorx.name && !errorx.image && !errorx.weigth_max && !errorx.weigth_min && !errorx.height_max && !errorx.height_min && !errorx.life_span && !errorx.temperament){
      

        const checkNameResult = await axios.get(`http://localhost:3001/dogs/check/${input.name}`)
        if(!checkNameResult.data.ok){
          alert('Dog already exist...')
        return 
        }
      
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
        alert('Error, please try again...');
        }
}
function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }
function validateForm(input){
    // Error handling
    let errorx = {};

  if (input.name === '') {
    errorx.name = "A Name must be typed";
  } else {
    if(!/^[a-zA-Z\s]*$/gi.test(input.name)){
         errorx.name =`The name can only contain letters.`;
    }}
  if (!input.weight_min) {
    errorx.weight_min = "A min Weight number must be typed from 3kg-40kg";
  }
  else if(input.weight_min<3 ||input.weight_min >40 ){errorx.weight_min = "A min Weight number must be typed from 3kg-40kg"} 
  else if (!/\d{1,2}/gi.test(input.weight_min)) {
    errorx.weight_min = "Weight must have min values. Example: '20'";
  } else {
    errorx.weight_min = "";
  }
  if (!input.weight_max) {
    errorx.weight_max = "Type a valid max weight number from 10kg-80kg";
  }  else if (!/\d{1,2}/gi.test(input.weight_max)) {
    errorx.weight_max = "Weight must have max values. Example: '25'";
  }else if(input.weight_max<10 ||input.weight_max >80 ){errorx.weight_max = "A max Weight number must be typed from 10kg-80kg"}  
  else {
    errorx.weight_max = "";
  }
  if (!input.height_min) {
    errorx.height_min = "Type a valid minimal height number from 5cm-40cm";
  } else if (!/\d{1,2}/gi.test(input.height_min)) {
    errorx.height_min = "Height must have min values. Example: '25'";
  } else if(input.height_min<5 ||input.height_min >40 ){errorx.height_min = "A min Height number must be typed from 5cm-40cm"}
  else {
    errorx.height_min = "";
  }
  if (!input.height_max) {
    errorx.height_max = "Type a valid maxim height number from 10cm-60cm";
  }else if (!/\d{1,2}/gi.test(input.height_max)) {
    errorx.height_max = "Height must have max values. Example: '25'";
  }else if(input.height_max<10 ||input.height_max >60 ){errorx.height_max = "A max Height number must be typed from 10cm-60cm"} 
  else {
    errorx.height_max = "";
  }
  if(input.height_max<input.height_min){
    errorx.height_max ='Height max must be higher than min'
  }
  if (input.weight_max<input.weight_min){
    errorx.weight_max ='Weight max must be higher than min'
  }
  return errorx;

}
if(success){
  alert('Dog created successfully')
  navigate('/home')
}

  return (
    <> 
    
    <div className={styles.mainContainerCreation}>Dog Creation
    <form onSubmit={((e)=>handleOnSubmit(e))}>
         
          <div className={styles.formContainer}>
          <label>Create New Dog and Add to Database</label>
          <div className={styles.Section}>
          <label>Name</label>
          <input key='name' type="text" onChange={(e)=>handleOnChange(e)} placeholder="American Bulldog..." name="name" value={input.name} required/>
          <div><p className={styles.error}>{errorx?.name || ''}</p></div>
          <label>Image</label>
          <input key='image' type="url" onChange={(e)=>handleOnChange(e)} placeholder="http://image.com" name="image" value={input.image}/> 
          <div><p className={styles.error}>{errorx.image}</p></div>
          <label>Max-Height[cm]</label>
          <input key='height_max' type="number" max="60" min="10" onChange={(e)=>handleOnChange(e)} placeholder="32" name="height_max" value={input.height_max}/>
          <div><p className={styles.error}>{errorx?.height_max || ''}</p></div>
          <label>Min-Height[cm]</label>
          <input key='height_min' type="number" max="40" min="5" onChange={(e)=>handleOnChange(e)} placeholder="5" name="height_min" value={input.height_min}/>
          <div><p className={styles.error }>{errorx?.height_min || ''}</p></div>
          <label>Max-Weight[kg]</label>
          <input key='weight_max' type="number" max="80" min="10" onChange={(e)=>handleOnChange(e)} placeholder="20" name="weight_max" value={input.weight_max}/>
          <div><p className={styles.error }>{errorx?.weight_max || ''}</p></div>
          <label>Min-Weight[kg]</label>
          <input key='weight_min' type="number" max="40" min="3" onChange={(e)=>handleOnChange(e)} placeholder="4" name="weight_min" value={input.weight_min}/>
          <div><p className={styles.error }>{errorx?.weight_min || ''}</p></div>
          <label>Life-Span[years]</label>
          <input key='life_span' type="text" onChange={(e)=>handleOnChange(e)} placeholder="Life_span..." name="life_span" value={input.life_span}/>
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

      