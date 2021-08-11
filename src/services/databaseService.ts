import { connectionConfig } from '@config/database';
import Knex from 'knex';

export class DatabaseService {
    private static instance: DatabaseService;
    private knex = Knex({
        client: 'mysql',
        version: '8',
        connection: connectionConfig
    });

    private constructor() {}

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }

        return DatabaseService.instance;
    }

    public get knexInstance(): Knex {
        return this.knex;
    }
}