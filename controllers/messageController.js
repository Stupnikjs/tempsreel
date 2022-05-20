const express = require('express'); 
const bodyParser = require('body-parser'); 
const messageSchema = require('../modeles/message.modele'); 
const userSchema = require('../modeles/user.modele')
const { default: mongoose } = require('mongoose');




exports.registerMessage = async(req,res) => {
    var username = await userSchema.findById(req.params.id);  
    
    var message = new messageSchema({
         autheur: username.username,
         receveur : req.body.receveur , 
         message : req.body.message, 
         date: new Date(), 

     })
     try {
        
         await message.save();
         console.log("autheur: " + message)
         res.redirect('/')
             } catch (err) {
             res.status(400).send(err);
     }

}