import React, { Component } from 'react';
import PlayingCard from './playingCard.js';
import { Motion, spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';


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
        // return (
        //     <Motion
        //         styles={this.startStyles}>
        //         {cards =>
        //             <div className="CardParentContainer">
        //                 {cards.map((config, i) => {
        //                     console.log(config);
        //                     return (<div key={config.key} className="CardContainer" style={{
        //                                 left: `${config.style.x}px`,
        //                                 top: `${config.style.y}px`,
        //                                 zIndex: 100,
        //                             }}>
        //                             <PlayingCard card={this.props.cards[i]} />
        //                     </div>);
        //                 })}
        //             </div>
        //         }
        //     </Motion>
        // );

        return (
            <Transition
                appear={{
                    translateX: 0
                }}
                enter={{
                    translateX: window.innerWidth / 2 - 300
                }}
                leave={{
                    translateX: window.innerWidth
                }} >
                { this.props.cards.map((card, i) => {
                    console.log(card);
                    return (<div key={card.toString()} style={{left: i*100 + 200}} className="CardContainer">
                                <PlayingCard card={card} />
                            </div>);
                })}
            </Transition>
        );

        // return (
        //     <ul className="Hand">
        //         {this.props.cards.map((card, i) => {
        //             return this.props.hideFirst && i==0 ? this.renderHiddenCard() : this.renderPlayingCard(card);
        //         })}
        //     </ul>
        // );
    }
}