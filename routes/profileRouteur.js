var express = require('express'); 
var profileRouteur = express.Router();  
const mongoose = require('mongoose');  
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userSchema = require('../modeles/user.modele');


profileRouteur.get('/:id', (req,res) => {
    var user = userSchema.findById(req.params.id)
    .exec()
    .then( user => {          
    res.render("profile/profile", { user: user})    
   
    })    
    .catch(error => console.log(error)); 
})


module.exports = profileRouteur