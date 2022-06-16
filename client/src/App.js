import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';

import Home from './Components/Home'
import {DogCreation} from './Components/DogCreation';
import DogDetail from './Components/DogDetail';
import {Quotes} from './Components/Quotes';
function App() {
  return (
    
    <div className="App">
      <React.StrictMode>  
        <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route exact path='/Home' element={<Home/>}/> 
            <Route path={'/dogs/new'} element={<DogCreation/>}/>  
            <Route path={'/dogs/:id'} element={<DogDetail/>}/>  
            <Route path={'/quotes'} element={<Quotes/>}/>      
        </Routes>
      </React.StrictMode>
    </div>
  );
}

export default App;
