import  * as initializationService  from '@services/initializationService';
import express from 'express';
import { indexRouter } from './controllers/indexController';
const port = 2000;
const app = express();

initializationService.initalizeDatabase();

app.use('/', indexRouter);

app.listen(2000, ()=> {
    console.log(`listening on port: ${port}`);
});