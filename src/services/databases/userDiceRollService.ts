import { UserDiceRollDao } from "@DAOs/UserDiceRollDao";
import { DiceRoll } from "../../types/diceRoll";
import { User } from "../../types/user";
import { UserDiceRollResults } from "../../types/userDiceRollResult";

const funnySentences: string[] = [
    "מה קורה נשמע?? אה? נהנה?",
    "איזה מוזיקה טובה, אני מקווה שאתה עדיין מקשיב לה",
    "מה השבלול אמר לחילזון? תגיד מה נשראו בוקרסים?"
];

export function rollDice(user: User): DiceRoll {
    const diceRollResults: DiceRoll = createDiceRollResults();
    const userDiceRollResults: UserDiceRollResults = createUserDiceRollResults(user, diceRollResults);
    UserDiceRollDao.getInstance().create(userDiceRollResults);
    return diceRollResults;
}

export async function getUserLastRoll(userId: number): Promise<any> {
    return UserDiceRollDao.getInstance().getLatestRoll(userId).then(lastRoll => {
        return lastRoll;
    })
}

function createUserDiceRollResults(user: User, diceRoll: DiceRoll): UserDiceRollResults {
    return {
        user,
        diceRoll
    };
}

function createDiceRollResults(): DiceRoll {
    const diceNumber = rollD6();
    return {
        number: diceNumber,
        msg: getMsgFromNumber(diceNumber)
    };
}

function rollD6() {
    return Math.floor((Math.random() * (7 - 1) + 1));
}

function getMsgFromNumber(diceNumber: number): string {
    switch (diceNumber) {
        case 5:
            return funnySentences[Math.floor(Math.random()*funnySentences.length)];
        break;
        default: return null;
    }
}