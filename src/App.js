import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cards from 'js-playing-cards/src';
import Card from './Card.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck : [new Card('clubs', '2'), new Card('clubs', 'ace')],
      hand : []
    }
  }

  addCard() {
    let deck = this.state.deck.concat([]);
    let newCard = deck.pop();
    let hand = this.state.hand.concat(newCard);

    this.setState({
      deck : deck,
      hand : hand
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="Player">
          <button onClick={() => this.addCard()}>
            Add to Hand
          </button>
          { this.state.hand.map((card) => {
            return <p>{card.toString()}</p>
          })}
        </div>
      </div>
    );
  }
}

export default App;
