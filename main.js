// array of classnames havig images
const imgCollection = [
    "img_1",
    "img_2",
    "img_3",
    "img_4",
    "img_5",
    "img_6",
    "img_7",
    "img_8",
    "img_9",
    "img_10",
    "img_11",
    "img_12",
    "img_13",
    "img_14",
    "img_15",
    "img_16",
    "img_17",
];

// game starting state
var gameState = false;

// array of having dupclicated images
var ducCardImg = [];

// set an array for inserting classnames of choosen cards in it
var vs = [];

// set an array for inserting element of choosen cards in it
var cardElements = [];

// Counter of wrong guess number
var missmatch = 0;

// how many cards are left
var cardsLeft;

// set a name for display input lefted cards number shown
var cardLeftDisplay=document.getElementById("cardLeftDp");

// set a name for card area
var card_Area = document.getElementById("cardArea");

// seting up countdown timer
var second;
var countTimer;
var flashtext;
var timerDisplay = document.getElementById("timer");
var pausebtn = document.getElementById("pausebtn");
timerDisplay.value = "00:00";
var pauseBtnState = false;

// eject cards matched
const matching = () => {
    vs[0].value = "empty_2";
    vs[1].value = "empty_2";
    let unpickupable = document.querySelectorAll(".empty1", ".backSide");
    unpickupable.forEach((e) => {
        e.setAttribute("onclick", "pickUp(this)");
    });
};

// clear vs arrays
const clearArrays = () => {
    vs = [];
    cardElements = [];
};

// Reload page and restart game
const reload = () => {
    alert(
        "Oynadığınız Oyunu Sonlandrımak Üzeresiniz! Kartlar Yeniden Dağıtılacak!!!"
    );
    stopFunc();
    window.location.reload();
};

// count down function
const countDown = () => {
    pausebtn.disabled=false;
    pausebtn.hidden=false;
    let min = String(Math.floor(second / 60)).padStart(2, 0);
    let sec = String(Math.floor(second % 60)).padStart(2, 0);
    timerDisplay.className==="red";
    timerDisplay.value = `${min} : ${sec}`;
    --second;   
    //  cards matching proccess is done before time is up!
    if (second>0 && Number(cardLeftDisplay.value)==0) {
        gameState=false;
        clearInterval(countTimer);
        pauseBtnState=false;
        pausebtn.hidden=true;
        card_Area.querySelectorAll("div").forEach((e)=>{
            e.className="empty"
        });
        cardLeftDisplay.value = "K A Z A N D I N I Z ! ! !";
        card_Area.className = "youWin";
    };
    // time is up but already have unmatched cards
    if (second==-1 && Number(cardLeftDisplay.value)>0){
        gameState=false;
        stopFunc();
        card_Area.querySelectorAll("div").forEach((e)=>{
            e.className="empty"
        });
        card_Area.className = "gmover";
    }
};

// timer stop function
const stopFunc = () => {
    pausebtn.disabled = true;
    clearInterval(countTimer);
    clearInterval(flashtext);
    pauseBtnState = false;
    timerDisplay.style.color === "red";
    timerDisplay.value = "00:00";
    second = Number(localStorage.getItem("second"));
};

// count down pause mode function
$("#pausebtn").click(() => {
    pauseBtnState = pauseBtnState === false ? true : false;
    if (pauseBtnState === true) {
        gameState=false;
        pausebtn.innerText = "RESUME";
        clearInterval(countTimer);
        flashtext = setInterval(blinkTimer, 500);
    }   else {
            gameState=true;
            pausebtn.innerText = "PAUSE";
            timerDisplay.className = timerDisplay.className === "hide" ? "red" : "red";
            clearInterval(flashtext);
            countTimer = setInterval(countDown, 1000);
        }
});

// function that to make blinked timer value by changing input's class name
const blinkTimer = () => {
    timerDisplay.className = timerDisplay.className === "red" ? "hide" : "red";
};

