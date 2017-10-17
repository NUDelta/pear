class Deck {
    // List[Card] -> Deck
    constructor(cards) {
        this.endTurnPickupValue = 2;
        this.cards = cards;
    }

    // Draw n cards from the top of the deck. Default to the number of cards
    // drawn at the end of the turn
    // int -> List[Card]
    draw(n = this.endTurnPickupValue) {
        let drawnCards = [];
        for (let i = 0; i < n; i++) {
            if (this.empty) {
                return drawnCards;
            }

            drawnCards.push(this.cards.pop());
        }
        return drawnCards;
    }

    // -> boolean
    get empty() {
        return this.cards.length === 0;
    }
}

export default Deck;
