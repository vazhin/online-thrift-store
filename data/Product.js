const Database = require('./Database');

// TODO: picture of product.

class Product {
  create(product) {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.serialize(() => {
        this.createTable(db);
        db.run(
          `INSERT INTO products(
            name,
            price,
            currency,
            owner_phoneNumber,
            description,
            condition,
            date_added,
            category,
            city,
            image,
            user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            product.name,
            product.price,
            product.currency,
            product.owner_phoneNumber,
            product.description,
            product.condition,
            product.date_added,
            product.category,
            product.city,
            product.image,
            product.user_id,
          ],
          function (err) {
            if (err) {
              Database.close(db);
              return reject(err.message);
            }

            db.get(
              `SELECT * FROM products WHERE product_id = ?`,
              [this.lastID],
              (err, row) => {
                Database.close(db);
                if (err) return reject(err.message);
                resolve(row);
              }
            );
          }
        );
      });
    });
  }

  getOne(product_id) {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.get(
        `SELECT *, u.image AS userImage, p.image AS productImage FROM products p INNER JOIN users u ON p.user_id = u.user_id WHERE product_id = ?`,
        [product_id],
        (err, row) => {
          Database.close(db);
          if (err) return reject(err.message);
          return row
            ? resolve(row)
            : reject(`No product was found with the id of ${product_id}`);
        }
      );
    });
  }

  getByUser(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.all(
        `SELECT * FROM products WHERE user_id = ?`,
        [userId],
        (err, rows) => {
          Database.close(db);
          if (err) return reject(err.message);
          resolve(rows);
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.all(
        `SELECT * FROM products ORDER BY product_id DESC LIMIT 6`,
        [],
        (err, rows) => {
          Database.close(db);
          if (err) return reject(err.message);
          resolve(rows);
        }
      );
    });
  }

  getByCategory(category) {
    return new Promise((resolve, reject) => {
      const db = Database.open();
      db.all(
        `SELECT * FROM products WHERE category = ? LIMIT 50`,
        [category],
        (err, rows) => {
          Database.close(db);
          if (err) return reject(err.message);
          resolve(rows);
        }
      );
    });
  }

  createTable(db) {
    let createTableSql = `CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      currency TEXT NOT NULL,
      owner_phoneNumber INTEGER NOT NULL,
      description TEXT NOT NULL,
      condition TEXT NOT NULL,
      date_added TEXT NOT NULL,
      category TEXT NOT NULL,
      city TEXT NOT NULL,
      image TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id)
      REFERENCES users (user_id)
      ON UPDATE SET NULL
      ON DELETE SET NULL
    )`;

    db.run(createTableSql, function (err) {
      if (err) console.error(err);
      console.log('table products created.');
    });
  }
}

module.exports = new Product();