// create a new array for choosen lenght
const createNewArray = () => {
    // set state of start button's and clock visibility enabled 
    document.getElementById("start").disabled = false;
    document.querySelector(".clock").hidden = false;
    document.getElementById("gmLvl").children[0].disabled=true; //  and also disabled "seviye seç" option

    // prevent player form making another selection by changing game state
    gameState = false;
    const cardImg = [];
    let n = Number(document.getElementById("gmLvl").value); // get choosen level value (& set amount of cards)
    var i = Math.floor(Math.random() * 6); // random number for determine elem. of array to start from.
    //seting up countdown timer value
    second = n * 15;
    localStorage.setItem("second", second);
    console.log(localStorage.getItem("second"));
    w = i;
    while (i < n + w) {
        cardImg.push(imgCollection[i]);
        i++;
    }
    // clear array of ducCardImg
    ducCardImg = [];
    // duplicate cardimg
    for (let j = 0; j < cardImg.length; j++) {
        ducCardImg.push(cardImg[j]);
        ducCardImg.push(cardImg[j]);
    }

    // distribute amount of cards acording to choosen level
    var dist = card_Area.querySelectorAll("div.empty1, div.empty");
    dist.forEach((ClearCards) => {          // clear cards classnames choosen before and set all "empty"
        ClearCards.className = "empty";
    });
    for (let k = 0; k < ducCardImg.length; k++) {
        dist[k].className = "empty1";
    }
};

// add class to each div (img) when clicked start button
const start = () => {
    let x = document.querySelectorAll(".empty1");
    for (let i = 0; i < x.length; i++) {
        let number = Math.floor(Math.random() * ducCardImg.length);
        x[i].className += " " + ducCardImg[number];
        ducCardImg.splice(number, 1);
    }

    // Hide Start button and add Redistribute button
    document.getElementById("start").style.display = "none";
    document.getElementById("reload").style.display = "inline";
    document.getElementById("gmLvl").setAttribute("disabled", ""); //disable level select option

    //Make all cards display imgside at begining of game for 5 second
    setTimeout(backsideIsUp, 5000); //delay for 5 second
    // count down starter function
    setTimeout(() => {
        pausebtn.disabled = false;
        countTimer = setInterval(countDown, 1000);
    }, 4110);
};

// make all cards display backside
const backsideIsUp = () => {
    // prevent player form making another selection by changing game state
    gameState = false;

    let x = document.querySelectorAll(".empty1", ".backSide");
    for (var i = 0; i < x.length; i++) {
        let a = x[i].classList;
        if (a.contains("backSide")) {
            console.log("First Game Created By Murat");
            // do nothing everything is OK!
        } else {
            x[i].className += " backSide";
        }
    }
    x.forEach((e) => {
        e.setAttribute("onclick", "pickUp(this)");
    });
    // how many cards are left
    cardsLeft = Number(document.querySelectorAll(".empty1").length);
    // write number of cards lefted on display input area
    cardLeftDisplay.value = Number(cardsLeft);
    // allow player form making another selection by changing game state again
    gameState = true;
};

// picking up a card
const pickUp = (card) => {
    if (gameState === false) {
        // do nothing while matching job is runnig;
        console.log("This game is created by Murat!!");
        return;
    }
    // Control game starting state if it's true then go ahead
    else {       
        if (vs.length == 0) {
            // turn card image side is up (removing .backSide class)
            let cl = card.classList;
            cl.remove("backSide");
            // add className of selected card on comparing array
            vs.push(cl);
            // record id of first selected card on comparing
            var idName_1 = String(card.id);
            // remove onclick attribute of choosen card for can't be choosing again
            cardElements.push(card);
            card.removeAttribute("onclick");
        } else {
            /* if vs.lenght==1 =>
                       turn second card image side is up (removing .backSide class) */
            let cl = card.classList;
            cl.remove("backSide");
            // add className of selected second card on comparing array
            vs.push(cl);
            // record id of selected card on comparing
            var idName_2 = String(card.id);
            // remove onclick attribute of choosen card for can't be choosing again
            cardElements.push(card);
            card.removeAttribute("onclick");
            if (vs.length = 2) {
                let unpickupable = document.querySelectorAll(".empty1", ".backside");
                unpickupable.forEach((e) => {
                    e.removeAttribute("onclick");
                });
            };
                /* compare array's obects (equal or not)
                      if both of choosen cards' classnames are equal */
            if (vs[0].value == vs[1].value && idName_1 !== idName_2) {
                setTimeout(matching, 500);
                setTimeout(clearArrays, 501);
                // how many cards are left
                cardsLeft = cardsLeft - vs.length;
                cardLeftDisplay.value = cardsLeft;
            }
            //  if both of choosen cards' classnames are not equal
            else {
                setTimeout(backsideIsUp, 500);
                missmatch++;
                document.getElementById("display").value = missmatch;
                setTimeout(clearArrays, 501);
                cardElements[0].setAttribute("onclick", "pickUp(this)");
                cardElements[1].setAttribute("onclick", "pickUp(this)");
            }
        }
    }
}
