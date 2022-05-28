


var socket = io(); 

//button
  
//chat
const ulMessagesChat = document.querySelector('#ulMessagesChat')

const masquerChat = document.querySelector('#masquerChat')
const chatBox = document.querySelector('#chatBox'); 
const activerChat = document.querySelector('#activerChat');

const ulIsConnected = document.querySelector('#ulIsConnected');
const boutonsMorpion = document.querySelector('#boutonsMorpion');
const input = document.querySelector('#inputChat')
const connectedMessages = document.querySelector('#connectedMessages'); 


// btn 
form = document.querySelector('#chatForm')


masquerChat.addEventListener('click', () => {
    chatBox.classList.add('d-none'); 
    activerChat.classList.remove('d-none');

})
activerChat.addEventListener('click', () => {
    chatBox.classList.remove('d-none'); 
    activerChat.classList.add('d-none');

})


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




// socket 
 
// un utilisateur se connecte 

socket.emit("join", input.name); 


//reception et affichage du message 



socket.on('chat message', function(msg) {

    var item = document.createElement('li');
    item.classList.add("item");
    item.classList.add("nopoint");
    item.textContent = msg.expediteur + "  " + msg.date + "  : " +msg.message;
    console.log(item); 
    ulMessagesChat.appendChild(item);

    window.scrollTo(0, document.body.scrollHeight);
});



socket.on('has joined', (user) => {

    // un autre utilisateur se connecte et on l'affiche
    // affichage des boutons 

    var btn = document.querySelector(`.btn#${user}`);  
    if(user != input.name){
    if(btn === null){ 
    console.log("ici"); 
    btn = createButtonMorpion(user); 
    ulIsConnected.appendChild(btn)
    }}
    }
)

socket.on('commencer morpion', (demandeur) => {
    console.log("cible atteinte");
    window.focus();
    var confirm = window.confirm( `voulez vous faire une partie de morpion contre ${demandeur}`); 
    if(confirm){
        console.log('maintenant la'); 
        morpionBox.classList.add('morpionBox');
        morpionBox.setAttribute('id', demandeur) 
        tabDisplay(tableau, morpionBox, demandeur)
        socket.emit('partie acceptée', input.name)
    }
    })
 

    // ne recoit rien a debugger 
socket.on("partie debut", () => {
        console.log("coucou")
        const morpionurl = insertMorpionUrl(); 
        
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
        btn.classList.add('btnUser')
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
