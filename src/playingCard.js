import React, { Component } from 'react';
import SpadeSVG from './svg/spade.svg';
import HeartSVG from './svg/heart.svg';
import ClubsSVG from './svg/club.svg';
import DiamondSVG from './svg/diamond.svg';
import JackBlackSVG from './svg/jackBlack.svg';
import JackRedSVG from './svg/jackRed.svg';
import QueenBlackSVG from './svg/queenBlack.svg';
import QueenRedSVG from './svg/queenRed.svg';
import KingBlackSVG from './svg/kingBlack.svg';
import KingRedSVG from './svg/kingRed.svg';

import './playingCard.css';

export default class PlayingCard extends Component {

    renderSuit(suit) { 
        return suit === 'spades' ? (<SpadeSVG />) : 
            suit === 'hearts' ? (<HeartSVG />) :
            suit === 'clubs' ? (<ClubsSVG />) :
            suit === 'diamonds' ? (<DiamondSVG />) : null;
    }

    renderRank(card) {
        return card.getRank() === 'jack' && ['clubs', 'spades'].includes(card.getSuit()) ? (<JackBlackSVG />) :
            card.getRank() === 'jack' && ['hearts', 'diamonds'].includes(card.getSuit()) ? (<JackRedSVG />) : 
            card.getRank() === 'queen' && ['clubs', 'spades'].includes(card.getSuit()) ? (<QueenBlackSVG />) : 
            card.getRank() === 'queen' && ['hearts', 'diamonds'].includes(card.getSuit()) ? (<QueenRedSVG />): 
            card.getRank() === 'king' && ['clubs', 'spades'].includes(card.getSuit()) ? (<KingBlackSVG />) :
            card.getRank() === 'king' && ['hearts', 'diamonds'].includes(card.getSuit()) ? (<KingRedSVG />) : null;
    }

    faceDownCard() {
        return (
            <div className="Card FaceDown">
                <div className="Panel Top">
                </div>
                <div className="Panel Bottom">
                </div>
            </div>
        )
    }

    faceUpCard() {
        return (
            <div className={"Card " + this.props.card.getSuit()}>
                <div className="Panel Top">
                    <div className="Rank">
                        {this.props.card.getRank()}
                    </div>
                    <div className="Suit">
                        {this.props.card.getSuit()}
                    </div>
                    <div className="Icon">
                        {this.renderSuit(this.props.card.getSuit())}
                    </div>
                </div>
                <div className="Content">
                    {this.renderRank(this.props.card)}
                </div>
                <div className="Panel Bottom">
                </div>
            </div>
        )
    }

    render() {
        return this.props.hide ? this.faceDownCard() : this.faceUpCard();
    }
}