


var socket = io(); 

//button
const btnReduceChat = document.querySelector('#reduceChat');  
const sendChat = document.querySelector('#sendChat');  
const activateChat = document.querySelector('#activateChat'); 
const btnMessagerie = document.querySelector('btnMessagerie')

//ul 
const chatMessage = document.querySelector('#chatMessages'); 
const userConnected = document.querySelector('#userConnected');

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

/*
btnMessagerie.addEventListener('click', () => {




})
*/
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
    console.log(user);

    if (!isAlreadyConnected){ clients.push(user.username)  } 
    connectedMessage.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    

    var users = "";
    var urlcourante = document.location.href;
    
    for ( var i = 0 ; i < user.clients.length ; i++){
        if (user.clients[i] != input.name){
        users += `<li class="nopoint">`+ user.clients[i] +`<a href="${urlcourante}/${user.clients[i]}"><button class="btnMessagerie btn btn-success" >Messagerie</button></a></li>`
        }}
    userConnected.innerHTML = users;    
    }); 


