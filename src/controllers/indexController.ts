import cookieParser from 'cookie-parser';
import express from 'express';
import { userRouter } from './userController';

const indexRouter = express.Router();

// basic parsing middleware
indexRouter.use([
    cookieParser(),
    express.json(),
    express.urlencoded({extended: true})
]);

indexRouter.use('/user', userRouter);

export {indexRouter};