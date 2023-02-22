import { Game } from "../../index";
import { Player } from "../player";

export type Card = {
    id: string;
    name: string;
    desc: string;
    immediate: boolean;
    interrupt: boolean;
    bait: boolean;
    targeted: boolean;
    image: null | HTMLImageElement;
    count: {
        base: number;
        inc: number;
    }
    action: (player: Player, G: Game) => void;
}