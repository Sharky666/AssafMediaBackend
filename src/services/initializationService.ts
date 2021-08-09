import { BaseDao } from '@DAOs/baseDao';
import { UserDao } from '@DAOs/userDao';
import { UserDiceRollsDao } from '@DAOs/UserDiceRollsDao';
import { DatabaseService } from './databaseService';

export function initalizeDatabase() {
    const daos: BaseDao[] = [UserDao.getInstance(), UserDiceRollsDao.getInstance()];
    initializeTables(daos);
}

function initializeTables(daos: BaseDao[]) {
    daos.forEach(dao => {
        dao.initalize(DatabaseService.getInstance().knexInstance);
    });
}