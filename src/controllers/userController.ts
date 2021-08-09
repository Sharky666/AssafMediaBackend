import { User } from '../types/user';
import * as UserService from '@services/databases/userService';
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { jwtPrivateKey } from '@config/jwt';
import { loginUserPropertiesValidator, userRegistryValidator } from '@validators/userValidators';

const userRouter = express.Router();

// register
userRouter.post(
    '/', userRegistryValidator, (req: Request, res: Response) => {
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
        res.status(401);
        return res.send({
            value: null,
            errors: err.array()
        });

});

// get JWT token from user properties
userRouter.get(
    '/', loginUserPropertiesValidator, (req: Request, res: Response) => {
        const err = validationResult(req);
        if (err.isEmpty()) {
            const user: User = {
                email: req.body.email,
                password: req.body.password
            };
            return UserService.getUserFromEmailAndPassword(user).then(userProperties => {
                if (userProperties) {
                    res.status(200);
                    user.id = userProperties.id;
                    user.isAdmin = userProperties.isAdmin;
                    console.log(user);
                    return res.send({
                        value: sign(user, jwtPrivateKey),
                        errors: null
                    });
                }
                res.status(401);
                res.send({
                    vlaue: null,
                    errors: 'User does not exist'
                });
            })

        }
        res.status(401);
        return res.send({
            value: null,
            errors: err.array()
        });
    }
)

export {userRouter};