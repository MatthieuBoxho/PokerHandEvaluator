## Poker hand ranking challenge

**My approach**

 1. Find ressources online to help me understand all the complexity of this challenge. Discover multiple solutions, selecting the one that I find the most fitting for the challenge and that I understand well and I can adapt *(1h)*
 2. Setting up the project and implementing the solution *(3h)*
 3. Writing unit tests *(30m)*
 4. Writing comments and this documentation *(30m)*
---
**Architecture**

 - **PokerHand.js** contains all the logic to be able to compare poker hands
 - **PokerHand.test.js** has multiple unit tests that checks that the logic is correctly implemented
 - **main.js** is a simple script that let the user input two poker hands and check which one is the best
---
**How to run**

 1. Have [Node](https://nodejs.org/en/download) and npm installed
 2. Open the folder `/src` in your favorite Terminal
 3. Run `npm install` (we need `prompt-sync` and `jest` installed)
 4. Run `node main.js` to test the program
 5. Run `npm test` to run unit tests
