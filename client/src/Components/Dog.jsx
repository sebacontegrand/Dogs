
import DogCards from "../Components/DogCards";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadedDogsAction } from "../redux/actions";


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
    setCurrentPage(currentPage -1)
  }
  const handlePrev = () => {
    setCurrentPage(currentPage + 1)
  }
  useEffect(() => {
    dispatch(loadedDogsAction());
    }, [dispatch]);
    
  return (
    <>
     <div >
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrev}>Prev</button>
        <Pagination
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className=''></div>
        {currentDogs.map((el) => { 
            return  (
                      <DogCards
                      key={el.id}
                      id={el.id}
                      name={el.name}
                      image={el.image}
                      weightmin={el.weight_min}
                      weightmax={el.weight_max}
                      temperament={el.temperament}/>
                    )})}
      </div>
    </>
  );
}
