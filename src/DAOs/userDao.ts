import { BaseDao } from "@DAOs/baseDao";
import { User } from "../types/user";
import { Connection, Query } from "mysql";
import { DatabaseService } from "@services/databaseService";

export class UserDao implements BaseDao {
    private static instance: UserDao;
    private tableName: string = 'users';

    private initializationQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(100) NOT NULL,
        epoch_time VARCHAR(255) NOT NULL);`;

    private constructor() {}

    public static getInstance(): UserDao {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }

        return UserDao.instance;
    }

    // TODO: should return a User
    async getUserByEmail(email: string): Promise<any> {
        DatabaseService.getInstance().connection.query(
            `SELECT * FROM ${this.tableName} WHERE email = '${email}';`,
             ((err, results, fields) => {
                 if (err) {
                     return Promise.reject(err);
                 }
                return Promise.resolve(results);
        }));
    }

    async create(user: User): Promise<any> {
        DatabaseService.getInstance().connection.query(
            `INSERT INTO ${this.tableName} (email, password, epoch_time)
            VALUES
            ('${user.email}', '${user.password}', '${Date.now()}');`,
                (err, results) => {
                    if(err) {
                        throw err;
                    }
                    console.log(`userDAO ${results.insertId}`);
                return results.insertId;
            });
    }

    async isUserExistsByEmail(email: string): Promise<boolean> {
        return this.getUserByEmail(email).then(user => {
            if (user) {
                return true;
            }
            return false;
        }).catch(err => {return err});
    }

    async initalize(sqlConnection: Connection): Promise<void> {
        sqlConnection.query(this.initializationQuery);
        return;
    }
}