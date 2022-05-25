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
 var socketUsers = []; 


// il faut associer le nom de l'utilisateur a l'id de la socket 

io.sockets.on('connection', (socket) => {
 
    socket.on('join', ((user) => {
        const userObj = { socket: socket, user : user}; 
        socketUsers.unshift(userObj); 
        io.emit('has joined', user);
}));        
    


    socket.on('chat message', (msg) => {
      io.emit('chat message', msg  );
    }); 

    // on recoit la demande et on l'envoie a la cible
    socket.on('demande morpion', (users) => {
        let socketCible= socketUsers.find( obj => obj['user'] === users.cible);
        console.log(socketCible) ;
        socket.to(socketCible['socket']['id']).emit('commencer morpion', users.demandeur); 
    })
    // la cible a validé 
    socket.on('partie acceptée', (cible) =>{
       
        socket.to(socketCible).emit('partie debut');
        
        
    })    
    socket.on('disconnect', () => {
        socket.getMaxListeners('username', function(err, user){
              socket.clients = clients; 
              delete socketUsers[socket.id]; 
            //io.sockets.emit('update', clients)
         })
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
