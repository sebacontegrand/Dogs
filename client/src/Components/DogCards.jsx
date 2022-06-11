import DogCard from './DogCard'
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
export default function Dogs() {

  const dogs = useSelector(state => state.dogs);
  const loading = useSelector(state => state.loading);
  console.log(dogs)
  return (
    <div className=''>
      	<div className=''>
          {loading ? <h1>loading...</h1>: (
            dogs.length === 0 ? 'No Dogs to show...' : (
              dogs.map(dog => (
                <Link to={'/dogs/' + dog.id}>
                <DogCard     
                  key={dog.id}
                  dog={dog}
                />
                </Link>
              )) 
            )
          )}
        </div>
    </div>
  )
}

