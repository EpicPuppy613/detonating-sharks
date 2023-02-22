import { Game, maxHandWidth, cardWidth, defaultCardOverlap, cardHeight } from "../index";
import { Deck } from "./cards/deck";

export class Player {
    hand: string[];
    handOffset: number[];
    handPosTarget: number[][];
    handPosCurrent: number[][];
    handPosProgress: number[];
    handPosTime: number[];
    handSelected: number;
    alive: boolean;
    explode: () => void;
    endTurn: (attack: boolean) => void;
    constructor(deck: Deck, game: Game, cards: number) {
        this.hand = [];
        this.handOffset = new Array(cards).fill(0);
        this.handPosTarget = new Array(cards);
        this.handPosCurrent = new Array(cards);
        this.handPosProgress = new Array(cards).fill(0);
        this.handPosTime = new Array(cards).fill(0);
        this.handSelected = -1;
        this.alive = true;
        const handWidth = Math.min(maxHandWidth, ((cardWidth - defaultCardOverlap) * (cards - 1) + cardWidth));
        const cardSpacing = (handWidth - cardWidth) / (cards - 1);
        for (let i = 0; i < cards; i++) {
            this.handPosCurrent[i] = [Math.round((game.width / 2) - (handWidth / 2) + (cardSpacing * i)), Math.round(game.height - cardHeight / 2)];
            this.handPosTarget[i] = [Math.round((game.width / 2) - (handWidth / 2) + (cardSpacing * i)), Math.round(game.height - cardHeight / 2)];
            console.log(`${this.handPosCurrent[i][0]}, ${this.handPosCurrent[i][1]}}`);
            this.hand.push(deck.draw());
        }
    }
    addCard(card: string, game: Game) {
        this.hand.push(card);
        this.handOffset.push(0);
        this.handPosCurrent.push([Math.round(game.width / 2), game.height + cardHeight]);
        this.handPosTarget.push([0, 0]);
        this.handPosProgress.push(0);
        this.handPosTime.push(0);
        if (this.hand.length <= 0) return;
        if (this.hand.length == 1) {
            this.handPosTarget[0] = [Math.round(game.width / 2 - cardWidth / 2), Math.round(game.height - cardHeight / 2)];
            this.handPosProgress[0] = 0;
            this.handPosTime[0] = 0.3;
            return;
        }
        //recalculate card positions and prepare smooth transition
        const handWidth = Math.min(maxHandWidth, ((cardWidth - defaultCardOverlap) * (this.hand.length - 1) + cardWidth));
        const cardSpacing = (handWidth - cardWidth) / (this.hand.length - 1);
        for (let i = 0; i < this.hand.length; i++) {
            this.handPosTarget[i][0] = Math.round((game.width / 2) - (handWidth / 2) + (cardSpacing * i));
            this.handPosTarget[i][1] = Math.round(game.height - cardHeight / 2);
            this.handPosTime[i] = 0.3;
            this.handPosProgress[i] = 0;
        }
    }
    removeCard(index: number, game: Game): string {
        this.handOffset.splice(index, 1);
        this.handPosCurrent.splice(index, 1);
        this.handPosTarget.splice(index, 1);
        this.handPosProgress.splice(index, 1);
        this.handPosTime.splice(index, 1);
        if (this.hand.length <= 0) return;
        if (this.hand.length == 1) {
            this.handPosTarget[0] = [Math.round(game.width / 2 - cardWidth / 2), Math.round(game.height - cardHeight / 2)];
            this.handPosProgress[0] = 0;
            this.handPosTime[0] = 0.3;
            return;
        }
        //recalculate card positions and prepare smooth transition
        const handWidth = Math.min(maxHandWidth, ((cardWidth - defaultCardOverlap) * (this.hand.length - 1) + cardWidth));
        const cardSpacing = (handWidth - cardWidth) / (this.hand.length - 1);
        for (let i = 0; i < this.hand.length; i++) {
            this.handPosTarget[i][0] = Math.round((game.width / 2) - (handWidth / 2) + (cardSpacing * i));
            this.handPosTarget[i][1] = Math.round(game.height - cardHeight / 2);
            this.handPosTime[i] = 0.3;
            this.handPosProgress[i] = 0;
        }
        return this.hand.splice(index, 1)[0];
    }
    tickCardMovement(time: number) {
        for (let i = 0; i < this.handPosProgress.length; i++) {
            if (this.handPosTime[i] == 0) continue;
            this.handPosProgress[i] = Math.min(this.handPosProgress[i] + time / this.handPosTime[i], 1);
            this.handPosCurrent[i][0] = (this.handPosTarget[i][0] - this.handPosCurrent[i][0]) * this.handPosProgress[i] + this.handPosCurrent[i][0];
            this.handPosCurrent[i][1] = (this.handPosTarget[i][1] - this.handPosCurrent[i][1]) * this.handPosProgress[i] + this.handPosCurrent[i][1];
            if (this.handPosProgress[i] >= 1) {
                this.handPosProgress[i] = 0;
                this.handPosTime[i] = 0;
                this.handPosCurrent[i][0] = this.handPosTarget[i][0];
                this.handPosCurrent[i][1] = this.handPosTarget[i][1];
            }
        }
    }
    drawCard(deck: Deck, game: Game) {
        this.addCard(deck.draw(), game);
    }
}