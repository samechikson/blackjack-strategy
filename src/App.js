import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from 'js-playing-cards/src';
import Card from './Card.js';
import Strategy from './basicStrategyMatrix.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck : this.shuffle(this.initializeDeck()),
      dealerHand : [],
      playerHand : [],
      dealerCount : 0,
      playerCount : 0
    }
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
  }

  componentDidMount() {
    this.dealCards();
  }

  checkStrategy(strategy) {
    let isCorrect = strategy.indexOf(Strategy.hard17[this.state.playerCount][this.state.dealerHand[1].getCount()]) >= 0;
    console.log(isCorrect, this.state.playerCount, this.state.dealerHand[1].getCount(), Strategy.hard17[this.state.playerCount][this.state.dealerHand[1].getCount()]);
    this.setState({
      isCorrectStrategy: isCorrect
    })
    return isCorrect;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="Dealer">
          <h4>Dealer</h4>
          <h5>Count: {this.state.dealerCount}</h5>
          { this.state.dealerHand.map((card) => {
            return <p key={'dealer' + card.toString()}>{card.toString()}</p>
          })}
        </div>
        <div className="Player">
          <h4>Player</h4>
          <button onClick={() => {
            this.checkStrategy('H');
            // this.addCardToPlayer();
          }}>Hit</button>
          <button onClick={() => this.checkStrategy('S')}>Stand</button>
          <button onClick={() => this.checkStrategy('D')}>Double</button>
          <button onClick={() => this.checkStrategy('P')}>Split</button>
          <h5>Count: {this.state.playerCount}</h5>
          <p>Correct Move: {this.state.isCorrectStrategy ? "yes": "no"}</p>
          { this.state.playerHand.map((card) => {
            return <p key={'player' + card.toString()}>{card.toString()}</p>
          })}
        </div>
      </div>
    );
  }
}

export default App;
