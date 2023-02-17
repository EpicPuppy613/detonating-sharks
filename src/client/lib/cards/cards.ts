import { Game } from "../../index";
import { Player } from "../player";
import { Card } from "./card";

const DetonatingShark: Card = {
    id: "ds",
    name: "Detonating Shark",
    desc: "You immediately blow up.",
    immediate: true,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: -1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.explode();
    }
}

const Fish: Card = {
    id: "fh",
    name: "Fish",
    desc: "Prevent a detonating shark from blowing up.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 0,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

const Speedboat: Card = {
    id: "sb",
    name: "Speedboat",
    desc: "Skip a turn",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.endTurn(false);
    }
}

const Torpedoes: Card = {
    id: "tp",
    name: "Torpedoes",
    desc: "Skip your turn and force the next player to take 2 turns.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        player.endTurn(true);
    }
}

const SeekingTorpedoes: Card = {
    id: "st",
    name: "Seeking Torpedoes",
    desc: "Skip your turn and pick a player to take 2 turns.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: true,
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

const GoFishing: Card = {
    id: "gf",
    name: "Go Fishing",
    desc: "Pick a player to give you a card of their choice.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: true,
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
    }
}

const Whirlpool: Card = {
    id: "wp",
    name: "Whirlpool",
    desc: "Shuffle the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 1,
        inc: 1
    },
    action: (player: Player, G: Game) => {
        G.deck.shuffle();
    }
}

const Submarine: Card = {
    id: "sm",
    name: "Submarine",
    desc: "Look at the top 3 cards of the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 2
    },
    action: (player: Player, G: Game) => {
    }
}

const UtilitySubmarine: Card = {
    id: "us",
    name: "Utility Submarine",
    desc: "Look at the top 3 cards of the deck and put them back in any order.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5
    },
    action: (player: Player, G: Game) => {
    }
}

const Cage: Card = {
    id: "cg",
    name: "No.",
    desc: "Stop the action of any player, can be played at any time.",
    immediate: false,
    bait: false,
    interrupt: true,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5
    },
    action: (player: Player, G: Game) => {
    }
}

//BAIT CARDS
const Worms: Card = {
    id: "btw",
    name: "Worms",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

const Minnows: Card = {
    id: "btm",
    name: "Minnows",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

const Lure: Card = {
    id: "btl",
    name: "Lure",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

const Insects: Card = {
    id: "bti",
    name: "Insects",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

const Leeches: Card = {
    id: "bth",
    name: "Leeches",
    desc: "Bait card: Play in pairs, triplets, quintuplets, or a set.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

const TackleBox: Card = {
    id: "btt",
    name: "Tackle Box",
    desc: "Bait card: Acts as any type of bait card.",
    immediate: false,
    bait: true,
    interrupt: false,
    targeted: false,
    count: {
        base: 1,
        inc: 1,
    },
    action: (player: Player, G: Game) => {
    }
}

const DeepWaterFishing: Card = {
    id: "df",
    name: "Deep Water Fishing",
    desc: "Draw from the bottom of the deck.",
    immediate: false,
    bait: false,
    interrupt: false,
    targeted: false,
    count: {
        base: 2,
        inc: 1.5,
    },
    action: (player: Player, G: Game) => {
    }
}

export const Cards = {
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
    Lure,
    Insects,
    Leeches,
    TackleBox,
    DeepWaterFishing
};