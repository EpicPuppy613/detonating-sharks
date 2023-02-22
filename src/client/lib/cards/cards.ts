import { Game } from "../../index";
import { Player } from "../player";
import { Card } from "./card";

//image imports
import dsImg from "../../assets/img/ds.png";
import fhImg from "../../assets/img/fh.png";
import sbImg from "../../assets/img/sb.png";
import tpImg from "../../assets/img/tp.png";
import stImg from "../../assets/img/st.png";
import gfImg from "../../assets/img/gf.png";
import wpImg from "../../assets/img/wp.png";
import smImg from "../../assets/img/sm.png";
import usImg from "../../assets/img/us.png";
import cgImg from "../../assets/img/cg.png";
import btwImg from "../../assets/img/btw.png";
import btmImg from "../../assets/img/btm.png";
import btlImg from "../../assets/img/btl.png";
import btiImg from "../../assets/img/bti.png";
import bthImg from "../../assets/img/bth.png";
import bttImg from "../../assets/img/btt.png";
import dfImg from "../../assets/img/df.png";
import cardImg from "../../assets/img/card.png";

const DetonatingShark: Card = {
    id: "ds",
    name: "Detonating Shark",
    desc: "You immediately blow up.",
    immediate: true,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: -1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.explode();
    }
}

DetonatingShark.image.src = dsImg;

const Fish: Card = {
    id: "fh",
    name: "Fish",
    desc: "Prevent a detonating shark from blowing up.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 0,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

Fish.image.src = fhImg;

const Speedboat: Card = {
    id: "sb",
    name: "Speedboat",
    desc: "Skip a turn",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.endTurn(false);
    }
}

Speedboat.image.src = sbImg;

const Torpedoes: Card = {
    id: "tp",
    name: "Torpedoes",
    desc: "Skip your turn and force the next player to take 2 turns.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.endTurn(true);
    }
}

Torpedoes.image.src = tpImg;

const SeekingTorpedoes: Card = {
    id: "st",
    name: "Seeking Torpedoes",
    desc: "Skip your turn and pick a player to take 2 turns.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: true,
    image: new Image(),
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

SeekingTorpedoes.image.src = stImg;

const GoFishing: Card = {
    id: "gf",
    name: "Go Fishing",
    desc: "Pick a player to give you a card of their choice.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: true,
    image: new Image(),
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

GoFishing.image.src = gfImg;

const Whirlpool: Card = {
    id: "wp",
    name: "Whirlpool",
    desc: "Shuffle the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        G.deck.shuffle();
    }
}

Whirlpool.image.src = wpImg;

const Submarine: Card = {
    id: "sm",
    name: "Submarine",
    desc: "Look at the top 3 cards of the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 2
    },
    action: (player: Player, G: Game) => {
    }
}

Submarine.image.src = smImg;

const UtilitySubmarine: Card = {
    id: "us",
    name: "Utility Submarine",
    desc: "Look at the top 3 cards of the deck and put them back in any order.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5
    },
    action: (player: Player, G: Game) => {
    }
}

UtilitySubmarine.image.src = usImg;

const Cage: Card = {
    id: "cg",
    name: "No.",
    desc: "Stop the action of any player, can be played at any time.",
    immediate: false,
    bait: false,
    interrupt: true,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5
    },
    action: (player: Player, G: Game) => {
    }
}

Cage.image.src = cgImg;

//BAIT CARDS
const Worms: Card = {
    id: "btw",
    name: "Worms",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

Worms.image.src = btwImg;

const Minnows: Card = {
    id: "btm",
    name: "Minnows",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

Minnows.image.src = btmImg;

const Lures: Card = {
    id: "btl",
    name: "Lures",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

Lures.image.src = btlImg;

const Insects: Card = {
    id: "bti",
    name: "Insects",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

Insects.image.src = btiImg;

const Leeches: Card = {
    id: "bth",
    name: "Leeches",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

Leeches.image.src = bthImg;

const TackleBox: Card = {
    id: "btt",
    name: "Tackle Box",
    desc: "Bait card: Acts as any type of bait card.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

TackleBox.image.src = bttImg;

const DeepFishing: Card = {
    id: "df",
    name: "Deep Fishing",
    desc: "Draw from the bottom of the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

DeepFishing.image.src = dfImg;

const CardBack: Card = {
    id: "card",
    name: "Card",
    desc: "Card",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    image: new Image(),
    count: {
        base: 0,
        inc: 0,
    },
    action: (player: Player, G: Game) => {
    }
}

CardBack.image.src = cardImg;

export const Cards: {[key: string]: Card} = {
    DetonatingShark,
    Fish,
    Speedboat,
    Torpedoes,
    SeekingTorpedoes,
    GoFishing,
    Whirlpool,
    Submarine,
    UtilitySubmarine,
    Cage,
    Worms,
    Minnows,
    Lures,
    Insects,
    Leeches,
    TackleBox,
    DeepFishing,
    CardBack
};