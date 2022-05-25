
var socket = io(); 

var tableau = [
   ["0" , "0" ,"0" ],
   ["0" , "0" ,"0" ],
   ["0" , "0" ,"0" ],
]

const btnMorpion = document.querySelector('.btnMorpion'); 






const gameBox = document.querySelector('#gameBox'); 

// affichage de la grille

const tabDisplay = (tab, parent) => {

for ( var i = 0 ; i < tab.length ; i++){  // boucle sur la colone 
for (var j = 0 ; j < tab[i].length; j++){   // boucle sur la ligne 

 var carre = document.createElement('div'); 
 carre.classList.add('caseMorpion');



 // nom d'attribut en fonction du numero de la case
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
    if (carre.childElementCount === 0 ){
    var BtnX = creerBoutonCase( BtnX, e.target, 'X');
    var BtnO = creerBoutonCase(BtnO, e.target, 'O'); 
    BtnX.addEventListener('click', ()=> {
        var tableauModif = modifierTabClick(tableau, BtnX); 
        
    })
    if (e.target instanceof HTMLDivElement){
        
    e.target.appendChild(BtnX); 
    e.target.appendChild(BtnO);

    }
}
})};  
 parent.appendChild(carre); 
}    
}
console.log(parent)
}


tabDisplay(tableau,gameBox); 



 


// creer button dans caseMorpion :

const creerBoutonCase = (leBouton, parent, N) => {
    var leBouton = document.createElement('bouton');
   
    leBouton.classList.add("btn"); 
    leBouton.classList.add("btn-success");
    leBouton.setAttribute("id", parent.id );
    leBouton.innerHTML = N 

    return leBouton
}





const modifierTabClick = ( tab , btn ) => {
    var indice = parseInt(btn.id.slice(2)) ;
    console.log(indice) ; 
    switch (indice) {
        case 1 : tab[0][0] = btn.innerHTML ; break; 
        case 2 : tab[0][1] = btn.innerHTM; break; 
        case 3 : tab[0][2] = btn.innerHTM ; break; 
        case 4 : tab[1][0] = btn.innerHTM; break; 
        case 5 : tab[1][1] = btn.innerHTM; break; 
        case 6 : tab[1][2] = btn.innerHTM; break; 
        case 7 : tab[2][0] = btn.innerHTM ; break; 
        case 8 : tab[2][1] = btn.innerHTM ; break; 
        case 9 : tab[2][2] = btn.innerHTM ; break; 
        default : break
    } 
    return tab 
} 