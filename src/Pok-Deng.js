const inputReader = require('wait-console-input')

let playerCard = {
    card1: {
        value: 0,
        type: 0
    },
    card2: {
        value: 0,
        type: 0
    }
}
let dealerCard = {
    card1: {
        value: 0,
        type: 0
    },
    card2: {
        value: 0,
        type: 0
    }
}
let playerSum = 0;
let isContinue = true;
while(isContinue) {
    let bet = inputReader.readInteger("Please put your bet \n");
    playerCard.card1 = randomCard();
    playerCard.card2 = randomCard();
    dealerCard.card1 = randomCard();
    dealerCard.card2 = randomCard();
    console.log("You got " + match(playerCard.card1) + ", " + match(playerCard.card2));
    console.log("The dealer got " + match(dealerCard.card1) + ", " + match(dealerCard.card2));
    playerSum = whoWin(playerCard,dealerCard,bet,playerSum);
    let next = inputReader.readLine("Wanna play more (Yes/No)? \n");
    switch(next.toLowerCase()){
        case "yes" : isContinue = true; break;
        case "no" : 
            isContinue = false;
            console.log("You got total ",playerSum," chips");
            break;
         default :
            console.log("That is neither yes or no, I take it as no");
            isContinue = false;
    }
    if(!isContinue) break;
}

function randomCard(){
    let value = Math.floor(Math.random()*13)+1;
    let type = Math.floor(Math.random()*4)+1;
    return {'value': value,'type': type};
}

function match(card){
    let value;
    let type;
    switch(card.value) {
        case 11 : value = 'Jack'; break;
        case 12 : value = 'Queen'; break;
        case 13 : value = 'King'; break;
        case 1 : value = 'Ace'; break;
        default : value = card.value.toString();
    }
    switch(card.type) {
        case 1 : type = 'Clubs'; break;
        case 2 : type = 'Diamond'; break;
        case 3 : type = 'Heart'; break;
        case 4 : type = 'Spade'; break;
    }
    return type+'-'+value;
}

function whoWin(playerHand,dealerHand,bet,sum){
    let playerFirstValue = playerHand.card1.value > 9 ? 0 : playerHand.card1.value; 
    let playerSecondValue = playerHand.card2.value > 9 ? 0 : playerHand.card2.value; 
    let dealerFirstValue = dealerHand.card1.value > 9 ? 0 : dealerHand.card1.value; 
    let dealerSecondValue = dealerHand.card2.value > 9 ? 0 : dealerHand.card2.value; 
    let playerPoint = (playerFirstValue + playerSecondValue) % 10;
    let dealerPoint = (dealerFirstValue + dealerSecondValue) % 10;
    let status = playerPoint > dealerPoint ? 0 : (playerPoint == dealerPoint ? 2 : 1);
    switch(status) {
        case 0 : 
            console.log("You Won!!!, received ",bet," chips");
            return sum = sum+bet;
        case 1 :
            console.log("You lose, lost ",bet," chips");
            return sum = sum-bet;
        case 2 :
            console.log("It's a tie!!!");
            return sum;
    }
}