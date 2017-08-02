import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from 'js-playing-cards/src';
import Card from './Card.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck : this.initializeDeck(),
      dealerHand : [],
      playerHand : []
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

    order.forEach((move) => {
      console.log(move);
      let newCard = deck.pop();
      switch (move) {
        case 'player':
          newPlayerHand.push(newCard);
          break;
        case 'dealer':
          newDealerHand.push(newCard);
          break;
        default:
          console.log('nothing dealt');
      }
      console.log(newDealerHand, newPlayerHand);
      this.setState({
        deck: deck,
        dealerHand: newDealerHand,
        playerHand: newPlayerHand
      })

    })
  }

  addCardToPlayer() {
    let deck = this.state.deck.concat([]);
    let newCard = deck.pop();
    let playerHand = this.state.playerHand.concat(newCard);

    this.setState({
      deck : deck,
      playerHand : playerHand
    })
  }

  componentDidMount() {
    this.dealCards();
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
          { this.state.dealerHand.map((card) => {
            return <p key={'dealer' + card.toString()}>{card.toString()}</p>
          })}
        </div>
        <div className="Player">
          <h4>Player</h4>
          <button onClick={() => this.addCardToPlayer()}>
            Hit
          </button>
          { this.state.playerHand.map((card) => {
            return <p key={'player' + card.toString()}>{card.toString()}</p>
          })}
        </div>
      </div>
    );
  }
}

export default App;
