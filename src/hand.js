import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';


export default class Hand extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="Hand">
                {this.props.cards.map((card, i) => {
                    return (
                        <li key={card.toString()}>
                            <Card>
                                <CardText>
                                    {this.props.hideFirst && i == 0 ? "Hidden" : card.toString()}
                                </CardText>
                            </Card>
                        </li>)
                })}
            </ul>
        )
    }
}