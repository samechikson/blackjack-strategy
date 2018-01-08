import React, { Component } from 'react';
import PlayingCard from './playingCard.js';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';


export default class Hand extends Component {
    cardSpacing = window.innerWidth / 10;

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

    startStyles = (prevStyles) => {
        return this.props.cards.map((card_, i) => {
            return {
                key: "card" + this.props.type + i,
                style: {
                    x: window.innerWidth/4,
                    y: 200
                }
            }
        })
    }

    cardWillEnter(style, i) {
        return {
            key: style.key,
            style: {
                x: spring(0),
                y: spring(0)
            } 
        };
    }

    render() {
        return (
            <Transition
                appear={{
                    translateX: 0
                }}
                enter={{
                    translateX: window.innerWidth / 2 - this.cardSpacing
                }}
                leave={{
                    translateX: window.innerWidth
                }} >
                { this.props.cards.map((card, i) => {
                    return (<div key={card.toString()} style={{left: i*100}} className="CardContainer">
                        <PlayingCard card={card} hide={this.props.hideFirst && i === 0} />
                            </div>);
                })}
            </Transition>
        );
    }
}