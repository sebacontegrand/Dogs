
import DogCards from "../Components/DogCards";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadedDogsAction} from "../redux/actions";
import styles from './Dog.module.css'

export default function Dog() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
 
  console.log("currentDogs",currentDogs)
  console.log('currentPage',currentPage)
  
  
  const pagination = (pageNumber) => {
    
    setCurrentPage(pageNumber);
  };
  
  const handleNext = () => {
    if (currentPage>1)
    setCurrentPage(currentPage -1)
  }
  const handlePrev = () => {
    if(currentDogs.length>7)
    setCurrentPage(currentPage + 1)
  }
    useEffect(() => {
    dispatch(loadedDogsAction())
    }, [dispatch]);
    useEffect(()=>{
    if(currentDogs.length===0){
      setCurrentPage(1)
    }
   })
   
  return (
    <>
     <div >
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrev}>Prev</button>
        <Pagination
          currentPage={currentPage}
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          pagination={pagination}
        />
        <div className={styles.dogs}>
        {currentDogs.map((el) => { 
            return  (
                      
                      <DogCards
                      key={el.id}
                      id={el.id}
                      name={el.name}
                      image={el.image}
                      weightmin={el.weight_min}
                      weightmax={el.weight_max}
                      temperament={el.temperament}
                      origin={el.origin}
                      />
                    )})}
                    </div>
      </div>
    </>
  );
}
