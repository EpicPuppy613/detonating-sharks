import { Player } from "../player";

export abstract class Card {
    id: string;
    name: string;
    desc: string;
    immediate: boolean;
    action: (player: Player) => void;
}