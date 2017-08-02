import Deck from 'js-playing-cards/src/Deck';

class GameDeck extends Deck {
  constructor() {
    super();
    console.log("subclass was called");
  }
}

export default {
  Deck: GameDeck
}
