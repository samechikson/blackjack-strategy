import React, { Component } from 'react';
import SpadeSVG from './svg/spade.svg';
import HeartSVG from './svg/heart.svg';
import ClubsSVG from './svg/club.svg';
import DiamondSVG from './svg/diamond.svg';
import JackSVG from './svg/jack.svg';

import { Card } from 'material-ui/Card';
import './playingCard.css';

export default class PlayingCard extends Component {

    renderSuit(suit) { 
        return suit === 'spades' ? (<SpadeSVG />) : 
            suit === 'hearts' ? (<HeartSVG />) :
            suit === 'clubs' ? (<ClubsSVG />) :
            suit === 'diamonds' ? (<DiamondSVG />) : null;
    }

    render() {
        return (
            <div className="Card">
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
                    <div><JackSVG /></div>
                </div>
                <div className="Panel Bottom">
                </div>
            </div>
        )
    }
}