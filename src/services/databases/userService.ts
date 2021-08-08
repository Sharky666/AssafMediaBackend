import { UserDao } from "@DAOs/userDao";
import { User } from "../../types/user";

export async function isUserExistsByEmail(email: string): Promise<boolean> {
    // TODO:
    return UserDao.getInstance().isUserExistsByEmail(email).then(isExists => {
        return isExists;
    });
};

export async function create(user: User): Promise<any> {
    UserDao.getInstance().create(user).then(val => {
        console.log(`user service ${val}`);
        return Promise.resolve(val);
    }).catch(err => {
        return Promise.reject(err);
    })
}