/**
 * js-playing-cards
 *
 * Copyright © 2016 Daryl Lukas. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

"use strict";

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getSuit() {
        return this.suit;
    }

    getRank() {
        return this.rank;
    }

    toString() {
        return `${this.rank.toTitleCase()} of ${this.suit.toTitleCase()}`
    }
}

module.exports = Card;
