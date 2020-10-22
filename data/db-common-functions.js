const sqlite = require('sqlite3');

exports.connectToTheDatabase = () => {
  const db = new sqlite.Database('./data/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log('Connected to the database.');
  });
  return db;
};

exports.closeTheDatabaseConnection = (db) => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
};
