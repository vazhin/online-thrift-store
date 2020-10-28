const bcrypt = require('bcrypt');

const Database = require('./Database');

const saltRounds = 10;

class User {
  get(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.open();

      db.get(`SELECT * FROM users WHERE user_id = ?`, [userId], function (
        err,
        row
      ) {
        if (err) {
          reject(err.message);
        }

        if (!row) {
          reject(`Couldn't find user with id of ${userId}`);
        }

        const user = {
          id: row.user_id,
          username: row.username,
          email: row.email,
          hash: row.password,
        };

        resolve(user);
      });
    });
  }

  signup(credentials) {
    return new Promise((resolve, reject) => {
      const self = this;

      const db = Database.open();
      this.createTable(db);

      bcrypt.hash(credentials.password, saltRounds, (err, hash) => {
        if (err) {
          Database.close(db);
          reject(err.message);
        }

        db.run(
          `INSERT INTO users(
            username,
            email,
            password) VALUES(?, ?, ?)`,
          [credentials.username, credentials.email, hash],
          async function (err) {
            if (err) {
              Database.close(db);
              if (err.errno === 19) {
                return reject('Username and Email Must be unique.'); // TODO: find a better way to handle db constraints.
              } else {
                return reject(err.message);
              }
            }

            try {
              const user = await self.get(this.lastID);
              resolve(user);
            } catch (err) {
              reject(err);
            }
          }
        );
      });
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

    db.run(createTableSql, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('table users created.');
    });
  }
}

module.exports = new User();
