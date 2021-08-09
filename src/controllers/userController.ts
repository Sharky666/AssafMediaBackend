// import { isEmailInUse } from '@validators/user';
import { User } from '../types/user';
import { CustomServerResponse } from '../types/serverResponse';
import * as UserService from '@services/databases/userService';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { jwtPrivateKey } from '@config/jwt';
import { isEmailInUse } from '@validators/userValidators';

const userRouter = express.Router();

userRouter.post(
    '/', [
    body('password').isLength({min: 6, max: 100}).bail(),
    body('isAdmin').isNumeric().isBoolean().bail(),
    body('email').isEmail().bail()
    .custom(isEmailInUse)],
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
                user.id = userId;
                return res.send({
                    value: sign(user, jwtPrivateKey),
                    errors: err.array()
                });
            });
        }
        return res.send({
            value: null,
            errors: err.array()
        });

});

export {userRouter};