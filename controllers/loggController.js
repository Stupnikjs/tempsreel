
const bcrypt = require('bcrypt'); 
const Joi = require("joi"); 
const userSchema = require('../modeles/user.modele')
const jwt = require('jsonwebtoken'); 
const dotenv = require('dotenv');




dotenv.config(); 




exports.verifySchemaMailPasswordCreateToken = async(req, res ) => {

      joiSchemaValidate(req, res); 

      // recherche dans la DB
      const user = await userSchema.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Email or password is wrong");
    
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Email or password is wrong");
      
      var token = generateAccessToken({username : req.body.username}); 

      
      res.cookie("auth", token); 
      res.redirect(`profile/${user._id}`); 
       
    
    }



exports.userRegister = async(req,res) => {
    if (!req.user){

    joiSchemaValidate(req, res); 
     
        
    //Check if the user is allready in the db
    const emailExists = await userSchema.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email allready linked with other account");

    const usernameExists = await userSchema.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send("this username allready taken");
        
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
        
    const user = await new userSchema({
        username : req.body.username, 
        password: hashPassword, 
        email: req.body.email
        }); 
        
        await user.save();
    } else {
        req.user = user 
    }
    try {
        res.redirect('/logg/signin')
            } catch (err) {
            res.status(400).send(err);
            }
        
}
    
        
const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn:'30min'})

}


// verifie le token 
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.cookies["auth"]; 
    console.log( "authHeader :" + authHeader); 
    var token = authHeader.split('.')[1]; 
    if (token == null) return res.sendStatus(401)
    console.log(jwt.verify(authHeader, process.env.TOKEN_SECRET)); 
    jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {console.log('voici lerreur') ; return res.sendStatus(403)}
      req.user = user
      next()
    })
  }


exports.checkTokenGet = (req, res) => {

    const token = req.cookies["auth"]; 
    jwt.verify(token, process.env.TOKEN_SECRET, async(err, userToken) => {
    if(!err){
      
      const userreq = await userSchema.findOne({_id: req.params.id}) ;
        if(userreq.username != userToken){
          newToken = generateAccessToken({username: userreq.username})
          
          res.cookie("auth", newToken);
          res.render('profile/profile', {user:userreq})}
        else{  
          const user = await userSchema.findOne({username:userToken.username}); 
          res.cookie("auth", token);
          res.render('profile/profile', {user:user})}}
    else{ 
      res.render('logg/signin') 
    }
}); 
}

 
const joiSchemaValidate = (req, res) => {
  const registerSchema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    });
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    
}
