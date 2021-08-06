import { MysqlError } from 'mysql';
import { connectionConfig } from '@config/database';
import mysql from 'mysql';

class DatabaseService {
    private static instance: DatabaseService;
    private _connection = mysql.createConnection(connectionConfig);

    private constructor() {
        this._connection.connect((err: MysqlError)  => {
            if (err) {
            console.error('error connecting: ' + err.stack);
            return;
            }
        });
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }

        return DatabaseService.instance;
    }

    public get connection() {
        return this._connection;
    }
}