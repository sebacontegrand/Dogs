const express = require('express');
const { allDogsFromEverywhere } = require('../API/index');
const { Dog, Temperament } = require('../db');
const router = express.Router();
const axios = require('axios');


/////////////////////////////////////////////////////////////////////////////////////////////
// GET para traer todos los perros
router.get('/', async (req, res, next) => {
    const name = req.query.name;
try{
        const allDogs = await allDogsFromEverywhere();
      if(name){
        const dogName = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        
        res.status(200).send(dogName.length? dogName : 
        res.status(404).send('Still..no Dogs...'));
      }else{
        res.status(200).send(allDogs);
      }
    
} catch(error){
    res.status(404).json("There are no dogs with this type of...name")
}
});
/////////////////////////////////////////////////////////////////////////////////////////////
// GET Dog by ID
router.get('/:idBreed', async (req, res, next) => {
  try {
    const { idBreed } = req.params;
    const allDogs = await allDogsFromEverywhere();
    if (!idBreed) {
        res.status(404).json("Couldn't find the name on DB")
    } else {
        const dog = allDogs.find(el => el.id.toString() === idBreed);
        res.status(200).json(dog)
    }
} catch (error) {
    res.status(404).send(error)
}
})
/////////////////////////////////////////////////////////////////////////////////////////////
// POST create a Dog
router.post('/new' , async (req, res, next) => {
  
      var {
          name,
          height_min, 
          height_max,
          weight_min,
          weight_max,
          life_span,
          createdInDB,
          temperament,
          image  } = req.body;

    if(!image){
        try {
            image =await (await axios.get('https://dog.ceo/api/breeds/image/random')).data.message;
      } catch (error) {
            console.log(error)
            }
    } 
    if (!name || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperament) {
    
        res.status(404).json("Missing some fields")

    }

    if (name && height_min && height_max && weight_min && weight_max && life_span && temperament) {
        const createDog = await Dog.create({
            name:name,
            height_max: height_max,
            height_min: height_min,
            weight_min: weight_min,
            weight_max: weight_max,
            life_span:life_span,
            createdInDB:createdInDB,
            image:image || 'https://dog.ceo/api/breeds/image/random'
        });
       
        temperament.map(async el => {
          const findTemperament = await Temperament.findAll({
              where: { name: el }
          });
          createDog.addTemperament(findTemperament);
      })
      res.status(200).send(createDog);
  } 

 else {
      res.status(404).send('Data needed to proceed is missing');
  }
});


module.exports = router;