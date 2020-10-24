const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('./db-common-functions');

//TODO: CREATE A RELATIONSHIP BETWEEN USERS AND PRODUCTS TABLE. EACH USER HAS MANY PRODUCTS.

// TODO: picture of product.

class Product {
  create(product, callback) {
    let self = this;

    const db = connectToTheDatabase();

    db.serialize(() => {
      db.run(`DROP TABLE products`, (err) => {
        if (err) throw err;
        console.log('table products droped.');
      });

      this.createTable(db);

      let createProductSql = `INSERT INTO products(
      name,
      price,
      owner_phoneNumber,
      description,
      condition,
      date_added,
      category,
      user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(
        createProductSql,
        [
          product.name,
          product.price,
          product.owner_phoneNumber,
          product.description,
          product.condition,
          product.date_added,
          product.category,
          product.user_id,
        ],
        function (err) {
          if (err) {
            closeTheDatabaseConnection(db);
            callback({ err: err.message, row: null });
            return;
          }

          self.getOne(this.lastID, ({ row }) => {
            if (!row) {
              callback({
                err: `Could not get the row with the row id ${this.lastID}`,
                row: null,
              });
              closeTheDatabaseConnection(db);
            }
            callback({ err: null, row });
            closeTheDatabaseConnection(db);
          });
        }
      );
    });
  }

  // getAll(callback) {
  //   const db = connectToTheDatabase();

  //   db.all(
  //     `SELECT product_id,
  //   name,
  //   price,
  //   owner_phoneNumber,
  //   description,
  //   condition,
  //   date_added,
  //   category FROM products`,
  //     [],
  //     (err, rows) => {
  //       if (err) {
  //         callback({ err: err.message, data: null });
  //         closeTheDatabaseConnection(db);
  //         return;
  //       }
  //       callback({ err: null, data: rows });
  //       closeTheDatabaseConnection(db);
  //     }
  //   );
  // }

  getOne(product_id, callback) {
    const db = connectToTheDatabase();

    let sql = `SELECT product_id,
  name,
  price,
  owner_phoneNumber,
  description,
  condition,
  date_added,
  category,
  user_id
  FROM products WHERE product_id = ?`;

    db.get(sql, [product_id], function (err, row) {
      if (err) {
        closeTheDatabaseConnection(db);
        callback({
          err: err.message,
        });
        return;
      }
      closeTheDatabaseConnection(db);
      return row
        ? callback({ row })
        : callback({
            err: `No product was found with the id of ${product_id}`,
          });
    });
  }

  getRecent(callback) {
    const db = connectToTheDatabase();

    db.all(
      `SELECT product_id,
    name,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added,
    category FROM products ORDER BY product_id DESC LIMIT 50`,
      [],
      (err, rows) => {
        if (err) {
          callback({ err: err.message, data: null });
          closeTheDatabaseConnection(db);
          return;
        }

        callback({ err: null, data: rows });
        closeTheDatabaseConnection(db);
      }
    );
  }

  getByCategory(category, callback) {
    const db = connectToTheDatabase();

    db.all(
      `SELECT product_id,
    name,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added,
    category FROM products WHERE category = ? LIMIT 50`,
      [category],
      (err, rows) => {
        if (err) {
          callback({ err: err.message, data: null });
          closeTheDatabaseConnection(db);
          return;
        }

        callback({ err: null, data: rows });
        closeTheDatabaseConnection(db);
      }
    );
  }

  createTable(db) {
    let createTableSql = `CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      owner_phoneNumber INTEGER NOT NULL,
      description TEXT NOT NULL,
      condition TEXT NOT NULL,
      date_added TEXT NOT NULL,
      category TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id)
      REFERENCES users (user_id)
      ON UPDATE SET NULL
      ON DELETE SET NULL
    )`;

    db.run(createTableSql, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('table products created.');
    });
  }
}

module.exports = new Product();
