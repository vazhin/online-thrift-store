const sqlite = require('sqlite3');

class Database {
  open() {
    const db = new sqlite.Database('./data/database.db', (err) => {
      if (err) {
        console.error(err.message);
      }

      console.log('Connected to the database.');
    });
    return db;
  }

  close(db) {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  }
}

module.exports = new Database();
