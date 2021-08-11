import { User } from "../types/user";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwtPrivateKey } from "@config/jwt";

export function verifyAndParseJWT(req: any, res: Response, next: NextFunction) {
    let user: User;
    try {
        user = parseJWT(req.cookies.id_token);
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401);
        return res.send('huh? where\'s your JWT?');
    }
}

function parseJWT(jwt: string): User {
    const user: User = {
        email: null,
        password: null,
        id: null,
        isAdmin: null
    };
    try {
        const parsedJWT = verify(jwt, jwtPrivateKey) as any;
        user.id = parsedJWT.id;
        user.email = parsedJWT.email;
        user.password = parsedJWT.password;
        user.isAdmin = parsedJWT.isAdmin;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
    console.log(user);
    return user;
}