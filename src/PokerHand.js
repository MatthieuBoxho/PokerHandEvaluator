function PokerHand(hand) {
  this.cards = this.parseHand(hand)
  this.faces = this.getOrderedFaces()
  this.suits = this.getOrderedSuits()
  this.isFlush = this.isHandAFlush()
  this.isStraight = this.isHandAStraight()
  this.counts = this.getCounts()
  this.duplicates = this.getDuplicates()
  this.rank = this.getRank()
  this.value = this.getHandValue()
}

PokerHand.prototype.parseHand = function (hand) {
  return hand.split(" ")
}

// Because the faces can both be a string or a number we need to format them
// Example : The following hand "2S 4S 6Q 5H 3Q" gets transformed into ['I', 'J', 'K', 'L', 'M']
PokerHand.prototype.getOrderedFaces = function () {
  const order = "23456789TJQKA"
  return this.cards
    .map((card) => String.fromCharCode([77 - order.indexOf(card[0])]))
    .sort()
}


PokerHand.prototype.getOrderedSuits = function () {
  return this.cards.map((card) => card[1]).sort()
}

PokerHand.prototype.isHandAFlush = function () {
  return this.suits[0] === this.suits[4]
}

// We check if every transformed face has a charCode that is matching a straight
// Example : We have the following hand "2S 4S 6Q 5H 3Q"
// It gets transformed into ['I', 'J', 'K', 'L', 'M'] by getOrderedFaces
// We check if every transformed face char code is equal to the first face char code + the current position
PokerHand.prototype.isHandAStraight = function () {
  const first = this.faces[0].charCodeAt(0)
  return this.faces.every((f, index) => first + index === f.charCodeAt(0));
}

// We create a dictonnary to count each occurence of every face in the hand
// Example : We have the following hand "2S 2H 6D 5H 5D"
// We get { '2': 2, '6': 1, '5': 2 }
PokerHand.prototype.getCounts = function () {
  return this.faces.reduce(count, {})
}

// We create a dictonnary to count each occurence of pairs, 3 of a kind or 4 of a kind
// Example : We have the following hand "2S 2H 6D 5H 5D"
// We get { '1': 1, '2': 2 }
PokerHand.prototype.getDuplicates = function () {
  return Object.values(this.counts).reduce(count, {})
}

function count(count, face) {
  count[face] = (count[face] || 0) + 1;
  return count;
}

// Specific rules to ranks all combinations
// The lower the rank, the better
PokerHand.prototype.getRank = function () {
  if (this.isFlush && this.isStraight) {
    return 1
  } else if (this.duplicates[4]) {
    return 2
  } else if (this.duplicates[3] && this.duplicates[2]) {
    return 3
  } else if (this.isFlush) {
    return 4
  } else if (this.isStraight) {
    return 5
  } else if (this.duplicates[3]) {
    return 6
  } else if (this.duplicates[2] === 2) {
    return 7
  } else if (this.duplicates[2]) {
    return 8
  } else {
    return 9
  }
}

// In order to compare two hands with the same rank we need to order the faces by group of duplicated, ordered themselves by value
// Example : We have the following hand "2S 2H 2D 5H 5D
// The intermediate faces are ['J', 'J', 'M', 'M', 'M']
// The hand value returned is 'MMMJJ'
PokerHand.prototype.getHandValue = function () {
  function byCountFirst(hand) {
    return function (a, b) {
      const countDiff = hand.counts[b] - hand.counts[a];
      if (countDiff) return countDiff;
      return b > a ? -1 : b === a ? 0 : 1;
    };
  }
  return this.faces.sort(byCountFirst(this)).join("")
}

// Here we compare the rank or value to another hand to determine who wins
PokerHand.prototype.compareWith = function (hand) {
  if (this.rank === hand.rank) {
    if (this.value < hand.value) {
      return 1
    } else if (this.value > hand.value) {
      return 2
    } else {
      return 3
    }
  }
  return this.rank < hand.rank ? 1 : 2
}


module.exports = PokerHand
