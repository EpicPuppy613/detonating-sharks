import { Player } from "../player";
import { Card } from "./card";

class DetonatingShark extends Card {
    id = "ds";
    name = "Detonating Shark";
    desc = "You immediately blow up.";
    immediate = true;
    action = (player: Player) => {
        player.explode();
    }
}

export const Cards = { DetonatingShark };