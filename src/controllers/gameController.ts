import { verifyAndParseJWT } from '@middleware/jwtParserMiddleware';
import { getUserLastRoll, rollDice } from '@services/databases/userDiceRollService';
import express, { Request, Response } from 'express';

const gameRouter = express.Router();

gameRouter.use(verifyAndParseJWT);

gameRouter.post('/roll', (req: any, res: Response) => {
    res.status(201);
    return res.send(rollDice(req.user));
});

gameRouter.get('/lastRoll', (req: any, res: Response) => {
    return getUserLastRoll(req.user.id).then(lastRoll => {
        // TODO: make sure it's actually the last one...
        if (lastRoll) {
            res.status(200);
            return res.send(lastRoll);
        }
        else {
            // TODO: player is yet roll!
            return res.send("No last roll found, Perhaps you need to role first")
        }
    });
});

export {gameRouter};