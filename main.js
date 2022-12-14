// array of classnames havig images
const imgCollection=["img_1","img_2","img_3","img_4","img_5","img_6","img_7","img_8","img_9","img_10","img_11","img_12","img_13","img_14","img_15","img_16","img_17"];

// game starting state
var gameState=false

// array of having dupclicated images
var ducCardImg=[];

// eject cards matched
const matching=()=>{
    vs[0].value="empty_2";
    vs[1].value="empty_2";
}

// clear vs arrays
const clearArrays=()=>{
    vs=[];
    cardElements=[];
}

// create a new array for choosen lenght
function createNewArray() {
        // prevent player form making another selection by changing game state
        gameState=false;
        const cardImg=[];
        let n=Number(document.getElementById("gmLvl").value); // get choosen level value (& set amount of cards) 
        var i= Math.floor(Math.random()*6); // random number for determine elem. of array to start from.
        var w=i;
        while (i<n+w){
        cardImg.push(imgCollection[i]);
        i++;
        }
        // clear array of ducCardImg
        ducCardImg=[];
        // duplicate cardimg
        for(let j=0;j<cardImg.length;j++){
        ducCardImg.push(cardImg[j]);
        ducCardImg.push(cardImg[j])
        }

        // distribute amount of cards acording to choosen level
        var card_Area=document.getElementById("cardArea");
        var dist=card_Area.querySelectorAll("div.empty1, div.empty");

        // clear cards classnames choosen before and set all "empty"
        dist.forEach(ClearCards => {
            ClearCards.className="empty";
        });
        for (let k=0;k<ducCardImg.length;k++){
        dist[k].className="empty1"
        }       
} 

// add class to each div (img) when clicked start button
const start=()=>{
    let x=document.querySelectorAll(".empty1");
    for(let i=0;i<(x.length);i++){
    let number=Math.floor(Math.random()*ducCardImg.length);
    x[i].className+=" "+ducCardImg[number];
    ducCardImg.splice(number,1);
    }

    // Hide Start button and add Redistribute button  
    document.getElementById("start").style.display="none";
    document.getElementById("reload").style.display="inline";
    document.getElementById("gmLvl").setAttribute("disabled",""); //disable level select option
    

    //Make all cards display imgside at begining of game for 5 second
    setTimeout((backsideIsUp),5000); //delay for 5 second    
}
// Reload page and restart game
const reload=()=>{
    alert("Oynadığınız Oyunu Sonlandrımak Üzeresiniz! Kartlar Yeniden Dağıtılacak!!!");
    window.location.reload();
}

 // make all cards display backside 
const backsideIsUp=()=>{
    // prevent player form making another selection by changing game state
    gameState=false;

    let x=document.querySelectorAll(".empty1");
     for (var i=0;i<x.length;i++){
        let a=x[i].classList
        if(a.contains("backSide")){
            console.log("First Game Created By Murat");
            // do nothing everything is OK!
        } else {
            x[i].className+=" backSide";
        } 
     }
      // how many cards are left
          var cardsLeft=(Number(document.querySelectorAll(".empty1").length));
          // write number of cards lefted on display input area
            document.getElementById("cardLeftDp").value=Number(cardsLeft);
      // allow player form making another selection by changing game state again
      gameState=true;
}

// set an array for inserting classnames of choosen cards in it
var vs=[]; 

// set an array for inserting element of choosen cards in it
var cardElements=[];
    
// Number of wrong guess
var missmatch=0;

// picking up a card
const pickUp=(card)=>{
    // Control game starting state if it's true then go ahead
    if(gameState===false){
         // do nothing while matching job is runnig;
         console.log("This game is created by Murat!!")
         return;
    }   else {
        // assign number of cards lefted before chooseing cards
        var leftedCards=Number(document.getElementById("cardLeftDp").value);
        if(vs.length==0){
        // turn card image side is up (removing .backSide class)
        let cl=card.classList;
        cl.remove("backSide")
        // add className of selected card on comparing array
        vs.push(cl);
        // record id of first selected card on comparing
        var idName_1=String(card.id)
        // remove onclick attribute of choosen card for can't be choosing again
        cardElements.push(card);
        card.removeAttribute("onclick");
        }   else {
                /* if vs.lenght==1 =>
                 turn second card image side is up (removing .backSide class) */
                let cl=card.classList;
                cl.remove("backSide")
                 // add className of selected second card on comparing array
                vs.push(cl);
                // record id of selected card on comparing
                var idName_2=String(card.id);
                 // remove onclick attribute of choosen card for can't be choosing again
                cardElements.push(card);
                card.removeAttribute("onclick");
                /* compare array's obects (equal or not)
                if both of choosen cards' classnames are equal */
                if(vs[0].value==vs[1].value&&idName_1!==idName_2){ 
                    setTimeout((matching),500);
                    setTimeout((clearArrays),501);
                    // how many cards are left
                    leftedCards=(leftedCards-vs.length);
                        // Complete the game
                        if(leftedCards==0){
                            document.getElementById("cardLeftDp").value= "  Kazandınız  ";
                            let close=document.getElementById("cardArea");
                            let cc=close.querySelectorAll("div");
                            cc.forEach(el => {
                                el.remove();
                            });
                            document.getElementById("cardArea").className="gmover";
                            return
                        }   else {
                                document.getElementById("cardLeftDp").value=leftedCards;
                            }
                }  
                //  if both of choosen cards' classnames are not equal 
                else  {
                    setTimeout((backsideIsUp),500);
                    missmatch++;
                    document.getElementById("display").value=missmatch;
                    setTimeout((clearArrays),501);
                    cardElements[0].setAttribute("onclick","pickUp(this)");
                    cardElements[1].setAttribute("onclick","pickUp(this)");
                }   
        }    
    }
}