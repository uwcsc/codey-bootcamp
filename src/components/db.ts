import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { logger } from '../logger/default';

let db: Database | null = null;

export const openCommandoDB = async (): Promise<Database> =>
  await open({ filename: 'db/commando.db', driver: sqlite3.Database });


/*
  function: addSQLColumnIfNotExists
  parameters:
    * db: the object of SQLite Database
    * tableName: the name of the table where the column needs to be added
    * columnName: the name of the column that needs to be added to the table
    * columnDataType: the SQL data type of the column that needs to be added
  Example:
    addSQLColumnIfNotExists(db, 'user_profile_table', 'profile_emoji', 'VARCHAR(32)')
*/
const addSQLColumnIfNotExists = async (
  db: Database,
  tableName: string,
  columnName: string,
  columnDataType: string,
): Promise<void> => {
  const columns = await db.all(
    `SELECT *
      FROM pragma_table_info('${tableName}')
      WHERE name='${columnName}'
    `,
  );
  if (columns.length == 0) {
    await db.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDataType}`);
  }
};

const initTables = async (db: Database): Promise<void> => {
  //initialize all relevant tables
};

export const openDB = async (): Promise<Database> => {
  if (db == null) {
    db = await open({
      filename: 'db/bot.db',
      driver: sqlite3.Database,
    });
    await initTables(db);
    logger.info({ message: 'Initialized database and tables.', where: 'openDB' });
  }
  return db;
};
