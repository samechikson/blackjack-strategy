import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import Strategy from './basicStrategyMatrix.js';
import Hand from './hand.js';
import Header from './header.js';

import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck : this.shuffle(this.initializeDeck()),
      dealerHand : [],
      playerHand : [],
      dealerCount : 0,
      playerCount : 0,
      showDealerHand: false,
      gameStatus: 'In Progress'
    }
    this.startState = this.state;
  }

  initializeDeck() {
    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let ranks = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    return suits.map((suit) => {
      return ranks.map((rank) => {
        return new Card(suit, rank);
      })
    }).reduce((a, b) => {
      return a.concat(b);
    })
  }

  dealCards() {
    let order = ['player', 'dealer', 'player', 'dealer'];
    let deck = this.state.deck.concat([]);
    let newPlayerHand = this.state.playerHand.concat([]);
    let newDealerHand = this.state.dealerHand.concat([]);
    let playerCount = this.state.playerCount;
    let dealerCount = this.state.dealerCount;

    order.forEach((move) => {
      let newCard = deck.pop();
      switch (move) {
        case 'player':
          newPlayerHand.push(newCard);
          playerCount += newCard.getCount();
          break;
        case 'dealer':
          newDealerHand.push(newCard);
          dealerCount += newCard.getCount();
          break;
        default:
          console.log('nothing dealt');
      }
      this.setState({
        deck: deck,
        dealerHand: newDealerHand,
        playerHand: newPlayerHand,
        playerCount: playerCount,
        dealerCount: dealerCount
      })
    })
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  addCardToPlayer() {
    let deck = this.state.deck.concat([]);
    let newCard = deck.pop();
    let playerHand = this.state.playerHand.concat(newCard);

    this.setState({
      deck : deck,
      playerHand : playerHand,
      playerCount : this.state.playerCount + newCard.getCount()
    })

    if (this.state.playerCount + newCard.getCount() > 21) {
      this.setState({gameStatus: 'Player bust'});

      // Restart the game after a second.
      window.setTimeout(() => {
        this.restart.apply(this);
      }, 1000);
    }
  }

  componentDidMount() {
    this.dealCards();
  }

  checkStrategy(strategy) {
    let isCorrect;
    let playerCount = this.state.playerCount;
    let dealerShowingCount = this.state.dealerHand[1].getCount();

    // Check for splitting possibility.
    if (this.state.playerCount < 22 && this.state.playerCount % 2 == 0 && Strategy.splits[playerCount][dealerShowingCount] != '0') {
      isCorrect = strategy.indexOf(Strategy.splits[playerCount][dealerShowingCount]) >= 0;
    }
    else {
      isCorrect = strategy.indexOf(Strategy.hard17[playerCount][dealerShowingCount]) >= 0;
    }
    console.log(isCorrect, this.state.playerCount, this.state.dealerHand[1].getCount(), Strategy.hard17[this.state.playerCount][this.state.dealerHand[1].getCount()]);
    this.setState({
      isCorrectStrategy: isCorrect
    })
    return isCorrect;
  }

  finishHand() {
    // Player has finished turn; dealer's turn
    let deck = this.state.deck.concat([]);
    let dealerHand = this.state.dealerHand.concat([]);
    let dealerCount = this.state.dealerCount;
    while(dealerCount <= 17) {
      let newCard = deck.pop();
      dealerHand.push(newCard);
      dealerCount += newCard.getCount();
    }

    this.setState({
      deck: deck,
      dealerHand: dealerHand,
      dealerCount: dealerCount,
      showDealerHand: true,
      gameStatus: dealerCount === this.state.playerCount ? 'Push' : 
                    dealerCount < this.state.playerCount || dealerCount > 21 ? 'Player Wins' : 'Dealer Wins'
    })



    // Restart the game after a second.
    // window.setTimeout(() => {
    //   this.restart.apply(this);
    // }, 1000);
  }

  restart() {
    this.setState({
      dealerHand : [],
      playerHand : [],
      dealerCount : 0,
      playerCount : 0,
      showDealerHand: false,
      gameStatus: 'In Progress'
    },
    this.dealCards);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="Dealer">
          <h4>Dealer</h4>
          <Hand cards={this.state.dealerHand} hideFirst={!this.state.showDealerHand} type="Dealer" />
        </div>
        <h4 style={{textAlign: 'center'}}>Player</h4>
        <div className="Player">
          <div className="ActionButtons">
            <RaisedButton className="ActionButton" label="Hit" primary={true} onClick={() => {
              this.checkStrategy('H');
              this.addCardToPlayer();
            }}/>
            <RaisedButton className="ActionButton" label="Stand" onClick={() => {
              this.checkStrategy('S');
              this.finishHand();
              // this.restart();
            }}/>
            <RaisedButton className="ActionButton" label="Split" secondary={true} onClick={() => this.checkStrategy('P')} />
            <RaisedButton className="ActionButton" label="Double" secondary={true} onClick={() => this.checkStrategy('D')} />
              &nbsp;
            <RaisedButton className="ActionButton" label="Restart" primary={true} onClick={() => this.restart()} />
            <h5>{this.state.gameStatus}</h5>
          </div>
          <Hand cards={this.state.playerHand} hideFirst={false} type="Player" />
        </div>
      </div>
    );
  }
}

export default App;
