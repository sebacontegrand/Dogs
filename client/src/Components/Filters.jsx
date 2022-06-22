import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {loadedDogsAction, loadTempAction, getBreedsAction, getDogsByBreed, orderByName, filteredDogsByTemperament, filteredCreated, filterByMAXWeight, filterByMINWeight, orderByWeight } from '../redux/actions'
import styles from './Filters.module.css'

export default function Filters() {
    const dispatch = useDispatch();
    
     
    const dogs = useSelector((state) => state.dogs);
      console.log('dogs',dogs)
    const breeds = useSelector((state) => state.breeds);
      console.log('breed',breeds)
    const temperamentx = useSelector((state) => state.temperaments.sort(
      
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
    ));
    console.log('tempx',temperamentx)
    

  
  const maxWeights = dogs
    .map((el) => el.weight_max )
    .sort(function (a, b) {
      return a - b ;
    });
  const allDogsMaxWeights = [...new Set(maxWeights)];
  
  const minWeights = dogs
  .map((el) => el.weight_min)
  .sort(function (a, b) {
    return a - b;
  });
const allDogsMinWeights = [...new Set(minWeights)];

    useEffect(() => {
        dispatch(loadedDogsAction());
        dispatch(loadTempAction());
        dispatch(getBreedsAction());
      }, [dispatch]);
    
      function handleClick(e) {
        e.preventDefault();
        dispatch(loadedDogsAction());
      }
      
      function handleClickOrder(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
      }
      function handleClickOrderWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
      }
      function handleFilteredByTemp(e) {
        e.preventDefault();
        dispatch(filteredDogsByTemperament(e.target.value));
      }
      function handleFilterCreated(e) {
        dispatch(filteredCreated(e.target.value));
      }
      function handleMAXWeight(e) {
        e.preventDefault();
        dispatch(filterByMAXWeight(e.target.value));
      }
      function handleMINWeight(e) {
        e.preventDefault();
        dispatch(filterByMINWeight(e.target.value));
      }
      
      function handleByBreed(e) {
        e.preventDefault();
        dispatch(getDogsByBreed(e.target.value));
      }
      const handleReload = () => {
        window.location.reload();
      };
      return(
        <>
          <div className={styles.side}>
            <div className={styles.sideBarHeaders}>
              <h4 className={styles.header}> Find Filters:</h4>
              <div
                className={styles.tooltip}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <span className="material-icons refresh">Dogs</span>
              </div>
              <div><button type='button'onClick={() => handleReload()}>Refresh </button></div>
            </div>
            <hr />
            <div className={styles.filterSection}>
              <h5 className={styles.filterHeader}>Alphabetical Order by Name</h5>
              <select
                onChange={(e) => {
                  handleClickOrder(e);
                }}
              >
                <option defaultValue value="all" hidden>
                  Order
                </option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
            </div>
            <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By weight</h5>
          <select
            onChange={(e) => {
              handleClickOrderWeight(e);
            }}
          >
            <option defaultValue value="all" hidden>
              All
            </option>
            <option value="asc">Heavier</option>
            <option value="desc">Lighter</option>
          </select>
        </div>
            <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By temperaments</h5>
          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperamentx.map((temp) => {
              
              return (
                <option value={temp.name} key={temp.id}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By source</h5>
          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option defaultValue value="all">
              All DOGS
            </option>
            <option value="created">Your Own Dogs </option>
             
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By Max Weight</h5>
          <select onChange={(e) => handleMAXWeight(e)}>
            <option value="all">Max Weights</option>
            {allDogsMaxWeights.map((maxWeights) => {
              return maxWeights ? (
                <option value={maxWeights} key={maxWeights}>
                  {maxWeights} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By Min Weight</h5>
          <select onChange={(e) => handleMINWeight(e)}>
            <option value="all">Min Weights</option>
            {allDogsMinWeights.map((minWeights) => {
              return minWeights ? (
                <option value={minWeights} key={minWeights}>
                  {minWeights} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>By breed</h5>
          <select onChange={(e) => handleByBreed(e)}>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              return breed ? (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        
            </div>
           
    </>
)
}
