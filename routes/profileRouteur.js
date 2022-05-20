var express = require('express'); 
var profileRouteur = express.Router(); 

const bodyParser = require("body-parser");
const mongoose = require('mongoose');  
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { registerMessage }  = require('../controllers/messageController'); 
const messageSchema = require('../modeles/message.modele');
const userSchema = require('../modeles/user.modele');


profileRouteur.use(bodyParser.urlencoded({extended:false}));


profileRouteur.get('/:id', (req,res) => {
    var user = userSchema.findById(req.params.id)
    .exec()
    .then( (user) => {
    var message = messageSchema.find({receveur : user.username}) 
    console.log(message);         
    res.render("profile/profile", { user: user, message : message})    
    }) 
    .catch (error => console.log(error))
}); 

profileRouteur.get('/morpion/:id', (req,res) => {
    var user = userSchema.findById(req.params.id)
    .exec()
    .then( (user) => {
    var message = messageSchema.find({receveur : user.username}) 
             
    res.render("profile/morpion", { user: user})    
    }) 
    .catch (error => console.log(error))
}); 


profileRouteur.get('/:id/:receveur', (req,res) => {
    var user = userSchema.findById(req.params.id)
    .exec()
    .then( (user) => {
    res.render("profile/message", {user : user , receveur : req.params.receveur})
})
})


//--------------------- POST ------------------------------------------------

profileRouteur.post('/message/:id', registerMessage);



module.exports = profileRouteur