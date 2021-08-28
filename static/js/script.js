//Challenge 5;

//top functions
let blackJackGame = {
    'you' : { 'id' : 'user'  ,'scoreSpan' : '#your-blackjack-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : {'id' : 'bot','scoreSpan' : '#dealer-backjack-result', 'div' : '#dealer-box', 'score' : 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardsMap' : {'2':2, '3' : 3 , '4' : 4, '5': 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'K' : 10, 'J' : 10, 'Q' : 10, 'A' :[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws'  : 0,
    'isStand' : false,
    'turnsover' : false,
};



const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')
const bustSound = new Audio('static/sounds/bust.mp3')
const drewSound = new Audio('static/sounds/drew.mp3')


//functions



// function randomNumber() {
//     let x = Math.floor(Math.random());
//     return x;
// }

function randomCard() {
    let y = Math.floor(Math.random()*13);
    return blackJackGame['cards'][y];
}

function showCard(card,activePlayer)
{
    if (activePlayer['score']<=21) {
    let img = document.createElement('img');
    img.src = `static/images/${card}.png`;
    img.className = 'cards';
    document.querySelector(activePlayer['div']).append(img);
    hitSound.play();
    }
    else {

    }
}

function blackJackHit() {
    if (blackJackGame['isStand']===false) { 
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    console.log(YOU.score);
    }
}

function updateScore(card,activePlayer) {
    if (card==='A')
    {
        if (activePlayer['score']+blackJackGame['cardsMap'][card][1]<=21) {
        activePlayer['score']+=blackJackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score']+=blackJackGame['cardsMap'][card][0];
        }
        
    }
    else {
        activePlayer['score']+=blackJackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {

    if (activePlayer['score']>21) {
        // bustSound.play();
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
    document.querySelector(activePlayer['scoreSpan']).innerHTML = activePlayer['score'];
    }
}

function blackjackDeal() {
    // showResult(computerWinner());

    if (blackJackGame['turnsover']) {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    // console.log(yourImages);
    for(let i =0; i<yourImages.length; ++i) yourImages[i].remove();

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0; i<dealerImages.length; ++i) dealerImages[i].remove();

    YOU['score'] =0;
    DEALER['score'] =0;
    document.querySelector(YOU['scoreSpan']).textContent = '0';
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).textContent = '0';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';

    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color = 'white';

    //reseting the adible variables :
    blackJackGame['isStand'] = false;
    blackJackGame['turnsover'] = false;
    }
}


function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerLogic() {
    // alert('oouch!');

    if (blackJackGame['turnsover'] === false) {
    
    blackJackGame['isStand'] = true;
    while(DEALER['score']<16 && blackJackGame['isStand']===true) {
    
    let card = randomCard();
    // console.log(card);
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    console.log(YOU.DEALER);
    await sleep(1000);
    }

    if (DEALER['score']>15) {
        let winner = computerWinner();
        blackJackGame['turnsover'] = true;
        showResult(winner);
        //truns are over!
        
    }
}

}

//computer winner and return who just won
function computerWinner() {
    let winner;
    if (YOU['score']<='21')
    {
        //condition : higher score than dealer or when dealer busts
        if (YOU['score']>DEALER['score'] || DEALER['score']>21) {
            console.log('YOU WON!');
            blackJackGame['wins']++;
            winner = YOU;
         }
        else if(YOU['score']<DEALER['score']) {
        console.log('You Lost!');
        blackJackGame['losses']++;
        winner = DEALER;
        }
        else if (YOU['score']===DEALER['score']) {
        blackJackGame['draws']++;
        console.log('You Drew!');
        } 
    } else if (YOU['score']>21 && DEALER['score']<=21) {
        console.log('YOU LOST');
        blackJackGame['losses']++;

        winner = DEALER;
    }   
    else if (YOU['score']>21 && DEALER['score']>21) {
        console.log('You drew!');
        blackJackGame['draws']++;

    }

    console.log(`Winner is : ${winner}`);
    return winner;

}


function showResult(winner) {
    let message, messageColor;

    if (blackJackGame['turnsover']===true) {
    if (winner===YOU) {
        message = 'You Won!';
        messageColor = 'green';
        winSound.play();
    }
    else if (winner==DEALER) {
        message = 'You Lost!';
        messageColor = 'red';
        lossSound.play();
    }
    else {
        message = 'You drew!';
        messageColor = 'black';
        // drewSound.play();
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    document.querySelector('#wins').textContent = blackJackGame['wins'];
    document.querySelector('#losses').textContent = blackJackGame['losses'];
    document.querySelector('#draws').textContent = blackJackGame['draws'];
    }
}

function processForm() {
    let name = document.querySelector('#name').value;
    show_page(name);

}

function show_page(username) {

    document.querySelector('#user').textContent = username;
    document.querySelector('#page-1').style.display = 'block';
    document.querySelector('#page-2').style.display = 'none';
    // document.querySelector('#log-details').textContent = 'Log Out';
}




//event listners
document.addEventListener('DOMContentLoaded', ()=> {

    document.querySelector('#page-1').style.display = 'none';
    document.querySelector('#page-2').style.display = 'block';
    // document.querySelector('#log-details').textContent = 'Sign In';

    // ingame = false;
    // show_page(' kunal');


    document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit );
    document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
    document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

    //Login form : 
    // const submit_button = document.querySelector('#submit-button');
    // const username = document.querySelector('#name-field');
    // document.querySelector('#formx').addEventListener('submit', ()=>{
    //     let name = document.querySelector('#name').value;
    //     show_page(name);
    // })
    document.querySelector('#guest-mode').addEventListener('click', ()=>{
        show_page('  Guest');
    })
});
