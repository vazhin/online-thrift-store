const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('./db-common-functions');

const saltRounds = 10;

class User {
  get(userId, callback) {
    const db = connectToTheDatabase();

    db.get(`SELECT * FROM users WHERE user_id = ?`, [userId], function (
      err,
      row
    ) {
      if (err) {
        callback(null);
        return;
      }

      const user = {
        id: row.user_id,
        username: row.username,
      };

      callback(user);
    });
  }

  login(credentials, callback) {
    const db = connectToTheDatabase();

    // to create the user table if not exists.
    this.createTable(db);

    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [credentials.email],
      function (err, row) {
        if (err) {
          closeTheDatabaseConnection(db);
          return callback({ err });
        }

        if (!row) {
          closeTheDatabaseConnection(db);
          return callback({ err: 'The email is incorrect.' });
        }

        bcrypt.compare(credentials.password, row.password, (err, doesMatch) => {
          if (err) {
            closeTheDatabaseConnection(db);
            return callback({ err: err.message });
          }
          if (!doesMatch) {
            closeTheDatabaseConnection(db);
            return callback({ err: 'The password is incorrect.' });
          }
          closeTheDatabaseConnection(db);
          return callback({
            user: {
              email: row.email,
              username: row.username,
            },
          });
        });
      }
    );
  }

  signup(credentials, callback) {
    const self = this;

    const db = connectToTheDatabase();
    this.createTable(db);

    bcrypt.hash(credentials.password, saltRounds, (err, hash) => {
      if (err) {
        callback(err.message, false);
        return;
      }

      db.run(
        `INSERT INTO users(
          username,
          email,
          password) VALUES(?, ?, ?)`,
        [credentials.username, credentials.email, hash],
        function (err) {
          if (err) {
            if (err.errno === 19) {
              callback('Username and Email Must be unique.', false);
            } else {
              callback(err, false);
            }
            closeTheDatabaseConnection(db);
            return;
          }

          self.get(this.lastID, (user) => {
            callback(null, user);
            closeTheDatabaseConnection(db);
          });
        }
      );
    });
  }

  createTable(db) {
    let createTableSql = `CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      UNIQUE (username, email)
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
