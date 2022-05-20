const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    auteur : String, 
    receveur : String, 
    message : String, 
    date: Date, 
})


module.exports = mongoose.model("Message", messageSchema);
