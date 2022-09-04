const express = require('express');
const { sequelize, Users, Rentals } = require('../models');
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

route.get('/rentals', (req, res) => {
    Rentals.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

/*route.post('/rentals', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Books.create({ customerId: req.customer.id, bookId: req.book.id})
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});*/

module.exports = route;