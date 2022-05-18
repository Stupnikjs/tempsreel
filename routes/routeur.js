const express = require('express'); 
const routeur = express.Router(); 


routeur.get('/', (req,res) => {
    res.render("home")


})




module.exports = routeur