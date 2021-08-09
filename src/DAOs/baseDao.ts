import Knex from "knex";
import { Connection } from "mysql";

export abstract class BaseDao {
    abstract initalize(knex: Knex): void;
}