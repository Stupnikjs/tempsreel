const express = require('express'); 
const bcrypt = require('bcrypt'); 
const bodyParser = require('body-parser'); 
const Joi = require("joi"); 
const userSchema = require('../modeles/user.modele')



exports.verifySchemaMailPasswordCreateToken = async(req,res) => {

    const loginSchema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
      });
    
      // If the input is valid, then the error will be undefined. 
      // If the input is invalid, error is assigned a ValidationError object providing more information.
      const { error } = loginSchema.validate(req.body);  
      if (error) return res.status(400).send(error.details[0].message);
    
      const user = await userSchema.findOne({ email: req.body.email });
    
      if (!user) return res.status(400).send("Email or password is wrong");
    
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Email or password is wrong");
      
      // res.header("auth-token", token).send(token);
      res.redirect(`/profile/${user._id}`)
    
    }

exports.userRegister = async(req,res) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        });
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
        
    //Check if the user is allready in the db
    const emailExists = await userSchema.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email allready linked with other account");
        
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
        
    const user = await new userSchema({
        username : req.body.username, 
        password: hashPassword, 
        email: req.body.email
        }); 
    
    try {
        await user.save();
        res.redirect('/')
            } catch (err) {
            res.status(400).send(err);
            }
        
}
    
        
