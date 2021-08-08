import { BaseDao } from "@DAOs/baseDao";
import { Connection } from "mysql";

export class UserDiceRollsDao implements BaseDao {
    private static instance: UserDiceRollsDao;
    private tableName: string = 'dice_rolls_table';

    private initializationQuery = `
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        dice_result INT(1) NOT NULL,
        epoch_time INT(11) NOT NULL)`;

    private constructor() {}

    public static getInstance(): UserDiceRollsDao {
        if (!UserDiceRollsDao.instance) {
            UserDiceRollsDao.instance = new UserDiceRollsDao();
        }

        return UserDiceRollsDao.instance;
    }

    async initalize(sqlConnection: Connection): Promise<void> {
        sqlConnection.query(this.initializationQuery);
        return;
    }
}