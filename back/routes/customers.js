const express = require('express');
const { sequelize, Users, Customers } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/customers', (req, res) => {
    Customers.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

/*route.post('/customers', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Customers.create({ name: req.body.name, lastName: req.body.lastName, phone: req.body.phone})
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});*/

module.exports = route;