import { Deck } from "./lib/cards/deck";
import { Cards } from "./lib/cards/cards";

const G = {
    canvas: document.getElementById('main') as HTMLCanvasElement,
    ctx: (document.getElementById('main') as HTMLCanvasElement).getContext('2d'),
    width: window.innerWidth,
    height: window.innerHeight,
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
    deck: new Deck([], {ds: new Cards.DetonatingShark})
}

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

function Main() {
    G.ctx.clearRect(0, 0, G.width, G.height);
    G.draw.ui.clearRect(0, 0, G.width, G.height);
    G.draw.front.clearRect(0, 0, G.width, G.height);
    G.draw.middle.clearRect(0, 0, G.width, G.height);
    G.draw.back.clearRect(0, 0, G.width, G.height);

    //draw black background
    G.ctx.fillStyle = 'black';
    G.ctx.fillRect(0, 0, G.width, G.height);
}

setInterval(Main, 1000 / 60);