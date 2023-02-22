import { Card } from "./lib/cards/card";
import { Cards } from "./lib/cards/cards";
import { Deck } from "./lib/cards/deck";
import { Player } from "./lib/player";

class MovingCard {
    currentX: number;
    currentY: number;
    targetX: number;
    targetY: number;
    progress: number;
    card: Card;
    time: number;
    constructor(card: Card, x1: number, y1: number, x2: number, y2: number, time: number) {
        this.currentX = x1;
        this.currentY = y1;
        this.targetX = x2;
        this.targetY = y2;
        this.progress = 0;
        this.card = card;
        this.time = time;
    }
    tick(time: number): boolean {
        this.progress = Math.min(this.progress + time / this.time, 1);
        this.currentX = this.targetX * this.progress + this.currentX * (1 - this.progress);
        this.currentY = this.targetY * this.progress + this.currentY * (1 - this.progress);
        return this.progress == 1;
    }
}

export type Game = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    playerCount: number,
    draw: {
        ui: CanvasRenderingContext2D,
        front: CanvasRenderingContext2D,
        middle: CanvasRenderingContext2D,
        back: CanvasRenderingContext2D,
    },
    layers: {
        ui: HTMLCanvasElement,
        front: HTMLCanvasElement,
        middle: HTMLCanvasElement,
        back: HTMLCanvasElement,
    },
    deck: Deck,
    players: {[player: string]: Player},
    playerList: string[],
    playerTurn: number
}

export type Client = {
    mouse: {
        x: number,
        y: number
    },
    movingCards: MovingCard[]
}

const G: Game = {
    canvas: document.getElementById('main') as HTMLCanvasElement,
    ctx: (document.getElementById('main') as HTMLCanvasElement).getContext('2d'),
    width: window.innerWidth,
    height: window.innerHeight,
    playerCount: 4,
    draw: {
        ui: (document.getElementById('ui') as HTMLCanvasElement).getContext('2d'),
        front: (document.getElementById('front') as HTMLCanvasElement).getContext('2d'),
        middle: (document.getElementById('middle') as HTMLCanvasElement).getContext('2d'),
        back: (document.getElementById('back') as HTMLCanvasElement).getContext('2d'),
    },
    layers: {
        ui: document.getElementById('ui') as HTMLCanvasElement,
        front: document.getElementById('front') as HTMLCanvasElement,
        middle: document.getElementById('middle') as HTMLCanvasElement,
        back: document.getElementById('back') as HTMLCanvasElement,
    },
    deck: new Deck({
        sb: Cards.Speedboat, 
        tp: Cards.Torpedoes,
        st: Cards.SeekingTorpedoes,
        gf: Cards.GoFishing,
        wp: Cards.Whirlpool,
        sm: Cards.Submarine,
        us: Cards.UtilitySubmarine,
        cg: Cards.Cage,
        btw: Cards.Worms,
        btl: Cards.Lures,
        btm: Cards.Minnows,
        bti: Cards.Insects,
        bth: Cards.Leeches,
        btt: Cards.TackleBox,
        df: Cards.DeepFishing,
    }, 4),
    players: {},
    playerList: [],
    playerTurn: 0
}

const C: Client = {
    mouse: {
        x: 0,
        y: 0
    },
    movingCards: []
}

//Card render settings
export const cardWidth = 200;
export const cardHeight = 280;
export const defaultCardOverlap = 50;

export const maxHandWidth = G.width;

G.canvas.width = G.width;
G.canvas.height = G.height;

G.layers.ui.width = G.width;
G.layers.ui.height = G.height;

G.layers.front.width = G.width;
G.layers.front.height = G.height;

G.layers.middle.width = G.width;
G.layers.middle.height = G.height;

G.layers.back.width = G.width;
G.layers.back.height = G.height;

G.deck.shuffle();

function GetCard(id: string): Card | null {
    for (const card of Object.keys(Cards)) {
        if (Cards[card].id == id) return Cards[card];
    }
    return null;
}

const playerNames = ["a", "b", "c", "d"];

for (let i = 0; i < G.playerCount; i++) {
    G.players[playerNames[i]] = (new Player(G.deck, G, 0));
    G.players[playerNames[i]].addCard("fh", G);
}

G.deck.addCards({ ds: Cards.DetonatingShark, fh: Cards.Fish });
G.deck.shuffle();

function Main() {
    Render();
}

function MoveCards() {
    for (let i = 0; i < C.movingCards.length; i++) {
        if (C.movingCards[i].tick(1 / 60)) {
            C.movingCards.splice(i, 1);
            i--;
        }
    }
}

