import { Connection } from "mysql";

export abstract class BaseDao {
    abstract initalize(sqlConnection: Connection): Promise<void>;
}