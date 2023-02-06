import { Card } from "./card";

export class Deck {
    cards: string[];
    types: { [key: string]: Card };
    constructor(deck: string[], types: { [key: string]: Card }) {
        this.cards = deck;
        this.types = types;
    }
}