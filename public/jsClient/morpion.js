

var caseMorpion = document.querySelectorAll(".caseMorpion"); 


var tableau = [
    ["0" , "0" ,"0" ],
    ["0" , "0" ,"0" ],
    ["0" , "0" ,"0" ],
]


const gameBox = document.querySelector('#gameBox'); 

const tabDisplay = (tab, parent) => {
for ( var i = 0 ; i < tab.length ; i++){
for (var j = 0 ; j < tab.length; j++){

 var carre = document.createElement('div'); 
 carre.classList.add('caseMorpion');
 if (i === 0){
    var nomAttribut = "#n" + ((j+1)*(i+1).toString())
 } else if (i === 1) {
    var nomAttribut = "#n" + ((j+1)*(i+1)+ (2*i - i*j)).toString()
 } else if (i === 2) {
    var nomAttribut = "#n" + ((j+1)*(i+1) + (2*i - i*j )).toString();   
 }
 
 carre.setAttribute("id", nomAttribut );
 
 if (tab[i][j]!= "0"){
    carre.innerHTML = tab[i][j];}
else{ carre.addEventListener('click', (e) => {
    if (carre.childElementCount === 0){
    console.log(e.target) ;   
    var btnX = document.createElement('btn');
    console.log(nomAttribut);
    btnX.classList.add("btn"); 
    btnX.classList.add("btn-success");
    btnX.setAttribute("id", "btn" + nomAttribut ); 
    btnX.innerHTML = "X"
    e.target.appendChild(btnX); 
    }
})};  
 parent.appendChild(carre); 
}    
}}

tabDisplay(tableau,gameBox ); 



















/*
caseMorpion.forEach( element => {
    element.addEventListener( 'click' , () => {
        if(element.childElementCount === 0){
            const btn0 = creerBoutonChoix(element, "O"); 
            const btnX = creerBoutonChoix(element, "X");
            btn0.addEventListener('click', () => {
                btn0.classList.add("d-none")
            }); 
            btnX.addEventListener('click', () => {
                btnX.classList.add("d-none")
            }) 
        }

    })
})
 


const creerBoutonChoix = (element) => {
    var buttonO = document.createElement('button'); 
    buttonO.classList.add("btn"); 
    buttonO.classList.add("btn-success");
    buttonO.classList.add("btnChoice");
    buttonO.addEventListener('click', () =>{
        element.innerHTML = buttonO.innerHTML; 
        buttonO.classList.remove("btn");
        buttonO.classList.remove("btn-success");
        buttonO.classList.remove("btnChoice"); 
    });  
    element.appendChild(buttonO);
    return buttonO; 
}
*/