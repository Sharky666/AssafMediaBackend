import { UserDao } from "@DAOs/userDao";
import { User } from "../../types/user";

export async function isUserExistsByEmail(email: string): Promise<boolean> {
    return UserDao.getInstance().isUserExistsByEmail(email).then(isExists => {
        return isExists;
    });
};

export async function create(user: User): Promise<any> {
    return UserDao.getInstance().create(user).then(userId => {
        return userId
    }).catch(err => {
        console.log(`user service err: ${err}`);
        return err
    })
}