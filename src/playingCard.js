import React, { Component } from 'react';
import SpadeSVG from './svg/spade.svg';
import JackSVG from './svg/jack.svg';

import { Card } from 'material-ui/Card';
import './playingCard.css';

export default class PlayingCard extends Component {

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
                        <SpadeSVG width="20" height="20" />
                    </div>
                </div>
                <div className="Content">
                    <JackSVG />
                </div>
                <div className="Panel Bottom">
                </div>
            </Card>
        )
    }
}