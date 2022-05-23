const express = require('express');
const app = express(); 
const routeur = require('./routes/routeur'); 
const loggRouteur = require('./routes/loggRouteur');
const mongoose = require('mongoose')
const dotenv = require('dotenv'); 
const profileRouteur = require('./routes/profileRouteur');

dotenv.config();
mongoose.connect(process.env.DB_CONFIG, ()=> {
    console.log("DB connected")
})



// socket config 
const http = require("http"); 
const server = http.createServer(app); 
const { Server } = require('socket.io');
const io = new Server(server)

var clients = []; 

// il faut associer le nom de l'utilisateur a l'id de la socket 

io.on('connection', (socket) => {

    socket.join("mainroom");
    
    socket.on('join', ({username}, callback) => {
        if (!clients.includes(username)){
        clients.push(username); };
        io.emit('has joined', {username : username, clients: clients});  
            
    })


    socket.on('chat message', (msg) => {
      io.emit('chat message', msg  );
    }); 

    socket.on('demandePartie',(user) => {
        console.log("user socket id : " + user.socketId); 
        socket.broadcast.to(user.socketId).emit('nouvellePartie', user.name)
    } )

    socket.on('disconnect', (socket) => {
    console.log("user disconnected")
    });
})



app.use(express.static('public'))
app.use('/profile', profileRouteur)
app.use('/logg', loggRouteur);
app.use('/', routeur);


app.set('view engine', 'ejs');

server.listen( process.env.PORT || 4646, () => {
    console.log(`connected on port ${process.env.PORT || 4646}`)
})
