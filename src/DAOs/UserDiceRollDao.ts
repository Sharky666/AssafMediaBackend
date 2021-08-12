import { BaseDao } from "@DAOs/baseDao";
import { UserDiceRollResults } from "../types/userDiceRollResult";
import Knex from "knex";
import { DatabaseService } from "@services/databaseService";

export class UserDiceRollDao implements BaseDao {
    private static instance: UserDiceRollDao;
    private tableName: string = 'dice_rolls_table';

    private constructor() {}

    public static getInstance(): UserDiceRollDao {
        if (!UserDiceRollDao.instance) {
            UserDiceRollDao.instance = new UserDiceRollDao();
        }

        return UserDiceRollDao.instance;
    }

    async create(userDiceRollResults: UserDiceRollResults): Promise<number> {
        return DatabaseService.getInstance().knexInstance(this.tableName)
            .insert({
                'user_id': userDiceRollResults.user.id,
                'dice_result': userDiceRollResults.diceRoll.number,
                'epoch_time': Date.now()
            })
            .then(value => {
                return value[0];
            }).catch(err => {
                console.log(err);
                return err;
            });
    }

    async getLatestRoll(userId: number): Promise<UserDiceRollResults> {
        return DatabaseService.getInstance().knexInstance(this.tableName)
            .where({
                user_id: userId
            })
            .orderBy('epoch_time', 'desc')
            .then(orderedUserRolls => {
                console.log(orderedUserRolls);
                return orderedUserRolls[0];
            });
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
                        table.bigInteger('epoch_time').notNullable();
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }
}