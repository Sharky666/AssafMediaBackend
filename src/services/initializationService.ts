import { BaseDao } from '@DAOs/baseDao';
import { UserDao } from '@DAOs/userDao';
import { UserDiceRollDao } from '@DAOs/UserDiceRollDao';
import { DatabaseService } from './databaseService';

export function initalizeDatabase() {
    const daos: BaseDao[] = [UserDao.getInstance(), UserDiceRollDao.getInstance()];
    initializeTables(daos);
}

function initializeTables(daos: BaseDao[]) {
    daos.forEach(dao => {
        dao.initalize(DatabaseService.getInstance().knexInstance);
    });
}