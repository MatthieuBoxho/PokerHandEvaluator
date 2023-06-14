const PokerHand = require("./PokerHand");

const hand = new PokerHand("2D 2H 3C 4S 5S");

const highCard = new PokerHand("AS 3D KS 8D QH");
const onePair = new PokerHand("AS AD KH 8D QS");
const twoPairs = new PokerHand("AS AD KH KD QS");
const threeOfAKind = new PokerHand("AS AD AH 8D QS");
const straight = new PokerHand("AS KS QH JD TS");
const lowStraight = new PokerHand("AS 2S 3H 4D 5S");
const flush = new PokerHand("AS 3S KS 8S QS");
const fullHouse = new PokerHand("AS AD AH QD QS");
const fourOfAKind = new PokerHand("AS AD AC AH QS");
const straightFlush = new PokerHand("AS TS QS KS JS");

test("The suits are correctly extracted and ordered", () => {
    expect(hand.suits).toMatchObject(["C", "D", "H", "S", "S"]);
});

test("The faces are correctly extracted and ordered", () => {
  expect(hand.faces).toMatchObject(["M", "M", "J", "K", "L"]);
});

test("isStraight is correctly set", () => {
  expect(hand.isStraight).toBeFalsy();
  expect(straight.isStraight).toBeTruthy();
  expect(lowStraight.isStraight).toBeTruthy();
  expect(straightFlush.isStraight).toBeTruthy();
})

test("isFlush is correctly set", () => {
  expect(hand.isFlush).toBeFalsy();
  expect(flush.isFlush).toBeTruthy();
  expect(straightFlush.isFlush).toBeTruthy();
});

test("Rank is set correctly", () => {
  expect(highCard.rank).toBe(9);
  expect(onePair.rank).toBe(8);
  expect(twoPairs.rank).toBe(7);
  expect(threeOfAKind.rank).toBe(6);
  expect(straight.rank).toBe(5);
  expect(lowStraight.rank).toBe(5);
  expect(flush.rank).toBe(4);
  expect(fullHouse.rank).toBe(3);
  expect(fourOfAKind.rank).toBe(2);
  expect(straightFlush.rank).toBe(1);
})

test("compareWith returns the result correctly", () => {
    expect(onePair.compareWith(highCard)).toBe(1);
    expect(lowStraight.compareWith(onePair)).toBe(1);
    expect(lowStraight.compareWith(straight)).toBe(2);
    expect(fullHouse.compareWith(fourOfAKind)).toBe(2);

    const sameValueTwoPairs = new PokerHand("AH AC KC KH QD");
    expect(twoPairs.compareWith(sameValueTwoPairs)).toBe(3);

    const betterFullHouse = new PokerHand("AS AD AH KD KS");
    expect(fullHouse.compareWith(betterFullHouse)).toBe(2);
});