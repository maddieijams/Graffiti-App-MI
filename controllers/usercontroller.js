let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/signup', ((req, res) => {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)
    }).then((user) => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1 day'});
        res.json({
            user: user,
            message: 'created',
            sessionToken: token
        });
    },
    (err => res.send(500, err.message))
    )
}))

router.post('/login', (req, res) => {
    User.findOne({where: {username:req.body.user.username}})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1 day'})
                    res.json({
                        user: user,
                        message: 'AUTH SUCCESS ^_^',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'gateway is bad :('})
                }
            })
        } else {
            res.status(500).send({error: 'we tried to authroize but it failed'})
        }
    }, 
    err => res.status(501).send({error: 'couldnt process at all'})
    )
})

module.exports = router;