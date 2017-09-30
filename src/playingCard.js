import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import Spade from 'svg-react-loader?name=spade!./spade.svg';

import { Card, CardText } from 'material-ui/Card';
import './playingCard.css';

export default class PlayingCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="Card">
                <div className="Panel Top">
                    <div className="Rank">
                        {this.props.card.getRank()}
                    </div>
                    <div className="Suit">
                        {this.props.card.getSuit()}
                    </div>
                    <div className="Icon">
                        <ReactSVG path="spade.svg"
                            callback={svg => console.log(svg)} />
                        <Spade />
                    </div>
                </div>
                <div className="Content">
                </div>
                <div className="Panel Bottom">
                </div>
            </Card>
        )
    }
}