import { DiceRoll } from "./diceRoll";
import { User } from "./user";

export type UserDiceRollResults = {
    user: User,
    diceRoll: DiceRoll
};