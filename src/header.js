import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {

    render() {
        return (
            <AppBar
                title="Blackjack basic strategy"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        )
    }
}