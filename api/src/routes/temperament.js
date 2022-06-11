const express = require('express');
const router = express.Router();
const { Temperament } = require('../db');
require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
const {allDogsFromEverywhere} = require('../API/index');



router.get('/', async (req, res) => {

    const allDogs = await axios.get(URL);
    try {
        
        let everyTemperament = allDogs.data.map(dog => dog.temperament ? dog.temperament : "No info").map(dog => dog?.split(', '));
        let everyTemperament2 = everyTemperament.flat();
       
        everyTemperament2.forEach(el => {
            if (el) { // temperament : ,
                Temperament.findOrCreate({
                    where: { name: el }
                });
            }
        });
        everyTemperament2 = await Temperament.findAll();
        res.status(200).json(everyTemperament2);
    }   catch(error) {
        res.status(404).send(error)
    }
});
    

module.exports = router