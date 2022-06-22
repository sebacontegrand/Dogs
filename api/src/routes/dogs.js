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
        const allDogx = await allDogsFromEverywhere()
      
      if(name){
        const dogName = allDogx.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length? 
        res.status(200).send(dogName) : 
        res.status(404).send('Still..no Dogs...');
      }else{
        res.status(200).send(allDogx);
      }
} catch(error){
  alert("There are no dogs with this type of...name")
    res.status(404).json("There are no dogs with this type of...name")
}
});
/////////////////////////////////////////////////////////////////////////////////////////////
// GET Dog by ID
router.get('/:idBreed', async (req, res, next) => {
  try {
    const { idBreed } = req.params;
    const allDogx = await allDogsFromEverywhere();
    if (!idBreed) {
        
        res.status(404).json("Couldn't find the name on DB")
        
    } else {
        const dog = allDogx.find(el => el.id.toString() === idBreed);
        res.status(200).send(dog)
    }
} catch (error) {
    res.status(404).send("There are no dogs with this type of...name")
    next(error)
}
})
/////////////////////////////////////////////////////////////////////////////////////////////
// POST create a Dog
router.post('/new' , async (req, res, next) => {
  try{
      let {
          name,
          height_max, 
          height_min,
          weight_min,
          weight_max,
          life_span,
          createdInDB,
          temperament,
          image
            } = req.body;

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
        const createdDog = await Dog.create({
            name:name,
            height_max: height_max,
            height_min: height_min,
            weight_min: weight_min,
            weight_max: weight_max,
            life_span:life_span,
            createdInDB:createdInDB,
            image:image || 'https://dog.ceo/api/breeds/image/random'
        });
       
        
          const findTemperament = await Temperament.findAll({ 
            where: { name: temperament }
          });
          await createdDog.addTemperament(findTemperament);
      
      const e = await Dog.findByPk(createdDog.id, {include: Temperament} )
      const dogDb = {
        id:e.id,
        name:e.name,
        height_max: e.height_max,
        height_min: e.height_min,
        weight_min: e.weight_min,
        weight_max: e.weight_max,
        life_span: e.life_span, 
        createdInDB: e.createdInDB,
        image: e.image || 'https://dog.ceo/api/breeds/image/random',
        temperament: temperament.toString()
        
      }
      console.log(temperament)
      res.status(200).send(dogDb)
      console.log(dogDb)
  }}  
       catch(error) {
      res.status(404).send('Data needed to proceed is missing');
      
      next(error)
  }
  } 


);

router.get('/check/:name', async (req,res)=>{
    const {name} = req.params
const post = await Dog.findOne ({
    where: {name}
    })
    
    if(post) { return res.json ({ok: false, msg: "The dog's name already exists"})}
    else {
        return res.json ({ok: true})
    }
})

module.exports = router;