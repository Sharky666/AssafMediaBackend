import { BaseDao } from "@DAOs/baseDao";
import { User } from "../types/user";
import { DatabaseService } from "@services/databaseService";
import Knex from "knex";

export class UserDao implements BaseDao {
    private static instance: UserDao;
    private tableName: string = 'users';

    private constructor() {}

    public static getInstance(): UserDao {
        if (!UserDao.instance) {
            UserDao.instance = new UserDao();
        }

        return UserDao.instance;
    }

    async getUserByEmail(userEmail: string): Promise<any> {
        return DatabaseService.getInstance().knexInstance(this.tableName)
            .where({email: userEmail})
            .then(columns => {
                return columns;
            })
            .catch(err => {console.log(err)});
    }

    // TOOD: make it return a number (TS type)
    async create(user: User): Promise<any> {
        return DatabaseService.getInstance().knexInstance(this.tableName)
            .insert({
                'email': user.email,
                'password': user.password,
                "isAdmin": user.isAdmin
            }).then(value => {
                return value[0];
            }, (err) => {
                console.log(err);
                return err;
            })
    }

    async getUserFromEmailAndPassword(user: User): Promise<User> {
        return DatabaseService.getInstance().knexInstance(this.tableName)
            .where({
                email: user.email,
                password: user.password
            })
            .then(users => {
                if (!users[0]) return null;
                return users[0];
            })
            .catch(err => {
                return err;
            })
    }

    async isUserExistsByEmail(email: string): Promise<boolean> {
        return this.getUserByEmail(email).then(columns => {
            if (!columns[0]) return false;
            return true;
        }).catch(err => {return err});
    }

    initalize(knex: Knex): void {
        knex.schema
            .hasTable(this.tableName)
                .then(tableExists => {
                    if(!tableExists) {
                        knex.schema.createTable(this.tableName, table => {
                            table.increments('id');
                            table.string('email').notNullable();
                            table.string('password').notNullable();
                            table.boolean('isAdmin').notNullable();
                        })
                        .catch(err => console.log(err));
                    }
                })
            .catch(err => console.log(err));
    }
}