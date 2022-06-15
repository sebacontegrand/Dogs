
import DogCards from "../Components/DogCards";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadedDogsAction } from "../redux/actions";
import styles from "./Dog.module.css";

export default function Dog() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  console.log('currentDogs',currentDogs)
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
  dispatch(loadedDogsAction());
  }, [dispatch]);

  return (
    <>
     <div >
        <Pagination
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className=''></div>
        {
          
          currentDogs.map((el) => { 
            console.log(el)
            return  (
          <DogCards
          key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            weightmin={el.weight_min}
            weightmax={el.weight_max}
            temperamentsArray={el.Temperaments}
            temperament={el.temperament}/>
        )})}
      </div>
    </>
  );
}
