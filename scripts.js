class Player{
   
    constructor(name, score){
        this.name = name;
        this.score = score;
        this.hand = [];
        
    }

    draw(deck){
        let cardDrawn = deck.draw();
        this.hand.push(cardDrawn);

    }

    incrementScore(){
        this.score += 1;
    }

    flip(){
       let cardFlipped = this.hand.pop();
        return cardFlipped;
    }


    describe (){
        console.log(`
        Player Name: ${this.name}: 
        Player Score: ${this.score}
        `);

    }




}

class Card{
    constructor(name, value){
        this.name = name;
        this.value = value;


    }

    getValue(){ // getter 
        return this.value;

    }

    getName(){ // getter 
        return this.name;
    }


    describe(){
        // console.log(`${this.name} : has Game Value of: ${this.value}`);
        return `${this.name} : has Game Value of: ${this.value}`;
    }
}

class Deck{
    
    constructor(){
        this.cards = []; // empty array to populate with the cards in the deck 
        this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        this.faceCards = ['Jack', 'Queen', 'King', 'Ace'];

        console.log(`******************************* Building a New Deck Of Cards *******************************`);

        for(const suit of this.suits){ // loop through each suit of cards (Hearts, Spades, Clubs, Diomands)... 
            
            for(let i = 2; i < 11; i ++){  //  make new cardsvalue 2 throgh 10 for each suit 
                let cardName = `${i} of ${suit}`;
                this.cards.push(new Card(cardName, i));
                
            }

            
            for(let i = 11; i <= 14; i ++){// for each suit loop through each face card and create a card 
                    let faceCardName = `${this.faceCards[i - 11]} of ${suit}`;
                    this.cards.push(new Card(faceCardName, i));                

            }

        }

        console.log(`the deck has ${this.cards.length} cards in it`);



        this.describe(); // print out the new deck after it has been built 

    }

    describe(){
        let listString = "";
        
        for(let i = 0; i < this.cards.length; i ++){
            listString += `
            ${this.cards[i].describe()}`;
        }
        console.log(`
        ${listString}`);
        
    }

    

    shouffle(){ // Fisher Yates algorythme to shuffle deck 
        //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#:~:text=The%20Fisher%E2%80%93Yates%20shuffle%20is,list%20until%20no%20elements%20remain.
        /*
        We loop through the array from back to front 
        We swap each element in the array with a random element that came before the curretn element in the loop
        */
        for(let i = this.cards.length -1; i > 0; i --){
            let swap = Math.floor(Math.random() * (i + 1));
         let index = this.cards[i];

         this.cards[i] = this.cards[swap];
         this.cards[swap] = index; 

        }

        return this.cards;

    }

    draw(){

        return this.cards.pop();
    }

}

console.log(`
*********************************************************************************************

******************************* Lets Play The Card Gam WAR **********************************

*********************************************************************************************`);


console.log(`




******************************* Adding Players *********************************************

`);

let player1 = new Player("Tango", 0);
player1.describe();
let player2 = new Player("Cash", 0);
player2.describe();


let gameDeck = new Deck();

console.log(`*******************************Shuffling the Deck*******************************`);

gameDeck.shouffle();

gameDeck.describe();



console.log(`
******************************* Each Player Now Takes Turn Drawing Card Untill The Deck Is Split between them *******************************

`);

for (let i = 1 ; i <= 52; i++ ){
    if(i % 2 == 0){
        player2.draw(gameDeck);
        console.log(`
        ${player2.name} drew a card. 
        Number of cards in ${player2.name}'s hand is now ${player2.hand.length}`);

    } else {
        player1.draw(gameDeck);
        console.log(`
        ${player1.name} drew a card. 
        Number of cards in ${player1.name}'s hand is now ${player1.hand.length}`);

    }

}



console.log(`
*********************************************************************************************

*********************** The Players have their cards lets start the game ! ******************

*********************************************************************************************


`);
for (let i = 0; i < 26; i++) {

    let player1PlayedCard = player1.flip();
    let player2PlayedCard = player2.flip();

    console.log(`
    1...
    2...
    3...

    FLIP!

    ${player1.name} Playse the ${player1PlayedCard.describe()}

    ${player2.name} Playse the ${player2PlayedCard.describe()}

    `);

    if(player1PlayedCard.getValue() > player2PlayedCard.getValue()){
        player1.incrementScore();

        console.log(`
        ${player1.name} Wins the Hand!
        1 Point aworded to ${player1.name}
        
        The Current score is now: 
        ${player1.name}: ${player1.score}
        
        ${player2.name}: ${player2.score}`);

    } else if (player1PlayedCard.getValue() < player2PlayedCard.getValue()){

        player2.incrementScore();

        console.log(`
        ${player2.name} Wins the Hand!
        1 Point aworded to ${player2.name}
        
        The Current score is now: 
        ${player2.name}: ${player2.score}

        ${player1.name}: ${player1.score}
        
        `);

        
    } else {
        console.log(`It's a Tie! neither player wins`);
    }

}

if(player1.score > player2.score){
    console.log(`

    *********************************************************************
    
    And the winner of the Game of WAR is.....
    
    
    Player 1: ${player1.name}
    
    Final Score :
    
    ${player1.name}: ${player1.score}
        
    ${player2.name}: ${player2.score}`);

} else if (player1.score < player2.score){

    console.log(`

    *********************************************************************
    
    And the winner of the Game of WAR is.....
    
    
    Player 1: ${player2.name}
    
    Final Score :

    ${player2.name}: ${player2.score}
    
    ${player1.name}: ${player1.score}
        
    `);

    

} else {
    
console.log(`

*********************************************************************

And the winner of the Game of WAR is.....

Its a TIE!!  neither player WINS! 

Final Score :

${player2.name}: ${player2.score}

${player1.name}: ${player1.score}
    
`);
}




