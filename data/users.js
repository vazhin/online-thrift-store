const sqlite = require('sqlite3');

const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('./db-common-functions');

class User {
  login(credentials, callback) {}

  signup(credentials, callback) {
    const db = connectToTheDatabase();

    createTable(db);

    closeTheDatabaseConnection(db);
  }

  get(userId, callback) {}

  createTable(db) {
    let createTableSql = `CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )`;

    db.run(createTableSql, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('table users created.');
    });
  }
}
