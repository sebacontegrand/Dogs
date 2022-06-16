const axios = require('axios')
const { API_KEY } = process.env;
const { Temperament, Dog } = require('../db');
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}&limit=200`;

// capturar los datos de la API y de la bas de datos

const dogsFromAPI = async () => {
    const getURL = await axios.get(URL);
    const mapAPI = getURL.data.map(e => {
    
        return { 
            id: e.id,
            name: e.name,
            image: e.image.url,
            breed_group: e.breed_group,
            temperament: e.temperament,
            life_span: e.life_span,
            weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(e.weight.metric.slice(4).trim()),
            height_min: e.height.metric,
            height_max: e.height.metric,
        };
    });
    return mapAPI;
    
};

const dogsFromDB = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    return dogsDB;
};

const allDogsFromEverywhere = async () => {
    const APInfo = await dogsFromAPI();
    const DBInfo = await dogsFromDB();
    const allOfThem = [...APInfo, ...DBInfo];
    return allOfThem;
};

module.exports = {dogsFromAPI, dogsFromDB, allDogsFromEverywhere};
