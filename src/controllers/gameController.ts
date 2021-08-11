import { verifyAndParseJWT } from '@middleware/jwtParserMiddleware';
import { getUserLastRoll, rollDice } from '@services/databases/userDiceRollService';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

const gameRouter = express.Router();

gameRouter.use(verifyAndParseJWT);

gameRouter.post('/roll', (req: any, res: Response) => {
    res.status(201);
    return res.send(rollDice(req.user));
});

gameRouter.get('/lastRoll', (req: any, res: Response) => {
    return getUserLastRoll(req.user.id).then(lastRoll => {
        res.status(201);
        return res.send(lastRoll);
    });
});

export {gameRouter};