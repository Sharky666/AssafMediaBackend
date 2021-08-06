import { BaseDao } from "@DAOs/baseDao";
import { Connection } from "mysql";

export class UserDao implements BaseDao {
    private static instance: UserDao;
    private static tableName: string = 'user_table';

    private static initializationQuery = `
    CREATE TABLE [IF NOT EXISTS] ${UserDao.tableName}
        id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(254) NOT NULL,
        password varchar(100) NOT NULL,
        epoch_time INT(11) NOT NULL,
        PRIMARY KEY (id)
    `;

    private constructor() {}

    public static getInstance(): UserDao {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }

        return UserDao.instance;
    }

    async initalize(sqlConnection: Connection): Promise<void> {
        throw new Error("Method not implemented.");
    }
}