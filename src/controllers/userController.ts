import { isEmailInUse } from '@validators/user';
import { User } from '../types/user';
import { CustomServerResponse } from '../types/serverResponse';
import * as UserService from '@services/databases/userService';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const userRouter = express.Router();

userRouter.post(
    '/', [
    body('password').isLength({min: 6, max: 100}),
    body('isAdmin').isBoolean(),
    body('email').isEmail()],
    // body('email').isEmail().custom(isEmailInUse)],
    (req: Request, res: Response) => {
        const err = validationResult(req);
        if (err.isEmpty()) {
            res.status(201);
            const user: User = {
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: req.body.password
            };
            return UserService.create(user).then(userId => {
                console.log(`userController ${userId}`);
                user.id = userId;
                return res.send({
                    value: user,
                    errors: err.array()
                });
            });
        }
        return res.send({
            value: null,
            errors: err.array()
        });
});

// function getResponseFromPromise(promise: Promise<any>): CustomServerResponse {
//     const result: CustomServerResponse = {};
//     promise.then(val => {
//         result.value = val;
//     }, (err) => {
//         result.error = err;
//     });
//     return result;
// }

export {userRouter};