// Technical Requirements
// Your project should meet the following requirements:

// Your game should run without errors
// The game starts immediately when the JavaScript is executed. Create your two players and start the rounds!
// There is no user input. The program simply loops through rounds until the game is finished.
// Print a message for each round showing the cards played by each user, who won the round, and how many cards each player has.
// Include a README written in well-formatted Markdown (hint: look up README templates)
// Show a good commit history with frequent commits (We're looking for lots of small commits!)

// card class

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

// deck class

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["Heart", "Club", "Spade", "Diamond"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    return this.cards.pop();
  }
}

// player class

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  drawCard(deck) {
    const card = deck.deal();
    this.hand.push(card);
  }

  hasAllCards() {
    return this.hand.length === 52;
  }
}

// war function

function war(player1, player2) {
  const warCards = 4;

  if (player1.hand.length < warCards || player2.hand.length < warCards) {
    console.log("Not enough cards to continue the war.");
    return;
  }

  const cards1 = player1.hand.splice(0, warCards);
  const cards2 = player2.hand.splice(0, warCards);

  console.log(`WAR! ${player1.name} plays ${cards1.map(card => `${card.rank} of ${card.suit}`).join(", ")}`);
  console.log(`WAR! ${player2.name} plays ${cards2.map(card => `${card.rank} of ${card.suit}`).join(", ")}`);

  const card1 = cards1[warCards - 1];
  const card2 = cards2[warCards - 1];

  if (card1.rank > card2.rank) {
    console.log(`${player1.name} wins the war!`);
    player1.hand.push(...cards1, ...cards2);
  } else if (card1.rank < card2.rank) {
    console.log(`${player2.name} wins the war!`);
    player2.hand.push(...cards1, ...cards2);
  } else {
    console.log("Another war!");
    player1.hand.push(...cards1);
    player2.hand.push(...cards2);
    war(player1, player2);
  }
}

const deck = new Deck();
deck.shuffle();

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

while (deck.cards.length > 0) {
  player1.drawCard(deck);
  player2.drawCard(deck);
}

function amountOfCards(player1, player2) {
  console.log(`${player1.name} has ${player1.hand.length} cards`);
  console.log(`${player2.name} has ${player2.hand.length} cards`);
}
// functionality of game

let round = 1;
while (player1.hand.length > 0 && player2.hand.length > 0) {
  const card1 = player1.hand.shift();
  const card2 = player2.hand.shift();

  console.log(`Round ${round}: ${player1.name} plays ${card1.rank} of ${card1.suit}`);
  console.log(`Round ${round}: ${player2.name} plays ${card2.rank} of ${card2.suit}`);

  if (card1.rank > card2.rank) {
    console.log(`${player1.name} wins the round!`);
    player1.hand.push(card1, card2);
  } else if (card1.rank < card2.rank) {
    console.log(`${player2.name} wins the round!`);
    player2.hand.push(card1, card2);
  } else {
    console.log("WAR!");
    player1.hand.push(card1);
    player2.hand.push(card2);
    war(player1, player2);
  }

  round++;

  amountOfCards(player1, player2);

  if (player1.hasAllCards() || player2.hasAllCards()) {
    break;
  }
}

// end results

if (player1.hasAllCards()) {
  console.log(`${player1.name} wins the game!`);
} else if (player2.hasAllCards()) {
  console.log(`${player2.name} wins the game!`);
}
