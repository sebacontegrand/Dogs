
import { Link } from "react-router-dom";
import styles from "./DogCards.module.css";
export default function DogCard( { id, name, image, weight, temperament } ) {
  
    return (
    
      <>
        <div className={styles.dogCard}>
          <Link to={"/dogs/" + id}>
            <div className={styles.titleArea}>
              <h4 className={styles.dogName}>{name}</h4>
            </div>
            <div className={styles.infoArea}>
              <div className={styles.tempArea}>
                <h5 className=''>Weight:{weight}Kg</h5>
              {temperament ? (
                  <h5 className={styles.dogTemp}>Temperament: {temperament}</h5>
                ) : (
                  <br />
                )}
              </div>
              <div className={styles.imageArea}>
                <img
                  className={styles.dogImage}
                  src={image}
                  alt={`A dog`}
                  height="250px"
                />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }

