


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
 


// un utilisateur se connecte 

socket.emit("join", input.name); 


//reception et affichage du message 

socket.on('chat message', function(msg) {

    var item = document.createElement('li');
    item.classList.add("item");
    item.classList.add("nopoint");
    item.textContent = msg.expediteur + "  " + msg.date + "  : " +msg.message;
    chatMessage.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});



socket.on('has joined', (user) => {


    // un autre utilisateur se connecte et on l'affiche

    // dans l'entete du chat 
    var item = document.querySelector(`.item#${user}`);
    console.log(item);  
    if (item === null){     
    item = document.createElement('p');
    item.classList.add("item");
    item.setAttribute('id', user)
    item.classList.add("nopoint");
    item.textContent = `${user} is connected`;
    
    if (item.id != input.name){ 
    connectedMessage.appendChild(item)};
    

    // affichage des boutons 
  
   
    var btn = document.querySelector(`.btn#${user}`);  
    if(user != input.name){
    if(btn === null){ 
    btn = createButtonMorpion(user); 
    userConnected.appendChild(btn)
    }}
    }
})

socket.on('commencer morpion', (demandeur) => {
    console.log("cible atteinte");
    var confirm = window.confirm( `voulez vous faire une partie de morpion contre ${demandeur}`); 
    if(confirm){
        const morpionurl = insertMorpionUrl(); 
        location.assign(morpionurl); 
        socket.emit('partie acceptée', input.name)
    }
    })
 
socket.on("partie debut", () => {
        const morpionurl = insertMorpionUrl(); 
        console.log(morpionurl);
        location.assign(morpionurl); 


})

socket.on("update", (clients) => {
    socket.clients = clients
})












//fonctions 


const insertMorpionUrl = () => {
    var urlcourante = document.location.href; 
        var debuturl = urlcourante.slice(0,30); 
        var finurl = urlcourante.slice(30, urlcourante.length); 
        var morpionurl = debuturl + 'morpion/' + finurl
        console.log(morpionurl);
        return(morpionurl)
}

const createButtonMorpion = (client) => {
        var btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-success');
        btn.setAttribute('id', client); 
        btn.textContent = client;
        
        btn.addEventListener("click", (e)=> {
           var confirm = window.confirm(`voulez vous jouer au morpion contre ${e.target.textContent}`)
           if (confirm){    
            socket.emit('demande morpion', { demandeur : input.name, cible : e.target.textContent })
            }
            })       
        return btn    

}


















    


























//     const displayUserConnected = (clientsArray, document) => {

//     var users = "";
//     var urlcourante = document.location.href;

//     for ( var i = 0 ; i < clientsArray.length ; i++){
//         if (clientsArray[i] != input.name){
//         users += `<li class="nopoint">`+ clientsArray[i] +`<a href="${urlcourante}/${clientsArray[i]}"><button class="btnMessagerie btn btn-success" >Messagerie</button></a></li>`
        
//             }
//         } 
        
//         return users;  

//     }; 


//     const displayBtnMorpion = (clientsArray, socket, n) => {

//         var btnMorpion = document.createElement('button');
        
        
//         btnMorpion.setAttribute('id', clientsArray[n]);

//         btnMorpion.innerHTML = clientsArray[n];

//         btnMorpion.classList.add('btn');  
//         btnMorpion.classList.add('btn-success'); 
        
//         btnMorpion.addEventListener('click', (e) => {
//             var confirmerDemande = confirm(`Voulez vous vraiment lancer Partie contre ${e.target.innerHTML}`)
//             if (confirmerDemande){    
           
//     }
// })
// return btnMorpion
// }
