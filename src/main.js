const prompt = require("prompt-sync")();

const PokerHand = require("./PokerHand.js");

let myHand = new PokerHand(prompt("Enter your hand: "));
let opponentHand = new PokerHand(prompt("Enter your opponent's hand: "));

const result = myHand.compareWith(opponentHand);
const resultMessage = {
    1: "You win! Well played",
    2: "You lost... Better luck next time",
    3: "It's a draw"
}

console.log(resultMessage[result]);
