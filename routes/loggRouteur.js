const express = require('express'); 
const loggRouteur = express.Router(); 
const bodyParser = require('body-parser');
const userSchema = require('../modeles/user.modele');

const { verifySchemaMailPasswordCreateToken, userRegister, } = require('../controllers/loggController');

loggRouteur.use(bodyParser.urlencoded({extended:false})); 

//-----------------------------GET---------------------------------------------------

loggRouteur.get('/signin', (req,res) => {
    res.render("logg/signin.ejs")
})
loggRouteur.get('/register', (req,res) => {
    userSchema.find()       
    .exec()
    .then( users => {
    res.render("logg/register.ejs", {users : users})
})
})

//-----------------------------POST-------------------------------------------

loggRouteur.post('/signin', verifySchemaMailPasswordCreateToken); 
loggRouteur.post('/register', userRegister); 


module.exports = loggRouteur