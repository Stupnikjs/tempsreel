const express = require('express'); 
const bodyParser = require('body-parser'); 
const messageSchema = require('../modeles/message.modele')



exports.registerMessage = async(req,res) => {
      
     var message = new messageSchema({
         autheur: req.body.id,
         receveur : req.body.receveur , 
         message : req.body.message, 
         date: new Date(), 

     })
     try {
         await message.save();
         res.redirect('/')
             } catch (err) {
             res.status(400).send(err);
     }

}