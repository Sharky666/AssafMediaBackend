import express, { Request, Response } from 'express';
const port = 2000;

const app = express();

app.get('/', (req: Request, res: Response): void => {
    res.status(200);
    res.send('hi');
});

app.listen(2000, ()=> {
console.log(`listening on port: ${port}`);
});