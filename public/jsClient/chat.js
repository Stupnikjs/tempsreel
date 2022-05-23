


var socket = io(); 

//button
const btnReduceChat = document.querySelector('#reduceChat');  
const sendChat = document.querySelector('#sendChat');  
const activateChat = document.querySelector('#activateChat'); 
const btnMessagerie = document.querySelector('btnMessagerie')

//ul 
const chatMessage = document.querySelector('#chatMessages'); 
const userConnected = document.querySelector('#userConnected');
const boutonsMorpion = document.querySelector('#boutonsMorpion');

const connectedMessage = document.querySelector('#connectedMessage'); 


const form = document.querySelector('#chatForm'); 
const input = document.querySelector('#chatInput');
const chatBox = document.querySelector('#chatBox');

// btn 

btnReduceChat.addEventListener('click', (e) => {
    console.log(e)
    e.preventDefault();
    chatBox.classList.add("d-none"); 
    activateChat.classList.remove("d-none");
  });
  
  
form.addEventListener('submit', function(e) {
e.preventDefault();
if(input.value) {
    console.log(input.value);  
    socket.emit('chat message', {
    message : input.value, 
    expediteur: input.name, 
    date: new Date().toLocaleDateString(), 
    });
    input.value = '';
    }
});

activateChat.addEventListener('click' , (e) => {
    e.preventDefault();
    chatBox.classList.remove("d-none");     
    activateChat.classList.add("d-none"); 
}); 


// socket 

var clients = []; 



socket.emit("join", {username: input.name}); 

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.classList.add("item");
    item.classList.add("nopoint");
    item.textContent = msg.expediteur + "  " + msg.date + "  : " +msg.message;
    chatMessage.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


socket.on('has joined', (user) => {
    
    var item = document.createElement('p');
    item.classList.add("item");
    item.classList.add("nopoint");
    item.textContent = `${user.username} is connected`;

    var isAlreadyConnected = user.clients.includes(user.username);

    if (!isAlreadyConnected){ clients.push(user.username)  } 
    connectedMessage.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    
    userConnected.innerHTML = displayUserConnected( user.clients, document); 

    for (var i = 0 ; i < user.clients.length ; i++){
        var btn = displayBtnMorpion(user.clients, socket, i); 
        if(boutonsMorpion.childElementCount < user.clients.length && btn.id != input.name)
        boutonsMorpion.appendChild(btn)
    }   
})


// socket morpion
    
     
    
     socket.on("nouvellePartie", (user) => {
         var accepterPartieContre = confirm(`Acceptez vous la partie contre  ${user} ? `); 
         console.log(accepterPartieContre)   
     });

    
 
    
 
    

    const displayUserConnected = (clientsArray, document) => {

    var users = "";
    var urlcourante = document.location.href;

    for ( var i = 0 ; i < clientsArray.length ; i++){
        if (clientsArray[i] != input.name){
        users += `<li class="nopoint">`+ clientsArray[i] +`<a href="${urlcourante}/${clientsArray[i]}"><button class="btnMessagerie btn btn-success" >Messagerie</button></a></li>`
        
            }
        } 
        
        return users;  

    }; 


    const displayBtnMorpion = (clientsArray, socket, n) => {

        var btnMorpion = document.createElement('button'); 
        
        btnMorpion.setAttribute('id', clientsArray[n]);

        btnMorpion.innerHTML = clientsArray[n];

        btnMorpion.classList.add('btn');  
        btnMorpion.classList.add('btn-success'); 
        
        btnMorpion.addEventListener('click', (e) => {
            var confirmerDemande = confirm(`Voulez vous vraiment lancer Partie contre ${e.target.innerHTML}`)
            if (confirmerDemande){
            socket.emit("demandePartie", {name : input.name, socketId : socket.id})
    }
})
return btnMorpion
}
