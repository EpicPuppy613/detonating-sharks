import { Game } from "../index";
import { Deck } from "./cards/deck";

export class Player {
    hand: string[];
    handOffset: number[];
    handSelected: number;
    alive: boolean;
    explode: () => void;
    endTurn: (attack: boolean) => void;
    constructor(deck: Deck, game: Game, cards: number) {
        this.hand = [];
        this.handOffset = new Array(cards).fill(0);
        this.handSelected = -1;
        this.alive = true;
        for (let i = 0; i < cards; i++) {
            this.hand.push(deck.draw());
        }
    }
    addCard(card: string) {
        this.hand.push(card);
        this.handOffset.push(0);
    }
    removeCard(index: number): string {
        this.handOffset.splice(index, 1);
        return this.hand.splice(index, 1)[0];
    }
}