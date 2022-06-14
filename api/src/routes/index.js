require('dotenv').config()
const { Router } = require('express');
const dogs = require('./dogs');
const temperaments = require('./temperament');
const breeds = require('./breeds');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/temperaments', temperaments);
router.use('/breeds', breeds);




module.exports = router;
