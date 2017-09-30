import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import PlayingCard from './playingCard.js';


export default class Hand extends Component {
    constructor(props) {
        super(props);
    }

    renderPlayingCard(card) {
        return (
            <li key={card.toString()}>
                <PlayingCard card={card} />
            </li>);
    }

    renderHiddenCard() {
        return (
            <li key="hiddingCard">
                Hidden
            </li>
        )
    }

    render() {
        return (
            <ul className="Hand">
                {this.props.cards.map((card, i) => {
                    return this.props.hideFirst && i==0 ? this.renderHiddenCard() : this.renderPlayingCard(card);
                })}
            </ul>
        )
    }
}