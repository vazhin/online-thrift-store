const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('./db-common-functions');

const saltRounds = 10;

class User {
  login(credentials, callback) {}

  get(userId, callback) {}

  signup(credentials, callback) {
    const db = connectToTheDatabase();
    this.createTable(db);

    // TODO: validate credentials.

    let addUserSql = `INSERT INTO users(
      username,
      email,
      password) VALUES(?, ?, ?)`;

    bcrypt.hash(credentials.password, saltRounds, (err, hash) => {
      if (err) {
        callback({ err: err.message });
        return;
      }

      db.run(
        addUserSql,
        [credentials.username, credentials.email, hash],
        function (err) {
          if (err) {
            closeTheDatabaseConnection(db);
            callback({ err: err.message, data: null });
            return;
          }

          callback({ err: null, data: 'User created.' });
          closeTheDatabaseConnection(db);
        }
      );
    });
  }

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

module.exports = new User();
