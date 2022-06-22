
import { Link } from "react-router-dom";
import styles from "./DogCards.module.css";
export default function DogCard( { id, name, image, weightmin, weightmax, temperaments, temperament } ) {

    return (
      <>
        <div className={styles.dogCard}>
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                <h5 className=''>Weight_max:{weightmax}kg</h5>
                <h5 className=''>Weight_min:{weightmin}kg</h5>
                { temperament && (
                  <h5 className={styles.dogTemp}>Temperaments: {temperament}</h5>
                )}
                {temperaments && (
                  
                  <h5><label>Temperaments:</label>{temperaments.map(el => <span key={el.name}>{el.name}, </span>)}</h5>
                )
                
                }
              </div>
              <div className={styles.imageArea}>
                <img
                  className={styles.dogImage}
                  src={image}
                  alt={`dog`}
                  height="250px"
                />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  } 

