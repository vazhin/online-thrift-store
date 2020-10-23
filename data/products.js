const sqlite = require('sqlite3');

// TODO: get the inserted row. ///////////////

const {
  connectToTheDatabase,
  closeTheDatabaseConnection,
} = require('./db-common-functions');

//TODO: CREATE A RELATIONSHIP BETWEEN USERS AND PRODUCTS TABLE. EACH USER HAS MANY PRODUCTS.

// TODO: picture of product.

/* 

Q\ do I need to change the price data type to money?
Note\ the condition property can either be (new with tags, like-new, gently-used, signs of wear) 
Thought\ should I add "MEASUREMENTS" property or I don't need to I guess.

*/

// TODO: add category field. think about filtering the products.

class Product {
  constructor(
    product_id,
    name,
    owner,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added,
    category
  ) {
    this.product_id = product_id;
    this.name = name;
    this.owner = owner;
    this.price = price;
    this.owner_phoneNumber = owner_phoneNumber;
    this.description = description;
    this.condition = condition;
    this.date_added = date_added;
    this.category = category;
  }

  getAll(callback) {
    let success = true;
    let error_message = '';
    let products = [];

    const db = connectToTheDatabase();

    db.all(
      `SELECT product_id,
    name,
    owner,
    price,
    owner_phoneNumber,
    description,
    condition,
    date_added FROM products`,
      [],
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        products = [...rows];
      }
    );

    console.log(products);
  }

  create(product, callback) {
    let self = this;

    // TODO: validate incoming data in the body

    const db = connectToTheDatabase();

    db.serialize(() => {
      this.createTable(db);

      let createProductSql = `INSERT INTO products(
      name,
      owner,
      price,
      owner_phoneNumber,
      description,
      condition,
      date_added,
      category) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(
        createProductSql,
        [
          product.name,
          product.owner,
          product.price,
          product.owner_phoneNumber,
          product.description,
          product.condition,
          product.date_added,
          product.category,
        ],
        function (err) {
          if (err) {
            return callback({ err: err.message, row: null });
          }

          self.getOne(this.lastID, (row) => {
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

  createTable(db) {
    let createTableSql = `CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      owner TEXT NOT NULL,
      price INTEGER NOT NULL,
      owner_phoneNumber INTEGER NOT NULL,
      description TEXT NOT NULL,
      condition TEXT NOT NULL,
      date_added TEXT NOT NULL,
      category TEXT NOT NULL
    )`;

    db.run(createTableSql, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('table products created.');
    });
  }

  getOne(product_id, callback) {
    const db = connectToTheDatabase();

    let sql = `SELECT product_id,
  name,
  owner,
  price,
  owner_phoneNumber,
  description,
  condition,
  date_added FROM products WHERE product_id = ?`;

    db.get(sql, [product_id], function (err, row) {
      if (err) {
        console.error(err.message);
      }
      return row
        ? callback(row)
        : console.log(`No product found with the id of ${product_id}`);
    });
  }
}

module.exports = new Product();
