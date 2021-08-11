import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { gameRouter } from './gameController';
import { userRouter } from './userController';

const indexRouter = express.Router();

// cors and basic parsing middleware
indexRouter.use([
    cors({
        origin: '*',
        credentials: true
    }),
    cookieParser(),
    express.json(),
    express.urlencoded({extended: true})
]);

indexRouter.use('/user', userRouter);
indexRouter.use('/game', gameRouter);

export {indexRouter};