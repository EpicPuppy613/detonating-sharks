import { Card } from "./card";

export class Deck {
    cards: string[];
    types: { [key: string]: Card };
    players: number;
    constructor(types: { [key: string]: Card }, playerCount: number) {
        this.cards = [];
        for (const type in types) {
            for (let i = 0; i < Math.round(types[type].count.base + types[type].count.inc * playerCount); i++) {
                this.cards.push(type);
            }
        }
        this.types = types;
        this.players = playerCount;
    }
    addCards(types: { [key: string]: Card}) {
        for (const type in types) {
            for (let i = 0; i < Math.round(types[type].count.base + types[type].count.inc * this.players); i++) {
                this.cards.push(type);
            }
            this.types[type] = types[type];
        }
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    draw(bottom?: boolean) {
        if (bottom) {
            return this.cards.pop();
        }
        return this.cards.shift();
    }
}