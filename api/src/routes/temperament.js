const express = require('express');
const router = express.Router();
const { Temperament } = require('../db');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const {allDogsFromEverywhere} = require('../API/index');



router.get('/', async (req, res) => {

    const allDogx = await axios.get(URL);
    try {
        
        let everyTemperament = allDogx.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', ').sort(
            function (a, b) {
              if (a < b) return -1;
              else return 1;
            }
          ));
         
        let everyTemperament2 = everyTemperament.flat(); //se repiten x cada perro
       
        everyTemperament2.forEach(el => {//los creo en db con nombre unico
            if (el) { 
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        everyTemperament2 = await Temperament.findAll(); //los devuelvo de la db
        
        res.status(200).json(everyTemperament2);
        
    }   catch(error) {
        res.status(404).send(error)
    }

   
});
    
router.get('/dog/', async (req, res) => {
    const temperament = req.query.temperament;
    
    const everyDog = await allDogsFromEverywhere();
    const dogSearchResult = everyDog.filter((dog) => {
    temperament === 'all'? everyDog : (dog.temperament.toLowerCase()).includes(temperament.toLowerCase()) 
    });
    
    res.status(200).json(dogSearchResult)
    
});

module.exports = router