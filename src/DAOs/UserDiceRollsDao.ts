import { BaseDao } from "@DAOs/baseDao";
import Knex from "knex";

export class UserDiceRollsDao implements BaseDao {
    private static instance: UserDiceRollsDao;
    private tableName: string = 'dice_rolls_table';

    private constructor() {}

    public static getInstance(): UserDiceRollsDao {
        if (!UserDiceRollsDao.instance) {
            UserDiceRollsDao.instance = new UserDiceRollsDao();
        }

        return UserDiceRollsDao.instance;
    }

    initalize(knex: Knex): void {
        knex.schema
            .hasTable(this.tableName).then(tableExists => {
                if(!tableExists) {
                    knex.schema.createTable(this.tableName, table => {
                        table.increments('id');
                        table.integer('user_id')
                            .notNullable()
                            .unsigned()
                            .references('users.id');
                        table.integer('dice_result').notNullable();
                        table.timestamp('epoch_time').notNullable();
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }
}