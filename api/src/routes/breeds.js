const express = require('express');
const { allDogsFromEverywhere } = require('../API/index');
const router = express.Router();
const axios = require('axios');


/////////////////////////////////////////////////////////////////////////////////////////////
// GET Dog by breed

router.get('/', async (req, res) => {
    try {
        const everyDog = await allDogsFromEverywhere();
        const everyBreedGroup = everyDog?.map((dog) => {
            if (!dog.breed_group) {
            "No info"
            }else { return dog.breed_group }
            });
        const eachBreedGroup = [...new Set(everyBreedGroup.flat())]
        res.status(200).json(eachBreedGroup.sort())
    } catch (error) {
        console.log(error, "Error on breeds route")
    }
   
});

router.get('/breed' , async (req, res) => {
        const breedGroup = req.query.breedGroup;
        const everyDog = await allDogsFromEverywhere();
        const dogSearchResult = everyDog.filter((dog) => {
            if(breedGroup === 'all') return everyDog
            else if (dog.breed_group !== undefined) { return (dog.breed_group.toLowerCase()).includes(breedGroup.toLowerCase()) }
            });
        res.status(200).json(dogSearchResult)
});
module.exports = router