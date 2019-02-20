let router = require('express').Router();
let sequelize = require('../db');
const Graffiti = sequelize.import('../models/graffiti');

//display all graffiti home page
router.get('/home', (req, res) => {
    Graffiti.findAll()
    .then(graffiti => res.status(200).json(graffiti))
    .catch(err => res.status(500).json({error: err}))
    });

    module.exports=router;