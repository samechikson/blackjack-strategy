import React, { Component } from 'react';

export default class Hand extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.cards && this.props.cards.map((card, i) => {
                    return <li key={card.toString()}>{this.props.hideFirst && i == 0 ? "Hidden" : card.toString()}</li>
                })}
            </ul>
        )
    }
}