function Render() {
    G.ctx.clearRect(0, 0, G.width, G.height);
    G.draw.ui.clearRect(0, 0, G.width, G.height);
    G.draw.front.clearRect(0, 0, G.width, G.height);
    G.draw.middle.clearRect(0, 0, G.width, G.height);
    G.draw.back.clearRect(0, 0, G.width, G.height);

    //draw black background
    G.ctx.fillStyle = 'black';
    G.ctx.fillRect(0, 0, G.width, G.height);

    try {
    G.ctx.fillStyle = 'white';
    G.ctx.font = '10px monospace';
    G.ctx.textAlign = 'left';
    G.ctx.fillText(G.players[playerNames[0]].hand.toString(), 10, 20);
    G.ctx.fillText(G.deck.cards.length.toString(), 10, 32);
    G.ctx.fillText(JSON.stringify(G.players[playerNames[0]].handPosCurrent), 10, 56);
    G.ctx.fillText([C.mouse.x, C.mouse.y].toString(), 10, 68);
    } catch (e) {alert(e.stack)};

    G.players[playerNames[0]].tickCardMovement(1 / 60);

    GetCardSelected(G.players[playerNames[0]], C.mouse.x, C.mouse.y);
    UpdateOffset(G.players[playerNames[0]]);
    DrawPreviewCard(G.players[playerNames[0]]);
    RenderHand(G.players[playerNames[0]]);
    RenderGame();
}

function RenderHand(player: Player) {
    //Don't render hand if empty
    if (player.hand.length == 0) return;
    for (let i = 0; i < player.hand.length; i++) {
        const card = player.hand[i];
        const x = player.handPosCurrent[i][0];
        const y = player.handPosCurrent[i][1] + player.handOffset[i];
        G.ctx.fillStyle = 'gray';
        G.ctx.strokeStyle = 'white';
        G.ctx.lineWidth = 2;
        if (GetCard(card).image instanceof HTMLImageElement) {
            G.ctx.drawImage(GetCard(card).image, x, y, cardWidth, cardHeight);
        } else {
            G.ctx.beginPath();
            G.ctx.roundRect(x, y, cardWidth, cardHeight, 10);
            G.ctx.fill();
            G.ctx.stroke();
        }
    }
}

function RenderGame() {
    //render deck and cards left
    G.ctx.drawImage(GetCard("card").image, Math.round(G.width / 2 - cardWidth / 2), Math.round(G.height / 2 - cardHeight / 2), cardWidth, cardHeight);
    G.ctx.fillStyle = 'white';
    G.ctx.font = 'bold 24px sans-serif';
    G.ctx.textAlign = 'center';
    G.ctx.fillText(G.deck.cards.length.toString(), Math.round(G.width / 2), Math.round(G.height / 2 + cardHeight / 2) + 32);
}

//Pixels per second
const handAnimationSpeed = 1000;
const maxCardHeight = 60;

function UpdateOffset(player: Player) {
    for (let i = 0; i < player.hand.length; i++) {
        if (player.handSelected == i) {
            //move card up if selected
            player.handOffset[i] = Math.max(player.handOffset[i] - (handAnimationSpeed / 60), -maxCardHeight);
        } else {
            //move card down if not selected
            player.handOffset[i] = Math.min(player.handOffset[i] + (handAnimationSpeed / 60), 0);
        }
    }
}

function DrawPreviewCard(player: Player) {
    //draw selected card in the bottom left corner
    if (player.handSelected < 0) return;
    const card = player.hand[player.handSelected];
    const x = Math.round(G.width - (cardWidth * 1.5));
    const y = Math.round(G.height - (cardHeight * 1.5) - maxCardHeight - (cardHeight / 2));
    if (GetCard(card).image instanceof HTMLImageElement) {
        G.ctx.drawImage(GetCard(card).image, x, y, (cardWidth * 1.5), (cardHeight * 1.5));
    }
}

function GetCardSelected(player: Player, x: number, y: number) {
    const handWidth = Math.min(maxHandWidth, ((cardWidth - defaultCardOverlap) * (player.hand.length - 1) + cardWidth));
    const cardSpacing = (handWidth - cardWidth) / (player.hand.length - 1);
    //If cursor is not over hand, set selected to -2 (instead of -1 for debug) and return
    if (y < G.height - (cardHeight / 2) - maxCardHeight) {
        player.handSelected = -2;
        return;
    }
    let selected = -1;
    for (let i = 0; i < player.hand.length; i++) {
        const cardX = Math.round((G.width / 2) - (handWidth / 2) + (cardSpacing * i));
        if (x > cardX && x < cardX + cardWidth) selected = i;
    }
    player.handSelected = selected;
}

document.addEventListener('mousemove', (e) => {
    C.mouse.x = e.offsetX;
    C.mouse.y = e.offsetY;
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Space' && G.deck.cards.length > 0) {
        G.players[playerNames[0]].drawCard(G.deck, G);
    }
});

setInterval(Main, 1000/60);