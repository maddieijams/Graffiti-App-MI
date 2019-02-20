let router = require('express').Router();
let sequelize = require('../db');
const Graffiti = sequelize.import('../models/graffiti');
const validateSession = require('../middleware/validate-session');
// Graffiti.sync({force:true})
//create graffiti
router.post('/create', validateSession, (req, res) => {
    if(!req.errors) {
        const newGraffiti = {
            title: req.body.title,
            image: req.body.image, 
            info: req.body.info,
            lat: req.body.lat, 
            lng: req.body.lng, 
            owner: req.user.id
        }
        Graffiti.create(newGraffiti)
        .then(graffiti => res.status(200).json(graffiti))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

//update graffiti
router.put('/update/:id', (req, res) => {
    if(!req.errors) {
        Graffiti.update(req.body, {where: {id: req.params.id}})
        .then(log => res.status(200).json(log))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})

//delete graffiti
router.delete('/delete/:id', (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Graffiti.destroy({
        where: {id: data, owner: userid}
    }).then((data) => res.send('YOU DESTROYED ART')),
    (err) => res.send(500, err.message)
})

module.exports=router